import styled from 'styled-components';

export const Nav = styled.header`
	width: 100vw;
	height: 90px;
	background-color: #fafafa;
	opacity: 0.95;
	box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.5rem;
	/* position: fixed;
	z-index: 50; */
`;

export const LogoImg = styled.img`
	height: 60px;
	width: 120px;

	&:hover {
		cursor: pointer;
	}
`;

export const LogoImg2 = styled.img`
	height: 80px;
	width: 150px;
	margin-bottom: 2rem;

	&:hover {
		cursor: pointer;
	}
`;

export const NavLeft = styled.div``;

export const NavRight = styled.div`
	margin-top: 1rem;
`;

export const NavLinkContainer = styled.ul`
	list-style: none;
	display: flex;
	justify-content: space-between;
`;

export const NavLink = styled.li`
	margin-right: 1rem;
	font-size: 15.5px;
	color: #333;
	padding: 0.5rem 0.5rem;
	transition: all 0.3s ease;

	&:hover {
		cursor: pointer;
		color: #08aeef;
	}
`;

export const Special = styled.li`
	margin-right: 1rem;
	font-size: 15.5px;
	color: #333;
	border: solid 1px #08aeef;
	padding: 0.5rem 1.5rem;
	border-radius: 4px;
	transition: all 0.3s ease;

	&:hover {
		background-color: #08aeef;
		color: #fff;
		cursor: pointer;
	}
`;

export const Overlay = styled.div`
	height: 100vh;
	width: 100vw;
	background: linear-gradient(75deg, #08aeef, #fff);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 50;
`;

export const MenuContainer = styled.div`
	height: 80%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Line = styled.div`
	background-color: #333;
	width: 200px;
	height: 1px;
`;

export const MenuItems = styled.p`
	color: #333;
	font-size: 18.5px;
	margin: 1rem;
	transition: all 0.3s ease;

	&:hover {
		cursor: pointer;
		color: #fff;
	}
`;

export const IconSizer = styled.span`
	font-size: 30px;
	text-align: right;
	display: flex;
	justify-content: flex-end;
	padding: 1.5rem;
	color: #333;
	transition: all 0.3s ease;

	&:hover {
		color: #08aeef;
		cursor: pointer;
	}
`;

export const IconSizer2 = styled.span`
	font-size: 24px;
	color: #333;

	&:hover {
		cursor: pointer;
	}
`;
