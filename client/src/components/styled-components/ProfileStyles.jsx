import styled from 'styled-components';

export const ProfileContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ProfileCard = styled.div`
	height: 300px;
	width: 400px;
	background-color: #fff;
	border: #ddd solid 1px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;

	@media (min-width: 800px) {
		width: 700px;
	}
`;

export const FileForm = styled.form``;

export const FileLabel = styled.label`
	&:hover {
		cursor: pointer;
	}
`;

export const File = styled.input`
	display: none;
`;

export const BioContainer = styled.div`
	margin: 2rem;
`;

export const Special = styled.span`
	font-size: 1.5rem;
	margin-top: 1rem;

	&:hover {
		color: #1c90ff;
		cursor: pointer;
	}
`;

export const Special2 = styled.span`
	font-size: 1rem;
	margin-left: 0.4rem;

	&:hover {
		color: #1c90ff;
		cursor: pointer;
	}
`;

export const PostsContainer = styled.div`
	height: 1000vh;
	width: 400px;
	padding: 1rem;
	display: flex;
	flex-direction: column;

	@media (min-width: 800px) {
		width: 700px;
	}
`;

export const InputContainer = styled.form`
	height: 300px;
	background-color: #fff;
	opacity: 0.9;
	border-radius: 4px;
	border: #ddd solid 1px;
	margin-top: 1rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const PostInput = styled.input`
	height: 40px;
	width: 80%;
	border: 1px solid #08aeef;
	border-radius: 4px;
	padding: 1rem;
	margin: 1rem;

	&:focus {
		outline-color: #08efbd;
	}
`;

export const RadioContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 80%;
	padding: 1rem;
`;

export const PostButton = styled.button`
	background-color: inherit;
	border: #08efbd solid 1px;
	border-radius: 4px;
	margin-top: 1rem;
	padding: 0.3rem 2rem;
	font-size: 15px;
	transition: all 0.3s ease;

	&:hover {
		background-color: #08efbd;
		color: #fff;
		cursor: pointer;
	}
`;

export const PostContainer2 = styled.div`
	height: 1000px;
	width: 400px;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;

	@media (min-width: 800px) {
		width: 800px;
	}
`;

export const ModalInput = styled.input`
	height: 30px;
	width: 93%;
	border: 1px solid #08aeef;
	border-radius: 4px;
	padding: 1rem;
	margin: 1rem;

	&:focus {
		outline-color: #08efbd;
	}
`;
