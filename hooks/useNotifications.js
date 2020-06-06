import React, { useState } from 'react'
import Notification from '../components/notification'

let id = 0

export default function useNotifications () {
  const [notifications, setNotifications] = useState([])
  function notify ({ title, message }) {
    const newNotification = {
      id,
      title,
      message
    }
    setNotifications([...notifications, newNotification])
    id++
  }

  function hideNotification (id) {
    const newNotifications = notifications.filter(
      notification => notification.id !== id
    )
    setNotifications(newNotifications)
  }

  const notificationComponents = notifications.map(notification => (
    <Notification
      key={notification.id}
      hide={hideNotification}
      {...notification}
    />
  ))

  function Container () {
    return (
      <div className='fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end'>
        {notificationComponents}
      </div>
    )
  }

  return [Container, notify]
}
