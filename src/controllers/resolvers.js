import logger from '../utils/logger'
import config from '../config'
import connection from '../utils/mongo'
import User from '../models/User'
import Story from '../models/Story'
import NextStep from '../models/NextStep'
import CouponType from '../models/CouponType'
import { generateHash, newFlowFromCouponType, sendSmsForStory } from '../utils/helpers'

export default {
  Query: {
    user: async (_, { phone }) => {
      return (await User.findOneWithStories({ phone }))
    },
    story: async (_, { token }) => {
      return (await Story.findOne({ token }).populate('user'))
    },
  },
  Mutation: {
    startNewStory: async (_, { couponTypeHash }) => {
      let expectedCouponType = await CouponType.findOne({ hash: couponTypeHash })
      if (!expectedCouponType) throw new Error('No couponType found with hash')
      if (!expectedCouponType.isActive()) throw new Error('CouponType is expired')
      if (!expectedCouponType.isAvailable()) throw new Error('Not enough coupons available')

      let token, exists
      do {
        token = generateHash()
        exists = false
        Story.findOne({ token }, (err, story) => {
          if (story) exists = true
        })
      } while (exists)

      let story
      try {
        story = new Story({
          token,
          flow: await newFlowFromCouponType(expectedCouponType)
        })
        await story.save()
        logger.logInfo(`Story started with token: ${story.token}`)
        return {
          token: story.token
        }
      } catch (err) {
        logger.logError(err)
        throw new Error('Could not create story')
      }
    },
    nextStep: async (_, args) => {
      let token = args.token
      let story = await Story.findOne({ token }).populate('user').populate('flow.video').populate('flow.question').populate('flow.answers')
      if (!story) {
        throw new Error('No story found')
      }

      let result = new NextStep()

      if (story.progress.s1.state === 0 || (story.progress.s1.state === 1 && !args.videoWatched)) {
        // Send video
        result.video = {
          src: story.flow.video.src,
          lengthInSeconds: story.flow.video.lengthInSeconds,
        }

        if (story.progress.s1.state === 0) {
          story.progress.s1.state = 1
          story.progress.s1.t1 = + new Date()
        }
      } else if (story.progress.s1.state === 1) {
        // Video watched
        if (args.videoWatched) {
          // Check if time of video is over and therefore user should have watched the video
          if (config.env === 'production' && + new Date() < (story.progress.s1.t1 + (story.flow.video.lengthInSeconds * 1000)))
            throw new Error('Video cannot be over yet')

          story.progress.s1.state = 2
          story.progress.s1.t2 = + new Date()
        }
      }

      if (story.progress.s1.state === 2) {
        if (story.progress.s2.state === 0 || (story.progress.s2.state === 1 && !args.answerGivenId)) {
          // Send question
          result.question = {
            question: story.flow.question.question
          }
          result.answers = story.flow.answers
  
          if (story.progress.s2.state === 0) {
            story.progress.s2.state = 1
            story.progress.s2.t1 = + new Date()
          }
        } else if (story.progress.s2.state === 1) {
          // Question answered
          if (args.answerGivenId) {
            // Check if answer is correct
            let correctAnswerIds = story.flow.question.correctAnswers.map(a => a._id)
            let wrongAnswerIds = story.flow.question.wrongAnswers.map(a => a._id)
            let answerCorrect = correctAnswerIds.filter(ca => ca == args.answerGivenId).length > 0
            let answerWrong = wrongAnswerIds.filter(wa => wa == args.answerGivenId).length > 0
            if (answerCorrect) {
              story.flow.answerGivenIsCorrect = true
            } else if (answerWrong) {
              story.flow.answerGivenIsCorrect = false
            } else {
              throw new Error('Invalid answerGivenId')
            }

            result.answerCorrect = story.flow.answerGivenIsCorrect

            story.progress.s2.state = 2
            story.progress.s2.t2 = + new Date()
          }
        }

        result.answerCorrect = story.flow.answerGivenIsCorrect

        if (story.progress.s2.state === 2 && story.flow.answerGivenIsCorrect) {
          if (story.progress.s3.state === 0 || (story.progress.s3.state === 1 && !args.phone)) {
            // Ask for phone
            result.phoneRequired = true

            if (story.progress.s3.state === 0) {
              story.progress.s3.state = 1
              story.progress.s3.t1 = + new Date()
            }
          } else if (story.progress.s3.state === 1) {
            // Phone entered
            if (args.phone) {
              if (!config.matchers.phone.test(args.phone)) throw new Error("Invalid phone")
  
              try {
                let user = await User.findOne({ phone: args.phone })
                if (!user) {
                  user = new User({
                    phone: args.phone
                  })
                  user.save()
                }

                story.user = user
              } catch (err) {
                logger.logError(err)
                throw new Error('Could not associate story with phone number')
              }

              let couponType = await CouponType.findById(story.flow.couponType)
              if (!couponType.isActive()) throw new Error('CouponType is expired')
              if (!couponType.isAvailable()) throw new Error('Not enough coupons available')

              // Send SMS
              try {
                await sendSmsForStory(story)
              } catch (err) {
                logger.logError(err)
                throw new Error('Could not send sms')
              }

              couponType.availableStock--
              couponType.save()

              story.progress.s3.state = 2
              story.progress.s3.t2 = + new Date()
            }
          }

          if (story.progress.s3.state === 2) {
            // Story over, return coupon
            result.smsSent = true
          }
        }
      }

      story.save()

      return result
    },
  },
}
