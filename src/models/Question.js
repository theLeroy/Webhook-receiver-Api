import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import config from '../config'
import Answer, { answerSchema } from './Answer'

const Schema = mongoose.Schema

export const questionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  question: {
    type: String,
  },
  correctAnswers: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }]
  },
  wrongAnswers: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }]
  },
  timesUsedInStory: {
    type: Number,
    default: 0
  },
}, {collection:'questions'})
  .plugin(uniqueValidator)


const Question = mongoose.model('Question', questionSchema)

export default Question
