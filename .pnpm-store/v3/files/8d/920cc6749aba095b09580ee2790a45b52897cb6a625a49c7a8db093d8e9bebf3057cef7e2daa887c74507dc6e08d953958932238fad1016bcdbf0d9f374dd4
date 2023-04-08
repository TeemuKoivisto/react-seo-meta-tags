"use strict";

exports.__esModule = true;
exports.GATSBY_PLUGIN_PREVIEW_NAME = exports.GATSBY_CLOUD_PLUGIN_NAME = void 0;
exports.addGatsbyPluginCloudPluginWhenInstalled = addGatsbyPluginCloudPluginWhenInstalled;
exports.addGatsbyPluginPreviewWhenInstalled = addGatsbyPluginPreviewWhenInstalled;
exports.incompatibleGatsbyCloudPlugin = incompatibleGatsbyCloudPlugin;
var _resolveFrom = require("resolve-from");
var semver = _interopRequireWildcard(require("semver"));
var _processPlugin = require("../process-plugin");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GATSBY_CLOUD_PLUGIN_NAME = `gatsby-plugin-gatsby-cloud`;
exports.GATSBY_CLOUD_PLUGIN_NAME = GATSBY_CLOUD_PLUGIN_NAME;
const GATSBY_PLUGIN_PREVIEW_NAME = `@gatsby-cloud-pkg/gatsby-plugin-preview`;
exports.GATSBY_PLUGIN_PREVIEW_NAME = GATSBY_PLUGIN_PREVIEW_NAME;
function addCloudPluginWhenInstalled(plugins, rootDir, name) {
  const cloudPluginLocation = (0, _resolveFrom.silent)(rootDir, name);
  if (cloudPluginLocation) {
    const processedGatsbyCloudPlugin = (0, _processPlugin.processPlugin)({
      resolve: name,
      options: {}
    }, rootDir);
    plugins.push(processedGatsbyCloudPlugin);
  }
}
function addGatsbyPluginPreviewWhenInstalled(plugins, rootDir) {
  addCloudPluginWhenInstalled(plugins, rootDir, GATSBY_PLUGIN_PREVIEW_NAME);
}
function addGatsbyPluginCloudPluginWhenInstalled(plugins, rootDir) {
  addCloudPluginWhenInstalled(plugins, rootDir, GATSBY_CLOUD_PLUGIN_NAME);
}
function incompatibleGatsbyCloudPlugin(plugins) {
  const plugin = plugins.find(plugin => plugin.name === GATSBY_CLOUD_PLUGIN_NAME);
  return !semver.satisfies(plugin.version, `>=4.0.0-alpha`, {
    includePrerelease: true
  });
}
//# sourceMappingURL=handle-gatsby-cloud.js.map