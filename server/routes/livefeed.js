const router = require('express').Router();
const authorization = require('../middleware/authorization');
const { Post } = require('../models');

router.get('/posts', async (req, res) => {
	try {
		const posts = await Post.findAll();
		res.status(200).json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

module.exports = router;
