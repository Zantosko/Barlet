import React, {
	useEffect,
	useState,
	useRef,
	useCallback,
} from 'react';
import GlobalPost from './GlobalPost';
import {
	PostContainer,
	Title2,
} from './styled-components/LiveFeedStyles';
import { Spin, Space } from 'antd';

import { useSelector, useDispatch } from 'react-redux';

// import { setGetPosts } from '../actions/getAllPosts-actions';
import { setProfileInfo } from '../actions/profileInfo-actions';

export default function LiveFeedContent() {
	const dispatch = useDispatch();
	// const getPosts = useSelector((state) => state.getPosts);
	const [items, setItems] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const observer = useRef();

	useEffect(() => {
		getFeed(pageNumber);
		setPageNumber((pageNumber) => pageNumber + 1);
		setProfileInfo(dispatch);
	}, []);

	const getFeed = async (pageNum) => {
		try {
			setIsLoading(true);
			await new Promise((resolve) =>
				setTimeout(resolve, 700)
			);

			const response = await fetch(
				`http://localhost:4001/livefeed/posts?page=${pageNum}&size=1`,
				{
					method: 'GET',
				}
			);

			const parseResponse = await response.json();

			setItems([...items, ...parseResponse.content]);
			setTotalPages(parseResponse.totalPages);
			setIsLoading(false);
		} catch (err) {
			console.error(err.message);
		}
	};

	const lastItemRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						if (pageNumber < totalPages) {
							getFeed(pageNumber);
							setPageNumber((pageNumber) => pageNumber + 1);
						} else {
							setHasMore(false);
						}
					}
				}
			);

			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
	);

	return (
		<>
			<Title2>What's Happening?</Title2>
			<PostContainer>
				{items.map((post, idx) =>
					idx + 1 === items.length ? (
						<GlobalPost
							reference={lastItemRef}
							key={idx}
							postInfo={post}
						></GlobalPost>
					) : (
						<GlobalPost
							key={idx}
							postInfo={post}
						></GlobalPost>
					)
				)}

				{isLoading && (
					<Space size='middle' className='spinner'>
						<Spin size='large'></Spin>
					</Space>
				)}
			</PostContainer>
		</>
	);
}
