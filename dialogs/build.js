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
                    session.beginDialog("/buildJob", {name : jobName});
                } else {
                    builder.Prompts.text(session, "What is the name of the job which would like to build?");
                }
            },
            function (session, results) {
                if(results.response) {
                    session.beginDialog("/buildJob", {name : results.response});
                }
            },
            
        ]);        
    bot.add('/buildJob', [
            function (session, args) {
                var jobName = args.name;
                console.log("Job name: " + jobName)
                //var jobInfo = jenkins.job_info(jobName);
                //if(jobInfo === undefined) {
                //     session.endDialog("The job is not exist. You can list the available jobs with the '/listjobs [viewName]' command");
                //}
                jenkins.build(jobName);
                session.dialogData.jobName = jobName;
                builder.Prompts.confirm(session, jobName + " is building. Do you want to give notification about process result?");
            },
            function (session, results) {
                if (results.response) {
                    session.beginDialog('/notifybuilding', {name: session.dialogData.jobName});
                } else {
                    session.endDialog("Ok.");
                }
            }
    ]);
    
    bot.add('/notifybuilding', [
        function (session, args) {
                var building = true;
                var data;
                while(building) {
                    setTimeout(function() {
                        data = jenkins.last_build_info(args.name);
                        building = data.building;
                        console.log(building);
                    }, 5000);
                }
                
                session.endDialog("Result: " + data.result);
            },
    ])
}