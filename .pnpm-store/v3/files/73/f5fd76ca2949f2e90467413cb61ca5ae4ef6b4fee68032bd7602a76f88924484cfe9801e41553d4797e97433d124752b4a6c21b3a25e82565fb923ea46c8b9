import React, { ImgHTMLAttributes } from "react";
export interface IResponsiveImageProps {
    sizes?: string;
    srcSet: string;
}
export type SourceProps = IResponsiveImageProps & ({
    media: string;
    type?: string;
} | {
    media?: string;
    type: string;
});
type FallbackProps = {
    src: string;
} & Partial<IResponsiveImageProps>;
export type PictureProps = ImgHTMLAttributes<HTMLImageElement> & {
    fallback?: FallbackProps;
    sources?: Array<SourceProps>;
    alt: string;
    shouldLoad?: boolean;
};
export declare const Picture: React.FC<PictureProps>;
export {};
//# sourceMappingURL=picture.d.ts.map