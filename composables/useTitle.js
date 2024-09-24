export const useTitle = (data) => {
  const titleArray = useState('titleArray', () => data)

  return computed({
    get() {
      return {
        array: titleArray.value,
        string: titleArray.value?.map((item) => item.label).join(' > '),
      }
    },

    set(value) {
      titleArray.value = value
    },
  })
}
