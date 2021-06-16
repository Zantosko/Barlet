import { combineReducers } from 'redux';
import firstName from './registration/firstNameReducer';
import lastName from './registration/lastNameReducer';
import email from './registration/emailReducer';
import username from './registration/usernameReducer';
import password from './registration/passwordReducer';
import rePassword from './registration/rePasswordReducer';
import isAuthenticated from '../reducers/authReducer';

const rootReducer = combineReducers({
	firstName,
	lastName,
	email,
	username,
	password,
	rePassword,
	isAuthenticated,
});

export default rootReducer;
