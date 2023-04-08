"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandler = void 0;
const handler_1 = require("../handler");
/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * the Koa framework.
 *
 * ```js
 * import Koa from 'koa'; // yarn add koa
 * import mount from 'koa-mount'; // yarn add koa-mount
 * import { createHandler } from 'graphql-http/lib/use/koa';
 * import { schema } from './my-graphql-schema';
 *
 * const app = new Koa();
 * app.use(mount('/', createHandler({ schema })));
 *
 * app.listen({ port: 4000 });
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server/koa
 */
function createHandler(options) {
    const isProd = process.env.NODE_ENV === 'production';
    const handle = (0, handler_1.createHandler)(options);
    return async function requestListener(ctx) {
        try {
            const [body, init] = await handle({
                url: ctx.url,
                method: ctx.method,
                headers: ctx.headers,
                body: () => {
                    if (ctx.body) {
                        // in case koa has a body parser
                        return ctx.body;
                    }
                    return new Promise((resolve) => {
                        let body = '';
                        ctx.req.on('data', (chunk) => (body += chunk));
                        ctx.req.on('end', () => resolve(body));
                    });
                },
                raw: ctx.req,
                context: { res: ctx.response },
            });
            ctx.body = body;
            ctx.response.status = init.status;
            ctx.response.message = init.statusText;
            if (init.headers) {
                for (const [name, value] of Object.entries(init.headers)) {
                    ctx.response.set(name, value);
                }
            }
        }
        catch (err) {
            // The handler shouldnt throw errors.
            // If you wish to handle them differently, consider implementing your own request handler.
            console.error('Internal error occurred during request handling. ' +
                'Please check your implementation.', err);
            ctx.response.status = 500;
            if (!isProd) {
                ctx.response.set('content-type', 'application/json; charset=utf-8');
                ctx.body = {
                    errors: [
                        err instanceof Error
                            ? {
                                message: err.message,
                                stack: err.stack,
                            }
                            : err,
                    ],
                };
            }
        }
    };
}
exports.createHandler = createHandler;
