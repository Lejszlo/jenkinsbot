var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");

module.exports = {
    addDialogs: addDialogs  
};

var jenkinsServer = jenkins.server;

function addDialogs(bot) {
    
    bot.add('/delete', [
            function (session) {
                session.replaceDialog("/calculate_job_name", {nextDialogId : '/deleteJob'});
            },           
        ]); 
  bot.add('/deleteJob', [
            function (session, args) {
                var jobName = args.jobName; 
                builder.Prompts.confirm(session, "Are you sure to delete " + jobName + "?");
            },
            function (session, result) {
                if(result.response) {
                    jenkinsServer.delete(jobName, function(err, data) {
                        if (err){ 
                            session.endDialog("Sorry, something went wrong!");
                        }
                        session.endDialog("I have delete " + jobName + ".");
                    })                    
                }
            }
            
        ]);      
}