import 'dotenv/config.js'
import * as database from '../library/database.js'
import * as stats from '../library/statistics.js'

async function processName (name) {
  const records = await database.getRecentSsaRecords(name)
  if (records.length === 0) return

  const slope = await stats.getUpwardTrend(records)
  if (slope < 5) return

  const classmateChance = await stats.getClassmateChance(records)
  const percent = classmateChance * 100
  if (percent < 1) return
  if (percent > 10) return

  console.log(name)
}

async function main () {
  const query = await database.getNameStream()
  const rows = await query

  for (const row of rows) {
    const promise = processName(row.name)
    await promise
  }

  // const rowStream = query.stream()
  // for await (const row of rowStream) {
  //   await processName(row.name)
  // }
  process.exit()
}

main()
