import styled from 'styled-components';

export const FormContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	height: ${(props) =>
		props.register ? '760px' : '550px'};
	width: 400px;
	padding: 4rem 1.5rem;
	box-shadow: 0.1em 0.1em 1em rgba(0, 0, 0, 0.4);
	border-radius: 5px;
`;

export const LabelWrapper = styled.div`
	width: 80%;
	margin-bottom: 0.2rem;
	padding-bottom: 0.5rem;
`;

export const Label = styled.label`
	font-size: 11px;
	color: #333;
`;

export const Input = styled.input`
	margin: 0.7rem;
	height: 5%;
	width: 80%;
	border: none;
	border-bottom: 1.5px solid #ddd;
	font-size: 16px;

	&:focus {
		outline: none;
		border-bottom-color: #32c0f8;
	}
`;

export const FormButton = styled.button`
	margin-top: 2rem;
	padding: 0.7rem 3rem;
	border-radius: 4px;
	border: solid 1px #08efbd;
	background-color: inherit;
	color: #333;
	font-size: 15px;
	font-weight: bold;
	transition: all 0.3s ease;

	&:hover {
		cursor: pointer;
		color: #fff;
		background-color: #08efbd;
	}
`;

export const FormLink = styled.p`
	margin: 1.2rem;
	font-size: 18px;
	color: #333;
	text-decoration: underline;

	&:hover {
		color: #08aeef;
		text-decoration: none;
	}
`;
