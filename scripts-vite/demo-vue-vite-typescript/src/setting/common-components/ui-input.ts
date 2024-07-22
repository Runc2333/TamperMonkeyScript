import { PopsPanel } from "@/setting/setting";
import { ATTRIBUTE_DEFAULT_VALUE, ATTRIBUTE_KEY } from "../config";
import { PopsPanelInputDetails } from "@whitesev/pops/dist/types/src/components/panel/inputType";

/**
 * 获取输入框配置
 * @param text 左边的文字
 * @param key 键
 * @param defaultValue 默认值
 * @param description 左边的文字下面的描述
 * @param changeCallBack 输入框内容改变时的回调
 * @param placeholder 输入框的默认提示内容
 * @param isNumber 是否是数字框
 * @param isPassword 是否是密码框
 * @returns
 */
export const UIInput = function (
	text: string,
	key: string,
	defaultValue: string,
	description?: string | undefined,
	changeCallBack?:
		| ((
				event: InputEvent,
				value: string,
				valueAsNumber?: number | undefined
		  ) => void | boolean)
		| undefined,
	placeholder = "",
	isNumber?: boolean,
	isPassword?: boolean
) {
	let result: PopsPanelInputDetails = {
		text: text,
		type: "input",
		isNumber: Boolean(isNumber),
		isPassword: Boolean(isPassword),
		attributes: {} as { [key: string]: any },
		description: description,
		getValue() {
			let localValue = PopsPanel.getValue(key, defaultValue);
			return localValue;
		},
		callback(event, value) {
			if (typeof changeCallBack === "function") {
				if (changeCallBack(event, value)) {
					return;
				}
			}
			PopsPanel.setValue(key, value);
		},
		placeholder: placeholder,
	};
	if (result.attributes) {
		result.attributes[ATTRIBUTE_KEY] = key;
		result.attributes[ATTRIBUTE_DEFAULT_VALUE] = defaultValue;
	}
	return result;
};
