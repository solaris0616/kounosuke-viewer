"use strict";

var _express = _interopRequireDefault(require("express"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _cheerio = _interopRequireDefault(require("cheerio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var options = {
  uri: 'https://www.panasonic.com/jp/corporate/history/founders-quotes.html',
  transform: function transform(body) {
    return _cheerio["default"].load(body);
  }
};
app.get('/', function (req, res) {
  (0, _requestPromise["default"])(options).then(function ($) {
    console.log($('title').text());
  })["catch"](function (error) {
    console.error('Error:', error);
  });
  res.send("Hello world.");
});
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});