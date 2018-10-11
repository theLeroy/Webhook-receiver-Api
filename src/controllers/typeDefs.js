export default
`type WebhookConntent {
  _id: String
  UserId: String
  intTime: String
  WebhookConntent: String
}

type Mutation {
  NewWebhook(uid: String, iTime: String, WConntent: String): WebhookConntent
}

type Query {
  WebhookByUser(userid: String): WebhookConntent
}`
