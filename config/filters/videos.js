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
    {
      key: 'tasks',
      type: 'select',
      icon: 'i-clarity-process-on-vm-line',
      placeholder: 'Задачи',
      options: [
        {
          label: 'Все',
          value: null,
          dot: 'bg-gray-500/10',
        },
        {
          label: 'В очереди',
          value: 'queued',
          dot: 'bg-gray-500',
        },
        {
          label: 'Рендерится',
          value: 'rendering',
          dot: 'bg-primary-500',
        },
        {
          label: 'Выполнено',
          value: 'success',
          dot: 'bg-green-500',
        },
        {
          label: 'Есть ошибки',
          value: 'error',
          dot: 'bg-red-500',
        },
        {
          label: 'Нет задач',
          value: 'none',
          dot: 'bg-gray-500/50',
        },
      ],
    },

    {
      key: 'from',
      type: 'datetime',
      placeholder: 'Просмотры с',
      tooltip: 'Период просмотров с',
    },
    {
      key: 'to',
      type: 'datetime',
      placeholder: 'Просмотры до',
      tooltip: 'Период просмотров до',
    },
  ]
}
