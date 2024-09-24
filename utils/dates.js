import dayjs from 'dayjs'

import 'dayjs/locale/ru'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.locale('ru')

export const formatDate = (date, format = 'L LTS') => {
  return dayjs(date).format(format)
}

export const humanizeDate = (date) => {
  return dayjs(date).fromNow()
}

export const countdownFrom = (date, withSuffix = false) => {
  const diff = dayjs(date).diff(dayjs(), 'second')
  return dayjs.duration(diff, 'seconds').humanize(withSuffix)
}
export const countdownEnd = (seconds) => {
  return dayjs().add(seconds, 'seconds').format('L LT')
}

export const countdown = (seconds, withSuffix = false) => {
  return dayjs.duration(seconds, 'seconds').humanize(withSuffix)
}

export function accurateCountdown(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return 'NaN'
  }
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds % 3600) / 60)
  let remainingSeconds = Math.floor(seconds % 60)
  let result = ''

  if (hours > 0) {
    result += hours + 'ч '
  }
  if (minutes > 0 || hours > 0) {
    result += minutes + 'м '
  }
  result += remainingSeconds + 'с'
  return result
}

export const formatInputDateTime = (date) => {
  if (!date) {
    return
  }
  return dayjs(date).format('YYYY-MM-DDTHH:mm')
}
export const formatInputDate = (date) => {
  if (!date) {
    return
  }
  return dayjs(date).format('YYYY-MM-DD')
}

export const isOnline = (user) => {
  return dayjs(user.last_activity_at).isAfter(dayjs().subtract(5, 'minutes'))
}

export const secondToTime = (number) => {
  const pad = (n) => String(n || 0).padStart(2, '0')

  let hours = Math.floor(number / 3600)
  let minutes = Math.floor((number - hours * 3600) / 60)
  let seconds = number - hours * 3600 - minutes * 60

  let string = `${pad(minutes)}:${pad(seconds)}`
  return hours ? `${pad(hours)}:${string}` : string
}
