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

//* Routes

//? Index Routes
app.use('/', require('./routes/index'));

//? Authorization Routes
app.use('/auth', require('./routes/jwtAuth'));

//? File Upload Routes
app.use('/user', require('./routes/user'));

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
