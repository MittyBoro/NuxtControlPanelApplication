export default async () => {
  const { data: catList } = await $api('categories', { query: { all: true } })
  return [
    {
      key: 'is_premium',
      type: 'boolean',
      icon: 'ic:baseline-diamond',
    },
    {
      key: 'categories',
      type: 'select',
      placeholder: 'Категория...',
      options: catList?.map((item) => ({
        label: item.title,
        value: String(item.id),
      })),
    },
    {
      key: 'is_published',
      type: 'select',
      placeholder: 'Публикация',
      options: [
        {
          label: 'Все',
          value: null,
        },
        {
          label: 'Опубликовано',
          value: '1',
        },
        {
          label: 'Не опубликовано',
          value: '0',
        },
      ],
    },
  ]
}
