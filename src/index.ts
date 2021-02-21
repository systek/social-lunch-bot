import express, { Application } from 'express'

const serverPort = process.env.PORT || 4001
const app: Application = express()

app.get('/', (req, res) => {
  res.json({ foo: 'bar' })
})

app.listen(serverPort, () => {
  console.log(`Started at port ${serverPort}`)
})
