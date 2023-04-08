"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _path = _interopRequireDefault(require("path"));
var _rss = _interopRequireDefault(require("rss"));
var _lodash = _interopRequireDefault(require("lodash.merge"));
var _internals = require("./internals");
var _pluginOptions = _interopRequireDefault(require("./plugin-options"));
var _excluded = ["setup"];
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var publicPath = "./public";
exports.pluginOptionsSchema = _pluginOptions.default;
exports.onPostBuild = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref, pluginOptions) {
    var graphql, reporter, options, baseQuery, _iterator, _step, _ref3, feed, _options$feed, setup, locals, rssFeed, outputPath, outputDir;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          graphql = _ref.graphql, reporter = _ref.reporter;
          /*
           * Run the site settings query to gather context, then
           * then run the corresponding feed for each query.
           */
          options = (0, _extends2.default)({}, _internals.defaultOptions, pluginOptions);
          _context.next = 4;
          return (0, _internals.runQuery)(graphql, options.query);
        case 4:
          baseQuery = _context.sent;
          _iterator = _createForOfIteratorHelperLoose(options.feeds);
        case 6:
          if ((_step = _iterator()).done) {
            _context.next = 32;
            break;
          }
          _ref3 = _step.value;
          feed = (0, _extends2.default)({}, ((0, _objectDestructuringEmpty2.default)(_ref3), _ref3));
          if (!feed.query) {
            _context.next = 13;
            break;
          }
          _context.next = 12;
          return (0, _internals.runQuery)(graphql, feed.query).then(function (result) {
            return (0, _lodash.default)({}, baseQuery, result);
          });
        case 12:
          feed.query = _context.sent;
        case 13:
          _options$feed = (0, _extends2.default)({}, options, feed), setup = _options$feed.setup, locals = (0, _objectWithoutPropertiesLoose2.default)(_options$feed, _excluded);
          if (!(!feed.serialize || typeof feed.serialize !== "function")) {
            _context.next = 18;
            break;
          }
          reporter.warn("You did not pass in a valid serialize function. Your feed will not be generated.");
          _context.next = 30;
          break;
        case 18:
          _context.next = 20;
          return feed.serialize(locals);
        case 20:
          rssFeed = _context.sent.reduce(function (merged, item) {
            merged.item(item);
            return merged;
          }, new _rss.default(setup(locals)));
          outputPath = _path.default.join(publicPath, feed.output);
          outputDir = _path.default.dirname(outputPath);
          _context.next = 25;
          return _fsExtra.default.pathExists(outputDir);
        case 25:
          if (_context.sent) {
            _context.next = 28;
            break;
          }
          _context.next = 28;
          return _fsExtra.default.mkdirp(outputDir);
        case 28:
          _context.next = 30;
          return _fsExtra.default.writeFile(outputPath, rssFeed.xml());
        case 30:
          _context.next = 6;
          break;
        case 32:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();