import '../styles/index.css'
import Head from 'next/head'
import Layout from '../components/layout.js'
import useNotifications from '../hooks/use-notifications.js'
import useVoting from '../hooks/use-voting.js'

export default function App ({ Component, pageProps }) {
  const [NotificationContainer, notify] = useNotifications()
  const voting = useVoting()

  return (
    <div className='min-h-screen bg-gray-100'>
      <Head>
        <title>I Am Baby</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout voting={voting}>
        <Component {...pageProps} voting={voting} notify={notify} />
      </Layout>
      <NotificationContainer />
    </div>
  )
}
