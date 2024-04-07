import express from "express";
import db from "./database/db";
import productsRouter from "./router/productsRouter";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

// Database connection

const connectDB = async () => {
  try {
    await db.authenticate()
    db.sync()
    console.log('Authentication complete')
  } catch(err) {
    console.error('An error ocurred while trying to authenticate to the database', err)
  }
}

connectDB()

// Cors configuration

const corsOpts : CorsOptions = {
  origin: (origin, cb) => {
    if (origin === process.env.CLIENT_URL) {
      console.log('Allow connection from', origin)
      cb(null, true)
    } else {
      console.log('Block connection from', origin)
      cb(new Error('CORS error - this origin is not allowed'))
    }
  }
}

// Server initialization

const server = express()

server.use(morgan('dev'))

server.use(cors(corsOpts))

server.use(express.json())

server.get('/', (req, res) => {
  res.json({msg: 'The database is connected!'})
})

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

server.use('/products', productsRouter)

export default server