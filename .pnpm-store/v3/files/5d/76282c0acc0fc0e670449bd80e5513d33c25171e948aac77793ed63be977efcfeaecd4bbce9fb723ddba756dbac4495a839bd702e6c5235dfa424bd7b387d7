"use strict";
/**
 *
 * utils
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncIterable = exports.isExecutionResult = exports.isGraphQLError = exports.areGraphQLErrors = exports.isObject = exports.extendedTypeof = void 0;
const graphql_1 = require("graphql");
/** @private */
function extendedTypeof(val) {
    if (val === null) {
        return 'null';
    }
    if (Array.isArray(val)) {
        return 'array';
    }
    return typeof val;
}
exports.extendedTypeof = extendedTypeof;
/** @private */
function isObject(val) {
    return typeof val === 'object' && val !== null;
}
exports.isObject = isObject;
/** @private */
function areGraphQLErrors(obj) {
    return (Array.isArray(obj) &&
        obj.length > 0 &&
        // if one item in the array is a GraphQLError, we're good
        obj.some(isGraphQLError));
}
exports.areGraphQLErrors = areGraphQLErrors;
/** @private */
function isGraphQLError(obj) {
    return obj instanceof graphql_1.GraphQLError;
}
exports.isGraphQLError = isGraphQLError;
/** @private */
function isExecutionResult(val) {
    return (isObject(val) &&
        ('data' in val || ('data' in val && val.data == null && 'errors' in val)));
}
exports.isExecutionResult = isExecutionResult;
/** @private */
function isAsyncIterable(val) {
    return typeof Object(val)[Symbol.asyncIterator] === 'function';
}
exports.isAsyncIterable = isAsyncIterable;
