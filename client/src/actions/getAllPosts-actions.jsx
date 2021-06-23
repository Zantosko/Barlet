import { GET_ALL_POSTS } from '../action-types/getAllPosts-action-types';

export const setGetPosts = async (dispatch) => {
	try {
		const response = await fetch(
			'http://localhost:4001/livefeed/posts',
			{
				method: 'GET',
			}
		);

		const parseResponse = await response.json();

		return dispatch({
			type: GET_ALL_POSTS,
			payload: parseResponse,
		});
	} catch (err) {
		console.error(err.message);
	}
};
