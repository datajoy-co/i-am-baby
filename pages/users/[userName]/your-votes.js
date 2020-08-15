import React from "react"
import * as database from "../../../library/database"
import { capitalize, parseDateString } from "../../../library/helpers"
import TimeAgo from "../../../configured-libraries/react-time-ago"
import NameTable from "../../../components/name-table"
import ChangeVoteLink from "../../../components/change-vote-link"
import DeleteVotesCard from "../../../components/delete-votes-card"

import NoVotesCard from "../../../components/no-votes-card"

function VoteEmoji({ liked }) {
  let emoji
  if (liked) {
    emoji = "✅"
  } else {
    emoji = "🙊"
  }

  return <span className="text-xl">{emoji}</span>
}

export async function getServerSideProps(context) {
  const { userName } = context.params
  const mutualVotes = await database.getVotes(userName)

  return {
    props: {
      userName,
      mutualVotes,
    },
  }
}

function getNameTableRow(vote) {
  const createdAt = parseDateString(vote.createdAt)

  return [
    capitalize(vote.name),
    <VoteEmoji liked={vote.liked} />,
    <TimeAgo date={createdAt} />,
    <ChangeVoteLink name={vote.name} />,
  ]
}

export default function (props) {
  const { voting, userName, mutualVotes } = props

  const columns = ["name", "Your Vote", "You Voted At", ""]
  const rows = mutualVotes.map(getNameTableRow)

  return (
    <>
      {mutualVotes.length > 0 ? (
        <>
          <NameTable columns={columns} rows={rows} />
          <DeleteVotesCard voting={voting}></DeleteVotesCard>
        </>
      ) : (
        <NoVotesCard userName={userName}></NoVotesCard>
      )}
    </>
  )
}
