export default () => {
  const { currencies, roles } = useApiAttributes().value
  return [
    {
      key: 'has_premium',
      tooltip: 'Есть премиум',
      type: 'boolean',
      icon: 'ic:baseline-diamond',
    },
    {
      key: 'verified',
      tooltip: 'Почта подтверждена',
      type: 'boolean',
      icon: 'i-material-symbols-alternate-email-rounded',
    },
    {
      key: 'telegram',
      tooltip: 'Есть Telegram',
      type: 'boolean',
      icon: 'i-ic-baseline-telegram',
    },
    {
      key: 'last_activity_at',
      tooltip: 'Появлялся в сети',
      type: 'boolean',
      icon: 'i-majesticons-status-online',
    },
    {
      key: 'has_payments',
      tooltip: 'Есть платежи',
      type: 'boolean',
      icon: 'i-solar-wallet-money-bold',
    },
    {
      key: 'has_comments',
      tooltip: 'Есть комментарии',
      type: 'boolean',
      icon: 'i-icon-park-solid-comments',
    },
    {
      key: 'currency',
      type: 'select',
      placeholder: 'Валюта',
      options: [
        {
          label: 'Все',
          value: null,
        },
        ...Object.values(currencies).map((item) => ({
          label: item.key,
          value: item.key,
        })),
      ],
    },
    {
      key: 'role',
      type: 'select',
      placeholder: 'Роль',
      options: [
        {
          label: 'Все',
          value: null,
        },
        ...Object.values(roles).map((item) => ({
          label: translateKey(item),
          value: item,
        })),
      ],
    },
  ]
}
