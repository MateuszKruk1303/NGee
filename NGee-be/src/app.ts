import express from 'express'
import mongoose from 'mongoose'
import itemRoutes from './routes/item.routes'
import userRoutes from './routes/user.routes'
import { ServerError, ErrorHandler } from './utils/serverError'
import dotenv from 'dotenv'

dotenv.config({ path: './process.env' })

const DB = process.env['DB_URL'] as string

mongoose.connect(DB)

const app = express()

app.use(express.json())

app.use('/items', itemRoutes)
app.use('/user', userRoutes)

app.all('*', (req, res, next) => {
  next(new ServerError(`can't find ${req.originalUrl}!`, 404))
})

app.use(ErrorHandler)

app.listen(process.env['PORT'], () => {
  console.log(`server listening at port ${process.env['PORT']}`)
})
