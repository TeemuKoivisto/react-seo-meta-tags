"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.GatsbyImage = void 0;
var react_1 = require("react");
var hooks_1 = require("./hooks");
var layout_wrapper_1 = require("./layout-wrapper");
var gatsby_image_server_1 = require("./gatsby-image.server");
var imageCache = new Set();
var renderImageToStringPromise;
var renderImage;
var GatsbyImageHydrator = function GatsbyImageHydrator(_a) {
    var _b = _a.as, as = _b === void 0 ? "div" : _b, image = _a.image, style = _a.style, backgroundColor = _a.backgroundColor, className = _a.className, preactClass = _a["class"], onStartLoad = _a.onStartLoad, onLoad = _a.onLoad, onError = _a.onError, props = __rest(_a, ["as", "image", "style", "backgroundColor", "className", "class", "onStartLoad", "onLoad", "onError"]);
    var width = image.width, height = image.height, layout = image.layout;
    var _c = (0, hooks_1.getWrapperProps)(width, height, layout), wStyle = _c.style, wClass = _c.className, wrapperProps = __rest(_c, ["style", "className"]);
    var root = (0, react_1.useRef)();
    var cacheKey = (0, react_1.useMemo)(function () { return JSON.stringify(image.images); }, [image.images]);
    // Preact uses class instead of className so we need to check for both
    if (preactClass) {
        className = preactClass;
    }
    var sizer = (0, layout_wrapper_1.getSizer)(layout, width, height);
    (0, react_1.useEffect)(function () {
        if (!renderImageToStringPromise) {
            renderImageToStringPromise = Promise.resolve().then(function () { return __importStar(require("./lazy-hydrate")); }).then(function (_a) {
                var renderImageToString = _a.renderImageToString, swapPlaceholderImage = _a.swapPlaceholderImage;
                renderImage = renderImageToString;
                return {
                    renderImageToString: renderImageToString,
                    swapPlaceholderImage: swapPlaceholderImage
                };
            });
        }
        // The plugin image component is a bit special where if it's server-side rendered, we add extra script tags to support lazy-loading without
        // In this case we stop hydration but fire the correct events.
        var ssrImage = root.current.querySelector("[data-gatsby-image-ssr]");
        if (ssrImage && (0, hooks_1.hasNativeLazyLoadSupport)()) {
            if (ssrImage.complete) {
                // Trigger onStartload and onLoad events
                onStartLoad === null || onStartLoad === void 0 ? void 0 : onStartLoad({
                    wasCached: true
                });
                onLoad === null || onLoad === void 0 ? void 0 : onLoad({
                    wasCached: true
                });
                // remove ssr key for state updates but add delay to not fight with native code snippt of gatsby-ssr
                setTimeout(function () {
                    ssrImage.removeAttribute("data-gatsby-image-ssr");
                }, 0);
            }
            else {
                onStartLoad === null || onStartLoad === void 0 ? void 0 : onStartLoad({
                    wasCached: true
                });
                ssrImage.addEventListener("load", function onLoadListener() {
                    ssrImage.removeEventListener("load", onLoadListener);
                    onLoad === null || onLoad === void 0 ? void 0 : onLoad({
                        wasCached: true
                    });
                    // remove ssr key for state updates but add delay to not fight with native code snippt of gatsby-ssr
                    setTimeout(function () {
                        ssrImage.removeAttribute("data-gatsby-image-ssr");
                    }, 0);
                });
            }
            imageCache.add(cacheKey);
            return;
        }
        if (renderImage && imageCache.has(cacheKey)) {
            return;
        }
        var animationFrame;
        var cleanupCallback;
        renderImageToStringPromise.then(function (_a) {
            var renderImageToString = _a.renderImageToString, swapPlaceholderImage = _a.swapPlaceholderImage;
            if (!root.current) {
                return;
            }
            root.current.innerHTML = renderImageToString(__assign({ isLoading: true, isLoaded: imageCache.has(cacheKey), image: image }, props));
            if (!imageCache.has(cacheKey)) {
                animationFrame = requestAnimationFrame(function () {
                    if (root.current) {
                        cleanupCallback = swapPlaceholderImage(root.current, cacheKey, imageCache, style, onStartLoad, onLoad, onError);
                    }
                });
            }
        });
        // eslint-disable-next-line consistent-return
        return function () {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            if (cleanupCallback) {
                cleanupCallback();
            }
        };
    }, [image]);
    // useLayoutEffect is ran before React commits to the DOM. This allows us to make sure our HTML is using our cached image version
    (0, react_1.useLayoutEffect)(function () {
        if (imageCache.has(cacheKey) && renderImage) {
            root.current.innerHTML = renderImage(__assign({ isLoading: imageCache.has(cacheKey), isLoaded: imageCache.has(cacheKey), image: image }, props));
            // Trigger onStartload and onLoad events
            onStartLoad === null || onStartLoad === void 0 ? void 0 : onStartLoad({
                wasCached: true
            });
            onLoad === null || onLoad === void 0 ? void 0 : onLoad({
                wasCached: true
            });
        }
    }, [image]);
    // By keeping all props equal React will keep the component in the DOM
    return (0, react_1.createElement)(as, __assign(__assign({}, wrapperProps), { style: __assign(__assign(__assign({}, wStyle), style), { backgroundColor: backgroundColor }), className: "".concat(wClass).concat(className ? " ".concat(className) : ""), ref: root, dangerouslySetInnerHTML: {
            __html: sizer
        }, suppressHydrationWarning: true }));
};
exports.GatsbyImage = (0, react_1.memo)(function GatsbyImage(props) {
    if (!props.image) {
        if (process.env.NODE_ENV === "development") {
            console.warn("[gatsby-plugin-image] Missing image prop");
        }
        return null;
    }
    if (!(0, hooks_1.gatsbyImageIsInstalled)() && process.env.NODE_ENV === "development") {
        console.warn("[gatsby-plugin-image] You're missing out on some cool performance features. Please add \"gatsby-plugin-image\" to your gatsby-config.js");
    }
    return (0, react_1.createElement)(GatsbyImageHydrator, props);
});
exports.GatsbyImage.propTypes = gatsby_image_server_1.propTypes;
exports.GatsbyImage.displayName = "GatsbyImage";
