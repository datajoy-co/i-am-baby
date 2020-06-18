import * as simpleStatistics from 'simple-statistics'
import * as scrabble from '@scrabblescore/scrabblescore'
import * as database from './database.js'

const getRecordWithHighestTotal = records => {
  let highestTotal = records[0].total
  let recordWithHighestTotal = records[0]

  for (const record of records) {
    if (record.total > highestTotal) {
      highestTotal = record.total
      recordWithHighestTotal = record
    }
  }

  return recordWithHighestTotal
}

export function getUpwardTrend (recentRecords) {
  const points = recentRecords.map(record => [record.year, record.afabCount])
  const regressionLine = simpleStatistics.linearRegression(points)
  return regressionLine.m
}

function isTrendingUpwards (records) {
  // const recentRecords = records
  const recentRecords = records.filter(record => record.year > 2010)
  const points = recentRecords.map(record => [record.year, record.afabCount])
  const regressionLine = simpleStatistics.linearRegression(points)
  return regressionLine.m > 0
}

export function getClassmateChance (records) {
  const recentRecords = records.filter(record => record.year > 2010)
  const points = recentRecords.map(record => [
    record.year,
    record.fractionOfPopulation
  ])
  const regressionLine = simpleStatistics.linearRegression(points)
  const predictedRatioOfPeersWithName =
    regressionLine.m * 2020 + regressionLine.b

  // The average classroom size is about 20 students: https://nces.ed.gov/surveys/sass/tables/sass1112_2013314_t1s_007.asp
  const classmateChanceEachYear = predictedRatioOfPeersWithName * 20
  // Assuming 13 years of schooling and completely different classmates each year.
  const classmateChanceThroughoutSchool = classmateChanceEachYear * 13
  return classmateChanceThroughoutSchool
}

export async function forName (name) {
  const records = await database.getSsaRecords(name)

  return {
    amabFraction: await database.getAmabFraction(name),
    records: records,
    mostPopularIn: getRecordWithHighestTotal(records),
    isTrendingUpwards: isTrendingUpwards(records),
    mightIndicateLowSes: (await scrabble.score(name)) > 20,
    chanceOfClassmateWithSameName: getClassmateChance(records)
  }
}
