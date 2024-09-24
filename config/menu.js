export const menu = [
  [
    {
      name: 'Главная',
      icon: 'i-mingcute-dashboard-fill',
      route: '/',
    },
    {
      name: 'Видеоролики',
      icon: 'i-material-symbols-video-library',
      route: '/videos',
    },
    {
      name: 'Категории',
      icon: 'i-bxs-category-alt',
      route: '/categories',
    },
    {
      name: 'Актёры',
      icon: 'i-mdi-face-woman-shimmer',
      route: '/actors',
    },
    {
      name: 'Студии',
      icon: 'i-mdi-movie-open',
      route: '/studios',
    },
    {
      name: 'Фотоальбомы',
      icon: 'i-mingcute-photo-album-fill',
      route: '/albums',
    },
    {
      name: 'Теги',
      icon: 'i-material-symbols-tag-rounded',
      route: '/tags',
    },
    {
      name: 'Страницы',
      icon: 'i-fluent-document-one-page-multiple-16-filled',
      route: '/pages',
    },
    {
      name: 'Наборы',
      icon: 'material-symbols:playlist-play',
      route: '/kits',
    },
    {
      name: 'Ссылки',
      icon: 'i-ic-round-link',
      route: '/links',
      roles: ['admin'],
    },
  ],

  [
    {
      name: 'Пользователи',
      icon: 'i-fluent-people-community-20-filled',
      route: '/users',
      roles: ['admin'],
    },
    {
      name: 'Комментарии',
      icon: 'i-icon-park-solid-comments',
      route: '/comments',
      roles: ['admin'],
    },
    {
      name: 'Чаты',
      icon: 'i-gravity-ui-envelope-open',
      route: '/chats',
      roles: ['admin'],
    },
    {
      name: 'Избранное',
      icon: 'i-material-symbols-favorite',
      route: '/favorites',
      hidden: true,
      roles: ['admin'],
    },
  ],

  [
    {
      name: 'Платежи',
      icon: 'i-solar-wallet-money-bold',
      route: '/payments',
      roles: ['admin'],
    },
    {
      name: 'Тарифы',
      icon: 'i-fluent-money-settings-16-filled',
      route: '/tariffs',
      roles: ['admin'],
    },
    {
      name: 'Купоны',
      icon: 'i-mdi-ticket-confirmation',
      route: '/coupons',
      roles: ['admin'],
    },
    {
      name: 'Выплаты',
      icon: 'i-fluent-people-money-20-filled',
      route: '/payouts',
      roles: ['admin'],
    },
    {
      name: 'Акции',
      icon: 'i-mingcute-sale-fill',
      route: '/promotions',
      roles: ['admin'],
    },
    {
      name: 'Валюты',
      icon: 'i-material-symbols-currency-exchange-rounded',
      route: '/currencies',
      roles: ['admin'],
    },
  ],

  [
    {
      name: 'Параметры',
      icon: 'i-material-symbols-settings-rounded',
      route: '/props',
      roles: ['admin'],
    },
  ],
]
