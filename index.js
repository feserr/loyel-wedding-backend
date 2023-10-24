require('dotenv-flow').config();
require('./src/utils/logger');
require('./src/utils/spotifyApi');

const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const db = require('./db/db/models');

const { ORIGINS } = process.env;

app.use(cors({ origin: ORIGINS.split(','), credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

// Invitation routes
app.use('/api/bank', require('./src/routes/bankRoutes'));

// Spotify
app.use('/api/spotify', require('./src/routes/spotifyRoutes'));

// Playlist routes
app.use('/api/search', require('./src/routes/searchRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/role', require('./src/routes/roleRoutes'));
app.use('/api/track', require('./src/routes/trackRoutes'));
app.use('/api/like', require('./src/routes/likeRoutes'));

module.exports = app;
