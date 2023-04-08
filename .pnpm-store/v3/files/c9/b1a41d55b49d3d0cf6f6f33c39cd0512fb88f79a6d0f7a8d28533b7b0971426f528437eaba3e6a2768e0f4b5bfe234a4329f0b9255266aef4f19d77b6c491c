'use strict';

const node_path = require('node:path');
const fs = require('fs-extra');
const os = require('os');
const kolorist = require('kolorist');
const glob = require('fast-glob');
const debug = require('debug');
const tsMorph = require('ts-morph');
const vite = require('vite');
const typescript = require('typescript');
const pluginutils = require('@rollup/pluginutils');
const node_fs = require('node:fs');
const node_module = require('node:module');
const parser = require('@babel/parser');
const MagicString = require('magic-string');
const apiExtractor = require('@microsoft/api-extractor');
const Collector_js = require('@microsoft/api-extractor/lib/collector/Collector.js');
const MessageRouter_js = require('@microsoft/api-extractor/lib/collector/MessageRouter.js');
const SourceMapper_js = require('@microsoft/api-extractor/lib/collector/SourceMapper.js');
const DtsRollupGenerator_js = require('@microsoft/api-extractor/lib/generators/DtsRollupGenerator.js');
const nodeCoreLibrary = require('@rushstack/node-core-library');

function isNativeObj(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function isRegExp(value) {
  return Object.prototype.toString.call(value) === "[object RegExp]";
}
function isPromise(value) {
  return !!value && typeof value.then === "function" && typeof value.catch === "function";
}
function mergeObjects(sourceObj, targetObj) {
  const loop = [
    {
      source: sourceObj,
      target: targetObj
    }
  ];
  while (loop.length) {
    const { source, target } = loop.pop();
    Object.keys(target).forEach((key) => {
      if (isNativeObj(target[key])) {
        if (!isNativeObj(source[key])) {
          source[key] = {};
        }
        loop.push({
          source: source[key],
          target: target[key]
        });
      } else if (Array.isArray(target[key])) {
        if (!Array.isArray(source[key])) {
          source[key] = [];
        }
        loop.push({
          source: source[key],
          target: target[key]
        });
      } else {
        source[key] = target[key];
      }
    });
  }
  return sourceObj;
}
function ensureAbsolute(path, root) {
  return path ? node_path.isAbsolute(path) ? path : node_path.resolve(root, path) : root;
}
function ensureArray(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}
async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source));
    ret.push(p);
    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}
const speRE = /[\\/]/;
function queryPublicPath(paths) {
  if (paths.length === 0) {
    return "";
  } else if (paths.length === 1) {
    return node_path.dirname(paths[0]);
  }
  let publicPath = node_path.normalize(node_path.dirname(paths[0])) + node_path.sep;
  let publicUnits = publicPath.split(speRE);
  let index = publicUnits.length - 1;
  for (const path of paths.slice(1)) {
    if (!index) {
      return publicPath;
    }
    const dirPath = node_path.normalize(node_path.dirname(path)) + node_path.sep;
    if (dirPath.startsWith(publicPath)) {
      continue;
    }
    const units = dirPath.split(speRE);
    if (units.length < index) {
      publicPath = dirPath;
      publicUnits = units;
      continue;
    }
    for (let i = 0; i <= index; ++i) {
      if (publicUnits[i] !== units[i]) {
        if (!i) {
          return "";
        }
        index = i - 1;
        publicUnits = publicUnits.slice(0, index + 1);
        publicPath = publicUnits.join(node_path.sep) + node_path.sep;
        break;
      }
    }
  }
  return publicPath.slice(0, -1);
}
function removeDirIfEmpty(dir) {
  if (!node_fs.existsSync(dir)) {
    return;
  }
  let onlyHasDir = true;
  for (const file of node_fs.readdirSync(dir)) {
    const abs = node_path.resolve(dir, file);
    if (node_fs.lstatSync(abs).isDirectory()) {
      if (!removeDirIfEmpty(abs)) {
        onlyHasDir = false;
      }
    } else {
      onlyHasDir = false;
    }
  }
  if (onlyHasDir) {
    node_fs.rmdirSync(dir);
  }
  return onlyHasDir;
}

