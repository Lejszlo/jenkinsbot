var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");

module.exports = {
    addDialogs: addDialogs  
};

var jenkinsServer = jenkins.server;

function addDialogs(bot) {
    
    bot.add('/list', function(session) {
        var message = session.message.text;
        var splitted = message.split(" ");
        var secondCommand = splitted[1];
        
        if(splitted.indexOf("job") != -1 || splitted.indexOf("jobs") != -1) {
            if(splitted.indexOf("all") != -1) {
                session.replaceDialog('/listalljobs');
            } else {
                session.replaceDialog('/listjobs', {viewName : splitted[2]});
            }
        }
    });
    bot.add('/listalljobs',function(session) {
        jenkinsServer.all_jobs(function (err, data) {
            session.endDialog(listNameOfJobs(data));
        });
    });
    bot.add('/listjobs', [
            function (session, args) {
                var viewName = args.viewName;
                
                if(viewName) {
                    jenkinsServer.all_jobs_in_view(viewName, function (err, data) {
                        if(err) {
                            console.log(data);
                        }
                        session.endDialog(listNameOfJobs(data));
                    });
                    
                } else {
                    builder.Prompts.text(session, "Which view want to list?");
                }
            },
            function (session, results) {
                if(results.response) {
                    jenkinsServer.all_jobs_in_view(results.response, function (err, data) {
                        if(err) {
                            console.log(data);
                        }
                        session.endDialog(listNameOfJobs(data));
                    });     
                }
            },
            
        ]);       
}

function listNameOfJobs(jobs) {
    var names = "";
    for(i=0; i<jobs.length; ++i) {
        names += " * " + jobs[i].name + " \n";
    };
    return names;
}