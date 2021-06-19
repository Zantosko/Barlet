const router = require('express').Router();
const { User, Profile, Post } = require('../models');
const authorization = require('../middleware/authorization');
const path = require('path');
const multer = require('multer');

const upload = multer({ dest: '../public/uploads/' });

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
		const profileImage =
			file.fieldname +
			'-' +
			Date.now() +
			path.extname(file.originalname);
		user.update({ profileImage });
		res.status(200).json({
			status: true,
		});
	}
);

router.get('/profile-pic', async (req, res) => {
	const { id } = req.session.user;
	const user = await User.findByPk(id);
	const photo = user.profilePic;
	res.status(200).json({
		photo,
	});
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
		res.status(500).send('Server error');
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
		res.status(500).send('Server error');
	}
});

module.exports = router;
