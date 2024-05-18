import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

export const API = {
  selectFile: () => ipcRenderer.invoke('dialog:openFile'),
  openFileWithCtx: () => ipcRenderer.invoke('context:openFile'),
  getFileData: (path: string) => ipcRenderer.invoke('getFileData', path)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', API)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
