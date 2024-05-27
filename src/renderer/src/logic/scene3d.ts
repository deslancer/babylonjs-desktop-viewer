import {
  ArcRotateCamera,
  Color4,
  CubeTexture,
  Engine,
  HemisphericLight,
  Scene,
  Vector3
} from '@babylonjs/core'
import { on } from '../events/events'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import { envMap } from './envMap'
import { setSceneEnv } from './setSceneEnv'

//const api: any = window.api

export async function createScene(canvas: HTMLCanvasElement): Promise<void> {
  const engine = new Engine(canvas, true)
  const scene = new Scene(engine)
  scene.clearColor = new Color4(0.0, 0.0, 0.0, 0.0)
  const camera = new ArcRotateCamera('Camera', 1.13, Math.PI / 2.3, 9, new Vector3(0, 0, 0), scene)
  camera.lowerRadiusLimit = 7
  camera.upperRadiusLimit = 15
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
  light.intensity = 0.7
  on('mesh:loaded', async () => {
    const textureData = 'data:octet/stream;base64,' + envMap
    scene.environmentTexture = new CubeTexture(
      textureData,
      scene,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      '.env'
    )
    setSceneEnv()
    await scene.debugLayer.show({
      globalRoot: document.body
    })
    engine.runRenderLoop(() => {
      scene.render()
    })
  })
  on('texture:loaded', async () => {
    setSceneEnv()
    engine.runRenderLoop(() => {
      scene.render()
    })
  })

  /* scene.onPointerObservable.add((pointerInfo) => {
     switch (pointerInfo.type) {
       case PointerEventTypes.POINTERDOWN: {
         const pickedMesh = pointerInfo?.pickInfo?.pickedMesh
         const msg = document.getElementById('materialName')
         if (msg) {
           if (pickedMesh) {
             msg.style.display = 'block'
           } else {
             msg.style.display = 'none'
           }
           msg.innerHTML = `material name: <br> ${pickedMesh?.material?.name || ''}`
           msg.style.left = pointerInfo.event.clientX + 'px'
           msg.style.top = pointerInfo.event.clientY + 'px'
           setTimeout(() => {
             msg.style.display = 'none'
           }, 10000)
         }

         break
       }
     }
   })*/
  //@ts-ignore
  window.scene = scene
  window.addEventListener('resize', () => {
    engine.resize()
  })
}
