import initKnex from 'knex'

async function getDatabaseCredentials () {
  try {
    const env = await import('../env')
    return env.databaseCredentials
  } catch (error) {
    console.log("Couldn't import env.js. This is expected in production.")
    return {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      multipleStatements: 'true'
    }
  }
}

async function getKnex () {
  const knex = initKnex({
    client: 'mysql',
    connection: await getDatabaseCredentials()
  })

  return knex
}

export default getKnex
