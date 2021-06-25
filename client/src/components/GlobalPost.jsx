import React, { useEffect, useState } from 'react';
import {
	Container,
	ImageContainer,
	PostImage,
	ContentContainer,
} from './styled-components/PostStyles';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';

export default function GlobalPost({ postInfo }) {
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

	const dispatch = useDispatch();

	const profileInfo = useSelector(
		(state) => state.profileInfo
	);

	const userInfo = useSelector((state) => state.userInfo);

	const [postData, setPostData] = useState({
		username: '',
		profilePic: '',
	});

	const fetchPostData = async (id) => {
		const body = {
			id: id,
		};
		const response = await fetch(
			'http://localhost:4001/livefeed/post-data',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}
		);
		const parseResponse = await response.json();

		await setPostData({
			username: parseResponse[0].username,
			profilePic: parseResponse[1].profileImage,
		});

		return postData;
	};

	useEffect(() => {
		fetchPostData(postInfo.userId);
	}, [postInfo.userId]);

	return (
		<>
			<Container>
				<ImageContainer>
					<PostImage
						src={
							process.env.REACT_APP_PUBLIC_FOLDER +
							`${postData.profilePic}`
						}
					/>
					<p>@{postData.username}</p>
				</ImageContainer>
				<ContentContainer>
					<h3>{postInfo.postText}</h3>
					<h3>Crowd: {checkRank(postInfo.rank)}</h3>
				</ContentContainer>
			</Container>
		</>
	);
}
