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
	IconSizer2,
} from './styled-components/NavbarStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Redux Hooks
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { setIsAuthenticated } from '../actions/auth-actions';
import { setShowMenu } from '../actions/showMenu-actions';

export default function Navbar2() {
	const size = useWindowSize();
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const showMenu = useSelector((state) => state.showMenu);

	let menu;

	if (showMenu) {
		menu = (
			<Overlay>
				<IconSizer>
					<FontAwesomeIcon
						icon={faTimes}
						onClick={() => setShowMenu(dispatch, !showMenu)}
					/>
				</IconSizer>
				<MenuContainer>
					<Link to='/livefeed' className='link'>
						<LogoImg2 src={Logo} alt='' />
					</Link>
					<Line />
					<Link to='/login' className='link'>
						<MenuItems>LIVE FEED</MenuItems>
					</Link>
					<Line />
					<Link to={`/profile/${userInfo.id}`} className='link'>
						<MenuItems>PROFILE</MenuItems>
					</Link>
					<Line />
					<MenuItems onClick={(e) => logout(e)}>LOG OUT</MenuItems>
					<Line />
				</MenuContainer>
			</Overlay>
		);
	}

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem('token');
		setIsAuthenticated(dispatch, false);
		toast.success('Logged out successfully');
	};

	return (
		<>
			<Nav>
				<NavLeft>
					<Link to='/livefeed' className='link'>
						<LogoImg src={Logo} alt='' />
					</Link>
				</NavLeft>
				<NavRight>
					<NavLinkContainer>
						{size.width > 600 ? (
							<>
								<Link to='/livefeed' className='link'>
									<NavLink>Live Feed</NavLink>
								</Link>
								<Link to={`/profile/${userInfo.id}`} className='link'>
									<NavLink>Profile</NavLink>
								</Link>
								<Special onClick={(e) => logout(e)}>Logout</Special>
							</>
						) : (
							<IconSizer2>
								<FontAwesomeIcon
									icon={faBars}
									onClick={() => setShowMenu(dispatch, !showMenu)}
								/>
							</IconSizer2>
						)}
					</NavLinkContainer>
				</NavRight>
				{menu}
			</Nav>
		</>
	);
}
