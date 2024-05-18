import Dropdown from './Dropdown'
import { useEffect, useRef, useState } from 'react'
import { MenuItemType } from '../types/MenuItem'

interface MenuItemsProps {
  item: MenuItemType
  depthLevel: number
}

const MenuItem = (props: MenuItemsProps) => {
  const { item, depthLevel } = props
  const [dropdown, setDropdown] = useState(false)
  const ref = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [dropdown])

  const onMouseEnter = () => {
    setDropdown(true)
  }

  const onMouseLeave = () => {
    setDropdown(false)
  }

  const toggleDropdown = () => {
    setDropdown((prev) => !prev)
  }

  const closeDropdown = () => {
    dropdown && setDropdown(false)
  }

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {item.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => toggleDropdown()}
          >
            <span>{item.title}</span>
            {depthLevel > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={'1.5rem'}
                height={'1.5rem'}
                viewBox="0 0 24 24"
              >
                <path d="M10,17L15,12L10,7V17Z" fill={'#fff'} />
              </svg>
            ) : (
              <i className="arrow" />
            )}
          </button>
          <Dropdown depthLevel={depthLevel} submenu={item.submenu} dropdown={dropdown} />
        </>
      ) : !item.action && item.submenu ? (
        <>
          <button type="button" aria-haspopup="menu" aria-expanded={dropdown ? 'true' : 'false'}>
            {item.title}
            {depthLevel > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={'1.5rem'}
                height={'1.5rem'}
                viewBox="0 0 24 24"
              >
                <path d="M10,17L15,12L10,7V17Z" fill={'#fff'} />
              </svg>
            ) : (
              <i className="arrow" />
            )}
          </button>
          <Dropdown depthLevel={depthLevel} submenu={item.submenu} dropdown={dropdown} />
        </>
      ) : (
        <span onClick={() => item.action()}>{item.title}</span>
      )}
    </li>
  )
}

export default MenuItem
