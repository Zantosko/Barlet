import React, { useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import Logo from '../assets/Barlet_FULL_LOGO.png';
import {
  Nav,
  NavLeft,
  NavRight,
  LogoImg,
  LogoImg2,
  NavLinkContainer,
  NavLink,
  Special,
  Overlay,
  MenuContainer,
  MenuItems,
  Line,
  IconSizer,
  IconSizer2
} from './styled-components/NavbarStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const size = useWindowSize();

  let menu;

  if(showMenu) {
    menu = 
      <Overlay>
        <IconSizer>
          <FontAwesomeIcon 
            icon={faTimes}
            onClick={() => setShowMenu(!showMenu)}
          />
        </IconSizer>
        <MenuContainer>
          <Link to="/" className="link">
            <LogoImg2 src={Logo} alt="" />
          </Link>
          <Line/>
          <Link to="/login" className="link">
            <MenuItems>SIGN IN</MenuItems>
          </Link>
          <Line/>
          <Link to="/register" className="link">
            <MenuItems>SIGN UP</MenuItems>
          </Link>
          <Line/>
        </MenuContainer>
      </Overlay>
  }

  return (
    <>
      <Nav>
        <NavLeft>
          <Link to="/" className="link">
            <LogoImg src={Logo} alt="" />
          </Link>
        </NavLeft>
        <NavRight>
          <NavLinkContainer>
            {size.width > 600 ? 
              <>
                <Link to="/login" className="link">
                  <NavLink>Sign in</NavLink>
                </Link>
                <Link to="/register" className="link">
                  <Special>Sign up</Special>
                </Link>
              </>
              :
              <IconSizer2>
                <FontAwesomeIcon 
                  icon={faBars}
                  onClick={() => setShowMenu(!showMenu)}
                />
              </IconSizer2>
            }
          </NavLinkContainer>
        </NavRight>
        {menu}
      </Nav>
    </>
    
  )
}
