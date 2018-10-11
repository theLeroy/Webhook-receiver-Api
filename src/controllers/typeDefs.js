export default
`type WebhookConntent {
  _id: String
  UserId: String
  WebhookConntent: String
}

type Query {
  WebhookByUser(userid: String): WebhookConntent
}`
