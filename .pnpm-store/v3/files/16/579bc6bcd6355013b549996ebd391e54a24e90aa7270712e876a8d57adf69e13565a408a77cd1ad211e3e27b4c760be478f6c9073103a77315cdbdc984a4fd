"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.MainImage = void 0;
var react_1 = __importDefault(require("react"));
var picture_1 = require("./picture");
var MainImage = function MainImage(props) {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(picture_1.Picture, __assign({}, props)),
        react_1["default"].createElement("noscript", null,
            react_1["default"].createElement(picture_1.Picture, __assign({}, props, { shouldLoad: true })))));
};
exports.MainImage = MainImage;
exports.MainImage.displayName = "MainImage";
exports.MainImage.propTypes = picture_1.Picture.propTypes;
