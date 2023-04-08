import type { FastifyRequest, FastifyReply, RouteHandler } from 'fastify';
import { HandlerOptions as RawHandlerOptions, OperationContext } from '../handler';
/**
 * The context in the request for the handler.
 *
 * @category Server/fastify
 */
export interface RequestContext {
    reply: FastifyReply;
}
/**
 * Handler options when using the fastify adapter.
 *
 * @category Server/fastify
 */
export type HandlerOptions<Context extends OperationContext = undefined> = RawHandlerOptions<FastifyRequest, RequestContext, Context>;
/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * the fastify framework.
 *
 * ```js
 * import Fastify from 'fastify'; // yarn add fastify
 * import { createHandler } from 'graphql-http/lib/use/express';
 * import { schema } from './my-graphql-schema';
 *
 * const fastify = Fastify();
 * fastify.all('/graphql', createHandler({ schema }));
 *
 * fastify.listen({ port: 4000 });
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server/fastify
 */
export declare function createHandler<Context extends OperationContext = undefined>(options: HandlerOptions<Context>): RouteHandler;
