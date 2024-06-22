export const toggleAutoRotation = () => {
  const api = window.api
  api.testCall()
  /*const scene = window.scene
  if (scene) {
    const camera = scene.activeCamera as ArcRotateCamera
    if (camera) {
      camera.useAutoRotationBehavior = !camera.useAutoRotationBehavior
    }
  }*/
}
