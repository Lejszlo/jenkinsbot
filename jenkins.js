var jenkinsapi = require('jenkins-api');

var jenkins = {
    server : jenkinsapi.init("http://lejszlofradi:53c3ec19570f31946627ecdf1eb4af5f@taxtime.hu:8181/jenkins")
}

module.exports = jenkins;

