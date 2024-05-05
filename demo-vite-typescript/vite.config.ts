import { defineConfig } from 'vite';
import monkey, { cdn, util } from 'vite-plugin-monkey';
import path from "path";
import { SCRIPT_NAME } from "./vite.build"


const Utils = {
  /**
   * 获取绝对路径
   * @param pathName 
   * @returns 
   */
  getAbsolutePath: (pathName: string) => {
    return path.resolve(__dirname, pathName);
  },
  /**
   * 时间格式化
   * @param text 
   * @param formatType 
   * @param withZero 
   * @returns 
   */
  formatTime: (
    text = new Date(),
    formatType = "yyyy-MM-dd HH:mm:ss",
    withZero = true,
  ) => {
    let time = text == null ? new Date() : new Date(text);
    /**
     * 校验时间补0
     * @param timeNum
     * @returns
     */
    function checkTime(timeNum: number) {
      if (!withZero) {
        return timeNum
      }
      if (timeNum < 10) return "0" + timeNum;
      return timeNum;
    }
    /**
     * 时间制修改 24小时制转12小时制
     * @param hourNum 小时
     * @returns
     */
    function timeSystemChange(hourNum: number) {
      return hourNum > 12 ? hourNum - 12 : hourNum;
    }

    let timeRegexp = {
      yyyy: time.getFullYear(),
      /* 年 */
      MM: checkTime(time.getMonth() + 1),
      /* 月 */
      dd: checkTime(time.getDate()),
      /* 日 */
      HH: checkTime(time.getHours()),
      /* 时 (24小时制) */
      hh: checkTime(timeSystemChange(time.getHours())),
      /* 时 (12小时制) */
      mm: checkTime(time.getMinutes()),
      /* 分 */
      ss: checkTime(time.getSeconds()),
      /* 秒 */
    };
    Object.keys(timeRegexp).forEach(function (key) {
      let replaecRegexp = new RegExp(key, "g");
      formatType = formatType.replace(replaecRegexp, timeRegexp[key]);
    });
    return formatType;
  },
  /**
   * 获取GreasyFork库的最新版本的链接
   * @param libId 
   */
  async getGreasyForkLibLatestVersionUrl(libId: string | number) {
    let scriptInfo = await fetch(`https://update.greasyfork.org/scripts/${libId}.json`).then((res) => res.json())
    console.log(`获取库: ${scriptInfo?.name}`)
    return scriptInfo?.code_url as string;
  },
}

const currentTime = new Date();
const VERSION = `${Utils.formatTime(currentTime, "yyyy.MM.dd", false)}`;
const ResourceList: string[] = [];
const ResourceMap: {
  [key: string]: {
    url: string | (() => Promise<string> | string),
    localPath: string,
  },
} = {
  "Viewer": {
    localPath: "file://" + Utils.getAbsolutePath("./../库/Viewer/index.js"),
    url: async () => {
      return await Utils.getGreasyForkLibLatestVersionUrl(449471)
    },
  },
  "Qmsg": {
    localPath: "file://" + Utils.getAbsolutePath("./../库/Qmsg/index.js"),
    url: async () => {
      return await Utils.getGreasyForkLibLatestVersionUrl(462234)
    },
  },
  "pops": {
    localPath: "file://" + Utils.getAbsolutePath("./../库/pops/index.js"),
    url: async () => {
      return await Utils.getGreasyForkLibLatestVersionUrl(456485)
    },
  },
  "Utils": {
    localPath: "file://" + Utils.getAbsolutePath("./../库/Utils/index.js"),
    url: async () => {
      return await Utils.getGreasyForkLibLatestVersionUrl(455186)
    },
  },
  "DOMUtils": {
    localPath: "file://" + Utils.getAbsolutePath("./../库/DOMUtils/index.js"),
    url: async () => {
      return await Utils.getGreasyForkLibLatestVersionUrl(465772)
    }
  },
}


let FILE_NAME = SCRIPT_NAME + ".user.js";
/* 是否压缩代码 */
let isMinify = false;
if (process.argv.includes("--minify")) {
  isMinify = true;
  FILE_NAME = SCRIPT_NAME + ".min.user.js";
}
let isEmptyOutDir = true;
if (process.argv.includes("--no-empty-outDir")) {
  isEmptyOutDir = false;
}
if (process.env.NODE_ENV === "development") {
  Object.keys(ResourceMap).forEach(libName => {
    ResourceList.push(ResourceMap[libName].localPath)
  })
} else {
  for (const libName in ResourceMap) {
    let item = ResourceMap[libName];
    let url = item.url
    if (typeof item.url === "function") {
      url = await item.url();
      ResourceList.push(url)
    } else {
      ResourceList.push(item.url)
    }
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: SCRIPT_NAME,
        namespace: 'https://github.com/WhiteSevs/TamperMonkeyScript',
        supportURL: "https://github.com/WhiteSevs/TamperMonkeyScript/issues",
        version: VERSION,
        author: "WhiteSevs",
        "run-at": "document-start",
        require: ResourceList,
        resource: {
          "ElementPlusResourceCSS": "https://cdn.jsdelivr.net/npm/element-plus@2.7.2/dist/index.min.css",
        },


        icon: '',
        description: 'demo desc',
        match: [
          '*://*/*'
        ],
        connect: [
          "*"
        ],
        grant: [
          "GM_addStyle",
          "GM_registerMenuCommand",
          "GM_unregisterMenuCommand",
          "GM_getValue",
          "GM_setValue",
          "GM_deleteValue",
          "GM_xmlhttpRequest",
          "GM_info",
          "unsafeWindow"
        ],
      },
      clientAlias: "ViteGM",
      server: {
        mountGmApi: false,
        open: true,
      },
      build: {
        autoGrant: true,
        fileName: FILE_NAME,
      },
    }),
  ],
  resolve: {
    alias: {
      "@库": Utils.getAbsolutePath("./../库"),
      '@': Utils.getAbsolutePath('./src'),
    },
  },
  build: {
    /* 构建的.user.js是否压缩 */
    minify: isMinify,
    emptyOutDir: isEmptyOutDir,
  },
});
