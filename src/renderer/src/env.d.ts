/// <reference types="vite/client" />
import { Scene } from '@babylonjs/core'
import { API } from './preload/index'

declare global {
  interface Window {
    api: typeof API
    electron: any
    scene: Scene
  }
}
