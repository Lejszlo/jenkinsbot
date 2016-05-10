var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");

module.exports = {
    addDialogs: addDialogs,
    jobIsExist : jobIsExist
};

var jenkinsServer = jenkins.server;

function addDialogs(bot) {
    
   bot.add('/calculate_job_name', [
            function (session, args) {
                var message = session.message.text;
                var jobName = message.split(" ")[1];
                session.dialogData.nextDialogId = args.nextDialogId;
                
                if(jobName) {
                    jenkinsServer.job_info(jobName, function(err,data) {
                        if(err) {
                            session.endDialog("Sorry, there is no job with the given name!");
                        }
                    });
                    session.replaceDialog(session.dialogData.nextDialogId, {name : jobName});
                } else {
                    builder.Prompts.text(session, "What is the name of the job which would like to build?");
                }
            },
            function (session, results) {
                if(results.response) {
                    jenkinsServer.job_info(jobName, function(err,data) {
                        if(err) {
                            session.endDialog("Sorry, there is no job with the given name!");
                        }
                    });
                    session.replaceDialog(session.dialogData.nextDialogId, {name : results.response});
                }
            },
    ]);    
}