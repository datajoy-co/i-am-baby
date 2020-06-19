import React from 'react'
import * as database from '../../../library/database'
import { capitalize, parseDateString } from '../../../library/helpers'
import TimeAgo from '../../../configured-libraries/react-time-ago'
import NameTable from '../../../components/name-table'
import ChangeVoteLink from '../../../components/change-vote-link'

function VoteEmoji ({ liked }) {
  let emoji
  if (liked) {
    emoji = '✅'
  } else {
    emoji = '🙊'
  }

  return <span className='text-xl'>{emoji}</span>
}

export async function getServerSideProps (context) {
  const { userName } = context.params
  const mutualVotes = await database.getVotes(userName)

  return {
    props: {
      userName,
      mutualVotes
    }
  }
}

function getNameTableRow (vote) {
  const createdAt = parseDateString(vote.createdAt)

  return [
    capitalize(vote.name),
    <VoteEmoji liked={vote.liked} />,
    <TimeAgo date={createdAt} />,
    <ChangeVoteLink name={vote.name} />
  ]
}

export default function (props) {
  const columns = ['name', 'Your Vote', 'You Voted At', '']
  const rows = props.mutualVotes.map(getNameTableRow)

  return (
    <>
      <NameTable columns={columns} rows={rows} />
    </>
  )
}
