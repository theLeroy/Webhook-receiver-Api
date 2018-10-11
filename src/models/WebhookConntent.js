import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema

export const WebhookConntentSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  UserId: {
    type: String,
    required: true
  },
  WebhookConntent: {
    type: String,
    required: true
  },
})

const WebhookConntent = mongoose.model('WebhookConntent', WebhookConntentSchema)

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

export default WebhookConntent
// export default mongoose.model('WebhookConntent', WebhookConntentSchema)
