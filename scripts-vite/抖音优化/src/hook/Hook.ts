import { log } from "@/env";
import { unsafeWindow } from "ViteGM";

/**
 * @returns 返回Function则替换原有的
 */
type HookEventListenerHandler<T> = (
	target: T,
	eventName: string,
	listener: Function,
	option: boolean | AddEventListenerOptions | undefined
) => Function | void | boolean;

/**
 * @returns
 * + false 阻止调用
 */
type HookSetTimeoutHandler = (
	fn: Function,
	timeout: number | undefined
) => false | void;

/**
 * @returns
 * + false 阻止调用
 */
type HookSetIntervalHandler = (
	fn: Function,
	intervalTime: number | undefined
) => false | void;

/**
 * @returns 必须返回参数
 */
type HookFunctionApplyHandler = (
	context: Function,
	thisArg: any,
	argArray: any[]
) => {
	context: Function;
	thisArg: any;
	argArray: any[];
} | void;

/**
 * @returns 必须返回参数
 */
type HookFunctionCallHandler = (
	context: Function,
	thisArg: any,
	argArray: any[]
) => {
	context: Function;
	thisArg: any;
	argArray: any[];
};

type HookObjectDefinePropertyHandler = (
	target: any,
	property: PropertyKey,
	attributes: PropertyDescriptor & ThisType<any>
) => {
	target: any;
	key: PropertyKey;
	attributes: PropertyDescriptor & ThisType<any>;
} | void;
export const Hook = {
	$data: {
		document_addEventListener: <HookEventListenerHandler<Document>[]>[],
		element_addEventListener: <HookEventListenerHandler<Element>[]>[],
		setTimeout: <HookSetTimeoutHandler[]>[],
		setInterval: <HookSetIntervalHandler[]>[],
		function_apply: <HookFunctionApplyHandler[]>[],
		function_call: <HookFunctionCallHandler[]>[],
		defineProperty: <HookObjectDefinePropertyHandler[]>[],
	},
	/**
	 * 劫持 document.addEventListener
	 * @param handler
	 */
	document_addEventListener(handler: HookEventListenerHandler<Document>) {
		this.$data.document_addEventListener.push(handler);
		log.info("document.addEventListener hook新增劫持判断回调");
		if (this.$data.document_addEventListener.length > 1) {
			// 2,3,...
			return;
		}
		const that = this;
		/** 存储回调函数 */
		let weakMap = new WeakMap<
			Function,
			{
				eventName: string;
				fn: Function;
				options: AddEventListenerOptions | boolean | undefined;
			}
		>();

		const originAddEventListener = unsafeWindow.document.addEventListener;
		const originRemoveEventListener = unsafeWindow.document.removeEventListener;
		unsafeWindow.document.addEventListener = function (
			this: Document,
			...args: any[]
		) {
			/** 目标元素 */
			let target = this;
			/** 事件名 */
			let eventName = args[0] as string;
			/** 回调函数 */
			let listener = args[1] as Function;
			/** 监听配置 */
			let options = args[2] as boolean | AddEventListenerOptions | undefined;

			for (
				let index = 0;
				index < that.$data.document_addEventListener.length;
				index++
			) {
				const callback = that.$data.document_addEventListener[index];
				const result = Reflect.apply(callback, this, [
					target,
					eventName,
					listener,
					options,
				]);
				if (typeof result === "function") {
					args[1] = result;
					weakMap.set(listener, {
						eventName: eventName,
						fn: result,
						options: options,
					});
					break;
				} else if (typeof result === "boolean" && !result) {
					return;
				}
			}
			return Reflect.apply(originAddEventListener, this, args);
		};
		unsafeWindow.document.removeEventListener = function (
			this: HTMLElement,
			...args: any[]
		) {
			/** 事件名 */
			let eventName = args[0] as string;
			/** 回调函数 */
			let listener = args[1] as Function;
			/** 监听配置 */
			let options = args[2] as boolean | EventListenerOptions | undefined;
			if (weakMap.has(listener)) {
				const {
					eventName: __eventName__,
					fn: __listener__,
					options: __options__,
				} = weakMap.get(listener)!;
				let flag = false;
				if (eventName === __eventName__) {
					if (typeof options === "boolean" && options === __options__) {
						flag = true;
					} else if (
						typeof options === "object" &&
						typeof __options__ === "object" &&
						options["capture"] === __options__["capture"]
					) {
						flag = true;
					} else if (options == options) {
						flag = true;
					}
				}
				if (flag) {
					args[1] = __listener__;
				}
			}
			return Reflect.apply(originRemoveEventListener, this, args);
		};
	},
	/**
	 * 劫持 Element.property.addEventListener
	 * @param handler
	 */
	element_addEventListener(handler: HookEventListenerHandler<Element>) {
		this.$data.element_addEventListener.push(handler);
		log.info("Element.prototype.addEventListener hook新增劫持判断回调");
		if (this.$data.element_addEventListener.length > 1) {
			// 2,3,...
			return;
		}
		const that = this;

		/** 存储回调函数 */
		let weakMap = new WeakMap<
			Function,
			{
				eventName: string;
				fn: Function;
				options: AddEventListenerOptions | boolean | undefined;
			}
		>();

		const originAddEventListener =
			unsafeWindow.Element.prototype.addEventListener;
		const originRemoveEventListener =
			unsafeWindow.Element.prototype.removeEventListener;
		unsafeWindow.Element.prototype.addEventListener = function (
			this: HTMLElement,
			...args: any[]
		) {
			/** 目标元素 */
			let target = this;
			/** 事件名 */
			let eventName = args[0] as string;
			/** 回调函数 */
			let listener = args[1] as Function;
			/** 监听配置 */
			let options = args[2] as boolean | AddEventListenerOptions | undefined;

			for (
				let index = 0;
				index < that.$data.element_addEventListener.length;
				index++
			) {
				const callback = that.$data.element_addEventListener[index];
				const result = callback(target, eventName, listener, options);
				if (typeof result === "function") {
					args[1] = result;
					weakMap.set(listener, {
						eventName: eventName,
						fn: result,
						options: options,
					});
					break;
				}
			}
			return Reflect.apply(originAddEventListener, this, args);
		};
		unsafeWindow.Element.prototype.removeEventListener = function (
			this: HTMLElement,
			...args: any[]
		) {
			/** 事件名 */
			let __eventName = args[0] as string;
			/** 回调函数 */
			let __listener = args[1] as Function;
			/** 监听配置 */
			let __options = args[2] as boolean | EventListenerOptions | undefined;
			if (weakMap.has(__listener)) {
				const { eventName, fn, options } = weakMap.get(__listener)!;
				let flag = false;
				if (eventName === __eventName) {
					if (typeof __options === "boolean" && __options === options) {
						flag = true;
					} else if (
						typeof __options === "object" &&
						typeof options === "object" &&
						__options["capture"] === options["capture"]
					) {
						flag = true;
					}
				}
				if (flag) {
					args[1] = fn;
				}
			}
			// @ts-ignore
			return originRemoveEventListener.apply(this, args);
		};
	},
	/**
	 * 劫持 window.setTimeout
	 *
	 * @param handler
	 */
	setTimeout(handler: HookSetTimeoutHandler) {
		this.$data.setTimeout.push(handler);
		log.info("window.setTimeout hook新增劫持");
		if (this.$data.setTimeout.length > 1) {
			return;
		}
		const that = this;
		let originSetTimeout = unsafeWindow.setTimeout;
		unsafeWindow.setTimeout = function (this: any, ...args: any[]): any {
			let fn = args[0];
			let timeout = args[1];
			for (let index = 0; index < that.$data.setTimeout.length; index++) {
				const item = that.$data.setTimeout[index];
				const result = item(fn, timeout);
				if (typeof result === "boolean" && !result) {
					return;
				}
			}
			return Reflect.apply(originSetTimeout, this, args);
		};
	},
	/**
	 * 劫持 window.setInterval
	 * @param handler
	 */
	setInterval(handler: HookSetIntervalHandler) {
		this.$data.setInterval.push(handler);
		log.info("window.setInterval hook新增劫持");
		if (this.$data.setInterval.length > 1) {
			return;
		}
		const that = this;
		let originSetInterval = unsafeWindow.setInterval;
		unsafeWindow.setInterval = function (this: any, ...args: any[]): any {
			let fn = args[0];
			let timeout = args[1];
			for (let index = 0; index < that.$data.setInterval.length; index++) {
				const item = that.$data.setInterval[index];
				const result = item(fn, timeout);
				if (typeof result === "boolean" && !result) {
					return;
				}
			}
			return Reflect.apply(originSetInterval, this, args);
		};
	},
	/**
	 * 劫持 Function.prototype.apply
	 * @param handler
	 */
	function_apply(handler: HookFunctionApplyHandler) {
		this.$data.function_apply.push(handler);
		log.info("Function.prototype.apply hook新增劫持");
		if (this.$data.function_apply.length > 1) {
			return;
		}
		const that = this;
		let originFunctionApply = unsafeWindow.Function.prototype.apply;
		unsafeWindow.Function.prototype.apply = function (
			this: Function,
			...args: any[]
		): any {
			let thisArg = args[0];
			let argArray = args[1] as any[];
			let context = this;
			for (let index = 0; index < that.$data.function_apply.length; index++) {
				const item = that.$data.function_apply[index];
				const result = item(context, thisArg, argArray);
				if (result != null) {
					args[0] = result.thisArg;
					args[1] = result.argArray;
					context = result.context;
					break;
				}
			}
			return Reflect.apply(originFunctionApply, context, args);
		};
	},
	/**
	 * 劫持 Function.prototype.call
	 * @param handler
	 */
	function_call(handler: HookFunctionCallHandler) {
		this.$data.function_call.push(handler);
		log.info("Function.prototype.call hook新增劫持");
		if (this.$data.function_call.length > 1) {
			return;
		}
		const that = this;
		let originFunctionCall = unsafeWindow.Function.prototype.call;
		unsafeWindow.Function.prototype.call = function (
			this: Function,
			...args: any[]
		): any {
			let thisArg = args[0];
			let argArray = args.slice(1);
			let context = this;
			for (let index = 0; index < that.$data.function_call.length; index++) {
				const item = that.$data.function_call[index];
				const result = item(context, thisArg, argArray);
				if (result != null) {
					args[0] = result.thisArg;
					args.splice(1, argArray.length, ...result.argArray);
					context = result.context;
					break;
				}
			}
			return Reflect.apply(originFunctionCall, context, args);
		};
	},
	/**
	 * 劫持 Object.defineProperty
	 * @package handler
	 */
	defineProperty(handler: HookObjectDefinePropertyHandler) {
		this.$data.defineProperty.push(handler);
		log.info("Object.defineProperty hook新增劫持");
		if (this.$data.defineProperty.length > 1) {
			return;
		}
		const that = this;
		let originDefineProperty = unsafeWindow.Object.defineProperty;
		unsafeWindow.Object.defineProperty = function (
			this: any,
			...args: any[]
		): any {
			let target = args[0];
			let key = args[1];
			let attributes = args[2];
			for (let index = 0; index < that.$data.defineProperty.length; index++) {
				const item = that.$data.defineProperty[index];
				const result = item(target, key, attributes);
				if (result != null) {
					args[0] = result.target;
					args[1] = result.key;
					args[2] = result.attributes;
					break;
				}
			}
			return Reflect.apply(originDefineProperty, this, args);
		};
	},
	/**
	 * 劫持webpack
	 * @param webpackName 当前全局变量的webpack名
	 * @param mainCoreData 需要劫持的webpack的顶部core
	 * 例如：(window.webpackJsonp = window.webpackJsonp || []).push([["core:0"],{}])
	 * 此时mainCoreData是["core:0"]
	 * @param handler 如果mainCoreData匹配上，则调用此回调函数，替换的话把传入的值进行处理后再返回它就行
	 */
	window_webpack(
		webpackName = "webpackJsonp",
		mainCoreData: string[] | number[],
		handler: (exports: any) => any
	) {
		let originObject: {
			push: (this: any, ...args: any[][]) => any;
		} = void 0 as any;
		unsafeWindow.Object.defineProperty(unsafeWindow, webpackName, {
			get() {
				return originObject;
			},
			set(newValue) {
				log.success("成功劫持webpack，当前webpack名：" + webpackName);
				originObject = newValue;
				const originPush = originObject.push;
				originObject.push = function (...args) {
					let _mainCoreData = args[0][0];
					if (
						mainCoreData == _mainCoreData ||
						(Array.isArray(mainCoreData) &&
							Array.isArray(_mainCoreData) &&
							JSON.stringify(mainCoreData) === JSON.stringify(_mainCoreData))
					) {
						Object.keys(args[0][1]).forEach((keyName) => {
							let originSwitchFunc = args[0][1][keyName];
							args[0][1][keyName] = function (..._args: any[]) {
								let result = originSwitchFunc.call(this, ..._args);
								_args[0] = handler(_args[0]);
								return result;
							};
						});
					}
					return Reflect.apply(originPush, this, args);
				};
			},
		});
	},
};
