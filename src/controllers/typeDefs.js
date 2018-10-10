export default
`type ProgressStep {
  _id: String
  state: Int
  t1: Float
  t2: Float
}

type Progress {
  _id: String
  s1: ProgressStep
  s2: ProgressStep
  s3: ProgressStep
}

type User {
  _id: String
  phone: String
  stories: [Story]
}

type Company {
  _id: String
  name: String
  url: String
  couponTypes: [CouponType]
}

type CouponType {
  _id: String
  name: String
  description: String
  url: String
  company: Company
  active: Boolean
  masterExpiryDate: Float
  expiryHours: Float
  totalStock: Int
  availableStock: Int
  videos: [Video]
  timesUsedInStory: Int
}

type Video {
  _id: String
  title: String
  src: String
  lengthInSeconds: Int
  questions: [Question]
  timesUsedInStory: Int
}

type Question {
  _id: String
  question: String
  correctAnswers: [Answer]
  wrongAnswers: [Answer]
  timesUsedInStory: Int
}

type Answer {
  _id: String
  text: String
  timesUsedInStory: Int
}

type Flow {
  _id: String
  couponType: CouponType
  video: Video
  question: Question
  answers: [Answer]
  answerGiven: Answer
  answerGivenIsCorrect: Boolean
}

type Story {
  _id: String
  token: String
  user: User
  progress: Progress
  flow: Flow
}

type NextStep {
  video: Video
  question: Question
  answers: [Answer]
  answerCorrect: Boolean
  phoneRequired: Boolean
  smsSent: Boolean
}

type Query {
  user(phone: String): User
  story(token: String): Story
}

type Mutation {
  startNewStory(couponTypeHash: String): Story
  nextStep(token: String, videoWatched: Boolean, answerGivenId: String, phone: String): NextStep
}`
