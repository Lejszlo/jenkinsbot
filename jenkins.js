var jenkinsapi = require('jenkins-api');

var jenkins = {
    server : jenkinsapi.init("http://lhajdu:eb316b22b11554436112f8cefb938f24@svr-hub-bld-01:8181/")
}

module.exports = jenkins;

