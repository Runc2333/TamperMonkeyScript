// ==UserScript==
// @name         简书优化
// @namespace    https://github.com/WhiteSevs/TamperMonkeyScript
// @version      2024.11.11
// @author       WhiteSevs
// @description  支持手机端和PC端、屏蔽广告、优化浏览体验、重定向链接、全文居中、自动展开全文、允许复制文字、劫持唤醒/跳转App、自定义屏蔽元素等
// @license      GPL-3.0-only
// @icon         data:image/png;base64,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
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://*.jianshu.com/*
// @match        *://*.jianshu.io/*
// @require      https://update.greasyfork.org/scripts/494167/1413255/CoverUMD.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@2.5.1/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@1.4.0/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/pops@1.8.9/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.2.7/dist/index.umd.js
// @connect      *
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