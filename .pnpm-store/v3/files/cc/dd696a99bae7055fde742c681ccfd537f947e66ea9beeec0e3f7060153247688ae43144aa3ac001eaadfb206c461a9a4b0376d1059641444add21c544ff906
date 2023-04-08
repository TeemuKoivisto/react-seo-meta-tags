/// <reference types="node" />
export declare type ITypedArray = Uint8Array | Uint16Array | Uint32Array;
export declare type IDataType = string | Buffer | ITypedArray;
export declare function intArrayToString(arr: Uint8Array, len: number): string;
export declare function writeHexToUInt8(buf: Uint8Array, str: string): void;
export declare function hexStringEqualsUInt8(str: string, buf: Uint8Array): boolean;
export declare function getDigestHex(tmpBuffer: Uint8Array, input: Uint8Array, hashLength: number): string;
export declare const getUInt8Buffer: (data: IDataType) => Uint8Array;
export declare function encodeBase64(data: Uint8Array, pad?: boolean): string;
export declare function getDecodeBase64Length(data: string): number;
export declare function decodeBase64(data: string): Uint8Array;
