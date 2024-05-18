export interface MenuItemType {
  title: string
  action: any
  submenu?: Array<{ title: string; action: any }>
}
