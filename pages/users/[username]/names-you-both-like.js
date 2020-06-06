import React from 'react'
import Layout from '../../../components/layout'
import getLinks from '../../../library/get-links'
import * as database from '../../../library/database'

export async function getServerSideProps (context) {
  const { username } = context.params
  const links = await getLinks(username)
  const names = await database.getNamesBothParentsLike()

  return {
    props: {
      links,
      names
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
    <Cell index={index} last={index === props.cells.length - 1}>
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
    <TableHeading>{column}</TableHeading>
  ))
  const rows = props.rows.map((row, index) => <Row index={index} cells={row} />)

  return (
    <div className='flex flex-col'>
      <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
        <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
          <table className='min-w-full'>
            <thead>
              <tr>
                {headings}
                <th className='px-6 py-3 border-b border-gray-200 bg-gray-50'></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function (props) {
  const columns = ['name', 'title', 'email', 'role', '']
  const rows = [
    [
      'Bernard Lane',
      'Director, Human Resources',
      'bernardlane@example.com',
      'Owner',
      <a href='#' className='text-indigo-600 hover:text-indigo-900'>
        Edit
      </a>
    ]
  ]
  return (
    <Layout voting={props.voting} links={props.links}>
      <Table columns={columns} rows={rows} />
    </Layout>
  )
}
