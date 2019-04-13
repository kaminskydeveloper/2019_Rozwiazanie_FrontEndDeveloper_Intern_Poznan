const express = require('express');
const request = require('request');
const querystring = require('query-string');
const volleyball = require('volleyball');

const SPOTIFY_CLIENT_ID = 'put here your spotify client id';

const SPOTIFY_CLIENT_SECRET = 'put here your spotify client secret';

const app = express();
app.use(volleyball);

const redirect_uri =
  process.env.REDIRECT_URI || 'http://localhost:8000/callback';

app.get('/login', function(req, res) {
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope: 'user-read-private user-read-email',
        redirect_uri,
      })
  );
});

app.get('/callback', function(req, res) {
  let code = req.query.code || null;

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString(
          'base64'
        ),
    },
    json: true,
  };

  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000';
    res.redirect(uri + '?access_token=' + access_token);
  });
});

const port = process.env.PORT || 8000;
console.log(
  `Listening on port ${port}. Path /login initiate authentication flow.`
);
app.listen(port);
