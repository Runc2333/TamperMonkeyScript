import { PopsEventDetails, PopsHandlerEventDetails } from "./event";
import type { PopsIcon } from "./icon";

/**
 * 按钮类型
 */
export type PopsButtonType = "close" | "ok" | "cancel" | "other";
/**
 * 按钮样式类型
 */
export type PopsButtonStyleType =
	| "default"
	| "primary"
	| "xiaomi-primary"
	| "success"
	| "info"
	| "warning"
	| "danger";

/**
 * 按钮大小
 */
export type PopsButtonSize = "large" | "small";

/**
 * 按钮的点击回调参数event
 */
export interface PopsBtnCallBackEvent {
	/**
	 * 元素
	 */
	element: HTMLElement;
	/**
	 * 动画元素（包裹着弹窗元素）
	 */
	animElement: HTMLElement;
	/**
	 * 弹窗元素
	 */
	popsElement: HTMLElement;
	/**
	 * 遮罩层元素
	 */
	maskElement: HTMLElement | undefined;
	/**
	 * 按钮调用类型
	 */
	type: PopsButtonType;
	/**
	 * 调用的方法
	 */
	mode: PopsMode;
	/**
	 * 唯一id
	 */
	guid: string;
	/**
	 * 关闭弹窗
	 */
	close(): void;
	/**
	 * 隐藏弹窗
	 */
	hide(): void;
	/**
	 * 显示弹窗
	 */
	show(): void;
}

/**
 * 按钮配置
 */
export interface PopsButtonDetails<T = {}> {
	/**
	 * 是否启用按钮
	 */
	enable: boolean;
	/**
	 * 图标按钮，如果名字为内置的，则使用内置的，否则为自定义的svg
	 */
	icon: PopsIcon;
	/**
	 * 图标按钮是否放在右边
	 */
	rightIcon: boolean;
	/**
	 * 图标按钮是否是旋转360°
	 * @default false
	 */
	iconIsLoading: boolean;
	/**
	 * 按钮尺寸大小
	 * @default ""
	 */
	size: PopsButtonSize | "";
	/**
	 * 按钮样式类型
	 * @default "default"
	 */
	type: PopsButtonStyleType;
	/**
	 * 按钮文字，默认为空
	 */
	text: string;
	/**
	 * 按钮点击的回调
	 */
	callback(
		eventDetails: PopsHandlerEventDetails & T,
		event: PointerEvent | MouseEvent
	): void;
}

/**
 * 按钮配置（匹配任意类型）
 */
export interface PopsButtonDetailsAnyType<T = {}> {
	/**
	 * 是否启用按钮
	 */
	enable: boolean;
	/**
	 * 图标按钮，如果名字为内置的，则使用内置的，否则为自定义的svg
	 */
	icon: PopsIcon;
	/**
	 * 图标按钮是否放在右边
	 */
	rightIcon: boolean;
	/**
	 * 图标按钮是否是旋转360°
	 * @default false
	 */
	iconIsLoading: boolean;
	/**
	 * 按钮尺寸大小
	 * @default ""
	 */
	size: PopsButtonSize;
	/**
	 * 按钮样式类型
	 */
	type: string;
	/**
	 * 按钮文字
	 * @default ""
	 */
	text: string;
	/**
	 * 按钮点击的回调
	 */
	callback(
		eventDetails: PopsHandlerEventDetails & T,
		event: PointerEvent | MouseEvent
	): void;
}

/** prompt的点击回调 */
export interface PopsPromptButtonDetails extends PopsButtonDetails {
	callback(
		eventDetails: PopsHandlerEventDetails & {
			text: string;
		},
		event: PointerEvent | MouseEvent
	): void;
}
/**
 * 右上角关闭按钮点击回调的配置
 */
export interface PopsHeaderCloseButtonClickCallBackEvent {
	/**
	 * 动画元素（包裹着弹窗元素）
	 */
	animElement: HTMLElement;
	/**
	 * 遮罩层元素，如果未设置，那么不存在
	 */
	maskElement?: HTMLElement;
	/**
	 * 按钮调用类型
	 */
	type: string;
	/**
	 * 唯一id
	 */
	guid: string;
	/**
	 * 关闭弹窗
	 */
	close(): void;
	/**
	 * 隐藏弹窗
	 */
	hide(): void;
	/**
	 * 显示弹窗
	 */
	show(): void;
	/**
	 * 输入的内容
	 */
	text: string;
}
/**
 * 顶部关闭按钮配置
 */
export interface PopsHeaderCloseButtonDetails {
	/**
	 * 是否启用按钮
	 */
	enable?: boolean;
	/**
	 * 按钮点击的回调
	 */
	callback?: (
		details: PopsEventDetails,
		event: PointerEvent | MouseEvent
	) => void;
}
