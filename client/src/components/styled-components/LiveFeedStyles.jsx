import styled from 'styled-components';

export const Title = styled.h1`
	position: absolute;
	top: 1rem;
	left: 1rem;
	z-index: 10;
	background-color: #fff;
	padding: 0.3rem;
`;

export const CompassIcon = styled.img`
	&:hover {
		cursor: pointer;
	}
`;

export const FeedContainer = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	z-index: 0;
`;
