import { useState } from '#imports'

export const notify = {
  success: (title, data = {}) => {
    useToast().add({
      title: title,
      color: 'green',
      icon: 'i-line-md-confirm-circle',
      ...data,
    })
  },
  info: (title, data = {}) => {
    useToast().add({
      title: title,
      color: 'gray',
      icon: 'i-line-md-bell',
      ...data,
    })
  },
  warn: (msg, data = {}) => {
    useToast().add({
      title: 'Ошибка',
      description: msg,
      color: 'yellow',
      icon: 'i-line-md-alert',
      ...data,
    })
  },
  alert: (msg, data = {}) => {
    useToast().add({
      title: 'Ошибка',
      description: msg,
      color: 'red',
      icon: 'i-line-md-cancel',
      ...data,
    })
  },
  clear: () => {
    const notifications = useState('notifications', () => [])
    notifications.value = []
  },
}
