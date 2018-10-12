import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'


const Schema = mongoose.Schema

export const WebhookLinksShema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  LinkHash: {
    type: String,
    required: true,
  }
})
 .plugin(uniqueValidator)

const WebhookLinks = mongoose.model('WebhookLinks', WebhookLinksShema)

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

export default WebhookLinks
// export default mongoose.model('WebhookConntent', WebhookConntentSchema)
