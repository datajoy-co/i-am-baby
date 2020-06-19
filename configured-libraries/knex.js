import initKnex from 'knex'

const connection = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  multipleStatements: 'true'
}

const knex = initKnex({
  client: 'mysql',
  connection
})

export default knex
