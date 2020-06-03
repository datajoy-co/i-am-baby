const votes = []

async function createVote (request, response) {
  const userName = request.query.userName
  const vote = {
    userName: request.query.userName,
    name: request.body.name,
    isLiked: request.body.isLiked
  }

  votes.push(vote)
  console.log(votes)

  response.statusCode = 201
  response.end()
}

async function getVotesForUser (request, response) {
  const userName = request.query.userName
  const votesForUser = votes.filter(vote => vote.name === userName)
  console.log(votes)

  response.statusCode = 200
  response.json(votesForUser)
}

export default async function (request, response) {
  console.log('hit the route')
  if (request.method === 'POST') {
    return createVote(request, response)
  } else if (request.method === 'GET') {
    return getVotesForUser(request, response)
  }

  response.statusCode = 404
  response.end()
}
