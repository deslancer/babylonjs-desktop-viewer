import MenuItem from './MenuItems'
import { menuItemsData } from './menuItemsData'

const Navbar = () => {
  const depthLevel = 0

  return (
    <nav className="desktop-nav">
      <ul className="menus">
        {menuItemsData.map((menu, index) => {
          return <MenuItem item={menu} key={index} depthLevel={depthLevel} />
        })}
      </ul>
    </nav>
  )
}

export default Navbar
