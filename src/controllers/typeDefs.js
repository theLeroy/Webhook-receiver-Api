export default
`type WebhookConntent {
  _id: String
  UserId: String
  intTime: Int
  WebhookConntent: String
}

type Users {
  _id: String
  UserId: String
  LoginToken: String
  Email: String
}

type Mutation {
  NewWebhook(uid: String, iTime: String, WConntent: String): WebhookConntent
}

type Query {
  WebhookByUser(userid: String): WebhookConntent
}`
