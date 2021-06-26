import { CHANGE_TITLE } from '../../action-types/reviews-action-types';

export const setTitle = (dispatch, title) => {
	return dispatch({
		type: CHANGE_TITLE,
		payload: title,
	});
};
