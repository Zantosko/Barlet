import React, { useState } from 'react';
import {
	Container,
	ImageContainer,
	PostImage,
	ContentContainer,
	Special,
	ReviewTitle,
} from './styled-components/PostStyles';
import { Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';

export default function Review({ reviewInfo, reference }) {
	const checkRating = (rating) => {
		switch (rating) {
			case 1:
				return '⭐️';
			case 2:
				return '⭐️⭐️';
			case 3:
				return '⭐️⭐️⭐️';
			case 4:
				return '⭐️⭐️⭐️⭐️';
			case 5:
				return '⭐️⭐️⭐️⭐️⭐️';
			default:
				return '⭐️⭐️⭐️';
		}
	};

	const dispatch = useDispatch();

	const profileInfo = useSelector(
		(state) => state.profileInfo
	);

	const userInfo = useSelector((state) => state.userInfo);

	const [isModalVisible, setIsModalVisible] =
		useState(false);

	const deletePost = async (review) => {
		try {
			const { id } = review;
			const body = {
				id: id,
			};
			const response = await fetch('/user/review', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

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

	const handleOk = (review) => {
		deletePost(review);
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<Container review ref={reference}>
				<ImageContainer>
					<PostImage
						src={
							process.env.REACT_APP_PUBLIC_FOLDER +
							`${profileInfo.profileImage}`
						}
					/>
					<p>@{userInfo.username}</p>
				</ImageContainer>
				<ContentContainer review>
					<ReviewTitle>{reviewInfo.title}</ReviewTitle>
					<h3>{reviewInfo.reviewText}</h3>
					<h3>Rating: {checkRating(reviewInfo.rating)}</h3>
				</ContentContainer>
				<Special>
					<DeleteOutlined onClick={showModal} />
					<Modal
						title='Delete Review'
						visible={isModalVisible}
						onOk={() => handleOk(reviewInfo)}
						okText='Delete'
						onCancel={handleCancel}
					>
						<h3>
							Are you sure you want to delete this review?
						</h3>
					</Modal>
				</Special>
			</Container>
		</>
	);
}
