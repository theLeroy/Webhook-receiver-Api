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
  },
  WebhookConntent: {
    type: String
  },
})

const WebhookConntent = mongoose.model('WebhookConntent', WebhookConntentSchema)

WebhookConntent.GetAllWebhooks = async (query) => {
  let Conntent = await WebhookConntent.findOne(query)
  if (!Conntent) return null

  Conntent.stories = await Story.find({ Conntent: Conntent._id })
  return Conntent
}

export default WebhookConntent
// export default mongoose.model('WebhookConntent', WebhookConntentSchema)
