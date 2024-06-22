import { LocalFile } from '../types/files'
import { loadEnvTexture, loadHDRTexture, loadMesh } from '../logic/loader'

const api = window.api

export const openAndLoadFile = async () => {
  const file = await api.selectFile()
  await loadFile(file)
}
export const loadFile = async (file: LocalFile | File) => {
  const extension = file.path.split('.')[1]
  if (extension.includes('glb') || extension.includes('gltf') || extension.includes('obj')) {
    if (file instanceof File) {
      await loadMesh(file, `.${extension}`)
    } else {
      await loadMesh(file.data, `.${extension}`)
    }
  }
  if (extension.includes('hdr')) {
    if (file instanceof File) {
      await loadHDRTexture(file)
    } else {
      await loadHDRTexture(file.data)
    }
  }
  if (extension.includes('env')) {
    if (file instanceof File) {
      await loadEnvTexture(file)
    } else {
      await loadEnvTexture(file.data)
    }
  }
}
