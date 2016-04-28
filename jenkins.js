var jenkinsapi = require('jenkins-api');

var jenkins = {
    server : jenkinsapi.init("http://lejszlofradi:asdf1234@taxtime.hu:8181/jenkins")
}

module.exports = jenkins;

