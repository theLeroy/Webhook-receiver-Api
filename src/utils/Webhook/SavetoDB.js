import config from '../../config'
export default {
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
