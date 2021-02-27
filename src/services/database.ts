import mongoose from 'mongoose'

let db = mongoose.connection

enum DatabaseState {
  CONNECTING = 0,
  CONNECTED = 1,
  DISCONNECTING = 2,
  DISCONNECTED = 3,
}

export const initDatabaseConnection = (): Promise<mongoose.Connection> => {
  mongoose.connect('mongodb://mongodb/systek_social', { useNewUrlParser: true, useUnifiedTopology: true })

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
