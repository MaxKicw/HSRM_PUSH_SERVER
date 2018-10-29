const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send("HI");
});

app.get('/response', function(req, res) {
    console.log(req.query);
    res.send("HI");
  });

app.listen(3000, () => console.log(`Example app listening on port 3000!`))