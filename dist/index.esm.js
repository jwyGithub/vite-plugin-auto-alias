var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
import { join as join2, parse as parse2 } from "path";
import process2 from "process";

// src/shared.ts
import { existsSync, lstatSync, readdirSync } from "fs";
import { join } from "path";
import { normalizePath } from "vite";
var isDir = /* @__PURE__ */ __name((path) => {
  return lstatSync(path).isDirectory();
}, "isDir");
var hasFile = /* @__PURE__ */ __name((path) => {
  return existsSync(path);
}, "hasFile");
var getDirs = /* @__PURE__ */ __name((path) => {
  const dirs = readdirSync(path);
  return dirs.reduce((result, name) => {
    const fullPath = join(path, name);
    isDir(fullPath) && result.push({
      dirName: name,
      dirPath: normalizePath(fullPath)
    });
    return result;
  }, []);
}, "getDirs");

// src/sync.ts
import { readFileSync, writeFileSync } from "fs";
import { parse } from "path";
import process from "process";
function getJson(jsonPath) {
  try {
    const jsonText = readFileSync(jsonPath, "utf-8");
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
  const { name } = parse(root);
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
function syncJson({ aliasPath, jsJson, tsJson, alias, prefix, root, mode }) {
  if (aliasPath && hasFile(aliasPath) && mode === "sync") {
    const target = genJson(alias, root, prefix);
    const source = getJson(aliasPath);
    const newJson = mergeJson(target, source);
    hasFile(aliasPath) && writeFileSync(aliasPath, JSON.stringify(newJson, null, 4));
    return;
  }
  if (hasFile(jsJson) && mode === "sync") {
    const target = genJson(alias, root, prefix);
    const source = getJson(jsJson);
    const newJson = mergeJson(target, source);
    hasFile(jsJson) && writeFileSync(jsJson, JSON.stringify(newJson, null, 4));
  }
  if (hasFile(tsJson) && mode === "sync") {
    const target = genJson(alias, root, prefix);
    const source = getJson(tsJson);
    const newJson = mergeJson(target, source);
    hasFile(tsJson) && writeFileSync(tsJson, JSON.stringify(newJson, null, 4));
  }
}
__name(syncJson, "syncJson");
function excutor(json, path) {
  const newJson = removePath(path, getJson(json));
  writeFileSync(json, JSON.stringify(newJson, null, 4));
}
__name(excutor, "excutor");
function removeJson({ aliasPath, jsJson, tsJson, unlinkDirName, prefix, mode }) {
  const toRemovePath = `${prefix}${unlinkDirName}/*`;
  aliasPath && hasFile(aliasPath) && mode === "sync" && excutor(aliasPath, toRemovePath);
  hasFile(jsJson) && mode === "sync" && excutor(jsJson, toRemovePath);
  hasFile(tsJson) && mode === "sync" && excutor(tsJson, toRemovePath);
}
__name(removeJson, "removeJson");

// src/index.ts
var DEFAULT_CONFIG = {
  root: join2(process2.cwd(), "src"),
  prefix: "@",
  mode: "sync",
  aliasPath: null
};
var jsconfig = /* @__PURE__ */ __name((root) => join2(root, "jsconfig.json"), "jsconfig");
var tsconfig = /* @__PURE__ */ __name((root) => join2(root, "tsconfig.json"), "tsconfig");
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
    aliasPath: (_d = baseConfig.aliasPath) != null ? _d : DEFAULT_CONFIG.aliasPath
  };
}, "mergeConfig");
var src_default = /* @__PURE__ */ __name((options = DEFAULT_CONFIG) => {
  const { root, prefix, mode, aliasPath } = mergeConfig(options);
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
          aliasPath,
          jsJson: jsconfig(process2.cwd()),
          tsJson: tsconfig(process2.cwd()),
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
          const { dir, name: unlinkDirName } = parse2(path);
          if (dir === root) {
            if (eventName === "addDir") {
              const alias = genArrayAlias(dirs, root, prefix);
              mode !== "off" && syncJson({
                aliasPath,
                jsJson: jsconfig(process2.cwd()),
                tsJson: tsconfig(process2.cwd()),
                alias,
                root,
                prefix,
                mode
              });
              server.restart();
            }
            if (eventName === "unlinkDir") {
              mode !== "off" && removeJson({
                aliasPath,
                jsJson: jsconfig(process2.cwd()),
                tsJson: tsconfig(process2.cwd()),
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
export {
  src_default as default
};
