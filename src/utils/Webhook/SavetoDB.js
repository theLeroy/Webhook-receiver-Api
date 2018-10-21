import config from '../../config'
module.exports = {
  SaveWHtoDB:(data) => {

    let WebhookConntent = require('../../models/WebhookConntent').default

    //Test Data
    WebhookConntent.create([
      {
        UserId: 'KLUGHILUSdgluiweiuzg',
        intTime: 981237123,
        WebhookConntent: ''+data+''
      }
    ])

}
}
