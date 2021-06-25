const router = require('express').Router();
const authorization = require('../middleware/authorization');
const { Post, User, Profile } = require('../models');

router.get('/posts', async (req, res) => {
	try {
		const posts = await Post.findAll();
		res.status(200).json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
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
