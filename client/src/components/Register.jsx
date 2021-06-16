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
import { Formik, Field, Form } from 'formik';
import { LogoImg2 } from './styled-components/NavbarStyles';
import Logo from '../assets/Barlet_FULL_LOGO.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Redux Hooks
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { setFirstName } from '../actions/registration/firstName-actions';
import { setLastName } from '../actions/registration/lastName-actions';
import { setEmail } from '../actions/registration/email-actions';
import { setUsername } from '../actions/registration/username-actions';
import { setPassword } from '../actions/registration/password-actions';
import { setRePassword } from '../actions/registration/rePassword-actions';
import { setIsAuthenticated } from '../actions/auth-actions';

export default function Register() {
	const dispatch = useDispatch();
	const firstName = useSelector((state) => state.firstName);
	const lastName = useSelector((state) => state.lastName);
	const email = useSelector((state) => state.email);
	const username = useSelector((state) => state.username);
	const password = useSelector((state) => state.password);
	const rePassword = useSelector(
		(state) => state.rePassword
	);

	const onSubmitForm = async (e) => {
		e.preventDefault();

		try {
			const body = {
				firstName,
				lastName,
				email,
				username,
				password,
				rePassword,
			};

			const response = await fetch(
				'http://localhost:4001/auth/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				}
			);

			const parseResponse = await response.json();

			if (parseResponse.token) {
				localStorage.setItem('token', parseResponse.token);

				setIsAuthenticated(dispatch, true);
				toast.success('Registered Successfully');

				setFirstName(dispatch, '');
				setLastName(dispatch, '');
				setEmail(dispatch, '');
				setUsername(dispatch, '');
				setPassword(dispatch, '');
				setRePassword(dispatch, '');
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
				<StyledForm register onSubmit={onSubmitForm}>
					<Link to='/'>
						<LogoImg2 src={Logo} alt='' />
					</Link>
					<Input
						type='text'
						name='firstName'
						value={firstName}
						onChange={(e) =>
							setFirstName(dispatch, e.target.value)
						}
					/>
					<LabelWrapper>
						<Label>First Name</Label>
					</LabelWrapper>
					<Input
						type='text'
						name='lastName'
						value={lastName}
						onChange={(e) =>
							setLastName(dispatch, e.target.value)
						}
					/>
					<LabelWrapper>
						<Label>Last Name</Label>
					</LabelWrapper>
					<Input
						type='email'
						name='email'
						value={email}
						onChange={(e) =>
							setEmail(dispatch, e.target.value)
						}
					/>
					<LabelWrapper>
						<Label>Email</Label>
					</LabelWrapper>
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
					<Input
						type='password'
						name='rePassword'
						value={rePassword}
						onChange={(e) =>
							setRePassword(dispatch, e.target.value)
						}
					/>
					<LabelWrapper>
						<Label>Re-type Password</Label>
					</LabelWrapper>
					<FormButton type='submit'>Sign Up</FormButton>
					<Link to='/login' className='link'>
						<FormLink>Or, sign in</FormLink>
					</Link>
				</StyledForm>
			</FormContainer>
		</>
	);
}
