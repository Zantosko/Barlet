import { GET_REVIEW_PAGES } from '../../action-types/reviews-action-types';

const initialState = 0;

const totalReviewPages = (state = initialState, action) => {
	switch (action.type) {
		case GET_REVIEW_PAGES:
			state = action.payload;
			return state;

		default:
			return state;
	}
};

export default totalReviewPages;
