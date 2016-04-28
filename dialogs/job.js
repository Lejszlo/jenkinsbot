var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");

module.exports = {
    addDialogs: addDialogs  
};

function addDialogs(bot) {
    
    bot.add('/listjobs', [
            function (session) {
                var message = session.message.text;
                var viewName = message.split(" ")[1];
                
                if(viewName) {
                    console.log(viewName);
                    var jobs = jenkins.all_jobs_in_view(viewName);
                    session.endDialog(listNameOfJobs(jobs));
                } else {
                    builder.Prompts.text(session, "Which view want to list?");
                }
            },
            function (session, results) {
                if(results.response) {
                    console.log(results.response);
                    var jobs = jenkins.all_jobs_in_view(results.response);
                    session.send(listNameOfJobs(jobs));
                    session.endDialog();
                }
            },
            
        ]);       
}

function listNameOfJobs(jobs) {
    var names = "";
    for(job in jobs) {
        names += " * " + job.name + " \n";
    };
    return names;
}