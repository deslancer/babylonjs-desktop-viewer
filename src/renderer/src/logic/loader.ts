import { CubeTexture, HDRCubeTexture, Scene, SceneLoader } from '@babylonjs/core'
import { trigger } from '../events/events'
import blobToBase64 from './blobToBase64'
import '@babylonjs/loaders/'

async function loadMesh(data: File | string, ext: string): Promise<Scene | null> {
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
    return SceneLoader.AppendAsync(
      '',
      file,
      scene,
      (event) => {
        const length = event.lengthComputable
        const loaded = event.loaded
        const total = event.total
        console.log('loaded', loaded)
        console.log('total', total)
        console.log('length', length)
      },
      ext
    )
  } else {
    return null
  }
}

const loadHDRTexture = async (data: File | string) => {
  const scene = window.scene
  let file: string
  if (typeof data === 'string') {
    file = 'data:;base64,' + data
  } else {
    file = (await blobToBase64(data)) as string
  }
  if (scene) {
    const reflectionTexture = new HDRCubeTexture(file, scene, 1024, false, true, false, true)
    scene.environmentTexture = reflectionTexture
    scene.createDefaultSkybox(reflectionTexture, true, 1000)
    trigger('texture:loaded', reflectionTexture)
  }
}
const loadEnvTexture = async (data: File | string) => {
  const scene = window.scene
  let file: string
  if (typeof data === 'string') {
    file = 'data:;base64,' + data
  } else {
    file = (await blobToBase64(data)) as string
  }
  if (scene) {
    const reflectionTexture = new CubeTexture(
      file,
      scene,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true,
      '.env'
    )
    scene.environmentTexture = reflectionTexture
    scene.createDefaultSkybox(reflectionTexture, true, 1000)
    trigger('texture:loaded', reflectionTexture)
  }
}
export { loadMesh, loadHDRTexture, loadEnvTexture }
