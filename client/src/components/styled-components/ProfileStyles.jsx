import styled from 'styled-components';

export const ProfileContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 1rem;
`;

export const ProfileCard = styled.div`
	height: 300px;
	background-color: rgba(0, 0, 0, 0.9);
	border-radius: 10px;
	display: flex;
	align-items: center;
	padding: 1rem;
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
