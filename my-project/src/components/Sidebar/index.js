import React, { useState } from 'react'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import Dropdown from '../Navbar/Dropdown'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/authSlice'

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
  SidebarLinkRSignup
} from './SideBarElements'

const Sidebar = ({ isOpen, toggle }) => {
  const [dropdown, setDropdown] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

    const onMouseEnter = () => {
    if (window.innerWidth < 768) {
      setDropdown(true)
    } else {
      setDropdown(false)
    }
  }

  const onMouseLeave = () => {
    if (window.innerWidth < 768) {
      setDropdown(false)
    } else {
      setDropdown(false)
    }
  }

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
          <SidebarLink to='regions' onClick={toggle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            Regions <IoIosArrowDropdownCircle /> {dropdown && <Dropdown />}
          </SidebarLink>
            
          <SidebarLink to='services' onClick={toggle}>
            Services
          </SidebarLink>
          <SidebarLinkR to='/contact' onClick={toggle}>
            Contact
          </SidebarLinkR>
          
  
        </SidebarMenu>

        <SideBtnWrap>
          {user ? (
            <SidebarRoute to='/' onClick={onLogout}>
              Logout
             </SidebarRoute > 
          ) : (
            <>
              <SidebarLinkRSignup  to='/signup' onClick={toggle}>
            Signup
          </SidebarLinkRSignup> 
             <SidebarRoute to='/signin'>Sign In</SidebarRoute>
            </>
          )}
          
        </SideBtnWrap>

      </SidebarWrapper>
    </SidebarContainer>
    
  )
}

export default Sidebar
