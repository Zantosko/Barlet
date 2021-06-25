import styled from 'styled-components';

export const Container = styled.div`
	height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #0f0f11;
	opacity: 0.95;
`;

export const Img = styled.img`
	height: 70px;
	width: 135px;

	&:hover {
		cursor: pointer;
	}
`;

export const LegalContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: nowrap;
	margin: 2.3rem;
`;

export const Legal = styled.p`
	color: #69696c;
	margin: 0.7rem;
	font-size: 14.5px;

	&:hover {
		cursor: pointer;
	}
`;

export const CopyRight = styled.span`
	color: #fff;
	font-size: 13px;
`;
