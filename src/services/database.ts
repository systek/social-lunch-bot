import mongoose from 'mongoose'

let db = mongoose.connection

enum DatabaseState {
  CONNECTING = 0,
  CONNECTED = 1,
  DISCONNECTING = 2,
  DISCONNECTED = 3,
}

export const initDatabaseConnection = (): Promise<mongoose.Connection> => {
  const { DB_NAME, DB_MASTER_KEY, NODE_ENV } = process.env
  const connectionString =
    NODE_ENV === 'production'
      ? `mongodb://${DB_NAME}:${DB_MASTER_KEY}@${DB_NAME}.documents.azure.com:10250/mean?ssl=true&sslverifycertificate=false`
      : 'mongodb://mongodb/mean'

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
  })

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
