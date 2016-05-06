var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");
var dateFormat = require('dateformat');

var jenkinsServer = jenkins.server;

module.exports = {
    addDialogs: addDialogs  
};

function addDialogs(bot) {
    
    bot.add('/build', [
            function (session) {
                session.replaceDialog("/calculate_job_name", {nextDialogId : '/buildJob'});
            },
        ]);        
    bot.add('/buildJob', [
            function (session, args) {
                var jobName = args.name;
                jenkinsServer.build(jobName, function(err, data){
                    session.endDialog(jobName + " is building. If you want information about building type /last build "+ jobName);
                });
            },
    ]);
    
     bot.add('/lastbuild', [
            function (session) {
                var message = session.message.text;
                var jobName = message.split(" ")[2];
                
                if(jobName) {
                    jenkinsServer.last_build_info(jobName, function(err, data) {
                        if (err){ 
                            console.log(data);
                            session.endDialog("Sorry, there was an error. :( )");
                        }
                        session.endDialog(getLastBuildText(data));
                    })
                    
                }
            },
        ]);       
}

function getLastBuildText(data) {
    if(data.building) {
        return "The job is building. ".concat(getShortDescription(data), " at ", dateFormat(new Date(data.timestamp)));
    }
    return "The build was ".concat(data.result, ". ", getShortDescription(data), " at ", dateFormat(new Date(data.timestamp)));
}

function getShortDescription(data) {
    try{
        return data.actions[0].causes[0].shortDescription;
    }catch(e){
        return "";
    }
}
