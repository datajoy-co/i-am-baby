import initKnex from 'knex'
import { databaseCredentials } from '../env'

const knex = initKnex({
  client: 'mysql',
  connection: databaseCredentials
})

export default knex
