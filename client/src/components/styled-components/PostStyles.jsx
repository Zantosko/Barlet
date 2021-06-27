import styled from 'styled-components';

export const Container = styled.div`
	margin-top: 1rem;
	padding: 0 2rem;
	background-color: ${(props) =>
		props.review ? '#91f4de' : '#92e0ff'};
	height: ${(props) => (props.review ? '220px' : '120px')};
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
	height: ${(props) => (props.review ? '150px' : '80px')};
	/* margin-bottom: ${(props) =>
		props.review ? '2rem' : '0'}; */
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	@media (max-width: 600px) {
		/* margin-bottom: ${(props) =>
			props.review ? '2rem' : '0'}; */
	}
`;

export const Special = styled.span`
	font-size: 1.4rem;

	&:hover {
		color: #ef4908;
		cursor: pointer;
	}
`;

export const ReviewTitle = styled.h2`
	font-weight: bolder;
`;
