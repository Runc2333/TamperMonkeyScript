import { log, utils } from "@/env";
import { Vue2Instance } from "@whitesev/utils/dist/types/src/types/Vue2";

interface WaitSetVuePropOption {
	/**
	 * 在检测前输出日志
	 */
	msg?: string;
	/**
	 * 检测属性的函数
	 */
	check(vueIns: Vue2Instance): boolean;
	/**
	 * 进行设置
	 */
	set(vueIns: Vue2Instance): void;
	/**
	 * 超时关闭调用
	 */
	close?: () => void;
}

export const VueUtils = {
	/**
	 * 获取vue实例
	 * @param element
	 * @returns
	 */
	getVue(element: Element | null | EventTarget) {
		if (element == null) {
			return;
		}
		return ((element as NestedObjectWithToString)["__vue__"] ||
			(element as NestedObjectWithToString)["__Ivue__"] ||
			(element as NestedObjectWithToString)["__IVue__"]) as Vue2Instance;
	},

	/**
	 * 等待vue属性并进行设置
	 */
	waitVuePropToSet(
		$target: HTMLElement | (() => HTMLElement | null) | string,
		needSetList: WaitSetVuePropOption | WaitSetVuePropOption[]
	) {
		function getTarget() {
			let __target__ = null;
			if (typeof $target === "string") {
				__target__ = document.querySelector($target);
			} else if (typeof $target === "function") {
				__target__ = $target();
			} else if ($target instanceof HTMLElement) {
				__target__ = $target;
			}
			return __target__;
		}
		if (Array.isArray(needSetList)) {
			needSetList.forEach((needSetOption) => {
				if (typeof needSetOption.msg === "string") {
					log.info(needSetOption.msg);
				}
				function checkVue() {
					let target = getTarget();
					if (target == null) {
						return false;
					}
					let vueObj = VueUtils.getVue(target);
					if (vueObj == null) {
						return false;
					}
					let needOwnCheck = needSetOption.check(vueObj);
					return Boolean(needOwnCheck);
				}
				utils
					.waitVueByInterval(
						() => {
							return getTarget();
						},
						checkVue,
						250,
						10000
					)
					.then((result) => {
						if (!result) {
							if (typeof needSetOption.close === "function") {
								needSetOption.close();
							}
							return;
						}
						let target = getTarget();
						let vueObj = VueUtils.getVue(target as HTMLElement);
						if (vueObj == null) {
							return;
						}
						needSetOption.set(vueObj);
					});
			});
		} else {
			this.waitVuePropToSet($target, [needSetList]);
		}
	},
};
