import {
	GET_REVIEWS,
	GET_REVIEW_PAGES,
} from '../../action-types/reviews-action-types';

export const setReviews = async (dispatch, pageNum = 0) => {
	try {
		const response = await fetch(
			`http://localhost:4001/user/review?page=${pageNum}&size=2`,
			{
				method: 'GET',
				headers: { token: localStorage.token },
			}
		);

		const parseResponse = await response.json();

		dispatch({
			type: GET_REVIEW_PAGES,
			payload: parseResponse.totalPages,
		});

		dispatch({
			type: GET_REVIEWS,
			payload: parseResponse.content,
		});
	} catch (err) {
		console.error(err.message);
	}
};
