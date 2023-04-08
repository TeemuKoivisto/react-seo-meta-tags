/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import { HandlerOptions as RawHandlerOptions, OperationContext } from '../handler';
/**
 * The context in the request for the handler.
 *
 * @category Server/http
 */
export interface RequestContext {
    res: ServerResponse;
}
/**
 * Handler options when using the http adapter.
 *
 * @category Server/http
 */
export type HandlerOptions<Context extends OperationContext = undefined> = RawHandlerOptions<IncomingMessage, RequestContext, Context>;
/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * the Node environment http module.
 *
 * ```js
 * import http from 'http';
 * import { createHandler } from 'graphql-http/lib/use/http';
 * import { schema } from './my-graphql-step';
 *
 * const server = http.createServer(createHandler({ schema }));
 *
 * server.listen(4000);
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server/http
 */
export declare function createHandler<Context extends OperationContext = undefined>(options: HandlerOptions<Context>): (req: IncomingMessage, res: ServerResponse) => Promise<void>;
