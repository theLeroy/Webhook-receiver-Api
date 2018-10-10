import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

export default new GraphQLServer({
  typeDefs,
  resolvers
})
