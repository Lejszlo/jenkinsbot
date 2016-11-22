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
    appId: 'jenkinsbot',
    appPassword: '5d11dbef64694e19a7ed919f6ba745ab'
});
var bot = new builder.UniversalBot(connector);

app.post('/api/messages', connector.listen());

index.addDialogs(bot);
info.addDialogs(bot);