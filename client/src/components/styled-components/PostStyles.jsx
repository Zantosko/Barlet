import styled from 'styled-components';

export const Container = styled.div`
	margin-top: 1rem;
	padding: 2rem;
	background-color: #92e0ff;
	width: 365px;
	height: 120px;
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
	height: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1rem;
`;

export const PostImage = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	margin-bottom: 5px;
`;

export const UserName = styled.p``;
