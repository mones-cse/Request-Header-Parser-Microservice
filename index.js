var http =require('http');
var express = require('express');
var os =require('os');

var app =express();

app.set('port',(process.env.PORT || 5000))

app.get('/',function(req,res){
    res.setHeader("Content-Type","application/json");
    // var ipInfo =req.headers.host;
    var ipInfo =req.headers['x-forwarded-for']||req.connection.remoteAddress
    var langInfo =req.headers['accept-language'].split(',')[0];
    var softwareInfo = req.headers['user-agent'];
    softwareInfo =  softwareInfo.slice(softwareInfo.indexOf('(')+1,softwareInfo.indexOf(')'));  
    var jsonObj ={
        'ipaddress':ipInfo,
        'language':langInfo,
        'software':softwareInfo,
    } 
    res.send(JSON.stringify(jsonObj));
    console.log(req.headers,req.headers['x-forwarded-for'],req.connection.remoteAddress,req.ip);
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

