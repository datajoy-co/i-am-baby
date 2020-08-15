import { capitalize } from "../library/helpers"
import knex from "../configured-libraries/knex"

export async function createVote(userName, name, liked) {
  const vote = {
    userName: userName,
    name: capitalize(name),
    liked: liked,
  }

  return knex("votes").insert(vote)
}

export async function deleteVotes(userName, name) {
  return knex("votes")
    .where("userName", userName)
    .andWhere("name", name)
    .delete()
}

export async function deleteAllVotesForUser(userName) {
  return knex("votes").where("userName", userName).delete()
}

export async function getVotesForUser(userName) {
  return knex("votes")
    .where({
      userName,
    })
    .select("*")
}

export async function getVoters() {
  const result = await knex("votes").distinct("userName")

  return result.map((row) => {
    return row.userName
  })
}

export async function countNamesToVoteOn() {
  const nameCount = await knex("nameOptions").count("*")
  return nameCount[0]["count(*)"]
}

export async function countVotes(userName) {
  const voteCount = await knex("votes").where("userName", userName).count("*")
  return voteCount[0]["count(*)"]
}

export async function getNextName(userName, currentName = "") {
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

export async function getAmabFraction(name) {
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

export async function getSsaRecords(name) {
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

  records = records.map((record) => {
    return {
      afabCount: record.females,
      amabCount: record.males,
      total: record.totalPersons,
      fractionOfPopulation: record.fractionOfPopulation,
      year: record.year,
    }
  })

  return records
}

export async function getRecentSsaRecords(name) {
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

  records = records.map((record) => {
    return {
      afabCount: record.females,
      amabCount: record.males,
      total: record.totalPersons,
      fractionOfPopulation: record.fractionOfPopulation,
      year: record.year,
    }
  })

  return records
}

export async function getProgress(userName) {
  const nameCount = await countNamesToVoteOn()
  const voteCount = await countVotes(userName)
  return voteCount / nameCount
}

export async function getNamesBothParentsLike(userNameA, userNameB) {
  const query = `
    select
      ${userNameA}Votes.name,
      ${userNameA}Votes.createdAt as ${userNameA}VotedAt,
      ${userNameB}Votes.createdAt as ${userNameB}VotedAt
    from
      babbynamschema.votes ${userNameA}Votes,
        babbynamschema.votes ${userNameB}Votes
    where
      ${userNameA}Votes.userName = '${userNameA}'
        and ${userNameB}Votes.userName = '${userNameB}'
        and ${userNameA}Votes.name = ${userNameB}Votes.name
        and ${userNameA}Votes.liked = 1
        and ${userNameB}Votes.liked = 1
    order by ${userNameA}Votes.createdAt desc;
  `

  const result = await knex.raw(query)
  const records = result[0]
  const mutualVotes = records.map((record) => {
    return {
      name: record.name.toLowerCase(),
      userAVotedAt: record[`${userNameA}VotedAt`].toISOString(),
      userBVotedAt: record[`${userNameB}VotedAt`].toISOString(),
    }
  })

  return mutualVotes
}

export async function getVotes(userName) {
  const query = `
    select *
    from babbynamschema.votes
    where votes.userName = '${userName}'
    order by votes.createdAt desc;
  `

  const result = await knex.raw(query)
  const records = result[0]
  const votes = records.map((record) => {
    return {
      ...record,
      createdAt: record.createdAt.toISOString(),
      name: record.name.toLowerCase(),
    }
  })

  return votes
}

export function getNameStream() {
  return knex("SSA").distinct("name")
}
