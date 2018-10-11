import logger from '../utils/logger'
import config from '../config'
import connection from '../utils/mongo'
import WebhookConntent from '../models/WebhookConntent'

import { generateHash, newFlowFromCouponType, sendSmsForStory } from '../utils/helpers'

export default {
  Query: {
    WebhookByUser: async (_, { userid }) => {
      return (await WebhookConntent.findOne({UserId: userid}))
    },
  },
  Mutation: {
    NewWebhook: async (_, { userid, intTime, WConntent}) => {
      return (await WebhookConntent.findOne({UserId: userid}))
    },
  },
}
