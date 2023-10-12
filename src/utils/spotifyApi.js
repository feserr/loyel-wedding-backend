const SpotifyWebApi = require('spotify-web-api-node');
const retrieveAccessToken = require('./spotify');

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.AUTH_CALLBACK_PATH,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function tokenRefresher(refreshTime) {
  const toSeconds = 1000;
  setTimeout(async () => {
    let nextRefreshTime = refreshTime;

    const expiresIn = await retrieveAccessToken();
    if (expiresIn !== -1) nextRefreshTime = expiresIn - 10;

    tokenRefresher(nextRefreshTime);
  }, refreshTime * toSeconds);
}

tokenRefresher(1);

global.spotifyApi = spotifyApi;
