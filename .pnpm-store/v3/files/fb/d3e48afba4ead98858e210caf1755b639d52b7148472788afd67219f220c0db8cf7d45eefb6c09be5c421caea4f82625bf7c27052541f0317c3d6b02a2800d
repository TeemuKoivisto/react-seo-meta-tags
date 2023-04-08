/**
 *
 * handler
 *
 */
import { validate as graphqlValidate, specifiedRules, execute as graphqlExecute, parse as graphqlParse, getOperationAST as graphqlGetOperationAST, GraphQLError, } from 'graphql';
import { areGraphQLErrors, isAsyncIterable, isExecutionResult, isGraphQLError, isObject, } from './utils.mjs';
/**
 * Checks whether the passed value is the `graphql-http` server agnostic response.
 *
 * @category Server
 */
export function isResponse(val) {
    // TODO: make sure the contents of init match ResponseInit
    return (Array.isArray(val) &&
        (typeof val[0] === 'string' || val[0] === null) &&
        isObject(val[1]));
}
/**
 * Makes a GraphQL over HTTP spec compliant server handler. The handler can
 * be used with your favourite server library.
 *
 * Beware that the handler resolves only after the whole operation completes.
 *
 * Errors thrown from **any** of the provided options or callbacks (or even due to
 * library misuse or potential bugs) will reject the handler's promise. They are
 * considered internal errors and you should take care of them accordingly.
 *
 * For production environments, its recommended not to transmit the exact internal
 * error details to the client, but instead report to an error logging tool or simply
 * the console.
 *
 * Simple example usage with Node:
 *
 * ```js
 * import http from 'http';
 * import { createHandler } from 'graphql-http';
 * import { schema } from './my-graphql-schema/index.mjs';
 *
 * // Create the GraphQL over HTTP handler
 * const handler = createHandler({ schema });
 *
 * // Create a HTTP server using the handler on `/graphql`
 * const server = http.createServer(async (req, res) => {
 *   if (!req.url.startsWith('/graphql')) {
 *     return res.writeHead(404).end();
 *   }
 *
 *   try {
 *     const [body, init] = await handler({
 *       url: req.url,
 *       method: req.method,
 *       headers: req.headers,
 *       body: () => new Promise((resolve) => {
 *         let body = '';
 *         req.on('data', (chunk) => (body += chunk));
 *         req.on('end', () => resolve(body));
 *       }),
 *       raw: req,
 *     });
 *     res.writeHead(init.status, init.statusText, init.headers).end(body);
 *   } catch (err) {
 *     // BEWARE not to transmit the exact internal error message in production environments
 *     res.writeHead(500).end(err.message);
 *   }
 * });
 *
 * server.listen(4000);
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server
 */
