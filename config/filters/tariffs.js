export default () => [
  {
    key: 'currency',
    type: 'select',
    placeholder: 'Валюта',
    options: [
      {
        label: 'Все',
        value: null,
      },
      ...Object.values(useApiAttributes().value.currencies).map((item) => ({
        label: item.key,
        value: item.key,
      })),
    ],
  },
]
