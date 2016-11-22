var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");

module.exports = {
    addDialogs: addDialogs
};

var jenkinsServer = jenkins.server;

function addDialogs(bot) {
    
   bot.dialog('/report', [
            function (session) {
                jenkinsServer.job_info('Daily', function(err,data) {
                    if(err) {
                        session.endDialog("Sorry, there is no job with the given name!");
                    }
                });
                session.replaceDialog(session.dialogData.nextDialogId, {name : results.response, args: args}); 
            }
    ]);    
}