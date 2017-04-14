var port = 8080;
var express = require('express');
var fs = require('fs');
var app = express();
console.log('hi');
app.get('/', function (req, res, next) {
  fs.readFile('index.html', 'utf8', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/dist/:file', function (req, res, next) {
  fs.readFile(`dist/${req.params.file}`, 'utf-8', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/img/:file', function (req, res, next) {
  fs.readFile(`img/${req.params.file}`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port);