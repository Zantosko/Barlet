import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
} from 'react';
import Navbar2 from './Navbar2';
import Post from './Post';
import Review from './Review';

// Styled components
import {
	ProfileContainer,
	PostsContainer,
	InputContainer,
	PostInput,
	PostButton,
	RadioContainer,
	PostContainer2,
	PostContainer3,
	ReviewText,
	Alignment,
} from './styled-components/ProfileStyles';

// Antd design library
import { Radio, Spin, Space, Rate } from 'antd';

import { Tabs } from 'antd';

// React Toastify
import { toast } from 'react-toastify';

// Redux Hooks
import { useSelector, useDispatch } from 'react-redux';

// Redux Actions
import { setProfileInfo } from '../actions/profileInfo-actions';
import { setPostText } from '../actions/posts/postText-actions';
import { setRank } from '../actions/posts/rank-actions';
import { setRating } from '../actions/reviews/rating-actions';
import { setReviewText } from '../actions/reviews/reviewText-actions';
import { setTitle } from '../actions/reviews/title-actions';
import ProfileHeader from './ProfileHeader';

// Tabs for post and reviews
const { TabPane } = Tabs;

export default function Profile({ match }) {
	const dispatch = useDispatch();
	const postText = useSelector((state) => state.postText);
	const rank = useSelector((state) => state.rank);
	const showMenu = useSelector((state) => state.showMenu);
	const rating = useSelector((state) => state.rating);
	const title = useSelector((state) => state.title);
	const reviewText = useSelector((state) => state.reviewText);

	//* Local state variables
	//? Post state vars
	const [items, setItems] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const observer = useRef();

	//? Review state vars
	const [reviews, setReviews] = useState([]);
	const [totalReviewPages, setTotalReviewPages] = useState(0);
	const [reviewPageNumber, setReviewPageNumber] = useState(0);
	const [reviewIsLoading, setReviewIsLoading] = useState(false);
	const [reviewHasMore, setReviewHasMore] = useState(true);
	const reviewObserver = useRef();

	//* Grabs initial info on page load
	useEffect(() => {
		setProfileInfo(dispatch);
		getPosts(pageNumber);
		setPageNumber((pageNumber) => pageNumber + 1);
		getReviews(reviewPageNumber);
		setReviewPageNumber((reviewPageNumber) => reviewPageNumber + 1);
	}, []);

	//* Function is called once last post is rendered
	const lastItemRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					if (pageNumber < totalPages) {
						getPosts(pageNumber);
						setPageNumber((pageNumber) => pageNumber + 1);
					} else {
						setHasMore(false);
					}
				}
			});

			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
	);

	//* Function is called once last review is rendered
	const lastReviewRef = useCallback(
		(node) => {
			if (reviewIsLoading) return;
			if (reviewObserver.current) reviewObserver.current.disconnect();

			reviewObserver.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && reviewHasMore) {
					if (reviewPageNumber < totalReviewPages) {
						getReviews(reviewPageNumber);
						setReviewPageNumber(
							(reviewPageNumber) => reviewPageNumber + 1
						);
					} else {
						setReviewHasMore(false);
					}
				}
			});

			if (node) reviewObserver.current.observe(node);
		},
		[reviewIsLoading, reviewHasMore]
	);

	//* Grab posts from database
	const getPosts = async (pageNum) => {
		try {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 500));

			const response = await fetch(
				`/user/post?page=${pageNum}&size=2`,
				{
					method: 'GET',
					headers: { token: localStorage.token },
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

	//* Grab reviews from database
	const getReviews = async (pageNum) => {
		try {
			setReviewIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 500));
			const response = await fetch(
				`/user/review?page=${pageNum}&size=2`,
				{
					method: 'GET',
					headers: { token: localStorage.token },
				}
			);

			const parseResponse = await response.json();
			setReviews([...reviews, ...parseResponse.content]);
			setTotalReviewPages(parseResponse.totalPages);
			setReviewIsLoading(false);
		} catch (err) {
			console.error(err.message);
		}
	};

	//* Create new post
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

			const response = await fetch('/user/post', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

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

	//* Create new review
	const onSubmitReview = async (e) => {
		e.preventDefault();

		try {
			const { id } = match.params;
			const convertIdToNumber = Number(id);
			const body = {
				title,
				reviewText,
				rating,
				userId: convertIdToNumber,
			};

			const response = await fetch('/user/review', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			const parseResponse = await response.json();

			if (response.status === 200) {
				toast.info(parseResponse);
				setTitle(dispatch, '');
				setReviewText(dispatch, '');
				setRating(dispatch, 3);
				window.location.reload();
			} else {
				toast.error(parseResponse);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	//* Rating choices
	const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

	return (
		<>
			<Navbar2 />
			<ProfileContainer>
				<ProfileHeader match={match} />
				<PostsContainer>
					<h1>Posts & Reviews</h1>
					<Tabs
						defaultActiveKey='1'
						style={
							showMenu === true ? { zIndex: '-1' } : { zIndex: '0' }
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
										className='radio'
										onChange={(e) =>
											setRank(dispatch, e.target.value)
										}
										value={rank}
										name='rank'
									>
										<Radio value={1}>🔥 High volume</Radio>
										<Radio value={2}>🧊 Laid back</Radio>
										<Radio value={3}>💀 Dead</Radio>
										<Radio value={4}>😎 College crowd</Radio>
										<Radio value={5}>👴 Older crowd</Radio>
									</Radio.Group>
								</RadioContainer>
								<PostButton type='submit'>Send</PostButton>
							</InputContainer>
							<PostContainer2>
								{items.map((post, idx) =>
									idx + 1 === items.length ? (
										<Post
											reference={lastItemRef}
											key={idx}
											postInfo={post}
										></Post>
									) : (
										<Post key={idx} postInfo={post}></Post>
									)
								)}

								{isLoading && (
									<Space size='middle' className='spinner'>
										<Spin size='large'></Spin>
									</Space>
								)}
							</PostContainer2>
						</TabPane>
						<TabPane tab='Reviews' key='2'>
							<InputContainer
								review
								onSubmit={onSubmitReview}
								style={
									showMenu === true
										? { zIndex: '-1' }
										: { zIndex: '0' }
								}
							>
								<Alignment>
									<h3>Title</h3>
								</Alignment>
								<PostInput
									review
									type='text'
									name='title'
									placeholder='Headline for your review'
									value={title}
									onChange={(e) => setTitle(dispatch, e.target.value)}
								/>
								<Alignment>
									<h3>Review</h3>
								</Alignment>
								<ReviewText
									name='reviewText'
									placeholder='Give feedback about the bar you are at'
									value={reviewText}
									onChange={(e) =>
										setReviewText(dispatch, e.target.value)
									}
								/>
								<h3>How would you rate the experience?</h3>
								<Rate
									name='rating'
									tooltips={desc}
									value={rating}
									onChange={(e) => setRating(dispatch, e)}
									style={{ fontSize: '30px' }}
								/>
								{rating ? (
									<span className='ant-rate-text'>
										{desc[rating - 1]}
									</span>
								) : (
									''
								)}
								<PostButton review type='submit'>
									Send
								</PostButton>
							</InputContainer>
							<PostContainer3>
								{reviews.map((review, idx) =>
									idx + 1 === reviews.length ? (
										<Review
											reference={lastReviewRef}
											key={idx}
											reviewInfo={review}
										></Review>
									) : (
										<Review key={idx} reviewInfo={review}></Review>
									)
								)}

								{reviewIsLoading && (
									<Space size='middle' className='spinner'>
										<Spin size='large'></Spin>
									</Space>
								)}
							</PostContainer3>
						</TabPane>
					</Tabs>
				</PostsContainer>
			</ProfileContainer>
		</>
	);
}
