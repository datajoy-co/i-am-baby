import * as database from "../../../../library/database"
import { capitalize } from "../../../../library/helpers"

async function createVote(request, response) {
  const userName = request.query.userName
  const name = request.body.name
  const liked = request.body.liked

  await database.deleteVotes(userName, name)
  await database.createVote(userName, name, liked)

  response.statusCode = 201
  response.end()
}

async function getVotesForUser(request, response) {
  const userName = request.query.userName
  const votesForUser = await database.getVotesForUser(userName)
  response.statusCode = 200
  response.json(votesForUser)
}

async function deleteAllVotesForUser(request, response) {
  const userName = request.query.userName
  await database.deleteAllVotesForUser(userName)
  response.statusCode = 200
  response.end()
}

export default async function (request, response) {
  console.log(request)
  if (request.method === "POST") {
    return createVote(request, response)
  } else if (request.method === "GET") {
    return getVotesForUser(request, response)
  } else if (request.method === "DELETE") {
    return deleteAllVotesForUser(request, response)
  }

  response.statusCode = 404
  response.end()
}
