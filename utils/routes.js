export const isRouteActive = (path) => {
  const route = useRoute()

  return path === route.path || (path !== '/' && route.path.startsWith(path))
}

export const preventCloseWindow = (prevent = true) => {
  if (prevent) {
    window.onbeforeunload = function () {
      return 'Вы уверены, что хотите закрыть эту вкладку? Все несохраненные данные будут потеряны.'
    }
  } else {
    window.onbeforeunload = null
  }
}
