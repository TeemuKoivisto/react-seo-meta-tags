import { HandlerOptions as RawHandlerOptions, OperationContext } from '../handler';
/**
 * The necessary API from the fetch environment for the handler.
 *
 * @category Server/fetch
 */
export interface FetchAPI {
    Response: typeof Response;
    ReadableStream: typeof ReadableStream;
    TextEncoder: typeof TextEncoder;
}
/**
 * Handler options when using the fetch adapter.
 *
 * @category Server/fetch
 */
export type HandlerOptions<Context extends OperationContext = undefined> = RawHandlerOptions<Request, FetchAPI, Context>;
/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * a fetch environment like Deno, Bun, CloudFlare Workers, Lambdas, etc.
 *
 * You can use [@whatwg-node/server](https://github.com/ardatan/whatwg-node/tree/master/packages/server) to create a server adapter and
 * isomorphically use it in _any_ environment. See an example:
 *
 * ```js
 * import http from 'http';
 * import { createServerAdapter } from '@whatwg-node/server'; // yarn add @whatwg-node/server
 * import { createHandler } from 'graphql-http/lib/use/fetch';
 * import { schema } from './my-graphql-step';
 *
 * // Use this adapter in _any_ environment.
 * const adapter = createServerAdapter({
 *   handleRequest: createHandler({ schema }),
 * });
 *
 * const server = http.createServer(adapter);
 *
 * server.listen(4000);
 * console.log('Listening to port 4000');
 * ```
 *
 * @param reqCtx - Custom fetch API engine, will use from global scope if left undefined.
 *
 * @category Server/fetch
 */
export declare function createHandler<Context extends OperationContext = undefined>(options: HandlerOptions<Context>, reqCtx?: Partial<FetchAPI>): (req: Request) => Promise<Response>;