export function createHandler(options) {
    const { schema, context, validate = graphqlValidate, validationRules = [], execute = graphqlExecute, parse = graphqlParse, getOperationAST = graphqlGetOperationAST, rootValue, onSubscribe, onOperation, } = options;
    return async function handler(req) {
        var _a, _b;
        const method = req.method;
        if (method !== 'GET' && method !== 'POST') {
            return [
                null,
                {
                    status: 405,
                    statusText: 'Method Not Allowed',
                    headers: {
                        allow: 'GET, POST',
                    },
                },
            ];
        }
        const acceptedMediaType = getAcceptableMediaType(getHeader(req, 'accept'));
        if (!acceptedMediaType) {
            return [
                null,
                {
                    status: 406,
                    statusText: 'Not Acceptable',
                    headers: {
                        accept: 'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
                    },
                },
            ];
        }
        // TODO: should graphql-http care about content-encoding? I'd say unzipping should happen before handler is reached
        const [mediaType, charset = 'charset=utf-8', // utf-8 is assumed when not specified. this parameter is either "charset" or "boundary" (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length)
        ] = (getHeader(req, 'content-type') || '')
            .replace(/\s/g, '')
            .toLowerCase()
            .split(';');
        let params;
        try {
            const partParams = {};
            switch (true) {
                case method === 'GET': {
                    // TODO: what if content-type is specified and is not application/x-www-form-urlencoded?
                    try {
                        const [, search] = req.url.split('?');
                        const searchParams = new URLSearchParams(search);
                        partParams.operationName =
                            (_a = searchParams.get('operationName')) !== null && _a !== void 0 ? _a : undefined;
                        partParams.query = (_b = searchParams.get('query')) !== null && _b !== void 0 ? _b : undefined;
                        const variables = searchParams.get('variables');
                        if (variables)
                            partParams.variables = JSON.parse(variables);
                        const extensions = searchParams.get('extensions');
                        if (extensions)
                            partParams.extensions = JSON.parse(extensions);
                    }
                    catch (_c) {
                        throw new Error('Unparsable URL');
                    }
                    break;
                }
                case method === 'POST' &&
                    mediaType === 'application/json' &&
                    charset === 'charset=utf-8':
                    {
                        if (!req.body) {
                            throw new Error('Missing body');
                        }
                        let data;
                        try {
                            const body = typeof req.body === 'function' ? await req.body() : req.body;
                            data = typeof body === 'string' ? JSON.parse(body) : body;
                        }
                        catch (err) {
                            throw new Error('Unparsable JSON body');
                        }
                        if (!isObject(data)) {
                            throw new Error('JSON body must be an object');
                        }
                        partParams.operationName = data.operationName;
                        partParams.query = data.query;
                        partParams.variables = data.variables;
                        partParams.extensions = data.extensions;
                        break;
                    }
                default: // graphql-http doesnt support any other content type
                    return [
                        null,
                        {
                            status: 415,
                            statusText: 'Unsupported Media Type',
                        },
                    ];
            }
            if (partParams.query == null)
                throw new Error('Missing query');
            if (typeof partParams.query !== 'string')
                throw new Error('Invalid query');
            if (partParams.variables != null &&
                (typeof partParams.variables !== 'object' ||
                    Array.isArray(partParams.variables))) {
                throw new Error('Invalid variables');
            }
            if (partParams.extensions != null &&
                (typeof partParams.extensions !== 'object' ||
                    Array.isArray(partParams.extensions))) {
                throw new Error('Invalid extensions');
            }
            // request parameters are checked and now complete
            params = partParams;
        }
        catch (err) {
            return makeResponse(new GraphQLError(err.message), acceptedMediaType);
        }
        let args;
        const maybeResErrsOrArgs = await (onSubscribe === null || onSubscribe === void 0 ? void 0 : onSubscribe(req, params));
        if (isResponse(maybeResErrsOrArgs))
            return maybeResErrsOrArgs;
        else if (isExecutionResult(maybeResErrsOrArgs) ||
            areGraphQLErrors(maybeResErrsOrArgs))
            return makeResponse(maybeResErrsOrArgs, acceptedMediaType);
        else if (maybeResErrsOrArgs)
            args = maybeResErrsOrArgs;
        else {
            if (!schema)
                throw new Error('The GraphQL schema is not provided');
            const { operationName, query, variables } = params;
            let document;
            try {
                document = parse(query);
            }
            catch (err) {
                return makeResponse(err, acceptedMediaType);
            }
            const resOrContext = typeof context === 'function' ? await context(req, params) : context;
            if (isResponse(resOrContext))
                return resOrContext;
            const argsWithoutSchema = {
                operationName,
                document,
                variableValues: variables,
                contextValue: resOrContext,
            };
            if (typeof schema === 'function') {
                const resOrSchema = await schema(req, argsWithoutSchema);
                if (isResponse(resOrSchema))
                    return resOrSchema;
                args = Object.assign(Object.assign({}, argsWithoutSchema), { schema: resOrSchema });
            }
            else {
                args = Object.assign(Object.assign({}, argsWithoutSchema), { schema });
            }
            let rules = specifiedRules;
            if (typeof validationRules === 'function') {
                rules = await validationRules(req, args, specifiedRules);
            }
            else {
                rules = [...rules, ...validationRules];
            }
            const validationErrs = validate(args.schema, args.document, rules);
            if (validationErrs.length) {
                return makeResponse(validationErrs, acceptedMediaType);
            }
        }
        let operation;
        try {
            const ast = getOperationAST(args.document, args.operationName);
            if (!ast)
                throw null;
            operation = ast.operation;
        }
        catch (_d) {
            return makeResponse(new GraphQLError('Unable to detect operation AST'), acceptedMediaType);
        }
        if (operation === 'subscription') {
            return makeResponse(new GraphQLError('Subscriptions are not supported'), acceptedMediaType);
        }
        // mutations cannot happen over GETs
        // https://graphql.github.io/graphql-over-http/draft/#sel-CALFJRPAAELBAAxwP
        if (operation === 'mutation' && method === 'GET') {
            return [
                JSON.stringify({
                    errors: [new GraphQLError('Cannot perform mutations over GET')],
                }),
                {
                    status: 405,
                    statusText: 'Method Not Allowed',
                    headers: {
                        allow: 'POST',
                    },
                },
            ];
        }
        if (!('rootValue' in args)) {
            args.rootValue = rootValue;
        }
        if (!('contextValue' in args)) {
            const resOrContext = typeof context === 'function' ? await context(req, params) : context;
            if (isResponse(resOrContext))
                return resOrContext;
            args.contextValue = resOrContext;
        }
        let result = await execute(args);
        const maybeResponseOrResult = await (onOperation === null || onOperation === void 0 ? void 0 : onOperation(req, args, result));
        if (isResponse(maybeResponseOrResult))
            return maybeResponseOrResult;
        else if (maybeResponseOrResult)
            result = maybeResponseOrResult;
        if (isAsyncIterable(result)) {
            return makeResponse(new GraphQLError('Subscriptions are not supported'), acceptedMediaType);
        }
        return makeResponse(result, acceptedMediaType);
    };
}
/**
 * Inspects the request and detects the appropriate/acceptable Media-Type
 * looking at the `Accept` header while complying with the GraphQL over HTTP spec.
 *
 * @category Server
 */
