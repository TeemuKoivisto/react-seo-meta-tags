import type { ImageCropFocus, WidthOrHeight } from "../types";
import type { Store } from "gatsby";
export declare enum ImageCDNUrlKeys {
    URL = "u",
    ENCRYPTED_URL = "eu",
    ARGS = "a",
    CONTENT_DIGEST = "cd"
}
export declare function generateFileUrl({ url, filename, }: {
    url: string;
    filename: string;
}, store?: Store): string;
export declare function generateImageUrl(source: {
    url: string;
    mimeType: string;
    filename: string;
    internal: {
        contentDigest: string;
    };
}, imageArgs: Parameters<typeof generateImageArgs>[0], store?: Store): string;
declare function generateImageArgs({ width, height, format, cropFocus, quality, }: WidthOrHeight & {
    format: string;
    cropFocus?: ImageCropFocus | Array<ImageCropFocus>;
    quality: number;
}): string;
export {};
