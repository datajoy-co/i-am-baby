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

function Row (props) {
  return <div>{props.name}</div>
}

export default function (props) {
  const rows = props.names.map(name => <Row key={name} name={name} />)
  return (
    <Layout voting={props.voting} links={props.links}>
      {rows}
    </Layout>
  )
}
