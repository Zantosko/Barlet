const router = require('express').Router();
const {
	User,
	Profile,
	Post,
	Review,
	sequelize,
} = require('../models');
const authorization = require('../middleware/authorization');
const path = require('path');
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

//* S3 imports
const { uploadFile, getFileStream } = require('./s3');

//* Multer upload var
const upload = multer({
	dest: 'public/uploads',
});

//* Profile Card Routes

router.get('/profile-pic/:key', (req, res) => {
	const { key } = req.body;
	const readStream = getFileStream(key);
	console.log(readStream);
});

router.put(
	'/profile-pic',
	authorization,
	upload.single('file'),
	async (req, res) => {
		const user = await Profile.findOne({
			where: {
				userId: req.user,
			},
		});

		const { file } = req;

		const result = await uploadFile(file);
		console.log(result);

		await unlinkFile(file.path);

		const profileImage = result.Location;
		user.update({ profileImage });
		res.send({ imagePath: `/profile-pic/${result.Key}` });
	}
);

router.put('/update-bio', async (req, res) => {
	try {
		const { bio, userId } = req.body;
		const user = await Profile.findOne({
			where: {
				userId: userId,
			},
		});

		user.update({ bio });
		res.status(200).json('Your bio has been updated');
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

//* Post Routes
router.post('/post', async (req, res) => {
	try {
		const { postText, rank, userId } = req.body;

		if (![postText, rank].every(Boolean)) {
			return res
				.status(401)
				.json('Please Fill out all fields');
		}

		const newPost = Post.create({
			postText,
			rank,
			userId,
		});

		res.status(200).json('Post submitted');
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

router.delete('/post', async (req, res) => {
	try {
		const { id } = req.body;

		await Post.destroy({
			where: {
				id,
			},
		});

		res.status(200).json('Post deleted');
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

/*
 * List posts
 */
router.get('/post', authorization, async (req, res) => {
	try {
		const pageAsNumber = Number.parseInt(req.query.page);
		const sizeAsNumber = Number.parseInt(req.query.size);

		let page = 0;
		if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
			page = pageAsNumber;
		}

		let size = 3;
		if (
			!Number.isNaN(sizeAsNumber) &&
			sizeAsNumber > 0 &&
			sizeAsNumber < 5
		) {
			size = sizeAsNumber;
		}

		const posts = await Post.findAndCountAll({
			where: {
				userId: req.user,
			},
			limit: size,
			offset: page * size,
			order: [['createdAt', 'DESC']],
		});

		res.json({
			content: posts.rows,
			totalPages: Math.ceil(posts.count / size),
		});
	} catch (error) {
		console.log('Failed to fetch posts', error);
		return res.status(500).send({
			success: false,
			message: 'Failed to fetch posts',
		});
	}
});

//* Review Routes
router.post('/review', async (req, res) => {
	try {
		const { title, reviewText, rating, userId } = req.body;

		if (![title, reviewText, rating].every(Boolean)) {
			return res
				.status(401)
				.json('Please Fill out all fields');
		}

		const newReview = Review.create({
			title,
			reviewText,
			rating,
			userId,
		});

		res.status(200).json('Review submitted');
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

router.get('/review', authorization, async (req, res) => {
	try {
		const pageAsNumber = Number.parseInt(req.query.page);
		const sizeAsNumber = Number.parseInt(req.query.size);

		let page = 0;
		if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
			page = pageAsNumber;
		}

		let size = 3;
		if (
			!Number.isNaN(sizeAsNumber) &&
			sizeAsNumber > 0 &&
			sizeAsNumber < 5
		) {
			size = sizeAsNumber;
		}

		const reviews = await Review.findAndCountAll({
			where: {
				userId: req.user,
			},
			limit: size,
			offset: page * size,
			order: [['createdAt', 'DESC']],
		});

		res.json({
			content: reviews.rows,
			totalPages: Math.ceil(reviews.count / size),
		});
	} catch (error) {
		console.log('Failed to fetch reviews', error);
		return res.status(500).send({
			success: false,
			message: 'Failed to fetch reviews',
		});
	}
});

router.delete('/review', async (req, res) => {
	try {
		const { id } = req.body;

		await Review.destroy({
			where: {
				id,
			},
		});

		res.status(200).json('Review deleted');
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

module.exports = router;
