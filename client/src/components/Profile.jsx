import React, { useEffect } from 'react';
import Navbar2 from './Navbar2';
import {
	ProfileContainer,
	ProfileCard,
	Special,
	FileForm,
	FileLabel,
	File,
} from './styled-components/ProfileStyles';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';

import { setProfileInfo } from '../actions/profileInfo-actions';

export default function Profile() {
	const dispatch = useDispatch();
	const profileInfo = useSelector(
		(state) => state.profileInfo
	);
	const userInfo = useSelector((state) => state.userInfo);

	useEffect(() => {
		setProfileInfo(dispatch);
	}, []);

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
						}
					);
					if (response.data.status) {
						toast.info('Profile Photo Changed');
					}
				} else {
					toast.error('File type must be jpeg or png');
				}
			} else {
				toast.error('File size is too large');
			}
		}
	};

	return (
		<>
			<Navbar2 />
			<ProfileContainer>
				<ProfileCard>
					<FileForm>
						<FileLabel htmlFor='pp-upload'>
							{profileInfo.profileImage == null ? (
								<Avatar
									size={180}
									icon={<UserOutlined />}
								/>
							) : (
								<img src={profileInfo.image} alt='' />
							)}
						</FileLabel>
					</FileForm>
					<File
						type='file'
						name='content'
						id='pp-upload'
						onChange={changeProfilePic}
					/>
				</ProfileCard>
			</ProfileContainer>
		</>
	);
}
