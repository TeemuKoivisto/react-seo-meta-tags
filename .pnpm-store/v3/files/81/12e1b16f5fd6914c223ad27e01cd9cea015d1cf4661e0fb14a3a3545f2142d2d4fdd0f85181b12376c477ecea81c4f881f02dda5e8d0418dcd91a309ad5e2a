"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ImageCDNUrlKeys = void 0;
exports.generateFileUrl = generateFileUrl;
exports.generateImageUrl = generateImageUrl;
var _crypto = _interopRequireDefault(require("crypto"));
var _path = require("path");
var _url = require("url");
var _createContentDigest = require("gatsby-core-utils/create-content-digest");
var _types = require("../types");
// this is an arbitrary origin that we use #branding so we can construct a full url for the URL constructor
const ORIGIN = `https://gatsbyjs.com`;
let ImageCDNUrlKeys;
exports.ImageCDNUrlKeys = ImageCDNUrlKeys;
(function (ImageCDNUrlKeys) {
  ImageCDNUrlKeys["URL"] = "u";
  ImageCDNUrlKeys["ENCRYPTED_URL"] = "eu";
  ImageCDNUrlKeys["ARGS"] = "a";
  ImageCDNUrlKeys["CONTENT_DIGEST"] = "cd";
})(ImageCDNUrlKeys || (exports.ImageCDNUrlKeys = ImageCDNUrlKeys = {}));
function encryptImageCdnUrl(secretKey, iv, urlToEncrypt) {
  const randomPadding = _crypto.default.randomBytes(_crypto.default.randomInt(32, 64)).toString(`hex`);
  const toEncrypt = `${randomPadding}:${urlToEncrypt}`;
  const cipher = _crypto.default.createCipheriv(`aes-256-ctr`, Buffer.from(secretKey, `hex`), Buffer.from(iv, `hex`));
  const encrypted = cipher.update(toEncrypt);
  const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
  return finalBuffer.toString(`hex`);
}
function appendUrlParamToSearchParams(searchParams, url) {
  const key = process.env.IMAGE_CDN_ENCRYPTION_SECRET_KEY || ``;
  const iv = process.env.IMAGE_CDN_ENCRYPTION_IV || ``;
  const shouldEncrypt = !!(iv && key);
  const paramName = shouldEncrypt ? ImageCDNUrlKeys.ENCRYPTED_URL : ImageCDNUrlKeys.URL;
  const finalUrl = shouldEncrypt ? encryptImageCdnUrl(key, iv, url) : url;
  searchParams.append(paramName, finalUrl);
}
function generateFileUrl({
  url,
  filename
}, store) {
  const fileExt = (0, _path.extname)(filename);
  const filenameWithoutExt = (0, _path.basename)(filename, fileExt);
  const parsedURL = new _url.URL(`${ORIGIN}${generatePublicUrl({
    url
  }, store)}/${filenameWithoutExt}${fileExt}`);
  appendUrlParamToSearchParams(parsedURL.searchParams, url);
  return `${parsedURL.pathname}${parsedURL.search}`;
}
function generateImageUrl(source, imageArgs, store) {
  const filenameWithoutExt = (0, _path.basename)(source.filename, (0, _path.extname)(source.filename));
  const queryStr = generateImageArgs(imageArgs);
  const parsedURL = new _url.URL(`${ORIGIN}${generatePublicUrl(source, store)}/${(0, _createContentDigest.createContentDigest)(queryStr)}/${filenameWithoutExt}.${imageArgs.format}`);
  appendUrlParamToSearchParams(parsedURL.searchParams, source.url);
  parsedURL.searchParams.append(ImageCDNUrlKeys.ARGS, queryStr);
  parsedURL.searchParams.append(ImageCDNUrlKeys.CONTENT_DIGEST, source.internal.contentDigest);
  return `${parsedURL.pathname}${parsedURL.search}`;
}
function generatePublicUrl({
  url,
  mimeType
}, store) {
  var _state$program, _state$config;
  const state = store === null || store === void 0 ? void 0 : store.getState();
  const pathPrefix = state !== null && state !== void 0 && (_state$program = state.program) !== null && _state$program !== void 0 && _state$program.prefixPaths ? state === null || state === void 0 ? void 0 : (_state$config = state.config) === null || _state$config === void 0 ? void 0 : _state$config.pathPrefix : ``;
  const remoteUrl = (0, _createContentDigest.createContentDigest)(url);
  let publicUrl = pathPrefix + (mimeType && (0, _types.isImage)({
    mimeType
  }) ? `/_gatsby/image/` : `/_gatsby/file/`);
  publicUrl += `${remoteUrl}`;
  return publicUrl;
}
function generateImageArgs({
  width,
  height,
  format,
  cropFocus,
  quality
}) {
  const args = [];
  if (width) {
    args.push(`w=${width}`);
  }
  if (height) {
    args.push(`h=${height}`);
  }
  if (cropFocus) {
    args.push(`fit=crop`);
    args.push(`crop=${Array.isArray(cropFocus) ? cropFocus.join(`,`) : cropFocus}`);
  }
  args.push(`fm=${format}`);
  args.push(`q=${quality}`);
  return args.join(`&`);
}