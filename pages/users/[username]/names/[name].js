import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../../components/layout'
import PopularityChart from '../../../../components/popularity-chart'
import StatsBlock from '../../../../components/stats-block'
import ProgressBar from '../../../../components/progress-bar'
import ActionButton from '../../../../components/action-button'
import * as database from '../../../../library/database'
import * as statistics from '../../../../library/statistics'
import getLinks from '../../../../library/get-links'
import { updateRoute, capitalize, percent } from '../../../../library/helpers'

export async function getServerSideProps (context) {
  const { username, name } = context.params
  const progress = await database.getProgress(username)
  const statsForName = await statistics.forName(name)
  const links = await getLinks(username, name)

  return {
    props: {
      links,
      statistics: statsForName,
      progress,
      username
    }
  }
}

function Statistics (props) {
  return (
    <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
      <StatsBlock title='Spelling & Pronunciation' value='Easy' />
      <StatsBlock
        title='Babies Assigned Male At Birth'
        value={percent(props.amabFraction)}
      />
      <StatsBlock
        title='Chance Of Classmate With Same Name'
        value={percent(props.chanceOfClassmateWithSameName)}
      />
    </div>
  )
}

function Chart (props) {
  return (
    <div className='bg-white overflow-hidden shadow rounded-lg mt-5'>
      <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Popularity
        </h3>
      </div>
      <div className='px-4 py-5 sm:p-6'>
        <PopularityChart records={props.records} />
      </div>
    </div>
  )
}

function ActionButtons (props) {
  async function submitAndGoToNextName (liked) {
    await props.voting.vote(props.name, liked)
    props.notify({
      title: 'Saved!',
      message: 'Use the back button to change your vote.'
    })
    props.goToNextName()
  }

  return (
    <div className='mt-5 flex justify-end'>
      <ActionButton
        className='bg-white py-3 px-6 border border-gray-300 rounded-md text-base leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out'
        onClick={() => submitAndGoToNextName(false)}
      >
        Don't Like
      </ActionButton>
      <ActionButton
        className='bg-indigo-600 inline-flex justify-center py-3 px-6 border border-transparent text-base leading-5 font-medium rounded-md text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
        onClick={() => submitAndGoToNextName(true)}
      >
        Like
      </ActionButton>
    </div>
  )
}

export default function (props) {
  const router = useRouter()
  const { name } = router.query
  useEffect(() => {
    // Prefetch the page for the next name.
    router.prefetch(props.links.rateNextName.href, props.links.rateNextName.as)
  }, [])

  function goToNextName () {
    router.push(props.links.rateNextName.href, props.links.rateNextName.as)
  }

  return (
    <Layout voting={props.voting} links={props.links}>
      <header>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <ProgressBar title='Names Rated' progress={props.progress} />
          <h1 className='text-3xl font-bold leading-tight text-gray-900'>
            {capitalize(name)}
          </h1>
        </div>
      </header>
      <main>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <Statistics {...props.statistics} />
          <Chart {...props.statistics} />
          <ActionButtons
            voting={props.voting}
            name={name}
            username={props.username}
            goToNextName={goToNextName}
            notify={props.notify}
          />
        </div>
      </main>
    </Layout>
  )
}
