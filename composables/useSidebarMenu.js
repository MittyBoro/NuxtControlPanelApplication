export const useSidebarMenu = () => {
  const { menu } = useAppConfig()
  const user = useApiUser()

  menu.forEach((group, i) => {
    group.forEach((item, i) => {
      if (item.roles && !item.roles.includes(user.value.role)) {
        item.hidden = true
      }
    })
    group = group.filter((item) => !item.hidden)
    if (group.length == 0) {
      menu.splice(i, 1)
    }
  })

  if (!menu[menu.length - 1].find((item) => item.name == 'На сайт')) {
    menu.push([
      {
        name: 'На сайт',
        icon: 'i-gg-external',
        route: externalUrl(),
        target: '_blank',
      },
    ])
  }

  return menu
}
