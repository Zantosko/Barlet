import { GET_POSTS } from '../../action-types/posts-action-types';

const initialState = [];

const posts = (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			const postList = [...state];
			postList.push(action.payload);
			return postList;

		default:
			return state;
	}
};

export default posts;
