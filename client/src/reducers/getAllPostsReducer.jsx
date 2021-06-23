import { GET_ALL_POSTS } from '../action-types/getAllPosts-action-types';

const initialState = [];

const getPosts = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_POSTS:
			state = action.payload;
			state.sort(
				(a, b) =>
					new Date(b.createdAt) - new Date(a.createdAt)
			);
			return state;

		default:
			return state;
	}
};

export default getPosts;
