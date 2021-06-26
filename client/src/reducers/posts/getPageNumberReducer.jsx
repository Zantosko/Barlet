import { GET_PAGES } from '../../action-types/posts-action-types';

const initialState = 0;

const totalPages = (state = initialState, action) => {
	switch (action.type) {
		case GET_PAGES:
			state = action.payload;
			return state;

		default:
			return state;
	}
};

export default totalPages;
