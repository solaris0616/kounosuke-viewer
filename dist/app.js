"use strict";

var _express = _interopRequireDefault(require("express"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _iconv = _interopRequireDefault(require("iconv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var options = {
  uri: 'https://www.panasonic.com/content/dam/panasonic/jp/corporate/history/founders-quotes/resource/DS0730.HTML',
  encoding: null,
  transform: function transform(body) {
    var iconv = _iconv["default"].Iconv('SHIFT_JIS', 'UTF-8');

    var utf8Body = iconv.convert(body).toString();
    return _cheerio["default"].load(utf8Body, {
      decodeEntities: false
    });
  }
};
app.get('/', function (req, res) {
  (0, _requestPromise["default"])(options).then(function ($) {
    var header = $('h1').html();
    var content = $('p').html();
    console.log(header);
    console.log(content);
  })["catch"](function (error) {
    console.error('Error:', error);
  });
  res.send("Hello world.");
});
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});