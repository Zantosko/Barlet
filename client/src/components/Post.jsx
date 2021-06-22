import React, { useState } from 'react';
import {
	Container,
	ImageContainer,
	PostImage,
	ContentContainer,
	Special,
} from './styled-components/PostStyles';
import { ModalInput } from './styled-components/ProfileStyles';
import { Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import userInfo from '../reducers/userInfoReducer';

export default function Post({ postInfo }) {
	const checkRank = (rank) => {
		switch (rank) {
			case 1:
				return '🔥';
			case 2:
				return '🧊';
			case 3:
				return '💀';
			case 4:
				return '😎';
			case 5:
				return '👴';
			default:
				return '🔥';
		}
	};

	const profileInfo = useSelector(
		(state) => state.profileInfo
	);

	const userInfo = useSelector((state) => state.userInfo);

	const [isModalVisible, setIsModalVisible] =
		useState(false);

	const showModal = (post) => {
		console.log(post);
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<Container>
				<ImageContainer>
					<PostImage
						src={
							process.env.REACT_APP_PUBLIC_FOLDER +
							`${profileInfo.profileImage}`
						}
					/>
					<p>@{userInfo.username}</p>
				</ImageContainer>
				<ContentContainer>
					<h3>{postInfo.postText}</h3>
					<h3>Crowd: {checkRank(postInfo.rank)}</h3>
				</ContentContainer>
				<Special>
					<DeleteOutlined
						onClick={() => showModal(postInfo)}
					/>
					<Modal
						title='Delete Post'
						visible={isModalVisible}
						onOk={handleOk}
						okText='Delete'
						onCancel={handleCancel}
					>
						<h3>
							Are you sure you want to delete this post?
						</h3>
					</Modal>
				</Special>
			</Container>
		</>
	);
}
