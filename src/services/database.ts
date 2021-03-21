import mongoose from 'mongoose'

let db = mongoose.connection

enum DatabaseState {
  CONNECTING = 0,
  CONNECTED = 1,
  DISCONNECTING = 2,
  DISCONNECTED = 3,
}

export const initDatabaseConnection = (): Promise<mongoose.Connection> => {
  const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = process.env
  mongoose.connect('mongodb://mongodb/systek_social', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: MONGO_INITDB_ROOT_USERNAME,
    pass: MONGO_INITDB_ROOT_PASSWORD,
    authSource: 'admin',
  })
  mongoose.connection.useDb('systek_social')

  db = mongoose.connection
  return new Promise<mongoose.Connection>((resolve, reject) => {
    db.on('error', (error) => {
      reject(error)
    })
    db.once('open', () => {
      resolve(db)
    })
  })
}

export const getStatus = (): boolean => {
  return db.readyState === DatabaseState.CONNECTED
}
