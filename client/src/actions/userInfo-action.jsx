import { GET_USER_INFO } from '../action-types/userInfo-action-type';

export const setUserInfo = async (dispatch) => {
	try {
		const response = await fetch('/', {
			method: 'GET',
			headers: { token: localStorage.token },
		});

		const parseResponse = await response.json();

		const user = parseResponse;

		return dispatch({ type: GET_USER_INFO, payload: user });
	} catch (err) {
		console.error(err.message);
	}
};
