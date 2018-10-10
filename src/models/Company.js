import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import config from '../config'
import CouponType, { couponTypeSchema } from './CouponType'

const Schema = mongoose.Schema

export const companySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  name: {
    type: String,
  },
  url: {
    type: String
  },
  couponTypes: {
    type: [couponTypeSchema]
  },
}, {collection:'companies'})
  .plugin(uniqueValidator)


const Company = mongoose.model('Company', companySchema)

Company.findOneWithQuestions = async (query) => {
  let company = await Company.findOne(query)
  if (!company) return null

  company.couponTypes = await CouponType.find({ company: company._id })
  return company
}

export default Company
