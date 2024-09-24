export default () => {
  const { pay_statuses, currencies } = useApiAttributes().value
  return [
    {
      key: 'status',
      type: 'select',
      placeholder: 'Статус платежа',
      options: [
        {
          label: 'Все',
          value: 'all',
        },
        {
          label: 'Основные',
          value: null,
        },
        ...pay_statuses.map((item) => ({
          label: translateKey(item),
          value: item,
        })),
      ],
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
  ]
}
