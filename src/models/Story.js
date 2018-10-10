import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import Progress, { progressSchema } from './Progress'
import Flow, { flowSchema } from './Flow'

const Schema = mongoose.Schema

export const storySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  token: {
    type: String,
    required: true,
    index: true,
    match: /^[0-9a-zA-Z]{64}$/
  },
  progress: {
    type: progressSchema,
    required: true,
    default: new Progress()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  flow: {
    type: flowSchema,
    required: true
  },
}, {collection:'stories'})
  .plugin(uniqueValidator)

export default mongoose.model('Story', storySchema)
