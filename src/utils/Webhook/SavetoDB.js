import config from '../../config'
module.exports = {
  SaveWHtoDB:(data, user) => {

    let WebhookConntent = require('../../models/WebhookConntent').default

    //Test Data
    WebhookConntent.create([
      {
        UserId: ''+user+'',
        intTime:  Date.now(),
        WebhookConntent: ''+data+''
      }
    ])

}
}
