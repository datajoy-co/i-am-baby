import '../styles/index.css'
import Nav from '../components/nav'

export default function App ({ Component, pageProps }) {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Nav />
      <div className='py-10'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
