import { log } from "@/env";
import { ATTRIBUTE_DEFAULT_VALUE, ATTRIBUTE_KEY } from "../config";
import { PopsPanelSwitchDetails } from "@whitesev/pops/dist/types/src/components/panel/switchType";
import { GM_getValue, GM_setValue } from "ViteGM";
import type { PopsPanelFormsTotalDetails } from "@whitesev/pops/dist/types/src/components/panel/indexType";
import type { PopsPanelRightAsideContainerOptions } from "@whitesev/pops/dist/types/src/components/panel/commonType";

/**
 * 获取checkbox按钮配置
 * @param text 文字
 * @param key 键
 * @param defaultValue 默认值
 * @param clickCallBack 点击回调
 * @param description 左边的文字下面的描述，可以是html格式
 * @param afterAddToUListCallBack 在添加到元素后触发该回调
 */
export const UISwitch = function (
	text: string,
	key: string,
	defaultValue: boolean | undefined,
	clickCallBack?:
		| ((event: MouseEvent | PointerEvent, value: boolean) => boolean | void)
		| undefined,
	description?: string | undefined,
	afterAddToUListCallBack?:
		| ((
				formConfig: PopsPanelFormsTotalDetails,
				container: PopsPanelRightAsideContainerOptions
		  ) => void)
		| undefined
): PopsPanelSwitchDetails {
	let result: PopsPanelSwitchDetails = {
		text: text,
		type: "switch",
		description: description,
		attributes: {} as { [key: string]: any },
		getValue() {
			return Boolean(GM_getValue(key, defaultValue));
		},
		callback(event: MouseEvent | PointerEvent, value: boolean) {
			log.success(`${value ? "开启" : "关闭"} ${text}`);
			if (typeof clickCallBack === "function") {
				if (clickCallBack(event, value)) {
					return;
				}
			}
			GM_setValue(key, Boolean(value));
		},
		afterAddToUListCallBack: afterAddToUListCallBack,
	};
	if (result.attributes) {
		result.attributes[ATTRIBUTE_KEY] = key;
		result.attributes[ATTRIBUTE_DEFAULT_VALUE] = Boolean(defaultValue);
	}
	return result;
};
