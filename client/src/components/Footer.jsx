import React from 'react';
import {
	Container,
	Img,
	LegalContainer,
	Legal,
	CopyRight,
} from './styled-components/FooterStyles';
import Logo from '../assets/BarletWhite.png';
import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<>
			<Container>
				<Link to='/'>
					<Img src={Logo} alt='' />
				</Link>
				<LegalContainer>
					<Legal>PRIVACY POLICY</Legal>
					<Legal>TERMS AND CONDITIONS</Legal>
					<Legal>CONTACT</Legal>
				</LegalContainer>
				<CopyRight>
					&copy; 2021 Antosko Development, LLC All Rights
					Reserved.
				</CopyRight>
			</Container>
		</>
	);
}
