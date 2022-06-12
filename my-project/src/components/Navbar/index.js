import React, { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FaTrafficLight } from 'react-icons/fa'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { animateScroll as scroll } from 'react-scroll'
import Dropdown from './Dropdown'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/authSlice'

import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavLinksR,

} from './NavbarElements'

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false)
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
    if (window.innerWidth < 960) {
      setDropdown(false)
    } else {
      setDropdown(true)
    }
  }

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false)
    } else {
      setDropdown(false)
    }
  }

  const changeNav = () => {
    if (window.scrollY >= 80) setScrollNav(true)
    else setScrollNav(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, [])

  const toggleHome = () => {
    scroll.scrollToTop()
  }
  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to='/' onClick={toggleHome}>
            {/* <img className='navbar-logo' src={`${image}`} alt='SmartTraffic' /> */}
            <h1 className='logo-name' to='/'>
              Smart Traffic Systems
            </h1>
            <FaTrafficLight />
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinksR
                to='/'
                onClick={toggleHome}
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
                activeClass='active'
              >
                Home
              </NavLinksR>
            </NavItem>
            <NavItem>
              <NavLinks
                to='about'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
                activeClass='active'
              >
                About
              </NavLinks>
            </NavItem>
            <NavItem onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <NavLinks
                to='regions'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
              >
                Regions
                <IoIosArrowDropdownCircle style={{marginLeft:"6px" , height:"14px"}} />
              </NavLinks>
              {dropdown && <Dropdown />}
            </NavItem>
            <NavItem>
              <NavLinks
                to='services'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
              >
                Services
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinksR
                to='/contact'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
              >
                Contact
              </NavLinksR>
            </NavItem>
            
          </NavMenu>
        </NavbarContainer>

        <NavBtn>
          {user ? (
            <NavBtnLink to='/' onClick={onLogout}>
              Logout
            </NavBtnLink>
          ) : (
            <>
              <NavLinksR to='/signup'>Sign Up</NavLinksR>
              <NavBtnLink to='/signin'>Sign In</NavBtnLink>
            </>
          )}
        </NavBtn>
      </Nav>
    </>
  )
}

export default Navbar
