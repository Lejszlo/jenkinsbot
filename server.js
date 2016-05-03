var restify = require('restify');
var builder = require('botbuilder');
var index = require('./dialogs/index');
var build = require('./dialogs/build');
var job = require('./dialogs/job');
var info = require('./dialogs/info');
var deleteJob = require('./dialogs/delete');
var prompts = require('./prompts');

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });

index.addDialogs(bot);
build.addDialogs(bot);
job.addDialogs(bot);
info.addDialogs(bot);
deleteJob.addDialogs(bot);

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
server.post('/api/messages', bot.verifyBotFramework({ appId: 'jenkinsbot'}), bot.listen());
server.listen(process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url); 
});