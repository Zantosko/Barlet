import { CHANGE_RATING } from '../../action-types/reviews-action-types';

export const setRating = (dispatch, rating) => {
	return dispatch({
		type: CHANGE_RATING,
		payload: rating,
	});
};
