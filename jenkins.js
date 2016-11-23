var request = require('request');

var URL = "http://lhajdu:eb316b22b11554436112f8cefb938f24@svr-hub-bld-01:8181/";
var API = '/api/json';

var jenkins = {
    lastBuild : lastBuild
}

function buildUrl(folder, branch, specific) {
    return URL + 'job/' + folder + '/job/' + branch + '/' + specific + API;
}

function lastBuild(folder, branch, callback) {
    var url = buildUrl(folder, branch, 'lastBuild');
    console.log(url);
    request({method: 'GET', url: url }, function(error, response, body) {
                if ( error || response.statusCode !== 200 ) {
                    callback(error || true, body);
                    return;
                }
                var data = JSON.parse(body.toString());
                callback(null, data);
            });
}

module.exports = jenkins;

