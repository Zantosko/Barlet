import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import LiveFeed from './LiveFeed';
import Profile from './Profile';
import Error from './Error';

// React Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux Hooks
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { setIsAuthenticated } from '../actions/auth-actions';

// React Toastify Configuration
toast.configure();

// Holds all routes and then consumed in main App component
export default function Main() {
	const isAuthenticated = useSelector(
		(state) => state.isAuthenticated
	);
	const dispatch = useDispatch();

	// Checks authentication of user
	const isAuth = async () => {
		try {
			const response = await fetch('/auth/is-verified', {
				method: 'GET',
				headers: { token: localStorage.token },
			});

			const parseResponse = await response.json();

			parseResponse === true
				? setIsAuthenticated(dispatch, true)
				: setIsAuthenticated(dispatch, false);
		} catch (err) {
			console.error(err.message);
		}
	};

	// Checks authentication when component mounts
	useEffect(() => {
		isAuth();
	}, []);

	return (
		<>
			<Switch>
				<Route
					exact
					path='/'
					render={(props) =>
						isAuthenticated === false ? (
							<Home {...props} />
						) : (
							<Redirect to='/livefeed' />
						)
					}
				/>
				<Route exact path='/register' component={Register} />
				<Route
					exact
					path='/login'
					render={(props) =>
						isAuthenticated === false ? (
							<Login {...props} />
						) : (
							<Redirect to='/livefeed' />
						)
					}
				/>
				<Route
					exact
					path='/livefeed'
					render={(props) =>
						isAuthenticated === true ? (
							<LiveFeed {...props} />
						) : (
							<Redirect to='/login' />
						)
					}
				/>
				<Route
					exact
					path='/profile/:id'
					render={(props) =>
						isAuthenticated === true ? (
							<Profile {...props} />
						) : (
							<Redirect to='/login' />
						)
					}
				/>
				<Route path='*' component={Error} />
			</Switch>
		</>
	);
}
