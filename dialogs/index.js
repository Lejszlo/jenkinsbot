var builder = require("botbuilder");
var prompts = require("../prompts");

module.exports = {
    addDialogs: addDialogs  
};

function addDialogs(bot) {
    
    bot.add('/', new builder.CommandDialog()
        .matches('/help', builder.DialogAction.send(prompts.helpMessage))
        .matches('/build', "/build")
        .matches('/list [(all ){?}job(s){?}|views|builds|queue] (under){?}', "/list")
        .matches('/last build',"/lastbuild")
        .matches('/[job|build] info about')
        .matches('/goodbye|/bye|/quit|/exit', builder.DialogAction.endDialog(prompts.goodbye))
        .onDefault(builder.DialogAction.send(prompts.unknown)));
}