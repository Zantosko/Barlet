import { CHANGE_RADIO_VALUE } from '../../action-types/posts-action-types';

const initialState = 1;

const rank = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_RADIO_VALUE:
			return (state = action.payload);

		default:
			return state;
	}
};

export default rank;
