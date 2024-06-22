import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as path from 'node:path'
import * as fs from 'fs'

let mainWindow: BrowserWindow | null = null

function createWindow(): BrowserWindow {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 768,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
    //mainWindow?.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.handle('context:openFile', function (_event: Electron.IpcMainInvokeEvent) {
    const openFilePath = process.argv[1]
    try {
      const stats = fs.statSync(openFilePath)
      if (stats.isDirectory()) {
        console.log('The path is a directory')
      } else {
        if (openFilePath) {
          const base64 = fs.readFileSync(openFilePath).toString('base64')
          return {
            path: openFilePath,
            data: base64
          }
        }
      }
    } catch (error: any) {
      console.error('An error occurred:', error.message)
    }

    return []
  })
  ipcMain.handle('getFileData', async (_event: Electron.IpcMainInvokeEvent, f_path: string) => {
    const filePath = path.join(__dirname, '../../src/renderer/src/', f_path)
    return fs.readFileSync(filePath).toString('base64')
  })
  ipcMain.handle('dialog:openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow || createWindow(), {
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['hdr', 'env', 'dds'] },
        { name: '3d models', extensions: ['gltf', 'glb', 'babylon'] }
      ]
    })
    if (canceled) {
      return
    } else {
      const base64 = fs.readFileSync(filePaths[0]).toString('base64')
      return {
        path: filePaths[0],
        data: base64
      }
    }
  })
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
