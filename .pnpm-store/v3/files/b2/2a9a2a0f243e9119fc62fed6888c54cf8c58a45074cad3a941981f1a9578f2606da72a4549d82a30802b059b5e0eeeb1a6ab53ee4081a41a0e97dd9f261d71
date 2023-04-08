"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
function lineLink(url, _a) {
    var title = _a.title;
    (0, assert_1.default)(url, 'line.url');
    return ('https://social-plugins.line.me/lineit/share' +
        (0, objectToGetParams_1.default)({
            url: url,
            text: title,
        }));
}
var LineShareButton = (0, createShareButton_1.default)('line', lineLink, function (props) { return ({
    title: props.title,
}); }, {
    windowWidth: 500,
    windowHeight: 500,
});
exports.default = LineShareButton;
