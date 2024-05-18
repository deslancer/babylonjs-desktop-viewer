import {
  ArcRotateCamera,
  Color4,
  CubeTexture,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3
} from '@babylonjs/core'
import { GridMaterial } from '@babylonjs/materials/Grid'
import { on } from '../events/events'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import { envMap } from './envMap'

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
    //const base64 = await api.getFileData('assets/textures/royal_esplanade.env')

    const textureData = 'data:octet/stream;base64,' + envMap
    const cubeTexture = new CubeTexture(
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
    scene.environmentTexture = cubeTexture
    scene.createDefaultSkybox(cubeTexture, true, 1000)
    const groundMaterial = new GridMaterial('groundMaterial', scene)
    groundMaterial.majorUnitFrequency = 5
    groundMaterial.minorUnitVisibility = 0.5
    groundMaterial.gridRatio = 2
    groundMaterial.opacity = 0.97
    groundMaterial.useMaxLine = true

    const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, scene)

    ground.material = groundMaterial
    await scene.debugLayer.show({
      globalRoot: document.body
    })
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

  /* const ipcHandlerBtn = document.getElementById('ipcHandler')
   ipcHandlerBtn?.addEventListener('click', () => {
     window.electron.ipcRenderer.send('ping')
   })*/
}
