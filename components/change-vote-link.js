import Link from 'next/link'
import useLinks from '../hooks/use-links'

export default function ChangeVoteLink (props) {
  const links = useLinks()
  const rateNameLink = links.currentParent.rateName(props.name)

  return (
    <Link href={rateNameLink.href} as={rateNameLink.as}>
      <a className='text-indigo-600 hover:text-indigo-900'>Change Your Vote</a>
    </Link>
  )
}
