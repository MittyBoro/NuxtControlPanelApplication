export default async () => {
  return [
    {
      key: 'from',
      type: 'datetime',
      placeholder: 'Период с',
      tooltip: 'Период переходов с',
    },
    {
      key: 'to',
      type: 'datetime',
      placeholder: 'Период до',
      tooltip: 'Период переходов до',
    },
  ]
}
