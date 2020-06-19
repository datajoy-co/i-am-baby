import { capitalize } from '../library/helpers.js'
import knex from '../configured-libraries/knex.js'

export async function createVote (userName, name, liked) {
  const vote = {
    userName: userName,
    name: capitalize(name),
    liked: liked
  }

  return knex('votes').insert(vote)
}

export async function deleteVotes (userName, name) {
  return knex('votes')
    .where('userName', userName)
    .andWhere('name', name)
    .delete()
}

export async function getVotesForUser (userName) {
  return knex('votes')
    .where({
      userName
    })
    .select('*')
}

export async function countNamesToVoteOn () {
  const nameCount = await knex('nameOptions').count('*')
  return nameCount[0]['count(*)']
}

export async function countVotes (userName) {
  const voteCount = await knex('votes')
    .where('userName', userName)
    .count('*')
  return voteCount[0]['count(*)']
}

export async function getNextName (userName, currentName = '') {
  const capitalizedCurrentName = capitalize(currentName)
  const query = `
    select distinct nameOptions.name
    from babbynamschema.nameOptions
      where nameOptions.name not in (
        select distinct votes.name
          from babbynamschema.votes
          where userName = '${userName}'
      )
      and nameOptions.name <> '${capitalizedCurrentName}'
    limit 1;
  `

  const result = await knex.raw(query)
  const row = result[0][0]

  if (row) {
    return row.name.toLowerCase()
  }

  return null
}

export async function getAmabFraction (name) {
  const capitalized = capitalize(name)
  const query = `
    select
      sum(SSA.males) / (sum(SSA.males) + sum(SSA.females)) as amabFraction
    from babbynamschema.SSA
    where name = "${capitalized}";
  `
  const result = await knex.raw(query)
  return result[0][0].amabFraction
}

export async function getSsaRecords (name) {
  const capitalized = capitalize(name)
  const query = `
    select 
      SSA.year, 
      SSA.name, 
      SSA.females, 
      SSA.males,
      SSA.females + SSA.males  as totalPersons,
      cast((SSA.females + SSA.males) / yearTotals.totalPersons as decimal(12, 12)) as fractionOfPopulation
    from babbynamschema.SSA
    left outer join yearTotals on SSA.year = yearTotals.year 
    where name = "${capitalized}";
  `

  const result = await knex.raw(query)
  let records = result[0]

  records = records.map(record => {
    return {
      afabCount: record.females,
      amabCount: record.males,
      total: record.totalPersons,
      fractionOfPopulation: record.fractionOfPopulation,
      year: record.year
    }
  })

  return records
}

export async function getRecentSsaRecords (name) {
  const capitalized = capitalize(name)
  const query = `
    select 
      SSA.year, 
      SSA.name, 
      SSA.females, 
      SSA.males,
      SSA.females + SSA.males  as totalPersons,
      cast((SSA.females + SSA.males) / yearTotals.totalPersons as decimal(12, 12)) as fractionOfPopulation
    from babbynamschema.SSA
    left outer join yearTotals on SSA.year = yearTotals.year 
    where name = "${capitalized}"
      and SSA.year >= 2010;
  `

  const result = await knex.raw(query)
  let records = result[0]

  records = records.map(record => {
    return {
      afabCount: record.females,
      amabCount: record.males,
      total: record.totalPersons,
      fractionOfPopulation: record.fractionOfPopulation,
      year: record.year
    }
  })

  return records
}

export async function getProgress (userName) {
  const nameCount = await countNamesToVoteOn()
  const voteCount = await countVotes(userName)
  return voteCount / nameCount
}

export async function getNamesBothParentsLike (userName) {
  const query = `
    select
      distinct kristinVotes.name,
      kristinVotes.createdAt as kristinVotedAt,
      paulVotes.createdAt as paulVotedAt
    from
      babbynamschema.votes kristinVotes,
        babbynamschema.votes paulVotes
    where
      kristinVotes.userName = 'kristin'
        and paulVotes.userName = 'paul'
        and kristinVotes.name = paulVotes.name
    order by ${userName}Votes.createdAt desc;
  `

  const result = await knex.raw(query)
  const records = result[0]
  const mutualVotes = records.map(record => {
    return {
      name: record.name.toLowerCase(),
      kristinVotedAt: record.kristinVotedAt.toISOString(),
      paulVotedAt: record.paulVotedAt.toISOString()
    }
  })

  return mutualVotes
}

export function getNameStream () {
  return knex('SSA').distinct('name')
}
