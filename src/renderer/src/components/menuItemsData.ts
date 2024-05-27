import { MenuItemType } from '../types/MenuItem'
import { openAndLoadFile } from '../handlers/files'
import { toggleAutoRotation } from '../logic/viewActions'

export const menuItemsData: MenuItemType[] = [
  {
    title: 'File',
    action: null,
    submenu: [
      {
        title: 'Open File',
        action: openAndLoadFile
      }
    ]
  },
  {
    title: 'View',
    action: null,
    submenu: [
      {
        title: 'Toggle AutoRotation',
        action: toggleAutoRotation
      }
    ]
  }
]
