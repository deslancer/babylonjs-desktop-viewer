import { Scene, SceneLoader } from '@babylonjs/core'
import { trigger } from '../events/events'
import blobToBase64 from './blobToBase64'
import '@babylonjs/loaders/'

async function loadMesh(data: File | string): Promise<Scene | null> {
  const scene = window.scene
  let file: string
  if (typeof data === 'string') {
    file = 'data:;base64,' + data
  } else {
    file = (await blobToBase64(data)) as string
  }

  if (scene) {
    while (scene.meshes.length) {
      const mesh = scene.meshes[0]
      mesh.dispose()
    }
    while (scene.materials.length) {
      const material = scene.materials[0]
      material.dispose()
    }
    trigger('mesh:loaded')
    return SceneLoader.AppendAsync('', file, scene)
  } else {
    return null
  }
}

export default loadMesh
