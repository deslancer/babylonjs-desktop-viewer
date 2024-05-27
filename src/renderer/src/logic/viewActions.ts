import { ArcRotateCamera } from '@babylonjs/core'

export const toggleAutoRotation = () => {
  const scene = window.scene
  if (scene) {
    const camera = scene.activeCamera as ArcRotateCamera
    if (camera) {
      camera.useAutoRotationBehavior = !camera.useAutoRotationBehavior
    }
  }
}
