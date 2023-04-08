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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.renderImageToString = exports.swapPlaceholderImage = void 0;
var react_1 = __importDefault(require("react"));
var server_1 = require("react-dom/server");
var layout_wrapper_1 = require("./layout-wrapper");
var placeholder_1 = require("./placeholder");
var main_image_1 = require("./main-image");
var hooks_1 = require("./hooks");
var intersection_observer_1 = require("./intersection-observer");
function applyPolyfill(element) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!("objectFitPolyfill" in window)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(
                        // @ts-ignore typescript can't find the module for some reason ¯\_(ツ)_/¯
                        /* webpackChunkName: "gatsby-plugin-image-objectfit-polyfill" */ "objectFitPolyfill")); })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    ;
                    window.objectFitPolyfill(element);
                    return [2 /*return*/];
            }
        });
    });
}
function toggleLoaded(mainImage, placeholderImage) {
    mainImage.style.opacity = "1";
    if (placeholderImage) {
        placeholderImage.style.opacity = "0";
    }
}
function startLoading(element, cacheKey, imageCache, onStartLoad, onLoad, onError) {
    var mainImage = element.querySelector("[data-main-image]");
    var placeholderImage = element.querySelector("[data-placeholder-image]");
    var isCached = imageCache.has(cacheKey);
    function onImageLoaded(e) {
        var _this = this;
        // eslint-disable-next-line @babel/no-invalid-this
        this.removeEventListener("load", onImageLoaded);
        var target = e.currentTarget;
        var img = new Image();
        img.src = target.currentSrc;
        if (img.decode) {
            // Decode the image through javascript to support our transition
            img
                .decode()
                .then(function () {
                // eslint-disable-next-line @babel/no-invalid-this
                toggleLoaded(_this, placeholderImage);
                onLoad === null || onLoad === void 0 ? void 0 : onLoad({
                    wasCached: isCached
                });
            })["catch"](function (e) {
                // eslint-disable-next-line @babel/no-invalid-this
                toggleLoaded(_this, placeholderImage);
                onError === null || onError === void 0 ? void 0 : onError(e);
            });
        }
        else {
            // eslint-disable-next-line @babel/no-invalid-this
            toggleLoaded(this, placeholderImage);
            onLoad === null || onLoad === void 0 ? void 0 : onLoad({
                wasCached: isCached
            });
        }
    }
    mainImage.addEventListener("load", onImageLoaded);
    onStartLoad === null || onStartLoad === void 0 ? void 0 : onStartLoad({
        wasCached: isCached
    });
    Array.from(mainImage.parentElement.children).forEach(function (child) {
        var src = child.getAttribute("data-src");
        var srcSet = child.getAttribute("data-srcset");
        if (src) {
            child.removeAttribute("data-src");
            child.setAttribute("src", src);
        }
        if (srcSet) {
            child.removeAttribute("data-srcset");
            child.setAttribute("srcset", srcSet);
        }
    });
    imageCache.add(cacheKey);
    // Load times not always fires - mostly when it's a 304
    // We check if the image is already completed and if so we trigger onload.
    if (mainImage.complete) {
        onImageLoaded.call(mainImage, {
            currentTarget: mainImage
        });
    }
    return function () {
        if (mainImage) {
            mainImage.removeEventListener("load", onImageLoaded);
        }
    };
}
function swapPlaceholderImage(element, cacheKey, imageCache, style, onStartLoad, onLoad, onError) {
    var _a, _b;
    if (!(0, hooks_1.hasNativeLazyLoadSupport)()) {
        var cleanup_1;
        var io = (0, intersection_observer_1.createIntersectionObserver)(function () {
            cleanup_1 = startLoading(element, cacheKey, imageCache, onStartLoad, onLoad, onError);
        });
        var unobserve_1 = io(element);
        // Polyfill "object-fit" if unsupported (mostly IE)
        if (!("objectFit" in document.documentElement.style)) {
            element.dataset.objectFit = (_a = style.objectFit) !== null && _a !== void 0 ? _a : "cover";
            element.dataset.objectPosition = "".concat((_b = style.objectPosition) !== null && _b !== void 0 ? _b : "50% 50%");
            applyPolyfill(element);
        }
        return function () {
            if (cleanup_1) {
                cleanup_1();
            }
            unobserve_1();
        };
    }
    return startLoading(element, cacheKey, imageCache, onStartLoad, onLoad, onError);
}
exports.swapPlaceholderImage = swapPlaceholderImage;
function renderImageToString(_a) {
    var image = _a.image, _b = _a.loading, loading = _b === void 0 ? "lazy" : _b, isLoading = _a.isLoading, isLoaded = _a.isLoaded, imgClassName = _a.imgClassName, _c = _a.imgStyle, imgStyle = _c === void 0 ? {} : _c, objectPosition = _a.objectPosition, backgroundColor = _a.backgroundColor, _d = _a.objectFit, objectFit = _d === void 0 ? "cover" : _d, props = __rest(_a, ["image", "loading", "isLoading", "isLoaded", "imgClassName", "imgStyle", "objectPosition", "backgroundColor", "objectFit"]);
    var width = image.width, height = image.height, layout = image.layout, images = image.images, placeholder = image.placeholder, wrapperBackgroundColor = image.backgroundColor;
    imgStyle = __assign({ objectFit: objectFit, objectPosition: objectPosition, backgroundColor: backgroundColor }, imgStyle);
    return (0, server_1.renderToStaticMarkup)(react_1["default"].createElement(layout_wrapper_1.LayoutWrapper, { layout: layout, width: width, height: height },
        react_1["default"].createElement(placeholder_1.Placeholder, __assign({}, (0, hooks_1.getPlaceholderProps)(placeholder, isLoaded, layout, width, height, wrapperBackgroundColor, objectFit, objectPosition))),
        react_1["default"].createElement(main_image_1.MainImage, __assign({}, props, { width: width, height: height, className: imgClassName }, (0, hooks_1.getMainProps)(isLoading, isLoaded, images, loading, imgStyle)))));
}
exports.renderImageToString = renderImageToString;
