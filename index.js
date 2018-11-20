const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Content = require('./model/content');
const AppResponse = require('./model/appresponse');
const jwt = require('jsonwebtoken');

var url = "mongodb://hsrm:hsrmpushdb1@ds145463.mlab.com:45463/mydb";


mongoose.connect(url,{useNewUrlParser: true});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/',function(req,res){
    console.log(req.query);
    res.send("HI");
});

app.post('/response',function(req,res){
    let request = JSON.stringify(req.body);
    request = JSON.parse(request);
    const appresponse = new AppResponse({
        _id: new mongoose.Types.ObjectId(),
                answer: JSON.stringify(request.answer),
                network: JSON.stringify(request.network),
                acceleration: JSON.stringify(request.acceleration),
                timestamp: JSON.stringify(request.timestamp),
                gps: JSON.stringify(request.gps),
                lightsensor: JSON.stringify(request.lightsensor.intensity),
                uuid: JSON.stringify(request.uuid),
    });

    appresponse.save()
    .then(result => {
        console.log(result);
        res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
        res.setHeader('Access-Control-Allow-Methods',"GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.status(201).json({
            message: "Wurde eingespeichert",
            createdUser: result
        })
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             message: "Hat nicht funktioniert",
             error: err,
         })
     });

});

app.listen(process.env.PORT || 5000)