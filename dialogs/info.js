var builder = require("botbuilder");
var prompts = require("../prompts");
var jenkins = require("../jenkins");

module.exports = {
    addDialogs: addDialogs
};

var jenkinsServer = jenkins.server;

function addDialogs(bot) {
    
   bot.dialog('/report', [
            function (session) {
                jenkinsServer.last_build_info('Daily', function(err,data) {
                    console.log(data);
                    //session.send(JSON.parse(data)); 
                });
            }
    ]);    
}