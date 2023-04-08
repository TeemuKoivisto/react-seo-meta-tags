import { createHandler as createRawHandler, } from '../handler.mjs';
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
export function createHandler(options) {
    const isProd = process.env.NODE_ENV === 'production';
    const handle = createRawHandler(options);
    return async function requestListener(req, res) {
        try {
            if (!req.url) {
                throw new Error('Missing request URL');
            }
            if (!req.method) {
                throw new Error('Missing request method');
            }
            const [body, init] = await handle({
                url: req.url,
                method: req.method,
                headers: req.headers,
                body: () => new Promise((resolve) => {
                    let body = '';
                    req.on('data', (chunk) => (body += chunk));
                    req.on('end', () => resolve(body));
                }),
                raw: req,
                context: { res },
            });
            res.writeHead(init.status, init.statusText, init.headers);
            if (body) {
                res.end(body);
            }
            else {
                res.end();
            }
        }
        catch (err) {
            // The handler shouldnt throw errors.
            // If you wish to handle them differently, consider implementing your own request handler.
            console.error('Internal error occurred during request handling. ' +
                'Please check your implementation.', err);
            if (isProd) {
                res.writeHead(500).end();
            }
            else {
                res
                    .writeHead(500, { 'content-type': 'application/json; charset=utf-8' })
                    .end(JSON.stringify({
                    errors: [
                        err instanceof Error
                            ? {
                                message: err.message,
                                stack: err.stack,
                            }
                            : err,
                    ],
                }));
            }
        }
    };
}
