import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import config from '../config'
import Question, { questionSchema } from './Question'

const Schema = mongoose.Schema

export const videoSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  title: {
    type: String,
  },
  src: {
    type: String
  },
  lengthInSeconds: {
    type: Number
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  timesUsedInStory: {
    type: Number,
    default: 0
  },
}, {collection:'videos'})
  .plugin(uniqueValidator)


const Video = mongoose.model('Video', videoSchema)

Video.findOneWithQuestions = async (query) => {
  let video = await Video.findOne(query)
  if (!video) return null

  video.questions = await Question.find({ video: video._id })
  return video
}

export default Video
