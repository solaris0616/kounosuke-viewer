"use strict";

var _express = _interopRequireDefault(require("express"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _iconv = _interopRequireDefault(require("iconv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var createOptions = function createOptions() {
  var jstOffsetMs = -9 * 60 * 60 * 1000;
  var localOffsetMs = new Date().getTimezoneOffset() * 60 * 1000;
  var todayJST = new Date(Date.now() - localOffsetMs + jstOffsetMs);
  var month = ('00' + (todayJST.getMonth() + 1)).slice(-2);
  var date = ('00' + todayJST.getDate()).slice(-2);
  var filename = "https://www.panasonic.com/content/dam/panasonic/jp/corporate/history/founders-quotes/resource/DS".concat(month).concat(date, ".HTML");
  var option = {
    uri: filename,
    encoding: null,
    transform: function transform(body) {
      var iconv = _iconv["default"].Iconv('SHIFT_JIS', 'UTF-8');

      var utf8Body = iconv.convert(body).toString();
      return _cheerio["default"].load(utf8Body);
    }
  };
  return option;
};

app.get('/', function (req, res) {
  var options = createOptions();
  (0, _requestPromise["default"])(options).then(function ($) {
    var header = $('h1').text();
    var content = $('p').text();
    res.json({
      header: header,
      content: content
    });
  })["catch"](function (error) {
    console.error('Error:', error);
  });
});
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});