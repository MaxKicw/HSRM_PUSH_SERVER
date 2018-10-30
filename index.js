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


// app.post('/login',function(req,res){
//     console.log(req.body);
//     const username = req.body.mail;
//     const password = req.body.password;
//     const query = {"mail":username};
//     Account.find(query)
//     .exec()
//     .then(accountInfo => {
//         console.log(accountInfo);
//         let db_account;
//         if(accountInfo.length === 0){
//             db_account = {"msg":"No such account"}
//         }else{
//             db_account = accountInfo[0]
//         }
//         let db_password;
//         if("password" in db_account){
//             db_password = db_account.password
//         }else{
//             db_password = undefined
//         }
//         if(db_password === password){
//             const token = jwt.sign({db_account},"My-Secret-Key",{expiresIn: '1h'});
//             res.status(200).json({
//                 status: 200,
//                 message: "Der Login war erfolgreich!",
//                 username: username,
//                 token: token
//             });
//         }else if(db_password === undefined){
//             res.status(203).json({
//                 status: 203,
//                 message: "Dieser Account existiert nicht!",
//             });
//         }else{
//             res.status(200).json({
//                 status: 201,
//                 message: "Das Passwort ist falsch!",
//             });
//         }
//     }
//     )
//     .catch()
// });

// app.post('/protected', ensureToken, function(req,res){

//     jwt.verify(req.token, "My-Secret-Key", function(err,data){
//         if(err){
//             res.status(403).json({
//                 message: "Diese Route ist geschützt! Bitte anmelden"
//             })
//         }else{
//             if(req.body.name[0] === data.db_account.mail){
//                 res.json({
//                     data:data,
//                     message: "Willkommen lieber "+ req.body.name[0],
//                 });
//             }else{
//                 res.json({
//                     data:data,
//                     message: "Das Passwort zu den 1Millionen Euro lautet 'PW1234'"
//                 });
//             }   
//         }
//     });
// });

// app.get('/get-data/:productId',function(req,res){
//     const id = req.params.productId;
//     Content.findById(id)
//     .exec()
//     .then(doc => {
//         console.log(doc);
//         if(doc){
//             res.status(200).json(doc);
//         }else{
//             res.status(404).json({
//                 message: "Id ist nicht vorhanden!"
//             });
//         }
        
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

app.post('/',function(req,res){
    console.log(req.query);
    res.send("HI");
});

app.post('/response',function(req,res){
    let request = req.body;
    console.log(request);
    const appresponse = new AppResponse({
        _id: new mongoose.Types.ObjectId(),
                answer: JSON.stringify(request.answer),
                network: JSON.stringify(request.network),
                acceleration: JSON.stringify(request.acceleration),
                timestamp: JSON.stringify(request.timestamp),
                gps: JSON.stringify(request.gps),
                lightsensor: JSON.stringify(request.lightsensor),
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

// app.get('/get-all-data', ensureToken, function(req,res){

//     jwt.verify(req.token, "My-Secret-Key", function(err,data){
//         if(err){
//             let empty = [];
//             res.status(403).json(empty);
//         }else{
//             var query = {author:data.db_account.mail};
//             Content.find(query)
//             .exec()
//             .then(docs => {
//                 console.log(docs);
//                 if (docs.length >= 0){
//                     res.status(200).json(docs)
//                 } else {
//                     res.status(500).json({
//                         message: "Keine Einträge!"
//                     })
//                 }
            
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                     error: err,
//                 })
//             });
//         }
//     });
// }),

// app.get('/delete/:id',ensureToken, function(req,res){

//     jwt.verify(req.token, "My-Secret-Key", function(err,data){
//         if(err){
//             res.status(403).json({
//                 message: "Bitte melden Sie sich an!"
//             })
//         }else{
//             var id = req.params.id;
//             Content.deleteOne({_id:id})
//             .exec()
//             .then(result => {
//                 res.status(200).json(result)
//             })
//             .catch(error => {
//                 res.status(500).json(error);
//             });
//         }
//     });
// });
    
// app.patch('/change/:id',function(req,res){
//     // Anfrage für Änderung muss so aussehen. Was geändert und wie?
//     // [
//     //		{"propName":"name","value":"Hanswurschthatdurscht"}	
//     //  ]
//     var id = req.params.id;
//     const updateOps = {}
//     for (const ops of req.body){
//         updateOps[ops.propName] = ops.value;
//     }
//     Content.update({_id:id}, {$set: updateOps})
//     .exec()
//     .then(result => {
//         console.log(result);
//         res.status(200).json(result);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     });
// });

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }

app.listen(process.env.PORT || 5000)