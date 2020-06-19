export function capitalize (string) {
  if (string.trim().length === 0) return string

  return string[0].toUpperCase() + string.slice(1)
}

export function updateRoute (router, urlParamUpdates) {
  const urlParams = {
    ...router.query,
    ...urlParamUpdates
  }

  let newPath = router.pathname
  for (const key of Object.keys(urlParams)) {
    const value = urlParams[key]
    newPath = newPath.replace('[' + key + ']', value)
  }

  router.push(router.pathname, newPath)
}

export function percent (normalized, { decimalPlaces = 2 } = {}) {
  let number = normalized * 100
  number = number.toFixed(decimalPlaces)
  return number + '%'
}

export function parseDateString (dateString) {
  const int = Date.parse(dateString)
  const date = new Date()
  date.setTime(int)
  // Convert to eastern time.
  date.setHours(date.getHours() - 4)
  return date
}
