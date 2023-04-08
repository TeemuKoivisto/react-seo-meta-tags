import type { Request, Response, Handler } from 'express';
import { HandlerOptions as RawHandlerOptions, OperationContext } from '../handler';
/**
 * The context in the request for the handler.
 *
 * @category Server/express
 */
export interface RequestContext {
    res: Response;
}
/**
 * Handler options when using the express adapter.
 *
 * @category Server/express
 */
export type HandlerOptions<Context extends OperationContext = undefined> = RawHandlerOptions<Request, RequestContext, Context>;
/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * the express framework.
 *
 * ```js
 * import express from 'express'; // yarn add express
 * import { createHandler } from 'graphql-http/lib/use/express';
 * import { schema } from './my-graphql-schema';
 *
 * const app = express();
 * app.all('/graphql', createHandler({ schema }));
 *
 * app.listen({ port: 4000 });
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server/express
 */
export declare function createHandler<Context extends OperationContext = undefined>(options: HandlerOptions<Context>): Handler;
