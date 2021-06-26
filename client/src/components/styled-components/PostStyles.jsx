import styled from 'styled-components';

export const Container = styled.div`
	margin-top: 1rem;
	padding: 0 2rem;
	background-color: #92e0ff;
	width: 365px;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (min-width: 800px) {
		width: 665px;
	}
`;

export const ImageContainer = styled.div`
	width: 60px;
	height: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 1rem;
`;

export const ContentBox = styled.div`
	width: 80%;
	margin-left: 2rem;
`;

export const PostImage = styled.img`
	width: 60px;
	height: 100px;
	border-radius: 50%;
	margin-bottom: 5px;
`;

export const UserName = styled.p``;

export const ContentContainer = styled.div`
	width: 60%;
	height: 80px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const Special = styled.span`
	font-size: 1.2rem;

	&:hover {
		color: #ef4908;
		cursor: pointer;
	}
`;
