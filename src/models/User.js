import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import config from '../config'
import Story, { storySchema } from './Story'

const Schema = mongoose.Schema

export const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  phone: {
    type: String,
    index: true,
    match: config.matchers.phone
  },
  stories: {
    type: [storySchema]
  },
}, {collection:'users'})
  .plugin(uniqueValidator)


const User = mongoose.model('User', userSchema)

User.findOneWithStories = async (query) => {
  let user = await User.findOne(query)
  if (!user) return null

  user.stories = await Story.find({ user: user._id })
  return user
}

export default User
