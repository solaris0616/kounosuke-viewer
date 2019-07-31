"use strict";

var _express = _interopRequireDefault(require("express"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _iconv = _interopRequireDefault(require("iconv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.set('view engine', 'ejs');
app.use(_express["default"]["static"]('static'));

var createOptions = function createOptions(dateStr) {
  var option = {
    uri: "https://www.panasonic.com/content/dam/panasonic/jp/corporate/history/founders-quotes/resource/DS".concat(dateStr, ".HTML"),
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
  res.render("index", {});
});
app.get('/api/story', function (req, res) {
  var options = createOptions(req.query.dateStr);
  (0, _requestPromise["default"])(options).then(function ($) {
    var title = $('h1').text();
    var content = $('p').text();
    res.json({
      title: title,
      content: content
    });
  })["catch"](function (error) {
    console.error('Error:', error);
  });
});
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});