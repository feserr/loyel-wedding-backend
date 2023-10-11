function retrieveAccessToken() {
  let expiresIn = -1;
  global.spotifyApi.clientCredentialsGrant().then(
    (data) => {
      global.logger.info(`The access token expires in ${data.body.expires_in}`);
      global.logger.info(`The access token is ${data.body.access_token}`);

      global.spotifyApi.setAccessToken(data.body.access_token);
      expiresIn = data.body.expires_in;
    },
    (err) => {
      global.logger.error(`Something went wrong when retrieving an access token: ${err}`);
    },
  );

  return expiresIn;
}

module.exports = retrieveAccessToken;
