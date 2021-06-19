import { GET_POSTS } from '../../action-types/posts-action-types';

export const setPosts = async (dispatch) => {
	try {
		const response = await fetch(
			'http://localhost:4001/user/post',
			{
				method: 'GET',
				headers: { token: localStorage.token },
			}
		);

		const parseResponse = await response.json();

		return dispatch({
			type: GET_POSTS,
			payload: parseResponse,
		});
	} catch (err) {
		console.error(err.message);
	}
};
