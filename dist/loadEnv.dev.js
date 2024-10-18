"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Configure our ENV variables
_dotenv["default"].config();

console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);