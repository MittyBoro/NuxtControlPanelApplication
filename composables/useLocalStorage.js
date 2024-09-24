export default function useLocalStorage(key, defaultValue = null) {
  const state = useState(key, () => defaultValue)

  if (!process.client || !localStorage) {
    return state
  }

  state.value = JSON.parse(localStorage.getItem(key))

  watch(
    () => state.value,
    (newValue) => {
      if (newValue === undefined) {
        try {
          localStorage.removeItem(key)
        } catch (e) {}
      } else {
        // set state
        try {
          localStorage.setItem(key, JSON.stringify(state.value))
        } catch (e) {}
      }
    },
    {
      deep: true,
    },
  )

  return state
}
