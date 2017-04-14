var port = 8080;
var express = require('express');
var fs = require('fs');
var app = express();
console.log('hi');
app.get('/', function (req, res, next) {
  res.send(fs.readFileSync('index.html', 'utf-8'));
});

app.get('/dist/:file', function (req, res, next) {
  res.send(fs.readFileSync(`dist/${req.params.file}`, 'utf-8'));
});

app.get('/img/:file', function (req, res, next) {
  res.send(fs.readFileSync(`img/${req.params.file}`));
});

app.listen(port);