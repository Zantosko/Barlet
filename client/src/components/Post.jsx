import React from 'react';
import { Container } from './styled-components/PostStyles';

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

	return (
		<>
			<Container>
				<h3>{postInfo.postText}</h3>
				<h4>Crowd: {checkRank(postInfo.rank)}</h4>
			</Container>
		</>
	);
}
