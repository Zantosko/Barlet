import React, { useEffect } from 'react';
import Post from './Post';
import { PostContainer } from './styled-components/LiveFeedStyles';
import { Spin, Space } from 'antd';

import { useSelector, useDispatch } from 'react-redux';

import { setGetPosts } from '../actions/getAllPosts-actions';

export default function LiveFeedContent() {
	const dispatch = useDispatch();
	const getPosts = useSelector((state) => state.getPosts);

	useEffect(() => {
		setGetPosts(dispatch);
	}, []);

	return (
		<>
			<h1>Recent Posts</h1>
			<PostContainer>
				{getPosts != null ? (
					getPosts.map((post, idx) => {
						return (
							<Post
								key={post.createdAt}
								postInfo={post}
							></Post>
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
