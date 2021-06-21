import React from 'react';
import {
	Container,
	ImageContainer,
	PostImage,
} from './styled-components/PostStyles';

import { useSelector } from 'react-redux';
import userInfo from '../reducers/userInfoReducer';

export default function Post({ postInfo }) {
	const checkRank = (rank) => {
		switch (rank) {
			case 1:
				return '🔥';
			case 2:
				return '🧊';
			case 3:
				return '💀';
			case 4:
				return '😎';
			case 5:
				return '👴';
			default:
				return '🔥';
		}
	};

	const profileInfo = useSelector(
		(state) => state.profileInfo
	);

	const userInfo = useSelector((state) => state.userInfo);

	return (
		<>
			<Container>
				<ImageContainer>
					<PostImage
						src={
							process.env.REACT_APP_PUBLIC_FOLDER +
							`${profileInfo.profileImage}`
						}
					/>
					<p>@{userInfo.username}</p>
				</ImageContainer>
				<h3>{postInfo.postText}</h3>
				<h3>Crowd: {checkRank(postInfo.rank)}</h3>
			</Container>
		</>
	);
}
