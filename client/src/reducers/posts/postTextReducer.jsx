import { CHANGE_POST_TEXT } from '../../action-types/posts-action-types';

const initialState = '';

const postText = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_POST_TEXT:
			return (state = action.payload);

		default:
			return state;
	}
};

export default postText;
