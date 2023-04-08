/// <reference types="react" />
declare global {
    interface Window {
        OK: {
            Share: {
                count: (index: number, _count: number) => void;
            };
            callbacks: ((count?: number) => void)[];
        };
        ODKL: {
            updateCount: (index: string, count: string) => void;
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
