import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import WebhookLinks, { WebhookLinksShema } from './WebhookLinks'
import config from '../config'


const Schema = mongoose.Schema

export const UsersShema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  UserId: {
    type: String,
    required: true
  },
  LoginToken: {
    type: String,
    required: true
  },
  Email: {
    type: String,
  },
  WebhookLinks: {
    type: WebhookLinks,
    required: true
  }
})
.plugin(uniqueValidator)

const Users = mongoose.model('Users', UsersShema)

// WebhookConntent.GetAllWebhooks = async (query) => {
//   // let Conntent = await WebhookConntent.findOne(query)
//   // if (!Conntent) return null
//   // //Query ??
//   // Conntent.Webhooks = await WebhookConntent.find({ UserId: Webhook.UserId })
//   // return Conntent
//
//   let output = WebhookConntent.find(WebhookConntent, { UserId: 'KLUGHILUSdgluiweiuzg'})
//   return output;
// }

export default Users
// export default mongoose.model('WebhookConntent', WebhookConntentSchema)
