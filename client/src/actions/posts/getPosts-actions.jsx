import {
	GET_POSTS,
	GET_PAGES,
} from '../../action-types/posts-action-types';

export const setPosts = async (dispatch, pageNum = 0) => {
	try {
		const response = await fetch(
			`http://localhost:4001/user/post?page=${pageNum}&size=2`,
			{
				method: 'GET',
				headers: { token: localStorage.token },
			}
		);

		const parseResponse = await response.json();

		dispatch({
			type: GET_PAGES,
			payload: parseResponse.totalPages,
		});

		dispatch({
			type: GET_POSTS,
			payload: parseResponse.content,
		});
	} catch (err) {
		console.error(err.message);
	}
};
