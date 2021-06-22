import React from 'react';
import {
	FormContainer,
	ErrorBox,
	LabelWrapper,
	Label,
	Input,
	FormButton,
	FormLink,
} from './styled-components/FormStyles';
import { LogoImg2 } from './styled-components/NavbarStyles';
import Logo from '../assets/Barlet_FULL_LOGO.png';
import { Link } from 'react-router-dom';

export default function Error() {
	return (
		<>
			<FormContainer>
				<ErrorBox>
					<Link to='/'>
						<LogoImg2 src={Logo} alt='' />
					</Link>
					<h2>Page not found</h2>
				</ErrorBox>
			</FormContainer>
		</>
	);
}
