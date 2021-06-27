const router = require('express').Router();
const authorization = require('../middleware/authorization');
const {
	Post,
	Review,
	User,
	Profile,
} = require('../models');

// router.get('/posts', async (req, res) => {
// 	try {
// 		const [posts, reviews] = await Promise.all([
// 			Post.findAll(),
// 			Review.findAll(),
// 		]);

// 		res.status(200).json([posts, reviews]);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).json('Server error');
// 	}
// });

router.get('/posts', async (req, res) => {
	try {
		const pageAsNumber = Number.parseInt(req.query.page);
		const sizeAsNumber = Number.parseInt(req.query.size);

		let page = 0;
		if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
			page = pageAsNumber;
		}

		let size = 2;
		if (
			!Number.isNaN(sizeAsNumber) &&
			sizeAsNumber > 0 &&
			sizeAsNumber < 5
		) {
			size = sizeAsNumber;
		}

		const posts = await Post.findAndCountAll({
			limit: size,
			offset: page * size,
			order: [['createdAt', 'DESC']],
		});

		const reviews = await Review.findAndCountAll({
			limit: size,
			offset: page * size,
			order: [['createdAt', 'DESC']],
		});

		const spreadData = [...posts.rows, ...reviews.rows];
		const sortedData = spreadData.sort(
			(a, b) => b.createdAt - a.createdAt
		);

		res.json({
			content: sortedData,
			totalPages:
				Math.ceil(reviews.count / size) +
				Math.ceil(posts.count / size),
		});
	} catch (error) {
		console.log('Failed to fetch reviews', error);
		return res.status(500).send({
			success: false,
			message: 'Failed to fetch reviews',
		});
	}
});

router.post('/post-data', async (req, res) => {
	try {
		const { id } = req.body;

		const [user, profile] = await Promise.all([
			User.findByPk(id),
			Profile.findOne({
				where: {
					userId: id,
				},
			}),
		]);
		res.status(200).json([user, profile]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

module.exports = router;
