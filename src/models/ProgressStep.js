import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

export const progressStepSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  state: {
    type: Number,
    required: true,
    default: 0
  },
  t1: {
    type: Number
  },
  t2: {
    type: Number
  },
})
  .plugin(uniqueValidator)

export default mongoose.model('ProgressStep', progressStepSchema)
