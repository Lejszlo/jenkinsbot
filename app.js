var restify = require('restify');
var builder = require('botbuilder');
var index = require('./dialogs/index');
var build = require('./dialogs/build');
var job = require('./dialogs/job');
var info = require('./dialogs/info');
var prompts = require('./prompts');

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });

index.addDialogs(bot);
build.addDialogs(bot);
job.addDialogs(bot);
info.addDialogs(bot);

// Install First Run middleware and dialog
bot.use(function (session, next) {
    if (!session.userData.firstRun) {
        session.userData.firstRun = true;
        session.beginDialog('/firstRun');
    } else {
        next();
    }
});
bot.add('/firstRun', [
    function (session) {
        session.userData.name = session.message.from.name;
        
        session.send(prompts.welcome, session.userData.name);
        session.replaceDialog('/'); 
    }
]);

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});