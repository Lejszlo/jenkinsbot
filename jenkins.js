var jenkinsapi = require('jenkins-api');

module.exports = {
    build: build,
    last_build_info : last_build_info,
    job_info : job_info,
    all_jobs_in_view : all_jobs_in_view
};

var jenkins = jenkinsapi.init("http://lejszlofradi:asdf1234@taxtime.hu:8181/jenkins/");

function build(jobName) {
    jenkins.build(jobName, function(err, data) {
        if (err) { 
            return undefined;
        }
        return data;
    });
}

function last_build_info(jobName) {
    jenkins.last_build_info(jobName, function(err, data) {
        if (err){ 
            return undefined; 
        }
        return data;
    });
}

function job_info(jobName) {
    jenkins.job_info(jobName, function(err, data) {
        consoloe.log("err: " + err);
        if (err) { 
            return undefined; 
        }
        consoloe.log("data: " + data);
        return data;
    });
}

function all_jobs_in_view(viewName) {
    jenkins.all_jobs_in_view(viewName, function(err, data) {
        if (err){ 
            return undefined; 
        }
        return data;
    });
}

