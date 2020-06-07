import knex from '../configured-libraries/knex'
import { capitalize } from '../library/helpers'

export async function createVote (username, name, liked) {
  const vote = {
    username: username,
    name: capitalize(name),
    liked: liked
  }

  return knex('votes').insert(vote)
}

export async function deleteVotes (username, name) {
  return knex('votes')
    .where('username', username)
    .andWhere('name', name)
    .delete()
}

export async function getVotesForUser (username) {
  return knex('votes')
    .where({
      username
    })
    .select('*')
}

export async function countNamesToVoteOn () {
  const nameCount = await knex('SSA').count('*')
  return nameCount[0]['count(*)']
}

export async function countVotes (username) {
  const voteCount = await knex('votes')
    .where('username', username)
    .count('*')
  return voteCount[0]['count(*)']
}

export async function getNextName (username, currentName = '') {
  const capitalizedCurrentName = capitalize(currentName)
  const query = `
    select distinct SSA.name
    from babbynamschema.SSA
      where SSA.name not in (
        select distinct votes.name
          from babbynamschema.votes
          where username = '${username}'
      )
      and SSA.name <> '${capitalizedCurrentName}'
    limit 1;
  `

  const result = await knex.raw(query)
  return result[0][0].name.toLowerCase()
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

export async function getAllNames () {
  return knex('SSA').distinct('name')
}

export async function getProgress (username) {
  const nameCount = await countNamesToVoteOn()
  const voteCount = await countVotes(username)
  return (voteCount * 1000) / nameCount
}

export async function getNamesBothParentsLike (username) {
  const query = `
    select
      distinct kristinVotes.name,
      kristinVotes.createdAt as kristinVotedAt,
      paulVotes.createdAt as paulVotedAt
    from
      babbynamschema.votes kristinVotes,
        babbynamschema.votes paulVotes
    where
      kristinVotes.username = 'kristin'
        and paulVotes.username = 'paul'
        and kristinVotes.name = paulVotes.name
    order by ${username}Votes.createdAt desc;
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
