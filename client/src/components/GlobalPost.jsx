import React, { useEffect, useState } from 'react';
import {
	Container,
	ImageContainer,
	PostImage,
	ContentContainer,
	ContentBox,
	ReviewTitle,
} from './styled-components/PostStyles';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';

export default function GlobalPost({
	postInfo,
	reference,
}) {
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

	const checkRating = (rating) => {
		switch (rating) {
			case 1:
				return '⭐️';
			case 2:
				return '⭐️⭐️';
			case 3:
				return '⭐️⭐️⭐️';
			case 4:
				return '⭐️⭐️⭐️⭐️';
			case 5:
				return '⭐️⭐️⭐️⭐️⭐️';
			default:
				return '⭐️⭐️⭐️';
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
		const response = await fetch('/livefeed/post-data', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const parseResponse = await response.json();
		console.log(postInfo);

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
			<Container
				ref={reference}
				review={postInfo.title ? true : false}
			>
				<ImageContainer>
					<PostImage
						src={
							process.env.REACT_APP_PUBLIC_FOLDER +
							`${postData.profilePic}`
						}
					/>
					<p>@{postData.username}</p>
				</ImageContainer>
				<ContentBox>
					<ContentContainer>
						<ReviewTitle>{postInfo.title}</ReviewTitle>
						<h3>
							{postInfo.postText
								? postInfo.postText
								: postInfo.reviewText}
						</h3>
						<h3>
							{postInfo.rank ? 'Crowd: ' : 'Rating: '}
							{postInfo.rank
								? checkRank(postInfo.rank)
								: checkRating(postInfo.rating)}
						</h3>
					</ContentContainer>
				</ContentBox>
			</Container>
		</>
	);
}
