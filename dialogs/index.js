var builder = require("botbuilder");
var prompts = require("../prompts");

module.exports = {
    addDialogs: addDialogs  
};

function addDialogs(bot) {
    bot.dialog('/', new builder.IntentDialog()
        .matches(/^version/i, function (session) {
            session.send('Bot version 1.2');
        })
    );
}