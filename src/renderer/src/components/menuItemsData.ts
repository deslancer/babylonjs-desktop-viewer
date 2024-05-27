import { MenuItemType } from '../types/MenuItem'
import { openAndLoadFile } from '../handlers/files'

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
    title: 'About',
    action: null
  }
]
