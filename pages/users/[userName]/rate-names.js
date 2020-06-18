import { useRouter } from 'next/router'
import getLinks from '../../../library/get-links.js'
import * as database from '../../../library/database.js'

export async function getServerSideProps ({ res, params }) {
  const { userName } = params
  const nextName = await database.getNextName(userName)

  const links = getLinks(userName)
  const redirectLink = links.rateName(nextName)

  // Server-side redirects aren't working for some reason.
  // We'll work on this more in the future.
  //
  // if (res) {
  //   res.writeHead(301, {
  //     Location: redirectLink.as
  //   })

  //   res.end()
  // }

  return {
    props: {
      redirectLink
    }
  }
}

export default function rateNames (props) {
  const isClient = typeof window !== 'undefined'
  const router = useRouter()
  if (isClient) {
    router.replace(props.redirectLink.href, props.redirectLink.as)
  }

  return null
}
