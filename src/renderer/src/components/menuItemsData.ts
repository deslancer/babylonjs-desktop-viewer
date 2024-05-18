import { MenuItemType } from '../types/MenuItem'
import { openFile } from '../handlers/files'

export const menuItemsData: MenuItemType[] = [
  {
    title: 'File',
    action: null,
    submenu: [
      {
        title: 'Open File',
        action: openFile
      }
    ]
  },
  {
    title: 'About',
    action: null
  }
]
