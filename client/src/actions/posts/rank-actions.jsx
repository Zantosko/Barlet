import { CHANGE_RADIO_VALUE } from '../../action-types/posts-action-types';

export const setRank = (dispatch, rank) => {
	return dispatch({
		type: CHANGE_RADIO_VALUE,
		payload: rank,
	});
};
