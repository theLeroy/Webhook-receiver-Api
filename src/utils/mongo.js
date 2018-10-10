import mongoose from 'mongoose'
import logger from './logger'
import config from '../config'
import { initDb, initMockDb } from './helpers'

const connection = mongoose.connect(config.database.url, { useNewUrlParser: true }).then(
  () => {
    logger.logInfo('Successfully connected to database')
    if (config.database.init) {
      let initializer = config.database.init === 'init' ? initDb : initMockDb
      let mockedString = (config.database.init === 'initMock' ? ' with mocked data' : '')
      logger.logInfo('Initializing DB' + mockedString)
      initializer()
        .then((done) => {
          logger.logInfo('Done')
        })
        .catch((err) => {
          logger.logError('Could not initialize DB' + mockedString)
          logger.logError(err)
        })
    }
  },
  err => {
    logger.logError('An error occured while connecting to the database')
    logger.logError(err)
    process.exit(1)
  }
)

export default connection
