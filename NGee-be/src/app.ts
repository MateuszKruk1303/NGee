import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes'
import postRoutes from './routes/post.routes'
import { ServerError, ErrorHandler } from './utils/serverError'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

dotenv.config({ path: './process.env' })

const DB = process.env['DB_URL'] as string

mongoose.connect(DB)

const app = express()

app.use(cors())
app.use(
  '/profilePictures',
  express.static(path.resolve(`./src/images/ClientUploads/ProfilePictures/`))
)
app.use(
  '/postPictures',
  express.static(path.resolve(`./src/images/ClientUploads/PostPictures/`))
)
app.use(express.json())
app.use('/user', userRoutes)
app.use('/posts', postRoutes)

app.all('*', (req, res, next) => {
  next(new ServerError(`Nie znaleziono ${req.originalUrl}!`, 404))
})

app.use(ErrorHandler)

app.listen(process.env['PORT'], () => {
  console.log(`Serwer wystartował na porcie ${process.env['PORT']}`)
})
