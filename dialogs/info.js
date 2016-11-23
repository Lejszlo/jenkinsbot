var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");

module.exports = {
    addDialogs: addDialogs
};

function addDialogs(bot) {
    
   bot.dialog('/report', [
            function (session) {
                getLatestbuildResult('Daily','develop',session);
            }
    ]);    
}

function getLatestbuildResult(folder, branch, session) {
    jenkins.lastBuild(folder, branch, function(err,data) {
                    if(err) {
                        console.log(data);
                        return;
                    }
                    session.send("The latest build of " + data.fullDisplayName + " was " + data.result);
                });
}