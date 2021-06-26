import { CHANGE_REVIEW_TEXT } from '../../action-types/reviews-action-types';

const initialState = '';

const reviewText = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_REVIEW_TEXT:
			return (state = action.payload);

		default:
			return state;
	}
};

export default reviewText;
