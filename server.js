var express = require('express');
var builder = require('botbuilder');
var index = require('./dialogs/index');
var info = require('./dialogs/info');
var prompts = require('./prompts');

//Create server
var app = express();
app.locals.title = 'JenkinsBot';
app.set('view engine', 'pug');
app.get('/', function (req, res) {
   res.render('index');
});

var listener = app.listen(process.env.PORT || 8080, function () {
   console.log('%s listening on %s port', app.locals.title, listener.address().port); 
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: 'a46a8f2e-7c91-4639-aa9c-fd0d55ae7088',
    appPassword: 'tt6YPJqQnMdT9tpmEzmQC8H'
});
var bot = new builder.UniversalBot(connector);
app.post('/api/messages', connector.listen());

index.addDialogs(bot);
info.addDialogs(bot);