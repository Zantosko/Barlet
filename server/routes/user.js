const router = require('express').Router();
const {
	User,
	Profile,
	Post,
	sequelize,
} = require('../models');
const authorization = require('../middleware/authorization');
const path = require('path');
const multer = require('multer');
const moment = require('moment');

const multerConfig = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'public/uploads/');
	},
	filename: (req, file, callback) => {
		const ext = file.mimetype.split('/')[1];
		callback(null, `image-${Date.now()}.${ext}`);
	},
});

const upload = multer({
	storage: multerConfig,
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
		console.log(file);
		const profileImage = file.filename;
		user.update({ profileImage });
		res.status(200).json({
			status: true,
		});
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

router.get('/post', authorization, async (req, res) => {
	try {
		const post = await Post.findAll({
			where: {
				userId: req.user,
			},
		});

		res.json(post);
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
// router.get('/post', authorization, async (req, res) => {
// 	try {
// 		const pageAsNumber = Number.parseInt(req.query.page);
// 		const sizeAsNumber = Number.parseInt(req.query.size);

// 		let page = 0;
// 		if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
// 			page = pageAsNumber;
// 		}

// 		let size = 3;
// 		if (
// 			!Number.isNaN(sizeAsNumber) &&
// 			sizeAsNumber > 0 &&
// 			sizeAsNumber < 5
// 		) {
// 			size = sizeAsNumber;
// 		}

// 		const posts = await Post.findAndCountAll({
// 			where: {
// 				userId: req.user,
// 			},
// 			limit: size,
// 			offset: page * size,
// 		});

// 		res.json({
// 			content: posts.rows,
// 			totalPages: Math.ceil(posts.count / size),
// 		});
// 	} catch (error) {
// 		console.log('Failed to fetch posts', error);
// 		return res.status(500).send({
// 			success: false,
// 			message: 'Failed to fetch posts',
// 		});
// 	}
// });

module.exports = router;
