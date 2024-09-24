<template></template>

<script setup>
  const { menu } = useAppConfig()
  const menuFlat = menu.flat()

  const route = useRoute()

  const menuItem = computed(() =>
    menuFlat.find((item) => isRouteActive(item.route)),
  )
  useTitle().value = computed(() => {
    if (!menuItem.value) return [{ label: 'PanelKa' }]
    let array = [
      {
        label: menuItem.value.name,
        to: menuItem.value.route,
      },
    ]

    let secondRoute = route.path.split('/')[2]
    let currentSecond = menuFlat.find(
      (item) => secondRoute && item.route.split('/')[2] === secondRoute,
    )

    if (currentSecond) {
      array.push({ label: currentSecond.name })
    } else if (secondRoute == 'create') {
      array.push({ label: 'Добавить' })
    } else if (secondRoute == 'show') {
      array.push({ label: 'Просмотр' })
    } else if (secondRoute) {
      array.push({ label: 'Редактировать' })
    }

    return array
  })

  useSeoMeta({
    title: () => useTitle().value.string + ' | PanelKa',
  })
</script>
