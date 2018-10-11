import logger from '../utils/logger'
import config from '../config'
import connection from '../utils/mongo'
import WebhookConntent from '../models/WebhookConntent'

import { generateHash, newFlowFromCouponType, sendSmsForStory } from '../utils/helpers'

export default {
  Query: {
    WebhookByUser: async (parent, args, { WebhookConntent }) => {
      let Conntent = await connection.find()
      // if (!Conntent) return null
      // //Query ??
      // Conntent.Webhooks = await WebhookConntent.find({ UserId: Webhook.UserId })
      // return Conntent
      return Conntent.map((x) => {
        x._id = x._id.toString();
        return x;
      });

    },
     hello: () => `Hello`,
  },
  // Mutation: {
  // },
}
