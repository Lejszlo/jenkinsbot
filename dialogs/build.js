var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");

module.exports = {
    addDialogs: addDialogs  
};

function addDialogs(bot) {
    
    bot.add('/build', [
            function (session) {
                var message = session.message.text;
                var jobName = message.split(" ")[1];
                
                if(jobName) {
                    session.beginDialog("/buildJob", {jobName : jobName});
                    session.endDialog("");
                } else {
                    builder.Prompts.text(session, "What is the name of the job which would like to build?");
                }
            },
            function (session, results) {
                session.beginDialog("/buildJob", {jobName : results});
                session.endDialog("");
            },
            
        ]);
        
    bot.add('/buildJob', [
            function (session, args) {
                var data = jenkins.build(args.jobName);
                session.dialogData.jobName = args.jobName;
                builder.Prompts.confirm(session, "Do you want to watch it?");
            },
            function (session, results) {
                if (results.response) {
                    session.beginDialog("/watchBuilding", {jobName : session.dialogData.jobName});
                    session.endDialog("");
                } else {
                    session.endDialog(data.message + ", location: " + data.location);
                }
            }
    ]);
    bot.add('/watchBuilding', [
            function (session, args) {
                var building = true;
                var data;
                while(building) {
                    setTimeout(function() {
                        data = jenkins.last_build_info(args.jobName);
                        building = data.building;
                    }, 10000);
                }
                
                session.endDialog("Result: " + data.result);
            },
            
        ]);
}