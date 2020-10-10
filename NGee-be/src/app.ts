import express from 'express'
import mongoose from 'mongoose'
import itemRoutes from './routes/item.routes'

const DB = 'mongodb://mongo:27017/items'
mongoose.connect(DB)

const app = express()

app.use(express.json())

app.use('/items', itemRoutes)

app.listen(8081, () => {
  console.log(`server listening at port 8081`)
})
