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
                var message = session.message.text;
                var jobName = message.split(" ")[1];
                
                if(!jobName) {
                    builder.Prompts.text("Which job do you want delete?");
                } else {
                    session.openDialog('/deleteJob', {jobName : jobName});
                }
            },
            function (session, result) {
                if(result.response) {
                    session.openDialog('/deleteJob', {jobName : result.response});
                }
            }
            
        ]); 
  bot.add('/deleteJob', [
            function (session, args) {
                var jobName = args.jobName;
  
                jenkinsServer.job-info(jobName, function(err,data) {
                    if(err) {
                        session.endDialog("Sorry, there is no job with the given name!");
                    }
                });   
                builder.Prompts.confirm(session, "Are you sure to delete " + jobName + "?");
            },
            function (session, result) {
                if(result.response) {
                    jenkinsServer.delete(jobName, function(err, data) {
                        if (err){ 
                            console.log(data);
                            session.endDialog("Sorry, something went wrong!");
                        }
                        session.endDialog("I have delete " + jobName + ".");
                    })                    
                }
            }
            
        ]);      
}