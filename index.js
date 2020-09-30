const express = require('express')
const app = express()
const fetch = require('node-fetch')

const client_id = "63ca8bb4-4f54-4525-9129-db6a5540ff71/b33b8767-51aa-481d-a87d-aa014b60e93d"
const client_secret = "uf,W)5eIzZ?O500C4N>{"
const redirect_uri = 'https://2dd93a8cb437.ngrok.io/api/sage/auth/callback'

const config = {
    client_id,
    client_secret,
    redirect_uri,
    authorizationUri: 'https://www.sageone.com/oauth2/auth/central?filter=apiv3.1',
    accessTokenUri: "https://oauth.accounting.sage.com/token",
}

const paramsToWWWurlencoded = (params) => Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

function saveToken(token) {
  console.log('Token: ', token)
}

app.get('/login', (req,res) => {
  const {client_id, redirect_uri } = config
  const loginParams = {
    response_type: 'code',
    scope: 'readonly',
    country: 'GB',
    client_id,
    redirect_uri,
  }
  const uri = config.authorizationUri + '&' + paramsToWWWurlencoded(loginParams)
  console.log('uri:',uri)
  res.redirect(uri)
})

app.get('/api/sage/auth/callback', (req,res) => {
  const {code} = req.query
  const {client_id, client_secret, redirect_uri } = config
  const opts = {
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri,
    code,
    grant_type: 'authorization_code',
  }

  const fetchOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: paramsToWWWurlencoded(opts)
  }
  console.log('fetchOptions:', fetchOptions)

  fetch(config.accessTokenUri, fetchOptions )
    .then(res => res.json())
    .then(json => saveToken(json))
    .then(res.send('All done'))

})

app.listen(80)
console.log('Listening on port 80')
