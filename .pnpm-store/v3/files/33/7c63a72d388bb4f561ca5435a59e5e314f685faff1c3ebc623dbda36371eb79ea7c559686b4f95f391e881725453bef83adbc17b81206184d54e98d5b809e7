"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.createGraphqlEngineBundle = createGraphqlEngineBundle;
var path = _interopRequireWildcard(require("path"));
var fs = _interopRequireWildcard(require("fs-extra"));
var _webpack = _interopRequireDefault(require("webpack"));
var _ConcatenatedModule = _interopRequireDefault(require("webpack/lib/optimize/ConcatenatedModule"));
var _printPlugins = require("./print-plugins");
var _module = _interopRequireDefault(require("module"));
var _webpackLogging = require("../../utils/webpack/plugins/webpack-logging");
var nodeApis = _interopRequireWildcard(require("../../utils/api-node-docs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable @typescript-eslint/naming-convention */

const extensions = [`.mjs`, `.js`, `.json`, `.node`, `.ts`, `.tsx`];
const outputDir = path.join(process.cwd(), `.cache`, `query-engine`);
const cacheLocation = path.join(process.cwd(), `.cache`, `webpack`, `query-engine`);
function getApisToRemoveForQueryEngine() {
  const apisToKeep = new Set(_printPlugins.schemaCustomizationAPIs);
  apisToKeep.add(`onPluginInit`);
  const apisToRemove = Object.keys(nodeApis).filter(api => !apisToKeep.has(api));
  return apisToRemove;
}
async function createGraphqlEngineBundle(rootDir, reporter, isVerbose) {
  var _process$env$GATSBY_W;
  const schemaSnapshotString = await fs.readFile(path.join(rootDir, `.cache`, `schema.gql`), `utf-8`);
  await (0, _printPlugins.printQueryEnginePlugins)();
  const assetRelocatorUseEntry = {
    loader: require.resolve(`@vercel/webpack-asset-relocator-loader`),
    options: {
      outputAssetBase: `assets`
    }
  };
  const gatsbyPluginTSRequire = _module.default.createRequire(require.resolve(`gatsby-plugin-typescript`));
  const compiler = (0, _webpack.default)({
    name: `Query Engine`,
    // mode: `production`,
    mode: `none`,
    entry: path.join(__dirname, `entry.js`),
    output: {
      path: outputDir,
      filename: `index.js`,
      libraryTarget: `commonjs`
    },
    target: `node`,
    externalsPresets: {
      node: false
    },
    cache: {
      type: `filesystem`,
      name: `graphql-engine`,
      cacheLocation,
      buildDependencies: {
        config: [__filename]
      }
    },
    // those are required in some runtime paths, but we don't need them
    externals: [`cbor-x`,
    // optional dep of lmdb-store, but we are using `msgpack` (default) encoding, so we don't need it
    `babel-runtime/helpers/asyncToGenerator`,
    // undeclared dep of yurnalist (but used in code path we don't use)
    `electron`,
    // :shrug: `got` seems to have electron specific code path
    _module.default.builtinModules.reduce((acc, builtinModule) => {
      if (builtinModule === `fs`) {
        acc[builtinModule] = `global _actualFsWrapper`;
        acc[`node:${builtinModule}`] = `global _actualFsWrapper`;
      } else {
        acc[builtinModule] = `commonjs ${builtinModule}`;
        acc[`node:${builtinModule}`] = `commonjs ${builtinModule}`;
      }
      return acc;
    }, {})],
    module: {
      rules: [{
        oneOf: [{
          // specific set of loaders for LMBD - our custom patch to massage lmdb to work with relocator -> relocator
          test: /node_modules[/\\]lmdb[/\\].*\.[cm]?js/,
          // it is recommended for Node builds to turn off AMD support
          parser: {
            amd: false
          },
          use: [assetRelocatorUseEntry, {
            loader: require.resolve(`./lmdb-bundling-patch`)
          }]
        }, {
          // specific set of loaders for gatsby-node files - our babel transform that removes lifecycles not needed for engine -> relocator
          test: /gatsby-node\.(cjs|mjs|js|ts)$/,
          // it is recommended for Node builds to turn off AMD support
          parser: {
            amd: false
          },
          use: [assetRelocatorUseEntry, {
            loader: require.resolve(`../../utils/webpack/loaders/webpack-remove-exports-loader`),
            options: {
              remove: getApisToRemoveForQueryEngine(),
              jsx: false
            }
          }]
        }, {
          // generic loader for all other cases than lmdb or gatsby-node - we don't do anything special other than using relocator on it
          // For node binary relocations, include ".node" files as well here
          test: /\.(cjs|mjs|js|ts|node)$/,
          // it is recommended for Node builds to turn off AMD support
          parser: {
            amd: false
          },
          use: assetRelocatorUseEntry
        }]
      }, {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve(`babel-loader`),
          options: {
            presets: [gatsbyPluginTSRequire.resolve(`@babel/preset-typescript`)]
          }
        }
      }, {
        test: /\.m?js$/,
        type: `javascript/auto`,
        resolve: {
          byDependency: {
            esm: {
              fullySpecified: false
            }
          }
        }
      }, {
        test: /\.txt/,
        type: `asset/resource`
      }, {
        test: /\.(graphqls?|gqls?)$/,
        use: {
          loader: require.resolve(`graphql-tag/loader`)
        }
      }]
    },
    resolve: {
      extensions,
      alias: {
        ".cache": process.cwd() + `/.cache/`,
        [require.resolve(`gatsby-cli/lib/reporter/loggers/ink/index.js`)]: false,
        inquirer: false,
        // only load one version of lmdb
        lmdb: require.resolve(`lmdb`),
        "ts-node": require.resolve(`./shims/ts-node`),
        "gatsby-sharp$": require.resolve(`./shims/gatsby-sharp`),
        "graphql-import-node$": require.resolve(`./shims/no-op-module`),
        "graphql-import-node/register$": require.resolve(`./shims/no-op-module`)
      }
    },
    plugins: [new _webpack.default.EnvironmentPlugin([`GATSBY_CLOUD_IMAGE_CDN`]), new _webpack.default.DefinePlugin({
      // "process.env.GATSBY_LOGGER": JSON.stringify(`yurnalist`),
      "process.env.GATSBY_SKIP_WRITING_SCHEMA_TO_FILE": `true`,
      "process.env.NODE_ENV": JSON.stringify(`production`),
      SCHEMA_SNAPSHOT: JSON.stringify(schemaSnapshotString),
      "process.env.GATSBY_LOGGER": JSON.stringify(`yurnalist`),
      "process.env.GATSBY_SLICES": JSON.stringify(!!process.env.GATSBY_SLICES)
    }), ((_process$env$GATSBY_W = process.env.GATSBY_WEBPACK_LOGGING) === null || _process$env$GATSBY_W === void 0 ? void 0 : _process$env$GATSBY_W.includes(`query-engine`)) && new _webpackLogging.WebpackLoggingPlugin(rootDir, reporter, isVerbose)].filter(Boolean)
  });
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      function getResourcePath(webpackModule) {
        if (webpackModule && !(webpackModule instanceof _ConcatenatedModule.default)) {
          return webpackModule.resource;
        }
        if (webpackModule !== null && webpackModule !== void 0 && webpackModule.modules) {
          // ConcatenatedModule is a collection of modules so we have to go deeper to actually get a path,
          // at this point we won't know which one so we just grab first module here
          const [firstSubModule] = webpackModule.modules;
          return getResourcePath(firstSubModule);
        }
        return undefined;
      }
      function iterateModules(webpackModules, compilation) {
        for (const webpackModule of webpackModules) {
          if (webpackModule instanceof _ConcatenatedModule.default) {
            iterateModules(webpackModule.modules, compilation);
          } else {
            const resourcePath = getResourcePath(webpackModule);
            if (resourcePath !== null && resourcePath !== void 0 && resourcePath.includes(`ts-node`)) {
              const importedBy = getResourcePath(compilation.moduleGraph.getIssuer(webpackModule));
              const structuredError = {
                id: `98011`,
                context: {
                  package: `ts-node`,
                  importedBy,
                  advisory: `Gatsby is supporting TypeScript natively (see https://gatsby.dev/typescript). "ts-node" might not be needed anymore at all, consider removing it.`
                }
              };
              throw structuredError;
            }
          }
        }
      }
      try {
        if (stats !== null && stats !== void 0 && stats.compilation.modules) {
          iterateModules(stats.compilation.modules, stats.compilation);
        }
        compiler.close(closeErr => {
          if (err) {
            return reject(err);
          }
          if (closeErr) {
            return reject(closeErr);
          }
          return resolve(stats === null || stats === void 0 ? void 0 : stats.compilation);
        });
      } catch (e) {
        reject(e);
      }
    });
  });
}
//# sourceMappingURL=bundle-webpack.js.map