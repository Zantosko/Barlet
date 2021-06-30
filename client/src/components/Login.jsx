import React from 'react';
import {
	FormContainer,
	StyledForm,
	LabelWrapper,
	Label,
	Input,
	FormButton,
	FormLink,
} from './styled-components/FormStyles';
import { LogoImg2 } from './styled-components/NavbarStyles';
import Logo from '../assets/Barlet_FULL_LOGO.png';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

// Redux Hooks
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { setUsername } from '../actions/registration/username-actions';
import { setPassword } from '../actions/registration/password-actions';
import { setIsAuthenticated } from '../actions/auth-actions';

export default function Login() {
	const dispatch = useDispatch();
	const username = useSelector((state) => state.username);
	const password = useSelector((state) => state.password);

	const onSubmitForm = async (e) => {
		e.preventDefault();

		try {
			const body = { username, password };

			const response = await fetch('/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			const parseResponse = await response.json();

			if (parseResponse.token) {
				localStorage.setItem('token', parseResponse.token);

				setIsAuthenticated(dispatch, true);
				setUsername(dispatch, '');
				setPassword(dispatch, '');
				toast.success('Logged in successfully');
			} else {
				setIsAuthenticated(dispatch, false);
				toast.error(parseResponse);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<>
			<FormContainer>
				<StyledForm onSubmit={onSubmitForm}>
					<Link to='/'>
						<LogoImg2 src={Logo} alt='' />
					</Link>
					<Input
						type='text'
						name='username'
						value={username}
						onChange={(e) =>
							setUsername(dispatch, e.target.value)
						}
					/>
					<LabelWrapper>
						<Label>Username</Label>
					</LabelWrapper>
					<Input
						type='password'
						name='password'
						value={password}
						onChange={(e) =>
							setPassword(dispatch, e.target.value)
						}
					/>
					<LabelWrapper>
						<Label>Password</Label>
					</LabelWrapper>
					<FormButton type='submit'>Sign In</FormButton>
					<Link to='/register' className='link'>
						<FormLink>Or, sign up</FormLink>
					</Link>
				</StyledForm>
			</FormContainer>
		</>
	);
}
