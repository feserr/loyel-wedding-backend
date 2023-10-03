require('dotenv-flow').config();
require('./src/utils/logger');

const express = require('express');

const app = express();
const cors = require('cors');

const { ORIGINS } = process.env;

app.use(cors({ origin: ORIGINS.split(',') }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/bank', require('./src/routes/bankRoutes'));
app.use('/api/track', require('./src/routes/trackRoutes'));
app.use('/api/like', require('./src/routes/likeRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));

module.exports = app;
