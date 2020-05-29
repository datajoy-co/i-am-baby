import * as yearStatistics from '../../../library/year-statistics'

export default async function (request, response) {
  const name = request.query.name.toLowerCase()

  const statistics = await yearStatistics.forName(name)
  response.end(JSON.stringify(statistics))
}
