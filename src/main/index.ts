import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {
  signUpHandler,
  getUsersHandler,
  logInHandler,
  autoSignIn,
  logOutHandler
} from './handlers/userHandler'

import dotenv from 'dotenv'

import {
  addTodoHandler,
  completeTodoHandler,
  deleteTodoHandler,
  editTodoHandler,
  getTodosHandler,
  uncompleteTodoHandler
} from './handlers/todoHandler'

import path from 'path'

const envPath = path.join(process.resourcesPath, '.env')
dotenv.config({ path: envPath })

import('./backend/server.js')

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 720,
    minHeight: 720,
    minWidth: 480,
    show: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    },
    frame: false
  })

  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (process.env.NODE_ENV === 'development') {
    console.log('Loading dev URL:', process.env.ELECTRON_RENDERER_URL || 'http://localhost:3000')
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL || 'http://localhost:3000')
  } else {
    const filePath = join(__dirname, '../renderer/index.html')
    console.log('Loading file:', filePath)
    mainWindow.loadFile(filePath)
  }

  mainWindow.focus()
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('ponsgsa'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/* User handlers */

ipcMain.handle('add-user', signUpHandler)

ipcMain.handle('log-in', logInHandler)

ipcMain.handle('auto-sign-in', autoSignIn)

ipcMain.handle('get-users', getUsersHandler)

ipcMain.on('log-out', logOutHandler)

/* Todo handlers */

ipcMain.handle('add-todo', addTodoHandler)

ipcMain.handle('get-todos', getTodosHandler)

ipcMain.handle('complete-todo', completeTodoHandler)

ipcMain.handle('uncomplete-todo', uncompleteTodoHandler)

ipcMain.on('delete-todo', deleteTodoHandler)

ipcMain.handle('edit-todo', editTodoHandler)

/* General handlers */

ipcMain.on('frame-interaction', (_event, option: string) => {
  console.log('Frame interaction option:', option)
  const win = BrowserWindow.getFocusedWindow()
  if (win) {
    switch (option) {
      case 'minimize':
        win.minimize()
        break
      case 'maximize':
        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
        break
      case 'close':
        win.close()
        break
      default:
        console.warn('Unknown frame interaction option:', option)
    }
  }
})
