import logger from './logger'
import config from '../config'

Array.prototype.shuffle = function () {
  var j, x, i;
  for (i = this.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this[i];
      this[i] = this[j];
      this[j] = x;
  }
  return this
}

export const generateHash = (length = 64, casesensitive = true) => {
  let available = '0123456789abcdefghijklmnopqrstuvwxyz'
  if (casesensitive) available += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let hash = ''
  for (let i = 0; i < length; i++) {
    let randomCharIndex = Math.floor(Math.random() * available.length)
    let char = available.charAt(randomCharIndex)
    char = casesensitive && Math.random() < 0.5 ? char.toUpperCase() : char.toLocaleLowerCase()
    hash += char
  }
  return hash
}

export const newFlowFromCouponType = async (couponType) => {
  const Flow = require('../models/Flow').default
  const Video = require('../models/Video').default
  const Question = require('../models/Question').default
  const Answer = require('../models/Answer').default

  let flow = new Flow({
    couponType
  })

  let videoId = couponType.videos[Math.floor(Math.random() * couponType.videos.length)]
  let video = await Video.findById(videoId)
  if (!video) throw new Error(`Could not find video for couponType with id ${couponType._id}`)
  flow.video = video

  let questionId = video.questions[Math.floor(Math.random() * video.questions.length)]
  let question = await Question.findById(questionId)
  if (!question) throw new Error(`Could not find question for video with id ${video._id}`)
  flow.question = question

  if (question.correctAnswers.length === 0) throw new Error(`Could not find correct answers for question with id ${question._id}`)
  let correctAnswerId = question.correctAnswers[Math.floor(Math.random() * question.correctAnswers.length)]
  flow.answers.push(await Answer.findById(correctAnswerId))

  if (question.wrongAnswers.length === 0) throw new Error(`Could not find wrong answers for question with id ${question._id}`)
  let wrongAnswerIndexesUsed = []
  for (let i = 0; i < 2; i++) {
    let index
    do {
      index = Math.floor(Math.random() * question.wrongAnswers.length)
    } while (wrongAnswerIndexesUsed.indexOf(index) !== -1)
    wrongAnswerIndexesUsed.push(index)
    let wrongAnswerId = question.wrongAnswers[index]
    flow.answers.push(await Answer.findById(wrongAnswerId))
  }

  flow.answers.shuffle()

  couponType.timesUsedInStory++
  couponType.save()
  video.timesUsedInStory++
  video.save()
  question.timesUsedInStory++
  question.save()
  for (let i = 0; i < flow.answers.length; i++) {
    flow.answers[i].timesUsedInStory++
    flow.answers[i].save()
  }

  return flow
}

export const sendSmsForStory = async (story) => {

}

export const initDb = async () => {
  // The following line should be deleted once the production initializer is done
  await initMockDb()
}

export const initMockDb = async () => {
  const emptyBefore = true

  let WebhookConntent = require('../models/WebhookConntent').default

  if (emptyBefore) {
    await WebhookConntent.deleteMany({})
  }

  //Test Data
  let testwebhooks = await WebhookConntent.create([
    {
       UserId: 'KLUGHILUSdgluiweiuzg',
       intTime: 981237123,
       WebhookConntent: 'Webhook Conntent test 1'
   },
    {
       UserId: 'sadsda',
       intTime: 981237123,
       WebhookConntent: 'Webhook Cokajusgdasidugnntent test 2'
   },
    {
       UserId: 'sdsdsdsdsd',
       intTime: 981237123,
       WebhookConntent: 'Webhook Conntent test 3'
   },
    {
       UserId: 'KLUGHILUsdSdgluiweiuzg',
       intTime: 981237123,
       WebhookConntent: 'Webhook Conntent test 4'
   }
  ])
}
