export function scrollToElement(selector) {
  const element = document.querySelector(selector)
  if (!element) return
  const rect = element.getBoundingClientRect()
  const scrollTop = document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight
  const targetScrollTop = rect.bottom + scrollTop - clientHeight
  window.scrollTo({
    top: targetScrollTop,
    behavior: 'smooth', // для плавной прокрутки
  })
}
