export const copy = (text) => {
  navigator.clipboard.writeText(text)
}

export const copyWithNotify = (mail) => {
  notify.success('Скопировано', {
    icon: 'i-heroicons-clipboard-document',
    timeout: 1000,
  })

  copy(mail)
}
