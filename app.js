const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

// open express server port
app.listen(process.env.PORT);

const userRouter = require('./routes/users');

app.use('/', userRouter);
