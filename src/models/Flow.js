import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import Answer, { answerSchema } from './Answer'

const Schema = mongoose.Schema

export const flowSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  couponType: {
    type: Schema.Types.ObjectId,
    ref: 'CouponType'
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  answers: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }]
  },
  answerGivenId: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  answerGivenIsCorrect: {
    type: Boolean
  },
})
  .plugin(uniqueValidator)

export default mongoose.model('Flow', flowSchema)
