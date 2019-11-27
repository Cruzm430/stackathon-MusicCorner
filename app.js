const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const client_id = '353ef1b37482472d81114631b893922d'; 
const client_secret = 'bf197ca4e4554ba5bfe86a62627d6f3e';
const redirect_uri = 'http://localhost:5000/back/';

app.use('/build', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));
app.get('/back/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/login', function(req, res) {
  var scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
  });

module.exports = app;