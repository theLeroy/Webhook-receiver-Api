import logger from './utils/logger'
import config from './config'
import server from './controllers'
import webhook from './utils/Webhook/Webhook.js'

logger.logInfo(`ENVIRONMENT: ${config.env}`)
logger.logInfo(`VERSION: ${config.version}`)
logger.logInfo(`COMMIT VERSION: ${config.commitVersion}`)
logger.logInfo(`DATABASE URL: ${config.database.url}`)

server.start({
  port: config.server.port,
  endpoint: config.server.endpoints.graphql,
  subscriptions: config.server.endpoints.subscriptions,
  playground: config.server.endpoints.playground
}, () => logger.logInfo(`Server is running on localhost:${config.server.port}`))
  .catch(error => {
    logger.logError('An error occured while starting the graphql server')
    logger.logError(error)
    process.exit(1)
  })
