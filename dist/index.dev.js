"use strict";

var _express = _interopRequireDefault(require("express"));

var _grades = _interopRequireDefault(require("./routes/grades.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import './loadEnv.js';
var app = (0, _express["default"])();
var PORT = process.env.PORT; // middlewares

app.use(_express["default"].json());
app.use('/api/grades', _grades["default"]);
app.get('/', function (req, res) {
  return res.send('ok');
});
app.listen(PORT, function () {
  return console.log("Server running on port: ".concat(PORT));
});