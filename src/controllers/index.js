import { GraphQLServer, PubSub } from 'graphql-yoga'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
const pubsub = new PubSub()

export default new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub }
})
