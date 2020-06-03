import React from 'react'
import { useRouter } from 'next/router'
import PopularityChart from '../../components/popularity-chart'
import Name from '../../components/name'
import * as nameStatistics from '../../library/name-statistics'

function nameToPath (name) {
  return {
    params: {
      name
    }
  }
}

export async function getStaticPaths () {
  const paths = nameStatistics.getAllNames().map(nameToPath)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps (context) {
  const { name } = context.params
  const statistics = await nameStatistics.forName(name)

  return {
    props: {
      statistics
    }
  }
}

function percent (normalized) {
  let number = normalized * 100
  number = number.toFixed(2)
  return number + '%'
}

function StatsBlock (props) {
  return (
    <div className='bg-white overflow-hidden shadow rounded-lg'>
      <div className='px-4 py-5 sm:p-6'>
        <dl>
          <dt className='text-sm leading-5 font-medium text-gray-500 truncate'>
            {props.title}
          </dt>
          <dd className='mt-1 text-3xl leading-9 font-semibold text-gray-900'>
            {props.value}
          </dd>
        </dl>
      </div>
    </div>
  )
}

function Statistics (props) {
  return (
    <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
      <StatsBlock title='Spelling & Pronunciation' value='Easy' />
      <StatsBlock title='Masculinity' value={percent(props.maleness)} />
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
        <PopularityChart years={props.years} />
      </div>
    </div>
  )
}

function RatingProgressBar () {
  return (
    <div className='relative pt-1'>
      <div className='flex mb-2 items-center justify-between'>
        <div>
          <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200'>
            Names Rated
          </span>
        </div>
        <div className='text-right'>
          <span className='text-xs font-semibold inline-block text-pink-600'>
            30%
          </span>
        </div>
      </div>
      <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200'>
        <div
          style={{ width: '30%' }}
          className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500'
        ></div>
      </div>
    </div>
  )
}

function LikeButton (props) {
  const isLiked = true
  const handleClick = () => props.voting.vote(props.name, isLiked)

  return (
    <span className='ml-3 inline-flex rounded-md shadow-sm'>
      <button
        type='submit'
        className='inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
        onClick={handleClick}
      >
        Like
      </button>
    </span>
  )
}

function DontLikeButton (props) {
  const isLiked = false
  const handleClick = () => props.voting.vote(props.name, isLiked)

  return (
    <span className='inline-flex rounded-md shadow-sm'>
      <button
        type='button'
        className='bg-white py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out'
        onClick={handleClick}
      >
        Don't Like
      </button>
    </span>
  )
}

function ActionButtons (props) {
  return (
    <div className='mt-5 flex justify-end'>
      <DontLikeButton voting={props.voting} name={props.name} />
      <LikeButton voting={props.voting} name={props.name} />
    </div>
  )
}

export default function (props) {
  const router = useRouter()
  const { name } = router.query

  return (
    <>
      <header>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <RatingProgressBar />
          <h1 className='text-3xl font-bold leading-tight text-gray-900'>
            <Name>{name}</Name>
          </h1>
        </div>
      </header>
      <main>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <Statistics {...props.statistics} />
          <Chart {...props.statistics} />
          <ActionButtons voting={props.voting} name={name} />
        </div>
      </main>
    </>
  )
}
