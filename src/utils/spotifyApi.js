const SpotifyWebApi = require('spotify-web-api-node');
const retrieveAccessToken = require('./spotify');

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.AUTH_CALLBACK_PATH,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const toSeconds = 1000;
let refreshTime = 0;
setTimeout(() => {
  const expiresIn = retrieveAccessToken();
  if (expiresIn !== -1) refreshTime = expiresIn - 10;
}, refreshTime * toSeconds);

global.spotifyApi = spotifyApi;
