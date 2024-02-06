var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_path3 = require("path");

// src/shared.ts
var import_fs = require("fs");
var import_path = require("path");
var import_vite = require("vite");
var isDir = /* @__PURE__ */ __name((path) => {
  return (0, import_fs.lstatSync)(path).isDirectory();
}, "isDir");
var hasFile = /* @__PURE__ */ __name((path) => {
  return (0, import_fs.existsSync)(path);
}, "hasFile");
var getDirs = /* @__PURE__ */ __name((path) => {
  const dirs = (0, import_fs.readdirSync)(path);
  return dirs.reduce((result, name) => {
    const fullPath = (0, import_path.join)(path, name);
    isDir(fullPath) && result.push({
      dirName: name,
      dirPath: (0, import_vite.normalizePath)(fullPath)
    });
    return result;
  }, []);
}, "getDirs");

// src/sync.ts
var import_fs2 = require("fs");
var import_path2 = require("path");
function getJson(jsonPath) {
  try {
    const jsonText = (0, import_fs2.readFileSync)(jsonPath, "utf-8");
    return JSON.parse(jsonText);
  } catch (error) {
    process.exit(0);
  }
}
__name(getJson, "getJson");
function mergeJson(target, source) {
  var _a, _b, _c, _d;
  const targetPaths = (_b = (_a = target.compilerOptions) == null ? void 0 : _a.paths) != null ? _b : {};
  const sourcePaths = (_d = (_c = source.compilerOptions) == null ? void 0 : _c.paths) != null ? _d : {};
  for (const pathKey in targetPaths) {
    if (!Reflect.has(sourcePaths, pathKey)) {
      sourcePaths[pathKey] = targetPaths[pathKey];
    }
  }
  return {
    ...source,
    compilerOptions: {
      ...source.compilerOptions,
      paths: sourcePaths
    }
  };
}
__name(mergeJson, "mergeJson");
function removePath(pathKey, source) {
  const sourcePaths = source.compilerOptions.paths;
  Reflect.deleteProperty(sourcePaths, pathKey);
  return {
    ...source,
    compilerOptions: {
      ...source.compilerOptions,
      paths: sourcePaths
    }
  };
}
__name(removePath, "removePath");
function convertToJsonPath(root, { find, prefix }) {
  const { name } = (0, import_path2.parse)(root);
  const pathKey = typeof find === "string" ? `${find}/*` : `${find.source.replace("^", "")}/*`;
  const pathValue = typeof find === "string" ? `${name}/${find}/*`.replace(new RegExp(`${prefix}/`), "") : `${name}/${find.source.replace(`^${prefix}`, "")}/*`;
  return {
    key: pathKey,
    value: pathValue
  };
}
__name(convertToJsonPath, "convertToJsonPath");
function genJson(alias, root, prefix) {
  const paths = alias.reduce((result, item) => {
    const { key, value } = convertToJsonPath(root, {
      find: item.find,
      prefix
    });
    result[key] = [
      value
    ];
    return result;
  }, {});
  return {
    compilerOptions: {
      paths,
      baseUrl: "."
    }
  };
}
__name(genJson, "genJson");
function syncJson({ extendJson, jsJson, tsJson, alias, prefix, root, mode }) {
  if (hasFile(extendJson) && [
    "all",
    "extends"
  ].includes(mode)) {
    const json = genJson(alias, root, prefix);
    hasFile(extendJson) && (0, import_fs2.writeFileSync)(extendJson, JSON.stringify(json, null, 4));
  }
  if (hasFile(jsJson) && [
    "all",
    "sync"
  ].includes(mode)) {
    const target = genJson(alias, root, prefix);
    const source = getJson(jsJson);
    const newJson = mergeJson(target, source);
    hasFile(jsJson) && (0, import_fs2.writeFileSync)(jsJson, JSON.stringify(newJson, null, 4));
  }
  if (hasFile(tsJson) && [
    "all",
    "sync"
  ].includes(mode)) {
    const target = genJson(alias, root, prefix);
    const source = getJson(tsJson);
    const newJson = mergeJson(target, source);
    hasFile(tsJson) && (0, import_fs2.writeFileSync)(tsJson, JSON.stringify(newJson, null, 4));
  }
}
__name(syncJson, "syncJson");
function excutor(json, path) {
  const newJson = removePath(path, getJson(json));
  (0, import_fs2.writeFileSync)(json, JSON.stringify(newJson, null, 4));
}
__name(excutor, "excutor");
function removeJson({ extendJson, jsJson, tsJson, unlinkDirName, prefix, mode }) {
  const toRemovePath = `${prefix}${unlinkDirName}/*`;
  hasFile(extendJson) && [
    "all",
    "extends"
  ].includes(mode) && excutor(extendJson, toRemovePath);
  hasFile(jsJson) && [
    "all",
    "sync"
  ].includes(mode) && excutor(jsJson, toRemovePath);
  hasFile(tsJson) && [
    "all",
    "sync"
  ].includes(mode) && excutor(tsJson, toRemovePath);
}
__name(removeJson, "removeJson");

