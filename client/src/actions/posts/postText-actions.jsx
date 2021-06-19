import { CHANGE_POST_TEXT } from '../../action-types/posts-action-types';

export const setPostText = (dispatch, postText) => {
	return dispatch({
		type: CHANGE_POST_TEXT,
		payload: postText,
	});
};
