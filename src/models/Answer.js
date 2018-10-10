import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import config from '../config'

const Schema = mongoose.Schema

export const answerSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  text: {
    type: String,
    required: true,
  },
  timesUsedInStory: {
    type: Number,
    default: 0
  },
}, {collection:'answers'})
  .plugin(uniqueValidator)


const Answer = mongoose.model('Answer', answerSchema)

export default Answer
