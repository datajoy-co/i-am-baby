import LogInCard from '../components/log-in-card'
import getLinks from '../library/get-links'

export default function Home () {
  const kristinLinks = getLinks('kristin')
  const paulLinks = getLinks('paul')

  const kristinRateNextName = kristinLinks.rateNextName()
  const paulRateNextName = paulLinks.rateNextName()

  return (
    <div className='fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center'>
      <LogInCard
        userName='kristin'
        href={kristinRateNextName.href}
        as={kristinRateNextName.as}
      />
      <LogInCard
        userName='paul'
        href={paulRateNextName.href}
        as={paulRateNextName.as}
      />
    </div>
  )
}
