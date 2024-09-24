export default () => [
  {
    key: 'favoritable_type',
    type: 'select',
    placeholder: 'Тип',
    options: [
      {
        label: 'Все',
        value: null,
      },
      {
        label: 'Видео',
        value: 'video',
      },
      {
        label: 'Альбом',
        value: 'album',
      },
      {
        label: 'Актер',
        value: 'actor',
      },
    ],
  },
]
