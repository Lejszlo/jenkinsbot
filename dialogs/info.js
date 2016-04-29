var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");

module.exports = {
    addDialogs: addDialogs  
};

var jenkinsServer = jenkins.server;

function addDialogs(bot) {
    
    bot.add('/info about', [
            function (session) {
                var message = session.message.text;
                var jobName = message.split(" ")[1];
                
                if(jobName) {
                    jenkinsServer.last_build_info(jobName, function(err, data) {
                        if (err){ 
                            console.log(data);
                        }
                        session.endDialog(getText(data));
                    })
                    
                }
            },
            
        ]);       
}