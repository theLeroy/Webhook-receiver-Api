import logger from '../utils/logger'
import config from '../config'
import connection from '../utils/mongo'
import WebhookConntent, {WebhookConntentSchema} from '../models/WebhookConntent'

import { generateHash, newFlowFromCouponType, sendSmsForStory } from '../utils/helpers'

export default {
  Query: {
    WebhookByUser: async (_, { userid }) => {
      return (await WebhookConntent.find({UserId: userid}))
    },
  },
  Mutation: {
    NewWebhook: async (_, { uid, WConntent}) => {
      return (await WebhookConntent.create(
        {
          UserId: uid,
          intTime: + new Date(),
          WebhookConntent: WConntent
        }))
      },
    },
    Subscription: {
      NewWebhookIncoming: {
        subscribe: (parent, args, { pubsub }) => {

          const channel = Math.random().toString(36).substring(2, 15)

          WebhookConntent.on('afterInsert', function(input) {
            console.log(input);
            console.log('Change');
            if(input.UserId === args.userid) {
              pubsub.publish(channel, { NewWebhookIncoming: input })
            }
          })
          return pubsub.asyncIterator(channel)

        }
      },
    }
  }
