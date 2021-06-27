import { GET_REVIEWS } from '../../action-types/reviews-action-types';

const initialState = [];

const reviews = (state = initialState, action) => {
	switch (action.type) {
		case GET_REVIEWS:
			state = [...state, ...action.payload];
			state.sort((a, b) => b.id - a.id);
			return state;

		default:
			return state;
	}
};

export default reviews;
