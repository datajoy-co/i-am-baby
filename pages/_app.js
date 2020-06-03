import '../styles/index.css'
import Nav from '../components/nav'
import useVoting from '../hooks/useVoting'

export default function App ({ Component, pageProps }) {
  const voting = useVoting()
  return (
    <div className='min-h-screen bg-gray-100'>
      <Nav voting={voting} />
      <div className='py-10'>
        <Component {...pageProps} voting={voting} />
      </div>
    </div>
  )
}
