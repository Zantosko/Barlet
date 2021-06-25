import styled from 'styled-components';

export const Container = styled.div`
	height: 110%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
	margin-top: 1rem;

	@media (max-width: 600px) {
		height: 130%;
	}
`;

export const Logo = styled.img`
	height: 200px;
	width: 450px;
	margin-bottom: 5rem;
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	width: 100%;
	height: 500px;
	padding: 1rem;

	@media (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;

export const GridLeft = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	max-height: 500px;
	border: #ddd solid 1px;
`;

export const GridRight = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #32c0f8;
	opacity: 0.8;
	padding: 2rem;
	max-height: 500px;
`;

export const WelcomeText = styled.h1`
	font-size: 38px;
	text-align: center;
`;
export const WelcomeText2 = styled.h1`
	font-size: 50px;
	font-weight: bolder;
	color: azure;
	text-align: center;

	@media (max-width: 600px) {
		font-size: 35px;
	}
`;
