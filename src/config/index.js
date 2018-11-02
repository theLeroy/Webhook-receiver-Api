import pkg from '../../package.json'

const VCAP_SERVICES = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : null

export default {
  version: pkg.version,
  commitVersion: pkg.commitVersion,
  env: process.env.NODE_ENV || 'development',
  server: {
    port: process.env.PORT || 4000,
    VCAP_SERVICES,
    endpoints: {
      graphql: '/graphql',
      subscriptions: '/subscriptions',
      playground: process.env.NODE_ENV !== 'production' ? '/' : false
    },
  },
  database: {
    url: VCAP_SERVICES ? VCAP_SERVICES.mongodbent[0].credentials.database_uri : 'mongodb://localhost/Webhook',
    init: process.argv[2] || false
  },
  matchers: {
    phone: /^0041[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}$/
  }
}
