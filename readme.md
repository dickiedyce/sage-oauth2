# OAuth2 Test for Sage access

1. Install `ngrok` - site: [ngrok.com](https://ngrok.com/) - and register account;
2. Run `./ngrok http 80` from installed folder;
3. Copy https path from terminal console;
4. Create Sage Application endpoint on Sage Developer Site - site: [developerselfservice.sageone.com](https://developerselfservice.sageone.com/user) ;
5. Copy `Client ID` and `Client Secret` from new app.
6. Update credentials and path (`client_id`, `client_secret`, `redirect_uri`) in `index.js`.
7. Run `Yarn install`
8. Run with `nodemon index.js`
