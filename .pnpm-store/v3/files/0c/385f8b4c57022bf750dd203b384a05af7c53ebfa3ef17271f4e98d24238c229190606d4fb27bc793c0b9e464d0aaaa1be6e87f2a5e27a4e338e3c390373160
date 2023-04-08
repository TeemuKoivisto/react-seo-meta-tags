/// <reference types="react" />
declare global {
    interface Window {
        VK: {
            Share?: {
                count: (index: number, count: number) => void;
            };
            callbacks?: ((count?: number) => void)[];
        };
    }
}
declare const _default: {
    (props: Omit<import("react").HTMLAttributes<HTMLSpanElement> & {
        children?: ((shareCount: number) => import("react").ReactNode) | undefined;
        getCount: (url: string, callback: (shareCount?: number | undefined) => void) => void;
        url: string;
    }, "getCount">): JSX.Element;
    displayName: string;
};
export default _default;
