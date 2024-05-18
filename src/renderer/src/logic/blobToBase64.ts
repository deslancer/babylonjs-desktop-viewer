async function blobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
}

export default blobToBase64
