import { GET_PROFILE_INFO } from '../action-types/profileInfo-action-type';

const initialState = {};

const profileInfo = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE_INFO:
			return (state = action.payload);

		default:
			return state;
	}
};

export default profileInfo;
