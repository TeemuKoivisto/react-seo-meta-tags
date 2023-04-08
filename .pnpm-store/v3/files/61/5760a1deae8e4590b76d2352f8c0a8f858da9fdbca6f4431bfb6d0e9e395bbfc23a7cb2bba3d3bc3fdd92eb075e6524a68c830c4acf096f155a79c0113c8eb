/// <reference types="node" />
import type { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { HandlerOptions as RawHandlerOptions, OperationContext } from '../handler.mjs';
/**
 * The context in the request for the handler.
 *
 * @category Server/http2
 */
export interface RequestContext {
    res: Http2ServerResponse;
}
/**
 * Handler options when using the http adapter.
 *
 * @category Server/http2
 */
export type HandlerOptions<Context extends OperationContext = undefined> = RawHandlerOptions<Http2ServerRequest, RequestContext, Context>;
/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * the Node environment http2 module.
 *
 *  ```shell
 * $ openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
 *   -keyout localhost-privkey.pem -out localhost-cert.pem
 * ```
 *
 * ```js
 * import fs from 'fs';
 * import http2 from 'http2';
 * import { createHandler } from 'graphql-http/lib/use/http2';
 * import { schema } from './my-graphql-step/index.mjs';
 *
 * const server = http2.createSecureServer(
 *   {
 *     key: fs.readFileSync('localhost-privkey.pem'),
 *     cert: fs.readFileSync('localhost-cert.pem'),
 *   },
 *   createHandler({ schema }),
 * );
 *
 * server.listen(4000);
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server/http2
 */
export declare function createHandler<Context extends OperationContext = undefined>(options: HandlerOptions<Context>): (req: Http2ServerRequest, res: Http2ServerResponse) => Promise<void>;
