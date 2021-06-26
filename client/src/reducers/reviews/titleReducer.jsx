import { CHANGE_TITLE } from '../../action-types/reviews-action-types';

const initialState = '';

const title = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_TITLE:
			return (state = action.payload);

		default:
			return state;
	}
};

export default title;
