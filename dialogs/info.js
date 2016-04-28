var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");

module.exports = {
    addDialogs: addDialogs  
};

var jenkinsServer = jenkins.server;

function addDialogs(bot) {
    
    bot.add('/lastbuild', [
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

function getText(data) {
    return "The build was ".concat(data.result, ". ", getShortDescription(data));
}

function getShortDescription(data) {
    try{
        return data.actions[0].causes[0].shortDescription;
    }catch(e){
        return "";
    }
}