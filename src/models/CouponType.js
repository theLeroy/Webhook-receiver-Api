import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import config from '../config'
import Video, { videoSchema } from './Video'

const Schema = mongoose.Schema

export const couponTypeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  hash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  masterExpiryDate: {
    type: Number
  },
  expiryHours: {
    type: Number
  },
  totalStock: {
    type: Number
  },
  availableStock: {
    type: Number
  },
  videos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video'
  }],
  timesUsedInStory: {
    type: Number,
    default: 0
  },
}, {collection:'couponTypes'})
  .plugin(uniqueValidator)


const CouponType = mongoose.model('CouponType', couponTypeSchema)

CouponType.prototype.isAvailable = function () {
  return this.availableStock > 0
}

CouponType.prototype.isActive = function () {
  return this.active && this.masterExpiryDate > (+ new Date())
}

export default CouponType
