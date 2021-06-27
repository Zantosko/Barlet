import React, { useState } from 'react';
import {
	Container,
	ImageContainer,
	PostImage,
	ContentContainer,
	Special,
} from './styled-components/PostStyles';
import { Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';

export default function Post({ postInfo, reference }) {
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

	const dispatch = useDispatch();

	const profileInfo = useSelector(
		(state) => state.profileInfo
	);

	const userInfo = useSelector((state) => state.userInfo);

	const [isModalVisible, setIsModalVisible] =
		useState(false);

	const deletePost = async (post) => {
		try {
			const { id } = post;
			const body = {
				id: id,
			};
			const response = await fetch(
				'http://localhost:4001/user/post',
				{
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				}
			);

			const parseResponse = await response.json();

			if (response.status === 200) {
				toast.info(parseResponse);
			} else {
				toast.error(parseResponse);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = (post) => {
		deletePost(post);
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<Container ref={reference}>
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
					<DeleteOutlined onClick={showModal} />
					<Modal
						title='Delete Post'
						visible={isModalVisible}
						onOk={() => handleOk(postInfo)}
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
