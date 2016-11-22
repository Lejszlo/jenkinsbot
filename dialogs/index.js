var builder = require("botbuilder");
var prompts = require("../prompts");

module.exports = {
    addDialogs: addDialogs  
};

function addDialogs(bot) {
    var intents = new builder.IntentDialog()
    bot.dialog('/', intents);
    intents.matches(/^hi/i, '/report')
            .matches('/goodbye|/bye|/quit|/exit', builder.DialogAction.endDialog(prompts.goodbye))
            .onDefault(builder.DialogAction.send(prompts.unknown));
}