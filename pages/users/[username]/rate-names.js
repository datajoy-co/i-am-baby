import getLinks from '../../../library/get-links'
import { useRouter } from 'next/router'
import * as database from '../../../library/database'

export async function getServerSideProps ({ res, params }) {
  const { userName } = params
  const nextName = await database.getNextName(userName)

  const links = getLinks(userName)
  const nextNameLink = links.rateName(nextName)

  // Server-side redirects aren't working for some reason.
  // We'll work on this more in the future.
  //
  // if (res) {
  //   res.writeHead(301, {
  //     Location: nextNameLink.as
  //   })

  //   res.end()
  // }

  return {
    props: {
      nextNameLink
    }
  }
}

export default function rateNames (props) {
  const isClient = typeof window !== 'undefined'
  const router = useRouter()
  if (isClient) {
    router.replace(props.nextNameLink.href, props.nextNameLink.as)
  }

  return null
}
