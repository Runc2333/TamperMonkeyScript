// ==UserScript==
// @name         【移动端】百度系优化
// @namespace    https://github.com/WhiteSevs/TamperMonkeyScript
// @version      2024.11.26.21
// @author       WhiteSevs
// @description  用于【移动端】的百度系列产品优化，包括【百度搜索】、【百家号】、【百度贴吧】、【百度文库】、【百度经验】、【百度百科】、【百度知道】、【百度翻译】、【百度图片】、【百度地图】、【百度好看视频】、【百度爱企查】、【百度问题】、【百度识图】等
// @license      GPL-3.0-only
// @icon         https://www.baidu.com/favicon.ico
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://*.baidu.com/*
// @match        *://www.tieba.com/*
// @match        *://jump2.bdimg.com/*
// @match        *://uf9kyh.smartapps.cn/*
// @require      https://update.greasyfork.org/scripts/494167/1413255/CoverUMD.js
// @require      https://update.greasyfork.org/scripts/488179/1413254/showdown.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@2.5.3/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@1.4.2/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/pops@1.9.4/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.2.7/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.js
// @require      https://fastly.jsdelivr.net/npm/vue@3.4.33/dist/vue.global.prod.js
// @require      https://fastly.jsdelivr.net/npm/vue-demi@0.14.9/lib/index.iife.min.js
// @require      https://fastly.jsdelivr.net/npm/pinia@2.1.7/dist/pinia.iife.prod.js
// @require      https://fastly.jsdelivr.net/npm/vue-router@4.4.5/dist/vue-router.global.js
// @require      https://update.greasyfork.org/scripts/495227/1413261/Element-Plus.js
// @require      https://fastly.jsdelivr.net/npm/@element-plus/icons-vue@2.3.1/dist/index.iife.min.js
// @resource     ElementPlusResourceCSS  https://fastly.jsdelivr.net/npm/element-plus@2.7.7/dist/index.min.css
// @resource     ViewerCSS               https://fastly.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.css
// @connect      *
// @connect      www.baidu.com
// @connect      m.baidu.com
// @connect      tieba.baidu.com
// @connect      www.tieba.com
// @connect      baike.baidu.com
// @connect      chat.baidu.com
// @connect      chat-ws.baidu.com
// @connect      wappass.baidu.com
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==