/**
 *
 * utils
 *
 */
import { GraphQLError } from 'graphql';
/** @private */
export function extendedTypeof(val) {
    if (val === null) {
        return 'null';
    }
    if (Array.isArray(val)) {
        return 'array';
    }
    return typeof val;
}
/** @private */
export function isObject(val) {
    return typeof val === 'object' && val !== null;
}
/** @private */
export function areGraphQLErrors(obj) {
    return (Array.isArray(obj) &&
        obj.length > 0 &&
        // if one item in the array is a GraphQLError, we're good
        obj.some(isGraphQLError));
}
/** @private */
export function isGraphQLError(obj) {
    return obj instanceof GraphQLError;
}
/** @private */
export function isExecutionResult(val) {
    return (isObject(val) &&
        ('data' in val || ('data' in val && val.data == null && 'errors' in val)));
}
/** @private */
export function isAsyncIterable(val) {
    return typeof Object(val)[Symbol.asyncIterator] === 'function';
}
