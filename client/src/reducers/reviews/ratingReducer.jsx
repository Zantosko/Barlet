import { CHANGE_RATING } from '../../action-types/reviews-action-types';

const initialState = 3;

const rating = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_RATING:
			return (state = action.payload);

		default:
			return state;
	}
};

export default rating;
