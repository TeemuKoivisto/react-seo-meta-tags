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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.withArtDirection = exports.getPlaceholderProps = exports.getMainProps = exports.getImageData = exports.getWrapperProps = exports.getSrcSet = exports.getSrc = exports.getImage = exports.gatsbyImageIsInstalled = exports.hasNativeLazyLoadSupport = void 0;
/* global GATSBY___IMAGE */
var image_utils_1 = require("../image-utils");
// Native lazy-loading support: https://addyosmani.com/blog/lazy-loading/
var hasNativeLazyLoadSupport = function () {
    return typeof HTMLImageElement !== "undefined" &&
        "loading" in HTMLImageElement.prototype;
};
exports.hasNativeLazyLoadSupport = hasNativeLazyLoadSupport;
function gatsbyImageIsInstalled() {
    return typeof GATSBY___IMAGE !== "undefined" && GATSBY___IMAGE;
}
exports.gatsbyImageIsInstalled = gatsbyImageIsInstalled;
var isGatsbyImageData = function (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
node) { var _a, _b; 
// 🦆 check for a deep prop to be sure this is a valid gatsbyImageData object
return Boolean((_b = (_a = node === null || node === void 0 ? void 0 : node.images) === null || _a === void 0 ? void 0 : _a.fallback) === null || _b === void 0 ? void 0 : _b.src); };
var isGatsbyImageDataParent = function (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
node) { return Boolean(node === null || node === void 0 ? void 0 : node.gatsbyImageData); };
var isGatsbyImageParent = function (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
node) { return Boolean(node === null || node === void 0 ? void 0 : node.gatsbyImage); };
var getImage = function (node) {
    var _a;
    // This checks both for gatsbyImageData and gatsbyImage
    if (isGatsbyImageData(node)) {
        return node;
    }
    // gatsbyImageData GraphQL field
    if (isGatsbyImageDataParent(node)) {
        return node.gatsbyImageData;
    }
    // gatsbyImage GraphQL field for Gatsby's Image CDN service
    if (isGatsbyImageParent(node)) {
        return node.gatsbyImage;
    }
    return (_a = node === null || node === void 0 ? void 0 : node.childImageSharp) === null || _a === void 0 ? void 0 : _a.gatsbyImageData;
};
exports.getImage = getImage;
var getSrc = function (node) { var _a, _b, _c; return (_c = (_b = (_a = (0, exports.getImage)(node)) === null || _a === void 0 ? void 0 : _a.images) === null || _b === void 0 ? void 0 : _b.fallback) === null || _c === void 0 ? void 0 : _c.src; };
exports.getSrc = getSrc;
var getSrcSet = function (node) { var _a, _b, _c; return (_c = (_b = (_a = (0, exports.getImage)(node)) === null || _a === void 0 ? void 0 : _a.images) === null || _b === void 0 ? void 0 : _b.fallback) === null || _c === void 0 ? void 0 : _c.srcSet; };
exports.getSrcSet = getSrcSet;
function getWrapperProps(width, height, layout) {
    var wrapperStyle = {};
    var className = "gatsby-image-wrapper";
    // If the plugin isn't installed we need to apply the styles inline
    if (!gatsbyImageIsInstalled()) {
        wrapperStyle.position = "relative";
        wrapperStyle.overflow = "hidden";
    }
    if (layout === "fixed") {
        wrapperStyle.width = width;
        wrapperStyle.height = height;
    }
    else if (layout === "constrained") {
        if (!gatsbyImageIsInstalled()) {
            wrapperStyle.display = "inline-block";
            wrapperStyle.verticalAlign = "top";
        }
        className = "gatsby-image-wrapper gatsby-image-wrapper-constrained";
    }
    return {
        className: className,
        "data-gatsby-image-wrapper": "",
        style: wrapperStyle
    };
}
exports.getWrapperProps = getWrapperProps;
/**
 * Use this hook to generate gatsby-plugin-image data in the browser.
 */
