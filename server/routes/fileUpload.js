const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' });

router.put(
	'/profile-pic',
	upload.single('file'),
	async (req, res) => {
		const { id } = req.session.user;
		const user = await User.findByPk(id);

		const { file } = req;
		const profilePic = '/uploads/' + file.filename;
		user.update({ profilePic });
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

module.exports = router;
