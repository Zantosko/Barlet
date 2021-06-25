import React, { useEffect } from 'react';
import GlobalPost from './GlobalPost';
import {
	PostContainer,
	Title2,
} from './styled-components/LiveFeedStyles';
import { Spin, Space } from 'antd';

import { useSelector, useDispatch } from 'react-redux';

import { setGetPosts } from '../actions/getAllPosts-actions';
import { setProfileInfo } from '../actions/profileInfo-actions';

export default function LiveFeedContent() {
	const dispatch = useDispatch();
	const getPosts = useSelector((state) => state.getPosts);

	useEffect(() => {
		setGetPosts(dispatch);
		setProfileInfo(dispatch);
	}, []);

	return (
		<>
			<Title2>Recent Posts</Title2>
			<PostContainer>
				{getPosts != null ? (
					getPosts.map((post, idx) => {
						return (
							<GlobalPost
								key={post.createdAt}
								postInfo={post}
							></GlobalPost>
						);
					})
				) : (
					<Space size='middle' className='spinner'>
						<Spin size='large'></Spin>
					</Space>
				)}
			</PostContainer>
		</>
	);
}
