import { SHOW_MENU } from '../action-types/showMenu-action-types';

export const setShowMenu = (dispatch, boolean) => {
	return dispatch({ type: SHOW_MENU, payload: boolean });
};
