import MenuItems from './MenuItems'
import { MenuItemType } from '../types/MenuItem'

interface DropdownProps {
  submenu: MenuItemType[]
  dropdown: boolean
  depthLevel: number
}

const Dropdown = (props: DropdownProps) => {
  const { submenu, dropdown } = props
  const depthLevel = props.depthLevel + 1
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : ''

  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
      {submenu.map((submenu, index) => (
        <MenuItems item={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  )
}

export default Dropdown
