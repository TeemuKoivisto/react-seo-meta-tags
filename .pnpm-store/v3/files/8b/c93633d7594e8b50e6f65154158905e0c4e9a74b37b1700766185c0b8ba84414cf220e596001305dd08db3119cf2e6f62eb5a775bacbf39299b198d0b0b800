"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _graphql = require("gatsby/graphql");
var _commonTags = require("common-tags");
var _templateObject, _templateObject2;
var feed = function feed(_ref) {
  var Joi = _ref.Joi;
  return Joi.object({
    output: Joi.string().required(),
    query: Joi.string().required(),
    title: Joi.string().required(),
    serialize: Joi.func().required(),
    match: Joi.string(),
    link: Joi.string()
  }).unknown(true).external(function (_ref2) {
    var query = _ref2.query;
    if (query) {
      try {
        (0, _graphql.parse)(query);
      } catch (e) {
        throw new Error((0, _commonTags.stripIndent)(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["\n      Invalid plugin options for \"gatsby-plugin-feed\":\n      \"query\" must be a valid GraphQL query. Received the error \"", "\""])), e.message));
      }
    }
  });
};
var _default = function _default(_ref3) {
  var Joi = _ref3.Joi;
  return Joi.object({
    generator: Joi.string(),
    query: Joi.string(),
    setup: Joi.func(),
    feeds: Joi.array().items(feed({
      Joi: Joi
    })).required()
  }).unknown(true).external(function (_ref4) {
    var query = _ref4.query;
    if (query) {
      try {
        (0, _graphql.parse)(query);
      } catch (e) {
        throw new Error((0, _commonTags.stripIndent)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["\n        Invalid plugin options for \"gatsby-plugin-feed\":\n        \"query\" must be a valid GraphQL query. Received the error \"", "\""])), e.message));
      }
    }
  });
};
exports.default = _default;