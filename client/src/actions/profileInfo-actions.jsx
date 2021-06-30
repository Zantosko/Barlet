import { GET_PROFILE_INFO } from '../action-types/profileInfo-action-type';

export const setProfileInfo = async (dispatch) => {
	try {
		const response = await fetch('/profile', {
			method: 'GET',
			headers: { token: localStorage.token },
		});

		const parseResponse = await response.json();

		const profile = parseResponse;

		return dispatch({
			type: GET_PROFILE_INFO,
			payload: profile,
		});
	} catch (err) {
		console.error(err.message);
	}
};
