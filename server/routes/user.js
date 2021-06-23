const router = require('express').Router();
const { User, Profile, Post } = require('../models');
const authorization = require('../middleware/authorization');
const path = require('path');
const multer = require('multer');

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

module.exports = router;
