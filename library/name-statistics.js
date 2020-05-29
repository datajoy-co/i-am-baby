import yearStatisticsByName from '../data/shrunkNormalizedYearStatisticsByName.json'
import { capitalize } from './helpers'
import * as simpleStatistics from 'simple-statistics'
import * as scrabble from '@scrabblescore/scrabblescore'

const getYearWithHighestTotal = years => {
  let highestTotal = years[0].total
  let yearWithHighestTotal = years[0]

  for (const year of years) {
    if (year.total > highestTotal) {
      highestTotal = year.total
      yearWithHighestTotal = year
    }
  }

  return yearWithHighestTotal
}

function isTrendingUpwards (years) {
  const recentYears = years.filter(year => year.year > 2010)
  const points = recentYears.map(year => [year.year, year.total])
  const regressionLine = simpleStatistics.linearRegression(points)
  return regressionLine.m > 0
}

function getClassmateChance (years) {
  const recentYears = years.filter(year => year.year > 2010)
  const points = recentYears.map(year => [year.year, year.percent / 100])
  const regressionLine = simpleStatistics.linearRegression(points)
  const predictedRatioOfPeersWithName =
    regressionLine.m * 2020 + regressionLine.b
  // The average classroom size is about 20 students: https://nces.ed.gov/surveys/sass/tables/sass1112_2013314_t1s_007.asp
  const classmateChanceEachYear = predictedRatioOfPeersWithName * 20
  // Assuming 13 years of schooling and completely different classmates each year.
  const classmateChanceThroughoutSchool = classmateChanceEachYear * 13
  return classmateChanceThroughoutSchool
}

async function getStatistics (name, years) {
  const statisticsByYear = {}

  let countAllAfabs = 0
  let countAllAmabs = 0

  for (const year of years) {
    const defaultStats = {
      afabCount: 0,
      amabCount: 0,
      total: 0
    }

    const point = statisticsByYear[year.year] || defaultStats

    if (year.sex === 'F') {
      point.afabCount = year.count
      countAllAfabs += point.afabCount
      point.total += point.afabCount
    } else {
      point.amabCount = year.count
      countAllAmabs += point.amabCount
      point.total += point.amabCount
    }

    point.year = year.year
    statisticsByYear[year.year] = point
  }

  const yearStatistics = Object.values(statisticsByYear)
  const mostPopularIn = getYearWithHighestTotal(yearStatistics)

  return {
    maleness: countAllAmabs / countAllAfabs,
    years: yearStatistics,
    mostPopularIn,
    isTrendingUpwards: isTrendingUpwards(yearStatistics),
    mightIndicateLowSes: (await scrabble.score(name)) > 20,
    chanceOfClassmateWithSameName: getClassmateChance(years)
  }
}

export async function forName (name) {
  const capitalized = capitalize(name)
  const years = yearStatisticsByName[capitalized]
  const statistics = await getStatistics(name, years)

  return statistics
}

const names = Object.keys(yearStatisticsByName).map(name => name.toLowerCase())

export function getAllNames () {
  return names
}
