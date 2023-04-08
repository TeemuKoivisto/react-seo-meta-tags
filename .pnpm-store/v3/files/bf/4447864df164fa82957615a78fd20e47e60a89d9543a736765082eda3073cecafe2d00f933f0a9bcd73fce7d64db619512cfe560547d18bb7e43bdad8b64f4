/// <reference types="node" />
import type { Middleware, Response } from 'koa';
import type { IncomingMessage } from 'http';
import { HandlerOptions as RawHandlerOptions, OperationContext } from '../handler.mjs';
/**
 * The context in the request for the handler.
 *
 * @category Server/koa
 */
export interface RequestContext {
    res: Response;
}
/**
 * Handler options when using the koa adapter.
 *
 * @category Server/koa
 */
export type HandlerOptions<Context extends OperationContext = undefined> = RawHandlerOptions<IncomingMessage, RequestContext, Context>;
/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * the Koa framework.
 *
 * ```js
 * import Koa from 'koa'; // yarn add koa
 * import mount from 'koa-mount'; // yarn add koa-mount
 * import { createHandler } from 'graphql-http/lib/use/koa';
 * import { schema } from './my-graphql-schema/index.mjs';
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
export declare function createHandler<Context extends OperationContext = undefined>(options: HandlerOptions<Context>): Middleware;
