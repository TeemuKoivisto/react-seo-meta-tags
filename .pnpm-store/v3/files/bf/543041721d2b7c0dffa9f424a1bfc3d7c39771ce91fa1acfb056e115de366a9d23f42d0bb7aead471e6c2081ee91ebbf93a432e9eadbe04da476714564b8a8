import { IHasher } from './WASMInterface';
import { IDataType } from './util';
declare type IValidBits = 224 | 256 | 384 | 512;
/**
 * Calculates SHA-3 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @param bits Number of output bits. Valid values: 224, 256, 384, 512
 * @returns Computed hash as a hexadecimal string
 */
export declare function sha3(data: IDataType, bits?: IValidBits): Promise<string>;
/**
 * Creates a new SHA-3 hash instance
 * @param bits Number of output bits. Valid values: 224, 256, 384, 512
 */
export declare function createSHA3(bits?: IValidBits): Promise<IHasher>;
export {};
