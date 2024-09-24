export const declineWord = (number, forms) => {
  // Определение формы склонения по правилам русского языка
  let remainder = number % 100
  if (remainder >= 11 && remainder <= 19) {
    return forms[2]
  }

  remainder = number % 10
  if (remainder === 1) {
    return forms[0]
  } else if (remainder >= 2 && remainder <= 4) {
    return forms[1]
  } else {
    return forms[2]
  }
}

export const formatNumber = (number) => {
  return String(number || 0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

export const formatNumberViews = (number, withK = true) => {
  if (withK) {
    if (number >= 1000000) {
      return formatNumber((number / 1000000).toFixed(0)) + 'm'
    } else if (number >= 1000) {
      return formatNumber((number / 1000).toFixed(0)) + 'k'
    }
  }

  return formatNumber(number)
}

export function randomString(length) {
  return Array.from({ length }, () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  ).join('')
}

export function translateKey(key) {
  return useAppConfig().translates[key] || key
}
