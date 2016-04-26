var jenkinsapi = require('jenkins-api');

module.exports = {
    build: build,
    last_build_info : last_build_info
};

var jenkins = jenkinsapi.init("http://lejszlofradi:asdf1234@taxtime.hu:8181/jenkins/");

function build(jobName) {
    jenkins.build(jobName, function(err, data) {
        if (err){ 
            console.log(err); 
        }
        return data;
    });
}

function last_build_info(jobName) {
    jenkins.last_build_info('job-in-jenkins', function(err, data) {
        if (err){ 
            return console.log(err); 
        }
        return data;
    });
}

