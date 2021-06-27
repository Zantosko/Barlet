import styled from 'styled-components';

export const Container = styled.div`
	margin-top: 1rem;
	padding: ${(props) =>
		props.review ? '5rem 2rem' : '1rem 2rem'};
	background-color: ${(props) =>
		props.review ? '#91f4de' : '#92e0ff'};
	height: ${(props) => (props.review ? '280px' : '120px')};
	width: 365px;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (min-width: 800px) {
		width: 665px;
		padding: ${(props) =>
			props.review ? '2rem' : '1rem 2rem'};
	}

	@media (min-width: 1200px) {
		width: 865px;
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
	display: flex;
	flex-direction: column;
	justify-content: space-around;
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
	text-decoration: underline;

	@media (max-width: 800px) {
		font-size: 18px;
	}
`;
