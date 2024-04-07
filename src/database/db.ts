import { Sequelize } from "sequelize-typescript";
import { configDotenv } from "dotenv";

configDotenv()

const { DATABASE_URL } = process.env

const db = new Sequelize(DATABASE_URL!, {
  dialectOptions: {
    ssl: true
  },
  models: [__dirname + '/../models/**/*.{ts,js}']
})

export default db