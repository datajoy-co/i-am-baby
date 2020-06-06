import '../styles/index.css'
import useNotifications from '../hooks/useNotifications'
import useVoting from '../hooks/useVoting'

export default function App ({ Component, pageProps }) {
  const [NotificationContainer, notify] = useNotifications()
  const voting = useVoting()

  return (
    <div className='min-h-screen bg-gray-100'>
      <Component {...pageProps} voting={voting} notify={notify} />
      <NotificationContainer />
    </div>
  )
}
