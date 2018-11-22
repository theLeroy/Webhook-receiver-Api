import logger from './logger'
import config from '../config'

Array.prototype.shuffle = function () {
  var j, x, i;
  for (i = this.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this[i];
      this[i] = this[j];
      this[j] = x;
  }
  return this
}

export const generateHash = (length = 64, casesensitive = true) => {
  let available = '0123456789abcdefghijklmnopqrstuvwxyz'
  if (casesensitive) available += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let hash = ''
  for (let i = 0; i < length; i++) {
    let randomCharIndex = Math.floor(Math.random() * available.length)
    let char = available.charAt(randomCharIndex)
    char = casesensitive && Math.random() < 0.5 ? char.toUpperCase() : char.toLocaleLowerCase()
    hash += char
  }
  return hash
}

export const initDb = async () => {
  // The following line should be deleted once the production initializer is done
  await initMockDb()
}

export const initMockDb = async () => {
  const emptyBefore = true

  let WebhookConntent = require('../models/WebhookConntent').default
  let Users = require('../models/Users').default

  if (emptyBefore) {
    await WebhookConntent.deleteMany({})
    await Users.deleteMany({})
  }

  //Test Data
  let testwebhooks = await WebhookConntent.create([
    {
       UserId: 'KLUGHILUSdgluiweiuzg',
       intTime: 981237123,
       WebhookConntent: 'Webhook Conntent test 1'
   },
    {
       UserId: 'sadsda',
       intTime: 981237123,
       WebhookConntent: 'Webhook Cokajusgdasidugnntent test 2'
   },
    {
       UserId: 'sdsdsdsdsd',
       intTime: 981237123,
       WebhookConntent: 'Webhook Conntent test 3'
   },
    {
       UserId: 'KLUGHILUsdSdgluiweiuzg',
       intTime: 981237123,
       WebhookConntent: 'Webhook Conntent test 4'
   }
  ])


  let testUsers = await Users.create([
    {
      UserId: 'KLUGHILUsdSdgluiweiuzg',
      LoginToken: 'Nisd02h81n89',
      Email: 'test@email.com',
      WebhookLinks: [
      {
        LinkHash: '1111',
      },
      {
        LinkHash: '2222',
      },
      {
        LinkHash: '3333',
      }]
    },
    {
      UserId: '99999',
      LoginToken: 'Nisd902h81n89',
      Email: 'te9st@ema99il.co9m',
      WebhookLinks: [
      {
        LinkHash: '99',
      },
      {
        LinkHash: '99',
      },
      {
        LinkHash: '99',
      }]
    },
    {
      UserId: '123',
      LoginToken: '123',
      Email: 'test@123.com',
      WebhookLinks: [
      {
        LinkHash: '000',
      },
      {
        LinkHash: '0',
      },
      {
        LinkHash: '00',
      }]
    }
  ])
}
