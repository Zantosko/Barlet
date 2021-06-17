import { GET_USER_INFO } from '../action-types/userInfo-action-type';

const initialState = {};

const userInfo = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_INFO:
			return (state = action.payload);

		default:
			return state;
	}
};

export default userInfo;
