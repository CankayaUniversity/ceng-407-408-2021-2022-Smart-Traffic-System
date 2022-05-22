import React, { useState } from 'react'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import Dropdown from '../Navbar/Dropdown'
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SidebarLinkR,
  SideBtnWrap,
  SidebarRoute,
} from './SideBarElements'

const Sidebar = ({ isOpen, toggle }) => {
  const [dropdown, setDropdown] = useState(false)

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='about' onClick={toggle}>
            About
          </SidebarLink>
          <SidebarLink to='regions' onClick={toggle}>
            Regions <IoIosArrowDropdownCircle />
          </SidebarLink>
          <SidebarLink to='services' onClick={toggle}>
            Services
          </SidebarLink>
          <SidebarLinkR to='/contact' onClick={toggle}>
            Contact
          </SidebarLinkR>
          <SidebarLinkR to='/signup' onClick={toggle}>
            Signup
          </SidebarLinkR>
          {dropdown && <Dropdown />}
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to='/signin'>Sign In</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar
