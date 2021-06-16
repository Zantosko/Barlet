const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 4001;

//* Middleware
app.use(express.json());
app.use(cors());

//* Routes

//? Index Route
app.use('/', require('./routes/index'));

//? Authorization Route
app.use('/auth', require('./routes/jwtAuth'));

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
