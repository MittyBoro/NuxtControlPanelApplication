export const formatBytes = (bytes) => {
  if (bytes < 1024) {
    return +bytes + ' B'
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + ' KB'
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(2) + ' MB'
  } else {
    return (bytes / 1073741824).toFixed(2) + ' GB'
  }
}

export const getMediaInfo = async (file) => {
  let mediaInfo = {}

  if (file.type.startsWith('video')) {
    const videoElement = document.createElement('video')
    videoElement.src = URL.createObjectURL(file)

    await new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        mediaInfo.width = videoElement.videoWidth
        mediaInfo.height = videoElement.videoHeight
        mediaInfo.duration = videoElement.duration
        URL.revokeObjectURL(videoElement.src)
        resolve()
      }
    })
  } else if (file.type.startsWith('image')) {
    if (file.type === 'image/tiff') {
      return mediaInfo
    }
    const imageElement = new Image()
    imageElement.src = URL.createObjectURL(file)

    await new Promise((resolve) => {
      imageElement.onload = () => {
        mediaInfo.width = imageElement.width
        mediaInfo.height = imageElement.height
        URL.revokeObjectURL(imageElement.src)
        resolve()
      }
    })
  }

  return mediaInfo
}
