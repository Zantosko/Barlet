import { SHOW_MENU } from '../action-types/showMenu-action-types';

const initialState = false;

const showMenu = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MENU:
			return (state = action.payload);
		default:
			return state;
	}
};

export default showMenu;
