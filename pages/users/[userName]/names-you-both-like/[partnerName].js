import React from "react"
import * as database from "../../../../library/database"
import { capitalize, parseDateString } from "../../../../library/helpers"
import TimeAgo from "../../../../configured-libraries/react-time-ago"
import NameTable from "../../../../components/name-table"
import ChangeVoteLink from "../../../../components/change-vote-link"

export async function getServerSideProps(context) {
  console.log("getting server side props")
  const { userName, partnerName } = context.params

  const mutualVotes = await database.getNamesBothParentsLike(
    userName,
    partnerName
  )

  return {
    props: {
      userName,
      partnerName,
      mutualVotes,
    },
  }
}

function getNameTableRow(vote) {
  const userAVotedAt = parseDateString(vote.userAVotedAt)
  const userBVotedAt = parseDateString(vote.userBVotedAt)

  return [
    capitalize(vote.name),
    <TimeAgo date={userAVotedAt} />,
    <TimeAgo date={userBVotedAt} />,
    <ChangeVoteLink name={vote.name} />,
  ]
}

export default function (props) {
  const columns = [
    "name",
    `${props.userName} Voted At`,
    `${props.partnerName} Voted At`,
    "",
  ]

  const rows = props.mutualVotes.map(getNameTableRow)

  return (
    <>
      <NameTable columns={columns} rows={rows} />
    </>
  )
}
