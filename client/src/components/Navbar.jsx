import React from 'react'
import Logo from '../assets/Barlet_FULL_LOGO.png';
import {
  Nav,
  NavLeft,
  NavRight,
  LogoImg,
  NavLinkContainer,
  NavLink,
  Special
} from './styled-components/NavbarStyles'

export default function Navbar() {
  return (
    <>
      <Nav>
        <NavLeft>
          <LogoImg src={Logo} alt="" />
        </NavLeft>
        <NavRight>
          <NavLinkContainer>
            <NavLink>Sign in</NavLink>
            <Special>Sign up</Special>
          </NavLinkContainer>
        </NavRight>
      </Nav>
    </>
    
  )
}
