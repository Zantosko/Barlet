import React, { useEffect } from 'react';
import Navbar2 from './Navbar2';

import { useSelector, useDispatch } from 'react-redux';

import { setUserInfo } from '../actions/userInfo-action';

export default function LiveFeed() {
	const dispatch = useDispatch();

	useEffect(() => {
		setUserInfo(dispatch);
	}, []);

	return (
		<>
			<Navbar2 />
		</>
	);
}
