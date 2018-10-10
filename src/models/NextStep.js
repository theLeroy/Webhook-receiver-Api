import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { videoSchema } from './Video'
import { questionSchema } from './Question'
import { answerSchema } from './Answer'

const Schema = mongoose.Schema

export const nextStepSchema = new Schema({
  video: {
    type: videoSchema
  },
  question: {
    type: questionSchema
  },
  answers: {
    type: [answerSchema]
  },
  answerCorrect: {
    type: Boolean
  },
  phoneRequired: {
    type: Boolean
  },
  smsSent: {
    type: Boolean
  },
})
  .plugin(uniqueValidator)

export default mongoose.model('NextStep', nextStepSchema)