// src/index.ts
var ALIAS_JSON_PATH = (0, import_path3.resolve)(process.cwd(), "node_modules/@jiangweiye/tsconfig/tsconfig.alias.json");
var DEFAULT_CONFIG = {
  root: (0, import_path3.join)(process.cwd(), "src"),
  prefix: "@",
  mode: "all",
  extendsPath: ALIAS_JSON_PATH
};
var jsconfig = /* @__PURE__ */ __name((root) => (0, import_path3.join)(root, "jsconfig.json"), "jsconfig");
var tsconfig = /* @__PURE__ */ __name((root) => (0, import_path3.join)(root, "tsconfig.json"), "tsconfig");
function genArrayAlias(dirs, root, prefix) {
  return dirs.reduce((result, item) => {
    result.push({
      find: new RegExp(`^${prefix}${item.dirName}`),
      replacement: item.dirPath
    });
    return result;
  }, [
    {
      find: prefix,
      replacement: root
    }
  ]);
}
__name(genArrayAlias, "genArrayAlias");
var mergeConfig = /* @__PURE__ */ __name((baseConfig) => {
  var _a, _b, _c, _d;
  return {
    root: (_a = baseConfig.root) != null ? _a : DEFAULT_CONFIG.root,
    prefix: (_b = baseConfig.prefix) != null ? _b : DEFAULT_CONFIG.prefix,
    mode: (_c = baseConfig.mode) != null ? _c : DEFAULT_CONFIG.mode,
    extendsPath: (_d = baseConfig.extendsPath) != null ? _d : DEFAULT_CONFIG.extendsPath
  };
}, "mergeConfig");
var src_default = /* @__PURE__ */ __name((options = DEFAULT_CONFIG) => {
  const { root, prefix, mode, extendsPath } = mergeConfig(options);
  if (!hasFile(root)) {
    return void 0;
  } else {
    const dirs = getDirs(root);
    return {
      name: "vite-plugin-auto-alias",
      enforce: "pre",
      config() {
        const alias = genArrayAlias(dirs, root, prefix);
        syncJson({
          extendJson: ALIAS_JSON_PATH,
          jsJson: jsconfig(process.cwd()),
          tsJson: tsconfig(process.cwd()),
          alias,
          root,
          prefix,
          mode
        });
        return {
          resolve: {
            alias
          }
        };
      },
      configureServer(server) {
        server.watcher.on("all", (eventName, path) => {
          const { dir, name: unlinkDirName } = (0, import_path3.parse)(path);
          if (dir === root) {
            if (eventName === "addDir") {
              const alias = genArrayAlias(dirs, root, prefix);
              mode !== "off" && syncJson({
                extendJson: extendsPath,
                jsJson: jsconfig(process.cwd()),
                tsJson: tsconfig(process.cwd()),
                alias,
                root,
                prefix,
                mode
              });
              server.restart();
            }
            if (eventName === "unlinkDir") {
              mode !== "off" && removeJson({
                extendJson: extendsPath,
                jsJson: jsconfig(process.cwd()),
                tsJson: tsconfig(process.cwd()),
                unlinkDirName,
                root,
                prefix,
                mode
              });
              server.restart();
            }
          }
        });
      }
    };
  }
}, "default");
