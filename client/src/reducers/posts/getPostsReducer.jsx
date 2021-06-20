import { GET_POSTS } from '../../action-types/posts-action-types';

const initialState = [];

const posts = (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			state = action.payload;
			state.sort((a, b) => b.id - a.id);
			return state;

		default:
			return state;
	}
};

export default posts;
