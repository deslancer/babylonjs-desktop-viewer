import loadMesh from '../logic/loadMesh'

const api = window.api

export const openFile = async () => {
  const file = await api.selectFile()
  const extension = file.path.split('.')[1]
  if (extension.includes('glb' || extension.includes('gltf'))) {
    await loadMesh(file.data)
  }
}
