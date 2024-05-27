import { BackgroundMaterial, Mesh, MeshBuilder, Texture } from '@babylonjs/core'

export const setSceneEnv = () => {
  const scene = window.scene
  if (scene.environmentTexture) {
    const skydome = MeshBuilder.CreateBox(
      'sky',
      { size: 2000, sideOrientation: Mesh.BACKSIDE },
      scene
    )
    skydome.position.y = 999
    skydome.isPickable = false
    skydome.receiveShadows = true

    const sky = new BackgroundMaterial('skyMaterial', scene)
    sky.reflectionTexture = scene.environmentTexture.clone()
    if (sky.reflectionTexture) {
      sky.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
      sky.enableGroundProjection = true
      sky.projectedGroundRadius = 200
      sky.projectedGroundHeight = 30
      skydome.material = sky
    }
  }
}
