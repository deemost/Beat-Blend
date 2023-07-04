## Local Dev Setup
Local dev setup requires creating apps for spotify/youtube for the host

### Setup Spotify App
1. go to https://developer.spotify.com/dashboard and login
2. create an app
3. specify redirect URL to be http://localhost:3001/callback/spotify (matches server callback)
4. record client id and client secret in `/server/.env` file

### Spotify Web Api
https://developer.spotify.com/documentation/web-api

### Setup YouTube App
1. go to https://console.cloud.google.com/apis/dashboard
2. create a new project
3. create new credentials of type: OAuth 2.0 Client IDs
4. specify redirect URL to be http://localhost:3001/callback/youtube (matches server callback)
5. record client id and client secret in `/server/.env` file

### Other Settings
In `/server/.env` file, specify `FINAL_RESPONSE_URI=http://localhost:3000` as well as all service client ids, secrets, and keys 


### Heroku
1. `heroku login`
2. `cd spotify-clone`
3. `heroku git:remote -a beatblend` (this is a one-time command to create the Heroku remote)
4. `git subtree push --prefix server heroku main`