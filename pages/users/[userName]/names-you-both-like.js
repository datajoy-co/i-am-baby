import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/layout.js'
import * as database from '../../../library/database.js'
import useLinks from '../../../hooks/use-links.js'
import { capitalize } from '../../../library/helpers.js'
import TimeAgo from '../../../configured-libraries/react-time-ago.js'

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
})

function parseDateString (dateString) {
  const int = Date.parse(dateString)
  const date = new Date()
  date.setTime(int)
  // Convert to eastern time.
  date.setHours(date.getHours() - 4)
  return date
}

function formatDateString (dateTimeString) {
  const parsed = Date.parse(dateTimeString)
  return dateFormatter.format(parsed)
}

export async function getServerSideProps (context) {
  const { userName } = context.params
  const mutualVotes = await database.getNamesBothParentsLike(userName)

  return {
    props: {
      userName,
      mutualVotes
    }
  }
}

function Cell (props) {
  if (props.index === 0) {
    return (
      <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900'>
        {props.children}
      </td>
    )
  }

  if (props.last) {
    return (
      <td className='px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium'>
        {props.children}
      </td>
    )
  }

  return (
    <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500'>
      {props.children}
    </td>
  )
}

function Row (props) {
  const even = props.index % 2 === 0
  const trColor = even ? 'bg-white' : 'bg-gray-50'
  const cells = props.cells.map((cell, index) => (
    <Cell key={index} last={index === props.cells.length - 1}>
      {cell}
    </Cell>
  ))

  return <tr className={trColor}>{cells}</tr>
}

function TableHeading (props) {
  return (
    <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
      {props.children}
    </th>
  )
}

function Table (props) {
  const headings = props.columns.map(column => (
    <TableHeading key={column}>{column}</TableHeading>
  ))
  const rows = props.rows.map((row, index) => (
    <Row key={row[0]} index={index} cells={row} />
  ))

  return (
    <div className='flex flex-col'>
      <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 flex justify-center'>
        <div className='align-middle inline-block min-w-0 shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
          <table className='min-w-full'>
            <thead>
              <tr>{headings}</tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ChangeVoteLink (props) {
  const links = useLinks()
  const rateNameLink = links.currentParent.rateName(props.name)

  return (
    <Link href={rateNameLink.href} as={rateNameLink.as}>
      <a className='text-indigo-600 hover:text-indigo-900'>Change Your Vote</a>
    </Link>
  )
}

export default function (props) {
  const columns = ['name', 'Kristin Voted At', 'Paul Voted At', '']
  if (props.userName === 'kristin') {
    columns[1] = 'You Voted At'
  } else {
    columns[2] = 'You Voted At'
  }

  const rows = props.mutualVotes.map(vote => {
    const kristinVotedAt = parseDateString(vote.kristinVotedAt)
    const paulVotedAt = parseDateString(vote.paulVotedAt)

    return [
      capitalize(vote.name),
      <TimeAgo date={kristinVotedAt} />,
      <TimeAgo date={paulVotedAt} />,
      <ChangeVoteLink name={vote.name} />
    ]
  })

  return (
    <>
      <Table columns={columns} rows={rows} />
    </>
  )
}
