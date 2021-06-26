import { CHANGE_REVIEW_TEXT } from '../../action-types/reviews-action-types';

export const setReviewText = (dispatch, reviewText) => {
	return dispatch({
		type: CHANGE_REVIEW_TEXT,
		payload: reviewText,
	});
};