const globSuffixRE = /^((?:.*\.[^.]+)|(?:\*+))$/;
function normalizeGlob(path) {
  if (/[\\/]$/.test(path)) {
    return path + "**";
  } else if (!globSuffixRE.test(path.split(/[\\/]/).pop())) {
    return path + "/**";
  }
  return path;
}
const globalDynamicTypeRE = /import\(['"][^;\n]+?['"]\)\.\w+[.()[\]<>,;\n\s]/g;
const dynamicTypeRE = /import\(['"](.+)['"]\)\.(.+)([.()[\]<>,;\n\s])/;
const importTypesRE = /import\s?(?:type)?\s?\{(.+)\}\s?from\s?['"].+['"]/;
function transformDynamicImport(content) {
  const importMap = /* @__PURE__ */ new Map();
  content = content.replace(globalDynamicTypeRE, (str) => {
    const matchResult = str.match(dynamicTypeRE);
    const libName = matchResult[1];
    const importSet = importMap.get(libName) ?? importMap.set(libName, /* @__PURE__ */ new Set()).get(libName);
    const usedType = matchResult[2];
    importSet.add(usedType);
    return usedType + matchResult[3];
  });
  importMap.forEach((importSet, libName) => {
    const importReg = new RegExp(
      `import\\s?(?:type)?\\s?\\{[^;\\n]+\\}\\s?from\\s?['"]${libName}['"]`,
      "g"
    );
    const matchResult = content.match(importReg);
    if (matchResult?.[0]) {
      const importedTypes = matchResult[0].match(importTypesRE)[1].trim().split(",");
      content = content.replace(
        matchResult[0],
        `import type { ${Array.from(importSet).concat(importedTypes).join(", ")} } from '${libName}'`
      );
    } else {
      content = `import type { ${Array.from(importSet).join(", ")} } from '${libName}';
` + content;
    }
  });
  return content;
}
function isAliasMatch(alias, importee) {
  if (isRegExp(alias.find))
    return alias.find.test(importee);
  if (importee.length < alias.find.length)
    return false;
  if (importee === alias.find)
    return true;
  return importee.indexOf(alias.find) === 0 && (alias.find.endsWith("/") || importee.substring(alias.find.length)[0] === "/");
}
const globalImportRE = /(?:(?:import|export)\s?(?:type)?\s?(?:(?:\{[^;\n]+\})|(?:[^;\n]+))\s?from\s?['"][^;\n]+['"])|(?:import\(['"][^;\n]+?['"]\))/g;
const staticImportRE = /(?:import|export)\s?(?:type)?\s?\{?.+\}?\s?from\s?['"](.+)['"]/;
const dynamicImportRE = /import\(['"]([^;\n]+?)['"]\)/;
const simpleStaticImportRE = /((?:import|export).+from\s?)['"](.+)['"]/;
const simpleDynamicImportRE = /(import\()['"](.+)['"]\)/;
function transformAliasImport(filePath, content, aliases, exclude = []) {
  if (!aliases.length)
    return content;
  return content.replace(globalImportRE, (str) => {
    let matchResult = str.match(staticImportRE);
    let isDynamic = false;
    if (!matchResult) {
      matchResult = str.match(dynamicImportRE);
      isDynamic = true;
    }
    if (matchResult?.[1]) {
      const matchedAlias = aliases.find((alias) => isAliasMatch(alias, matchResult[1]));
      if (matchedAlias) {
        if (exclude.some((e) => isRegExp(e) ? e.test(matchResult[1]) : String(e) === matchResult[1])) {
          return str;
        }
        const truthPath = node_path.isAbsolute(matchedAlias.replacement) ? vite.normalizePath(node_path.relative(node_path.dirname(filePath), matchedAlias.replacement)) : vite.normalizePath(matchedAlias.replacement);
        return str.replace(
          isDynamic ? simpleDynamicImportRE : simpleStaticImportRE,
          `$1'${matchResult[1].replace(
            matchedAlias.find,
            (truthPath.startsWith(".") ? truthPath : `./${truthPath}`) + (typeof matchedAlias.find === "string" && matchedAlias.find.endsWith("/") ? "/" : "")
          )}'${isDynamic ? ")" : ""}`
        );
      }
    }
    return str;
  });
}
const pureImportRE = /import\s?['"][^;\n]+?['"];?\n?/g;
function removePureImport(content) {
  return content.replace(pureImportRE, "");
}
const setupFunctionRE = /function setup\([\s\S]+\)\s+?\{[\s\S]+return __returned__\n\}/;
function transferSetupPosition(content) {
  const match = content.match(setupFunctionRE);
  if (match) {
    const setupFunction = match[0];
    return content.replace(setupFunction, "").replace("setup})", setupFunction.slice("function ".length) + "\n\r})");
  }
  return content;
}

const noScriptContent = "import { defineComponent } from 'vue'\nexport default defineComponent({})";
const _require = node_module.createRequire((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('index.cjs', document.baseURI).href)));
let index = 1;
let compileRoot = null;
let compiler;
let vue;
function requireCompiler() {
  if (!compiler) {
    if (compileRoot) {
      try {
        compiler = _require(_require.resolve("vue/compiler-sfc", { paths: [compileRoot] }));
      } catch (e) {
        try {
          compiler = _require(_require.resolve("@vue/compiler-sfc", { paths: [compileRoot] }));
        } catch (e2) {
        }
      }
    }
    if (!compiler) {
      try {
        compiler = _require("vue/compiler-sfc");
      } catch (e) {
        try {
          compiler = _require("@vue/compiler-sfc");
        } catch (e2) {
          throw new Error("@vue/compiler-sfc is not present in the dependency tree.\n");
        }
      }
    }
  }
  return compiler;
}
function isVue3() {
  if (!vue) {
    if (compileRoot) {
      try {
        vue = _require(_require.resolve("vue", { paths: [compileRoot] }));
      } catch (e) {
      }
    }
    if (!vue) {
      try {
        vue = _require("vue");
      } catch (e) {
        throw new Error("vue is not present in the dependency tree.\n");
      }
    }
  }
  return vue.version.startsWith("3");
}
function setCompileRoot(root) {
  if (root && root !== compileRoot) {
    compileRoot = root;
    compiler = null;
  }
}
function parseCode(code) {
  const { parse: parseVueCode } = requireCompiler();
  let descriptor;
  if (isVue3()) {
    descriptor = parseVueCode(code).descriptor;
  } else {
    descriptor = parseVueCode({ source: code });
  }
  return descriptor;
}
function transformJsToTs(script) {
  if (!script)
    return script;
  const lang = !script.lang || script.lang === "js" ? "ts" : script.lang === "jsx" ? "tsx" : script.lang;
  return { ...script, lang };
}
function preprocessVueCode(code, setupScript) {
  const plugins = ["typescript", "decorators-legacy", "jsx"];
  const scriptAst = parser.parse(code, { sourceType: "module", plugins }).program.body;
  const source = new MagicString(code);
  let propsTypeName;
  let propsTypeLiteral;
  if (setupScript) {
    let processDefineProps = function(node) {
      if (node.type === "CallExpression" && node.callee.type === "Identifier") {
        if (node.callee.name === "defineProps") {
          defineProps = node;
          return true;
        } else if (node.callee.name === "withDefaults") {
          const propsDef = node.arguments[0];
          if (propsDef.type === "CallExpression" && propsDef.callee.type === "Identifier" && propsDef.callee.name === "defineProps") {
            defineProps = propsDef;
            return true;
          }
        }
      }
      return false;
    };
    const setupAst = parser.parse(setupScript.content, { sourceType: "module", plugins }).program.body;
    let defineProps;
    for (const node of setupAst) {
      if (node.type === "ExpressionStatement") {
        processDefineProps(node.expression);
      } else if (node.type === "VariableDeclaration" && !node.declare) {
        for (const decl of node.declarations) {
          if (decl.init && processDefineProps(decl.init)) {
            break;
          }
        }
      }
      if (defineProps) {
        const type = defineProps.typeParameters?.params[0];
        if (type && type.type === "TSTypeReference" && type.typeName.type === "Identifier") {
          propsTypeName = type.typeName.name;
        } else if (type?.type === "TSTypeLiteral") {
          propsTypeName = "__DTS_Props__";
          propsTypeLiteral = setupScript.content.substring(type.start, type.end);
        }
        break;
      }
    }
  }
  const declRecord = /* @__PURE__ */ new Map();
  let defaultExport;
  let options;
  for (const node of scriptAst) {
    if (node.type === "VariableDeclaration") {
      for (const decl of node.declarations) {
        if (decl.id.type === "Identifier" && decl.init) {
          let properties;
          if (decl.init.type === "ObjectExpression") {
            properties = decl.init.properties;
          } else if (decl.init.type === "CallExpression" && decl.init.arguments[0]?.type === "ObjectExpression") {
            properties = decl.init.arguments[0].properties;
          }
          if (!properties)
            continue;
          if (defaultExport && decl.id.name === defaultExport) {
            options = properties;
            break;
          } else {
            declRecord.set(decl.id.name, properties);
          }
        }
      }
    }
    if (node.type === "ExportDefaultDeclaration") {
      if (node.declaration.type === "ObjectExpression") {
        options = node.declaration.properties;
      } else if (node.declaration.type === "CallExpression" && node.declaration.arguments[0]?.type === "ObjectExpression") {
        options = node.declaration.arguments[0].properties;
      } else if (node.declaration.type === "Identifier") {
        if (declRecord.has(node.declaration.name)) {
          options = declRecord.get(node.declaration.name);
        } else {
          defaultExport = node.declaration.name;
        }
      }
    }
    if (options) {
      for (const option of options) {
        if (propsTypeName && option.type === "ObjectProperty" && option.key.type === "Identifier" && option.key.name === "props" && option.value.type === "ObjectExpression") {
          for (const prop of option.value.properties) {
            if (prop.type === "ObjectProperty" && prop.key.type === "Identifier") {
              if (prop.value.type === "ObjectExpression") {
                for (const propDef of prop.value.properties) {
                  if (propDef.type === "ObjectProperty" && propDef.key.type === "Identifier" && propDef.key.name === "type") {
                    source.prependLeft(
                      propDef.end,
                      ` as unknown as __PropType<${propsTypeName}['${prop.key.name}']>`
                    );
                  }
                }
              } else {
                source.prependLeft(
                  prop.end,
                  ` as unknown as __PropType<${propsTypeName}['${prop.key.name}']>`
                );
              }
            }
          }
        }
        if (option.type === "ObjectProperty" && option.key.type === "Identifier" && option.key.name === "components") {
          source.overwrite(option.value.start, option.value.end, "undefined");
        }
        if (option.type === "ObjectMethod" && option.key.type === "Identifier" && option.key.name === "setup") {
          let exposed;
          let returned;
          for (const node2 of option.body.body) {
            if (!exposed && node2.type === "ExpressionStatement" && node2.expression.type === "CallExpression" && node2.expression.callee.type === "Identifier" && node2.expression.callee.name === "expose") {
              exposed = node2.expression.arguments[0];
              continue;
            }
            if (node2.type === "ReturnStatement") {
              returned = node2;
              break;
            }
          }
          const newReturned = exposed && exposed.type === "ObjectExpression" ? `return ${code.substring(exposed.start, exposed.end)}` : setupScript ? "return {}" : "";
          if (newReturned) {
            if (returned) {
              source.overwrite(returned.start, returned.end, newReturned);
            } else if (option.body.body.length) {
              source.appendRight(option.body.body.at(-1).end, `
${newReturned}
`);
            }
          }
        }
      }
      break;
    }
  }
  if (propsTypeName) {
    if (propsTypeLiteral) {
      source.prepend(`
type ${propsTypeName} = ${propsTypeLiteral}

`);
    }
    source.prepend("import type { PropType as __PropType } from 'vue'\n");
  }
  return source.toString();
}
function compileVueCode(code) {
  const { compileScript, rewriteDefault } = requireCompiler();
  const descriptor = parseCode(code);
  const { script, scriptSetup } = descriptor;
  let error;
  let content;
  let ext = "js";
  if (script || scriptSetup) {
    const compiled = compileScript(
      {
        ...descriptor,
        script: transformJsToTs(script),
        scriptSetup: transformJsToTs(scriptSetup),
        cssVars: []
      },
      { id: `${index++}` }
    );
    try {
      content = preprocessVueCode(compiled.content, scriptSetup);
    } catch (e) {
      error = e;
      content = compiled.content;
    }
    content = rewriteDefault(content, "_sfc_main", ["typescript", "decorators-legacy"]);
    if (scriptSetup) {
      content = transferSetupPosition(content);
      ext = scriptSetup.lang || "js";
    } else if (script && script.content) {
      ext = script.lang || "js";
    }
    content += "\nexport default _sfc_main\n";
  } else {
    content = noScriptContent;
    ext = "ts";
  }
  return { error, content, ext };
}

const dtsRE$1 = /\.d\.tsx?$/;
function rollupDeclarationFiles({
  root,
  compilerOptions,
  outputDir,
  entryPath,
  fileName,
  libFolder,
  bundledPackages
}) {
  const configObjectFullPath = node_path.resolve(root, "api-extractor.json");
  const packageJsonLookup = new nodeCoreLibrary.PackageJsonLookup();
  const packageJsonFullPath = packageJsonLookup.tryGetPackageJsonFilePathFor(configObjectFullPath);
  if (!dtsRE$1.test(fileName)) {
    fileName += ".d.ts";
  }
  const extractorConfig = apiExtractor.ExtractorConfig.prepare({
    configObject: {
      projectFolder: root,
      mainEntryPointFilePath: entryPath,
      bundledPackages,
      compiler: {
        overrideTsconfig: {
          $schema: "http://json.schemastore.org/tsconfig",
          compilerOptions
        }
      },
      apiReport: {
        enabled: false,
        reportFileName: "<unscopedPackageName>.api.md"
      },
      docModel: {
        enabled: false
      },
      dtsRollup: {
        enabled: true,
        publicTrimmedFilePath: node_path.resolve(outputDir, fileName)
      },
      tsdocMetadata: {
        enabled: false
      },
      messages: {
        compilerMessageReporting: {
          default: {
            logLevel: "none"
          }
        },
        extractorMessageReporting: {
          default: {
            logLevel: "none"
          }
        }
      }
    },
    configObjectFullPath,
    packageJsonFullPath
  });
  const compilerState = apiExtractor.CompilerState.create(extractorConfig, {
    localBuild: false,
    showVerboseMessages: false,
    typescriptCompilerFolder: libFolder ? node_path.resolve(libFolder, "..") : void 0
  });
  const sourceMapper = new SourceMapper_js.SourceMapper();
  const messageRouter = new MessageRouter_js.MessageRouter({
    workingPackageFolder: root,
    messageCallback: void 0,
    messagesConfig: extractorConfig.messages,
    showVerboseMessages: false,
    showDiagnostics: false,
    tsdocConfiguration: extractorConfig.tsdocConfiguration,
    sourceMapper
  });
  const collector = new Collector_js.Collector({
    program: compilerState.program,
    messageRouter,
    extractorConfig,
    sourceMapper
  });
  collector.analyze();
  DtsRollupGenerator_js.DtsRollupGenerator.writeTypingsFile(
    collector,
    extractorConfig.publicTrimmedFilePath,
    DtsRollupGenerator_js.DtsRollupKind.PublicRelease,
    extractorConfig.newlineKind
  );
}

const noneExport = "export {};\n";
const vueRE = /\.vue$/;
const svelteRE = /\.svelte$/;
const tsRE = /\.(m|c)?tsx?$/;
const jsRE = /\.(m|c)?jsx?$/;
const dtsRE = /\.d\.(m|c)?tsx?$/;
const tjsRE = /\.(m|c)?(t|j)sx?$/;
const mtjsRE = /\.m(t|j)sx?$/;
const ctjsRE = /\.c(t|j)sx?$/;
const watchExtensionRE = /\.(vue|(m|c)?(t|j)sx?)$/;
const fullRelativeRE = /^\.\.?\//;
const defaultIndex = "index.d.ts";
const noop = () => {
};
const extPrefix = (file) => mtjsRE.test(file) ? "m" : ctjsRE.test(file) ? "c" : "";
const resolve = (...paths) => vite.normalizePath(node_path.resolve(...paths));
const logPrefix = kolorist.cyan("[vite:dts]");
const bundleDebug = debug("vite-plugin-dts:bundle");
function dtsPlugin(options = {}) {
  const {
    tsConfigFilePath = "tsconfig.json",
    aliasesExclude = [],
    cleanVueFileName = false,
    staticImport = false,
    clearPureImport = true,
    insertTypesEntry = false,
    rollupTypes = false,
    bundledPackages = [],
    noEmitOnError = false,
    skipDiagnostics = false,
    copyDtsFiles = false,
    logLevel = void 0,
    afterDiagnostic = noop,
    beforeWriteFile = noop,
    afterBuild = noop
  } = options;
  let compilerOptions = options.compilerOptions ?? {};
  let root;
  let entryRoot = options.entryRoot ?? "";
  let libName;
  let indexName;
  let aliases;
  let entries;
  let logger;
  let project;
  let tsConfigPath;
  let outputDirs;
  let isBundle = false;
  let include;
  let exclude;
  let filter;
  let libFolderPath = options.libFolderPath;
  const sourceDtsFiles = /* @__PURE__ */ new Set();
  const includedFiles = /* @__PURE__ */ new Set();
  const emittedFiles = /* @__PURE__ */ new Map();
  let hasJsVue = false;
  let allowJs = false;
  let transformError = false;
  async function internalTransform(id) {
    if (!project || !filter(id)) {
      return;
    }
    if (vueRE.test(id)) {
      const { error, content, ext } = compileVueCode(await fs.readFile(id, "utf-8"));
      if (!transformError && error) {
        logger.error(
          kolorist.red(
            `
${kolorist.cyan(
              "[vite:dts]"
            )} A error occurred when transform code, maybe there are some inertnal bugs.
`
          )
        );
        transformError = true;
      }
      if (content) {
        if (ext === "js" || ext === "jsx")
          hasJsVue = true;
        project.createSourceFile(`${id}.${ext || "js"}`, content, { overwrite: true });
      }
    } else if (!id.includes(".vue?vue") && (tsRE.test(id) || allowJs && jsRE.test(id))) {
      project.createSourceFile(id, await fs.readFile(id, "utf-8"), { overwrite: true });
    } else if (svelteRE.test(id)) {
      const content = "export { SvelteComponentTyped as default } from 'svelte/internal';";
      project.createSourceFile(`${id}.ts`, content, { overwrite: true });
    }
  }
  return {
    name: "vite:dts",
    apply: "build",
    enforce: "pre",
    config(config) {
      if (isBundle)
        return;
      const aliasOptions = config?.resolve?.alias ?? [];
      if (isNativeObj(aliasOptions)) {
        aliases = Object.entries(aliasOptions).map(([key, value]) => {
          return { find: key, replacement: value };
        });
      } else {
        aliases = ensureArray(aliasOptions);
      }
      if (aliasesExclude.length > 0) {
        aliases = aliases.filter(
          ({ find }) => !aliasesExclude.some(
            (alias) => alias && (isRegExp(find) ? find.toString() === alias.toString() : isRegExp(alias) ? find.match(alias)?.[0] : find === alias)
          )
        );
      }
    },
    configResolved(config) {
      if (isBundle)
        return;
      logger = logLevel ? vite.createLogger(logLevel, { allowClearScreen: config.clearScreen }) : config.logger;
      if (!config.build.lib) {
        logger.warn(
          kolorist.yellow(
            `
${kolorist.cyan(
              "[vite:dts]"
            )} You are building a library that may not need to generate declaration files.
`
          )
        );
        libName = "_default";
        indexName = defaultIndex;
      } else {
        const filename = config.build.lib.fileName ?? defaultIndex;
        const entry = typeof config.build.lib.entry === "string" ? config.build.lib.entry : Object.values(config.build.lib.entry)[0];
        libName = config.build.lib.name || "_default";
        indexName = typeof filename === "string" ? filename : filename("es", entry);
        if (!dtsRE.test(indexName)) {
          indexName = `${indexName.replace(tjsRE, "")}.d.${extPrefix(indexName)}ts`;
        }
      }
      root = ensureAbsolute(options.root ?? "", config.root);
      tsConfigPath = ensureAbsolute(tsConfigFilePath, root);
      libFolderPath = libFolderPath && ensureAbsolute(libFolderPath, root);
      outputDirs = options.outputDir ? ensureArray(options.outputDir).map((d) => ensureAbsolute(d, root)) : [ensureAbsolute(config.build.outDir, root)];
      if (!outputDirs[0]) {
        logger.error(
          kolorist.red(
            `
${kolorist.cyan(
              "[vite:dts]"
            )} Can not resolve declaration directory. Please check your vite config and plugin options.
`
          )
        );
        return;
      }
      setCompileRoot(root);
      project = new tsMorph.Project({
        compilerOptions: mergeObjects(compilerOptions, {
          rootDir: compilerOptions.rootDir || root,
          noEmitOnError,
          outDir: outputDirs[0],
          declarationDir: void 0,
          noUnusedParameters: false,
          declaration: true,
          noEmit: false,
          emitDeclarationOnly: true,
          composite: false
        }),
        tsConfigFilePath: tsConfigPath,
        skipAddingFilesFromTsConfig: true,
        libFolderPath
      });
      allowJs = project.getCompilerOptions().allowJs ?? false;
      const tsConfig = { compilerOptions: {} };
      const readFile = project.getFileSystem().readFileSync;
      let currentConfigPath = tsConfigPath;
      while (currentConfigPath) {
        const currentConfig = typescript.readConfigFile(currentConfigPath, readFile).config ?? {};
        Object.assign(tsConfig.compilerOptions, currentConfig.compilerOptions || {});
        if (!tsConfig.include) {
          tsConfig.include = currentConfig.include;
        }
        if (!tsConfig.exclude) {
          tsConfig.exclude = currentConfig.exclude;
        }
        currentConfigPath = currentConfig.extends && ensureAbsolute(currentConfig.extends, node_path.dirname(currentConfigPath));
      }
      include = ensureArray(options.include ?? tsConfig.include ?? "**/*").map(normalizeGlob);
      exclude = ensureArray(options.exclude ?? tsConfig.exclude ?? "node_modules/**").map(
        normalizeGlob
      );
      filter = pluginutils.createFilter(include, exclude, { resolve: root });
      compilerOptions = tsConfig.compilerOptions;
    },
    async buildStart(inputOptions) {
      if (Array.isArray(inputOptions.input)) {
        entries = inputOptions.input.reduce((prev, current) => {
          prev[node_path.basename(current)] = current;
          return prev;
        }, {});
      } else {
        entries = { ...inputOptions.input };
      }
      bundleDebug("parse entries");
      sourceDtsFiles.clear();
      includedFiles.clear();
      if (project && include && include.length) {
        const files = await glob(include, {
          cwd: root,
          absolute: true,
          ignore: exclude
        });
        for (const file of files) {
          this.addWatchFile(file);
          if (dtsRE.test(file)) {
            sourceDtsFiles.add(project.addSourceFileAtPath(file));
            if (!copyDtsFiles) {
              continue;
            }
            includedFiles.add(file);
            continue;
          }
          includedFiles.add(`${file.replace(tjsRE, "")}.d.${extPrefix(file)}ts`);
        }
        if (hasJsVue) {
          if (!allowJs) {
            logger.warn(
              kolorist.yellow(
                `${kolorist.cyan(
                  "[vite:dts]"
                )} Some js files are referenced, but you may not enable the 'allowJs' option.`
              )
            );
          }
          project.compilerOptions.set({ allowJs: true });
        }
        bundleDebug("collect files");
      }
    },
    async transform(_, id) {
      await internalTransform(id);
      return null;
    },
    async watchChange(id) {
      if (watchExtensionRE.test(id)) {
        isBundle = false;
        if (project) {
          const sourceFile = project.getSourceFile(vite.normalizePath(id));
          sourceFile && project.removeSourceFile(sourceFile);
          await internalTransform(id);
        }
      }
    },
    async closeBundle() {
      if (!outputDirs || !project || isBundle)
        return;
      logger.info(kolorist.green(`
${logPrefix} Start generate declaration files...`));
      bundleDebug("start");
      isBundle = true;
      emittedFiles.clear();
      const startTime = Date.now();
      project.resolveSourceFileDependencies();
      bundleDebug("resolve");
      if (!skipDiagnostics) {
        const diagnostics = project.getPreEmitDiagnostics();
        if (diagnostics?.length) {
          logger.warn(project.formatDiagnosticsWithColorAndContext(diagnostics));
        }
        if (typeof afterDiagnostic === "function") {
          const result = afterDiagnostic(diagnostics);
          isPromise(result) && await result;
        }
        bundleDebug("diagnostics");
      }
      const outputDir = outputDirs[0];
      const dtsOutputFiles = Array.from(sourceDtsFiles).map((sourceFile) => ({
        path: sourceFile.getFilePath(),
        content: sourceFile.getFullText()
      }));
      const service = project.getLanguageService();
      const outputFiles = project.getSourceFiles().map(
        (sourceFile) => service.getEmitOutput(sourceFile, true).getOutputFiles().map((outputFile) => ({
          path: resolve(root, node_path.relative(outputDir, outputFile.compilerObject.name)),
          content: outputFile.getText()
        }))
      ).flat().concat(dtsOutputFiles);
      bundleDebug("emit");
      entryRoot = entryRoot || queryPublicPath(outputFiles.map((file) => file.path));
      entryRoot = ensureAbsolute(entryRoot, root);
      await runParallel(os.cpus().length, outputFiles, async (outputFile) => {
        let filePath = outputFile.path;
        let content = outputFile.content;
        const isMapFile = filePath.endsWith(".map");
        if (!includedFiles.has(isMapFile ? filePath.slice(0, -4) : filePath) || clearPureImport && content === noneExport) {
          return;
        }
        if (!isMapFile && content && content !== noneExport) {
          content = clearPureImport ? removePureImport(content) : content;
          content = transformAliasImport(filePath, content, aliases, aliasesExclude);
          content = staticImport || rollupTypes ? transformDynamicImport(content) : content;
        }
        filePath = resolve(
          outputDir,
          node_path.relative(entryRoot, cleanVueFileName ? filePath.replace(".vue.d.ts", ".d.ts") : filePath)
        );
        content = cleanVueFileName ? content.replace(/['"](.+)\.vue['"]/g, '"$1"') : content;
        if (typeof beforeWriteFile === "function") {
          const result = beforeWriteFile(filePath, content);
          if (result === false)
            return;
          if (result && isNativeObj(result)) {
            filePath = result.filePath || filePath;
            content = result.content ?? content;
          }
        }
        filePath = vite.normalizePath(filePath);
        await fs.mkdir(node_path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, content, "utf-8");
        emittedFiles.set(filePath, content);
      });
      bundleDebug("output");
      if (insertTypesEntry || rollupTypes) {
        const pkgPath = resolve(root, "package.json");
        const pkg = fs.existsSync(pkgPath) ? JSON.parse(await fs.readFile(pkgPath, "utf-8")) : {};
        const entryNames = Object.keys(entries);
        const types = pkg.types || pkg.typings || pkg.publishConfig?.types || pkg.publishConfig?.typings || (pkg.exports?.["."] || pkg.exports?.["./"])?.types;
        const multiple = entryNames.length > 1;
        const typesPath = types ? resolve(root, types) : resolve(outputDir, indexName);
        for (const name of entryNames) {
          let filePath = multiple ? resolve(outputDir, `${name.replace(tsRE, "")}.d.ts`) : typesPath;
          if (fs.existsSync(filePath))
            continue;
          const index = resolve(
            outputDir,
            node_path.relative(entryRoot, `${entries[name].replace(tsRE, "")}.d.ts`)
          );
          let fromPath = vite.normalizePath(node_path.relative(node_path.dirname(filePath), index));
          fromPath = fromPath.replace(dtsRE, "");
          fromPath = fullRelativeRE.test(fromPath) ? fromPath : `./${fromPath}`;
          let content = `export * from '${fromPath}'
`;
          if (fs.existsSync(index)) {
            const entryCodes = await fs.readFile(index, "utf-8");
            if (entryCodes.includes("export default")) {
              content += `import ${libName} from '${fromPath}'
export default ${libName}
`;
            }
          }
          let result;
          if (typeof beforeWriteFile === "function") {
            result = beforeWriteFile(filePath, content);
            if (result && isNativeObj(result)) {
              filePath = result.filePath ?? filePath;
              content = result.content ?? content;
            }
          }
          filePath = vite.normalizePath(filePath);
          if (result !== false) {
            await fs.writeFile(filePath, content, "utf-8");
            emittedFiles.set(filePath, content);
          }
        }
        bundleDebug("insert index");
        if (rollupTypes) {
          logger.info(kolorist.green(`${logPrefix} Start rollup declaration files...`));
          const rollupFiles = /* @__PURE__ */ new Set();
          if (multiple) {
            for (const name of entryNames) {
              const path = resolve(outputDir, `${name.replace(tsRE, "")}.d.ts`);
              rollupDeclarationFiles({
                root,
                compilerOptions,
                outputDir,
                entryPath: path,
                fileName: node_path.basename(path),
                libFolder: libFolderPath,
                bundledPackages
              });
              emittedFiles.delete(path);
              rollupFiles.add(path);
            }
          } else {
            rollupDeclarationFiles({
              root,
              compilerOptions,
              outputDir,
              entryPath: typesPath,
              fileName: node_path.basename(typesPath),
              libFolder: libFolderPath,
              bundledPackages
            });
            emittedFiles.delete(typesPath);
            rollupFiles.add(typesPath);
          }
          await runParallel(os.cpus().length, Array.from(emittedFiles.keys()), (f) => fs.unlink(f));
          removeDirIfEmpty(outputDir);
          emittedFiles.clear();
          for (const file of rollupFiles) {
            emittedFiles.set(file, await fs.readFile(file, "utf-8"));
          }
          bundleDebug("rollup");
        }
      }
      if (outputDirs.length > 1) {
        const dirs = outputDirs.slice(1);
        await runParallel(
          os.cpus().length,
          Array.from(emittedFiles),
          async ([wroteFile, content]) => {
            const relativePath = node_path.relative(outputDir, wroteFile);
            await Promise.all(
              dirs.map(async (dir) => {
                const filePath = resolve(dir, relativePath);
                await fs.mkdir(node_path.dirname(filePath), { recursive: true });
                await fs.writeFile(filePath, content, "utf-8");
              })
            );
          }
        );
      }
      if (typeof afterBuild === "function") {
        const result = afterBuild();
        isPromise(result) && await result;
      }
      bundleDebug("finish");
      logger.info(kolorist.green(`${logPrefix} Declaration files built in ${Date.now() - startTime}ms.
`));
    }
  };
}

module.exports = dtsPlugin;
