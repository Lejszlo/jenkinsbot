var restify = require('restify');
var builder = require('botbuilder');
var index = require('./dialogs/index');
var build = require('./dialogs/build');
var prompts = require('./prompts');

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });

index.addDialogs(bot);
build.addDialogs(bot);

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
        builder.Prompts.text(session, "Hello, What's your name?");
    },
    function (session, results) {
        // We'll save the prompts result and return control to main through
        // a call to replaceDialog(). We need to use replaceDialog() because
        // we intercepted the original call to main and we want to remove the
        // /firstRun dialog from the callstack. If we called endDialog() here
        // the conversation would end since the /firstRun dialog is the only 
        // dialog on the stack.
        session.userData.name = results.response;
        
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