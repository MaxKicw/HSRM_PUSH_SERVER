const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send("HI");
});

app.get('/tschau', function(req, res) {
  res.send("tschau");
});


app.get('/response', function(req, res) {
    console.log(req.query);
    res.send(req.query);
  });

app.listen(process.env.PORT || 5000)