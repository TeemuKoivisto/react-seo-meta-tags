import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes } from "react";
import type { Node } from "gatsby";
import type { PlaceholderProps } from "./placeholder";
import type { MainImageProps } from "./main-image";
import type { IGatsbyImageData } from "./gatsby-image.browser";
import type { Layout, ImageFormat } from "../image-utils";
export declare const hasNativeLazyLoadSupport: () => boolean;
export declare function gatsbyImageIsInstalled(): boolean;
export type IGatsbyImageDataParent<T = never> = T & {
    gatsbyImageData: IGatsbyImageData;
};
export type IGatsbyImageParent<T = never> = T & {
    gatsbyImage: IGatsbyImageData;
};
export type FileNode = Partial<Node> & {
    childImageSharp?: IGatsbyImageDataParent<Partial<Node>>;
};
export type ImageDataLike = FileNode | IGatsbyImageDataParent | IGatsbyImageParent | IGatsbyImageData;
export declare const getImage: (node: ImageDataLike | null) => IGatsbyImageData | undefined;
export declare const getSrc: (node: ImageDataLike) => string | undefined;
export declare const getSrcSet: (node: ImageDataLike) => string | undefined;
export declare function getWrapperProps(width: number, height: number, layout: Layout): Pick<HTMLAttributes<HTMLElement>, "className" | "style"> & {
    "data-gatsby-image-wrapper": string;
};
export interface IUrlBuilderArgs<OptionsType> {
    width: number;
    height: number;
    baseUrl: string;
    format: ImageFormat;
    options: OptionsType;
}
export interface IGetImageDataArgs<OptionsType = Record<string, unknown>> {
    baseUrl: string;
    /**
     * For constrained and fixed images, the size of the image element
     */
    width?: number;
    height?: number;
    /**
     * If available, pass the source image width and height
     */
    sourceWidth?: number;
    sourceHeight?: number;
    /**
     * If only one dimension is passed, then this will be used to calculate the other.
     */
    aspectRatio?: number;
    layout?: Layout;
    /**
     * Returns a URL based on the passed arguments. Should be a pure function
     */
    urlBuilder: (args: IUrlBuilderArgs<OptionsType>) => string;
    /**
     * Should be a data URI
     */
    placeholderURL?: string;
    backgroundColor?: string;
    /**
     * Used in error messages etc
     */
    pluginName?: string;
    /**
     * If you do not support auto-format, pass an array of image types here
     */
    formats?: Array<ImageFormat>;
    breakpoints?: Array<number>;
    /**
     * Passed to the urlBuilder function
     */
    options?: OptionsType;
}
/**
 * Use this hook to generate gatsby-plugin-image data in the browser.
 */
export declare function getImageData<OptionsType>({ baseUrl, urlBuilder, sourceWidth, sourceHeight, pluginName, formats, breakpoints, options, ...props }: IGetImageDataArgs<OptionsType>): IGatsbyImageData;
export declare function getMainProps(isLoading: boolean, isLoaded: boolean, images: IGatsbyImageData["images"], loading?: "eager" | "lazy", style?: CSSProperties): Partial<MainImageProps>;
export type PlaceholderImageAttrs = ImgHTMLAttributes<HTMLImageElement> & Pick<PlaceholderProps, "sources" | "fallback"> & {
    "data-placeholder-image"?: string;
};
export declare function getPlaceholderProps(placeholder: PlaceholderImageAttrs | undefined, isLoaded: boolean, layout: Layout, width?: number, height?: number, backgroundColor?: string, objectFit?: CSSProperties["objectFit"], objectPosition?: CSSProperties["objectPosition"]): PlaceholderImageAttrs;
export interface IArtDirectedImage {
    media: string;
    image: IGatsbyImageData;
}
/**
 * Generate a Gatsby image data object with multiple, art-directed images that display at different
 * resolutions.
 *
 * @param defaultImage The image displayed when no media query matches.
 * It is also used for all other settings applied to the image, such as width, height and layout.
 * You should pass a className to the component with media queries to adjust the size of the container,
 * as this cannot be adjusted automatically.
 * @param artDirected Array of objects which each contains a `media` string which is a media query
 * such as `(min-width: 320px)`, and the image object to use when that query matches.
 */
export declare function withArtDirection(defaultImage: IGatsbyImageData, artDirected: Array<IArtDirectedImage>): IGatsbyImageData;
//# sourceMappingURL=hooks.d.ts.map