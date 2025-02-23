import { serialize } from 'object-to-formdata'
import slugify from 'slugify'

export const generateSlug = (text, params = {}) => {
  return slugify(text, {
    lower: true,
    ...params,
  })
}

export function objectToFormData(data) {
  const serialized = serialize(data, {
    indices: true,
    booleansAsIntegers: true,
    allowEmptyArrays: true,
  })

  const formData = new FormData()
  for (const [key, value] of serialized.entries()) {
    formData.append(key, value)
  }

  return formData
}

export function objectToFormErrors(errors) {
  const formErrors = {}
  for (const [key, value] of Object.entries(errors)) {
    formErrors[key] = value.join(', ')
  }
  return formErrors
}

export function objKeysToStr(obj, needle) {
  return Object.keys(obj)
    .filter((key) => key.startsWith(needle))
    .map((key) => obj[key])
    .join('\n')
}

export function listForSelect({ list }) {
  return (
    list.value?.map((item) => ({
      label: item.title || item.name,
      value: item.id,
    })) || []
  )
}

export function listWithTranslate(list, empty = false) {
  let newList =
    list?.map((item) => ({
      label: translateKey(item) || item,
      value: item,
    })) || []

  if (empty) {
    newList.unshift({ label: 'Не указано', value: '' })
  }

  return newList
}