export function getAcceptableMediaType(acceptHeader) {
    let acceptedMediaType = null;
    const accepts = (acceptHeader || '*/*')
        .replace(/\s/g, '')
        .toLowerCase()
        .split(',');
    for (const accept of accepts) {
        // accept-charset became obsolete, shouldnt be used (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Charset)
        // TODO: handle the weight parameter "q"
        const [mediaType, ...params] = accept.split(';');
        const charset = (params === null || params === void 0 ? void 0 : params.find((param) => param.includes('charset='))) || 'charset=utf8'; // utf-8 is assumed when not specified;
        if (mediaType === 'application/graphql-response+json' &&
            charset === 'charset=utf8') {
            acceptedMediaType = 'application/graphql-response+json';
            break;
        }
        if ((mediaType === 'application/json' ||
            mediaType === 'application/*' ||
            mediaType === '*/*') &&
            charset === 'charset=utf8') {
            acceptedMediaType = 'application/json';
            break;
        }
    }
    return acceptedMediaType;
}
/**
 * Creates an appropriate GraphQL over HTTP response following the provided arguments.
 *
 * If the first argument is an `ExecutionResult`, the operation will be treated as "successful".
 *
 * If the first argument is _any_ object without the `data` field, it will be treated as an error (as per the spec)
 * and the response will be constructed with the help of `acceptedMediaType` complying with the GraphQL over HTTP spec.
 *
 * @category Server
 */
export function makeResponse(resultOrErrors, acceptedMediaType) {
    const errors = isGraphQLError(resultOrErrors)
        ? [resultOrErrors]
        : areGraphQLErrors(resultOrErrors)
            ? resultOrErrors
            : null;
    if (errors) {
        return [
            JSON.stringify({ errors }),
            Object.assign(Object.assign({}, (acceptedMediaType === 'application/json'
                ? {
                    status: 200,
                    statusText: 'OK',
                }
                : {
                    status: 400,
                    statusText: 'Bad Request',
                })), { headers: {
                    'content-type': acceptedMediaType === 'application/json'
                        ? 'application/json; charset=utf-8'
                        : 'application/graphql-response+json; charset=utf-8',
                } }),
        ];
    }
    return [
        JSON.stringify(resultOrErrors),
        {
            status: 200,
            statusText: 'OK',
            headers: {
                'content-type': acceptedMediaType === 'application/json'
                    ? 'application/json; charset=utf-8'
                    : 'application/graphql-response+json; charset=utf-8',
            },
        },
    ];
}
function getHeader(req, key) {
    if (typeof req.headers.get === 'function') {
        return req.headers.get(key);
    }
    return Object(req.headers)[key];
}
