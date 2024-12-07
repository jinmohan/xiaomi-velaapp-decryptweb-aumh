var express = require('express');
var app = express();

// 简单的路由
app.get('/', function (req, res) {
  res.send('Hello, world!');
});

// 导出应用实例
module.exports = app;
