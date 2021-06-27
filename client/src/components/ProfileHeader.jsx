import React, { useState } from 'react';
import {
	ProfileCard,
	FileForm,
	FileLabel,
	File,
	BioContainer,
	Special,
	Special2,
	ModalInput,
	ImageContainer,
	ProfileImage,
	Caption,
} from './styled-components/ProfileStyles';
import { Avatar, Modal } from 'antd';
import {
	UserOutlined,
	EditOutlined,
} from '@ant-design/icons';

// React Toastify
import { toast } from 'react-toastify';

// Redux Hooks
import { useSelector, useDispatch } from 'react-redux';

import { setProfileInfo } from '../actions/profileInfo-actions';

export default function ProfileHeader({ match }) {
	const dispatch = useDispatch();
	const profileInfo = useSelector(
		(state) => state.profileInfo
	);
	const userInfo = useSelector((state) => state.userInfo);
	const showMenu = useSelector((state) => state.showMenu);

	//* Modal functions
	const [isModalVisible, setIsModalVisible] =
		useState(false);

	const [modalText, setModalText] = useState('');

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		editBio();
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	//* Upload new profile photo
	const changeProfilePic = async (e) => {
		const file = e.target.files[0];
		const data = new FormData();
		data.append('file', file);
		if (file) {
			if (file.size < 1572864) {
				if (
					file.type === 'image/jpeg' ||
					file.type === 'image/png'
				) {
					const response = await fetch(
						'http://localhost:4001/user/profile-pic',
						{
							method: 'PUT',
							headers: { token: localStorage.token },
							body: data,
						}
					);
					if (response) {
						console.log(response);
						toast.info('Profile Photo Changed');
						window.location.reload();
					}
				} else {
					toast.error('File type must be jpeg or png');
				}
			} else {
				toast.error('File size is too large');
			}
		}
	};

	//* Change bio
	const editBio = async (e) => {
		try {
			const { id } = match.params;
			const convertIdToNumber = Number(id);
			const body = {
				bio: modalText,
				userId: convertIdToNumber,
			};

			const response = await fetch(
				'http://localhost:4001/user/update-bio',
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				}
			);

			const parseResponse = await response.json();

			if (response.status === 200) {
				toast.info(parseResponse);
				setModalText('');
				setProfileInfo(dispatch);
			} else {
				toast.error(parseResponse);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<>
			<ProfileCard>
				<FileForm>
					<FileLabel htmlFor='pp-upload'>
						{profileInfo.profileImage == null ? (
							<ImageContainer>
								<Avatar
									size={180}
									icon={<UserOutlined />}
									style={
										showMenu === true
											? { zIndex: '-1' }
											: { zIndex: '0' }
									}
								/>
								<Caption>(Change profile photo)</Caption>
							</ImageContainer>
						) : (
							<ImageContainer>
								<ProfileImage
									src={
										process.env.REACT_APP_PUBLIC_FOLDER +
										`${profileInfo.profileImage}`
									}
									alt=''
								/>
								<Caption>(Change profile photo)</Caption>
							</ImageContainer>
						)}
					</FileLabel>
					<File
						type='file'
						name='profileImage'
						id='pp-upload'
						onChange={changeProfilePic}
					/>
				</FileForm>
				<BioContainer>
					<h1>
						{userInfo.firstName} {userInfo.lastName}
					</h1>
					<h2>
						{profileInfo.bio == null
							? 'Bio not written'
							: profileInfo.bio}
					</h2>
					<Special>
						<EditOutlined />
						<Special2 onClick={showModal}>
							Edit bio
						</Special2>
						<Modal
							title='Edit Bio'
							visible={isModalVisible}
							onOk={handleOk}
							okText='Submit Changes'
							onCancel={handleCancel}
						>
							<ModalInput
								type='text'
								name='bio'
								placeholder='Write new bio...'
								value={modalText}
								onChange={(e) =>
									setModalText(e.target.value)
								}
							/>
						</Modal>
					</Special>
				</BioContainer>
			</ProfileCard>
		</>
	);
}
