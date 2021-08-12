const router = require('express').Router();
const authorization = require('../middleware/authorization');
const { User, Profile } = require('../models');

//* Fetches user info from DB
router.get('/', authorization, async (req, res) => {
	const user = await User.findOne({
		where: {
			id: req.user,
		},
	});

	res.json(user);
});

//* Fetches user profile info from DB
router.get('/profile', authorization, async (req, res) => {
	const user = await Profile.findOne({
		where: {
			userId: req.user,
		},
	});

	res.json(user);
});

module.exports = router;
