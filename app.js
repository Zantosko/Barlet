const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 4001;

//* Shorten file path
app.use(
	'/uploads',
	express.static(path.join(__dirname, 'public/uploads'))
);

//* Middleware
app.use(express.json());
app.use(cors());

app.use(
	express.static(path.join(__dirname, 'client/build'))
);

//* Routes

//? Index Routes
app.use('/', require('./routes/index'));

//? Authorization Routes
app.use('/auth', require('./routes/jwtAuth'));

//? User Routes
app.use('/user', require('./routes/user'));

//? Livefeed Routes
app.use('/livefeed', require('./routes/livefeed'));

app.get('*', (req, res) => {
	res.sendFile(
		path.join(__dirname + '/client/build/index.html')
	);
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
