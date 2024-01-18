import 'express-async-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { routes } from './routes'
import { errorsHandler } from './middlewares/erros'

export const app = express()
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };

app.use(cors(corsOptions))


app.use(routes)
app.use(errorsHandler)