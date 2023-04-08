import type { IGatsbyFunction } from "../../internal";
import type { GatsbyFunctionBodyParserCommonMiddlewareConfig, GatsbyFunctionBodyParserUrlencodedConfig } from "gatsby";
export interface IGatsbyBodyParserConfigProcessed {
    json: GatsbyFunctionBodyParserCommonMiddlewareConfig;
    raw: GatsbyFunctionBodyParserCommonMiddlewareConfig;
    text: GatsbyFunctionBodyParserCommonMiddlewareConfig;
    urlencoded: GatsbyFunctionBodyParserUrlencodedConfig;
}
export interface IGatsbyFunctionConfigProcessed {
    bodyParser: IGatsbyBodyParserConfigProcessed;
}
export declare function createConfig(userConfig: unknown, functionObj: IGatsbyFunction): IGatsbyFunctionConfigProcessed;
