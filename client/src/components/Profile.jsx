import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import Post from './Post';
import {
	ProfileContainer,
	ProfileCard,
	FileForm,
	FileLabel,
	File,
	PostsContainer,
	BioContainer,
	Special,
	Special2,
	InputContainer,
	PostInput,
	PostButton,
	RadioContainer,
	PostContainer2,
	ModalInput,
	ImageContainer,
	ProfileImage,
	Caption,
} from './styled-components/ProfileStyles';
import { Avatar, Radio, Spin, Space, Modal } from 'antd';
import {
	UserOutlined,
	EditOutlined,
} from '@ant-design/icons';
import { Tabs } from 'antd';

import { toast } from 'react-toastify';

// Redux Hooks
import { useSelector, useDispatch } from 'react-redux';

// Redux Actions
import { setProfileInfo } from '../actions/profileInfo-actions';
import { setPostText } from '../actions/posts/postText-actions';
import { setRank } from '../actions/posts/rank-actions';
import { setPosts } from '../actions/posts/getPosts-actions';

const { TabPane } = Tabs;

export default function Profile({ match }) {
	const dispatch = useDispatch();
	const profileInfo = useSelector(
		(state) => state.profileInfo
	);
	const userInfo = useSelector((state) => state.userInfo);
	const postText = useSelector((state) => state.postText);
	const rank = useSelector((state) => state.rank);
	const posts = useSelector((state) => state.posts);
	const showMenu = useSelector((state) => state.showMenu);

	useEffect(() => {
		setProfileInfo(dispatch);
		setPosts(dispatch);
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

	const onSubmitPost = async (e) => {
		e.preventDefault();

		try {
			const { id } = match.params;
			const convertIdToNumber = Number(id);
			const body = {
				postText,
				rank,
				userId: convertIdToNumber,
			};

			const response = await fetch(
				'http://localhost:4001/user/post',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				}
			);

			const parseResponse = await response.json();

			if (response.status === 200) {
				toast.info(parseResponse);
				setPostText(dispatch, '');
				setRank(dispatch, 1);
				window.location.reload();
			} else {
				toast.error(parseResponse);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

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

	return (
		<>
			<Navbar2 />
			<ProfileContainer>
				<ProfileCard>
					<FileForm>
						<FileLabel htmlFor='pp-upload'>
							{profileInfo.profileImage == null ? (
								<ImageContainer>
									<Avatar
										size={180}
										icon={<UserOutlined />}
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
				<PostsContainer>
					<h1>Posts & Reviews</h1>
					<Tabs
						defaultActiveKey='1'
						style={
							showMenu === true
								? { zIndex: '-1' }
								: { zIndex: '0' }
						}
					>
						<TabPane tab='Posts' key='1'>
							<InputContainer
								onSubmit={onSubmitPost}
								style={
									showMenu === true
										? { zIndex: '-1' }
										: { zIndex: '0' }
								}
							>
								<PostInput
									type='text'
									name='postText'
									placeholder='What bar are you at and how is it?'
									value={postText}
									onChange={(e) =>
										setPostText(dispatch, e.target.value)
									}
								/>
								<h3>Whats the crowd like?</h3>
								<RadioContainer>
									<Radio.Group
										onChange={(e) =>
											setRank(dispatch, e.target.value)
										}
										value={rank}
										name='rank'
									>
										<Radio value={1}>🔥 High volume</Radio>
										<Radio value={2}>🧊 Laid back</Radio>
										<Radio value={3}>💀 Dead</Radio>
										<Radio value={4}>
											😎 College crowd
										</Radio>
										<Radio value={5}>👴 Older crowd</Radio>
									</Radio.Group>
								</RadioContainer>
								<PostButton type='submit'>Send</PostButton>
							</InputContainer>
							<PostContainer2>
								{posts != null ? (
									posts.map((post, idx) => {
										return (
											<Post
												key={idx}
												postInfo={post}
											></Post>
										);
									})
								) : (
									<Space size='middle' className='spinner'>
										<Spin size='large'></Spin>
									</Space>
								)}
							</PostContainer2>
						</TabPane>
						<TabPane tab='Reviews' key='2'>
							Content of Tab Pane 2
						</TabPane>
					</Tabs>
				</PostsContainer>
			</ProfileContainer>
		</>
	);
}
