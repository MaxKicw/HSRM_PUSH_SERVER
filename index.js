const express = require('express')
const app = express()
const port = 3000

app.get('/', function(req, res) {
  res.send("HI");
});

app.get('/response', function(req, res) {
    console.log(req.query);
    res.send("HI");
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))