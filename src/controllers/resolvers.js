import logger from '../utils/logger'
import config from '../config'
import connection from '../utils/mongo'
import WebhookConntent from '../models/WebhookConntent'

import { generateHash, newFlowFromCouponType, sendSmsForStory } from '../utils/helpers'

export default {
  Query: {
    WebhookByUser: async (_id) => {
      return (await WebhookConntent.findOne(_id))
    },
  },
  // Mutation: {
  // },
}
