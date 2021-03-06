import React, { useEffect } from 'react';
import Navbar2 from './Navbar2';
import Map from './Map';
import LiveFeedContent from './LiveFeedContent';
import { FeedContainer } from './styled-components/LiveFeedStyles';

import { useSelector, useDispatch } from 'react-redux';

import { setUserInfo } from '../actions/userInfo-action';

export default function LiveFeed() {
	const dispatch = useDispatch();
	const showMenu = useSelector((state) => state.showMenu);

	useEffect(() => {
		setUserInfo(dispatch);
	}, []);

	return (
		<>
			<Navbar2 />
			<FeedContainer
				style={
					showMenu === true
						? { zIndex: '-1' }
						: { zIndex: '0' }
				}
			>
				<Map />
				<LiveFeedContent />
			</FeedContainer>
		</>
	);
}
