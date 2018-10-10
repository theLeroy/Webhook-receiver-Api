import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import ProgressStep, { progressStepSchema } from './ProgressStep'

const Schema = mongoose.Schema

export const progressSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  s1: {
    type: progressStepSchema,
    required: true,
    default: new ProgressStep()
  },
  s2: {
    type: progressStepSchema,
    required: true,
    default: new ProgressStep()
  },
  s3: {
    type: progressStepSchema,
    required: true,
    default: new ProgressStep()
  },
})
  .plugin(uniqueValidator)

export default mongoose.model('Progress', progressSchema)