function getImageData(_a) {
    var baseUrl = _a.baseUrl, urlBuilder = _a.urlBuilder, sourceWidth = _a.sourceWidth, sourceHeight = _a.sourceHeight, _b = _a.pluginName, pluginName = _b === void 0 ? "getImageData" : _b, _c = _a.formats, formats = _c === void 0 ? ["auto"] : _c, breakpoints = _a.breakpoints, options = _a.options, props = __rest(_a, ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"]);
    if (!(breakpoints === null || breakpoints === void 0 ? void 0 : breakpoints.length) &&
        (props.layout === "fullWidth" || props.layout === "FULL_WIDTH")) {
        breakpoints = image_utils_1.EVERY_BREAKPOINT;
    }
    var generateImageSource = function (baseUrl, width, height, format) {
        return {
            width: width,
            height: height,
            format: format,
            src: urlBuilder({ baseUrl: baseUrl, width: width, height: height, options: options, format: format })
        };
    };
    var sourceMetadata = {
        width: sourceWidth,
        height: sourceHeight,
        format: "auto"
    };
    var args = __assign(__assign({}, props), { pluginName: pluginName, generateImageSource: generateImageSource, filename: baseUrl, formats: formats, breakpoints: breakpoints, sourceMetadata: sourceMetadata });
    return (0, image_utils_1.generateImageData)(args);
}
exports.getImageData = getImageData;
function getMainProps(isLoading, isLoaded, images, loading, style) {
    if (style === void 0) { style = {}; }
    // fallback when it's not configured in gatsby-config.
    if (!gatsbyImageIsInstalled()) {
        style = __assign({ height: "100%", left: 0, position: "absolute", top: 0, transform: "translateZ(0)", transition: "opacity 250ms linear", width: "100%", willChange: "opacity" }, style);
    }
    var result = __assign(__assign({}, images), { loading: loading, shouldLoad: isLoading, "data-main-image": "", style: __assign(__assign({}, style), { opacity: isLoaded ? 1 : 0 }) });
    return result;
}
exports.getMainProps = getMainProps;
function getPlaceholderProps(placeholder, isLoaded, layout, width, height, backgroundColor, objectFit, objectPosition) {
    var wrapperStyle = {};
    if (backgroundColor) {
        wrapperStyle.backgroundColor = backgroundColor;
        if (layout === "fixed") {
            wrapperStyle.width = width;
            wrapperStyle.height = height;
            wrapperStyle.backgroundColor = backgroundColor;
            wrapperStyle.position = "relative";
        }
        else if (layout === "constrained") {
            wrapperStyle.position = "absolute";
            wrapperStyle.top = 0;
            wrapperStyle.left = 0;
            wrapperStyle.bottom = 0;
            wrapperStyle.right = 0;
        }
        else if (layout === "fullWidth") {
            wrapperStyle.position = "absolute";
            wrapperStyle.top = 0;
            wrapperStyle.left = 0;
            wrapperStyle.bottom = 0;
            wrapperStyle.right = 0;
        }
    }
    if (objectFit) {
        wrapperStyle.objectFit = objectFit;
    }
    if (objectPosition) {
        wrapperStyle.objectPosition = objectPosition;
    }
    var result = __assign(__assign({}, placeholder), { "aria-hidden": true, "data-placeholder-image": "", style: __assign({ opacity: isLoaded ? 0 : 1, transition: "opacity 500ms linear" }, wrapperStyle) });
    // fallback when it's not configured in gatsby-config.
    if (!gatsbyImageIsInstalled()) {
        result.style = {
            height: "100%",
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%"
        };
    }
    return result;
}
exports.getPlaceholderProps = getPlaceholderProps;
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
function withArtDirection(defaultImage, artDirected) {
    var _a, _b;
    var _c;
    var images = defaultImage.images, placeholder = defaultImage.placeholder, props = __rest(defaultImage, ["images", "placeholder"]);
    var output = __assign(__assign({}, props), { images: __assign(__assign({}, images), { sources: [] }), placeholder: placeholder && __assign(__assign({}, placeholder), { sources: [] }) });
    artDirected.forEach(function (_a) {
        var _b;
        var media = _a.media, image = _a.image;
        if (!media) {
            if (process.env.NODE_ENV === "development") {
                console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
            }
            return;
        }
        if (image.layout !== defaultImage.layout &&
            process.env.NODE_ENV === "development") {
            console.warn("[gatsby-plugin-image] Mismatched image layout: expected \"".concat(defaultImage.layout, "\" but received \"").concat(image.layout, "\". All art-directed images use the same layout as the default image"));
        }
        (_b = output.images.sources).push.apply(_b, __spreadArray(__spreadArray([], __read(image.images.sources.map(function (source) {
            return __assign(__assign({}, source), { media: media });
        })), false), [{
                media: media,
                srcSet: image.images.fallback.srcSet
            }], false));
        if (!output.placeholder) {
            return;
        }
        output.placeholder.sources.push({
            media: media,
            srcSet: image.placeholder.fallback
        });
    });
    (_a = output.images.sources).push.apply(_a, __spreadArray([], __read(images.sources), false));
    if (placeholder === null || placeholder === void 0 ? void 0 : placeholder.sources) {
        (_c = output.placeholder) === null || _c === void 0 ? void 0 : (_b = _c.sources).push.apply(_b, __spreadArray([], __read(placeholder.sources), false));
    }
    return output;
}
exports.withArtDirection = withArtDirection;
