export const useCustomModalList = () => useState('modalList', () => ({}))
export const useCustomModal = (name) => {
  const modalList = useCustomModalList()
  return modalList.value[name]
}

export const openModal = (name, data = {}, closing = () => {}) => {
  const modalList = useCustomModalList()

  modalList.value[name] = {
    data,
    closing: closing,
  }
}

export const closeModal = async (name = null) => {
  const modalList = useCustomModalList()
  Object.values(modalList.value).forEach((item) => {
    if (typeof item.closing === 'function') {
      item.closing()
    }
  })
  if (name) {
    delete modalList.value[name]
  } else {
    modalList.value = {}
  }
}
