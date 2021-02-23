import mongoose from 'mongoose'

export const initDatabaseConnection = (): Promise<mongoose.Connection> => {
  mongoose.connect('mongodb://mongodb/systek_social', { useNewUrlParser: true, useUnifiedTopology: true })

  const db = mongoose.connection
  return new Promise<mongoose.Connection>((resolve, reject) => {
    db.on('error', (error) => {
      reject(error)
    })
    db.once('open', () => {
      resolve(db)
    })
  })
}
