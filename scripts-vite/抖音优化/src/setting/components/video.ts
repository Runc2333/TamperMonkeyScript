import { DOMUtils, log, utils } from "@/env";
import { UISelect } from "../common-components/ui-select";
import { UISwitch } from "../common-components/ui-switch";
import { UIButton } from "../common-components/ui-button";
import { DouYinVideoPlayerShortCut } from "@/main/video/DouYinVideoPlayerShortCut";
import { PopsPanel } from "../setting";
import { PopsPanelContentConfig } from "@whitesev/pops/dist/types/src/components/panel/indexType";
import Qmsg from "qmsg";
import { UIButtonShortCut } from "../common-components/ui-button-shortcut";
import { UISlider } from "../common-components/ui-slider";
import { AutoOpenOrClose } from "../utils/all-open-or-close";

const PanelVideoConfig: PopsPanelContentConfig = {
	id: "panel-config-video",
	title: "视频",
	forms: [
		{
			text: "",
			type: "forms",
			forms: [
				{
					text: "功能",
					type: "deepMenu",
					forms: [
						{
							text: "功能",
							type: "forms",
							forms: [
								UISwitch(
									"沉浸模式",
									"fullScreen",
									false,
									void 0,
									"移除右侧工具栏、底部信息栏等"
								),
								UISwitch(
									"手机模式",
									"mobileMode",
									false,
									void 0,
									"放大文字和图标，及自动启用【initial-scale=1】和【修复进度条】功能"
								),
								UISwitch(
									"修复进度条",
									"repairProgressBar",
									false,
									void 0,
									"修复移动端不能点击拖拽和定位进度的问题(移动端使用)"
								),
								UISwitch(
									"禁用双击点赞",
									"dy-video-disableDoubleClickLike",
									false,
									void 0,
									"禁止视频区域双击点赞"
								),
								UISwitch(
									"手势返回关闭评论区",
									"dy-video-gestureBackCloseComment",
									false,
									void 0,
									"浏览器手势返回时关闭评论区"
								),
							],
						},
						{
							text: "视频区域背景色",
							type: "forms",
							forms: [
								UISwitch(
									"启用",
									"dy-video-bgColor-enable",
									false,
									void 0,
									"自定义视频背景色"
								),
								{
									type: "own",
									attributes: {
										"data-key": "dy-video-changeBackgroundColor",
										"data-default-value": "#000000",
									},
									getLiElementCallBack(liElement) {
										let $left = DOMUtils.createElement("div", {
											className: "pops-panel-item-left-text",
											innerHTML: /*html*/ `
											<p class="pops-panel-item-left-main-text">视频背景颜色</p>
											<p class="pops-panel-item-left-desc-text">自定义视频背景颜色，包括评论区</p>
											`,
										});
										let $right = DOMUtils.createElement("div", {
											className: "pops-panel-item-right",
											innerHTML: /*html*/ `
											<input type="color" class="pops-color-choose" />
											`,
										});
										let $color =
											$right.querySelector<HTMLInputElement>(
												".pops-color-choose"
											)!;
										$color.value = PopsPanel.getValue(
											"dy-video-changeBackgroundColor"
										);
										let $style = DOMUtils.createElement("style");
										DOMUtils.append(document.head, $style);
										DOMUtils.on(
											$color,
											["input", "propertychange"],
											(event) => {
												log.info("选择颜色：" + $color.value);
												$style.innerHTML = /*css*/ `
												#sliderVideo > div{
													background: ${$color.value};
												}
												`;
												PopsPanel.setValue(
													"dy-video-changeBackgroundColor",
													$color.value
												);
											}
										);

										liElement.appendChild($left);
										liElement.appendChild($right);
										return liElement;
									},
								},
							],
						},
						{
							type: "forms",
							text: "视频标题",
							forms: [
								UISwitch(
									"自动隐藏视频标题",
									"dy-video-titleInfoAutoHide",
									false,
									void 0,
									"自动隐藏视频标题，鼠标移入时自动显示，鼠标移除时自动隐藏"
								),
								UISlider(
									"自动隐藏视频标题的延迟时间",
									"dy-video-titleInfoAutoHide-delayTime",
									3000,
									0,
									8000,
									void 0,
									(value) => {
										return `${value}ms`;
									},
									"可设置隐藏视频标题的延迟时间，单位为ms",
									100
								),
							],
						},
					],
				},
				{
					text: "播放器",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISelect<number>(
									"清晰度",
									"chooseVideoDefinition",
									1,
									[
										{
											text: "智能",
											value: 0,
										},
										{
											text: "极速",
											value: 4,
										},
										{
											text: "流畅",
											value: 3,
										},
										{
											text: "清晰",
											value: 2,
										},
										{
											text: "高清",
											value: 1,
										},
									],
									void 0,
									"自行选择清晰度"
								),
								UISwitch(
									"视频解析",
									"parseVideo",
									true,
									void 0,
									"分享->下载(灰色的也可点击)"
								),
								UISwitch(
									"评论区移到中间",
									"changeCommentToBottom",
									true,
									void 0,
									"修改评论区为中间弹出而非右侧区域"
								),
								UISwitch(
									"↑自适应评论区位置",
									"douyin-video-autoCheckChangeCommentToBottom",
									true,
									void 0,
									"根据window.screen.orientation.type自动判断是否开启【评论区移到中间】"
								),
								UISwitch(
									"自动进入网页全屏",
									"autoEnterElementFullScreen",
									false,
									void 0,
									"网页加载完毕后自动点击网页全屏按钮进入全屏"
								),
								UISwitch(
									"双击进入网页全屏",
									"dy-video-doubleClickEnterElementFullScreen",
									false,
									void 0,
									"双击视频自动进入网页全屏，检测间隔250ms"
								),
							],
						},
					],
				},
				{
					text: "自定义快捷键",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UIButtonShortCut(
									"倍速 -> 小",
									"视频倍速变小",
									"dy-video-rate-low",
									void 0,
									"点击录入快捷键",
									void 0,
									DouYinVideoPlayerShortCut.shortCut
								),
								UIButtonShortCut(
									"倍速 -> 大",
									"视频倍速变大",
									"dy-video-rate-up",
									void 0,
									"点击录入快捷键",
									void 0,
									DouYinVideoPlayerShortCut.shortCut
								),
								UIButtonShortCut(
									"沉浸模式",
									"移除右侧工具栏、底部信息栏等",
									"dy-video-shortcut-immersionMode",
									void 0,
									"点击录入快捷键",
									void 0,
									DouYinVideoPlayerShortCut.shortCut
								),
							],
						},
					],
				},
				{
					type: "deepMenu",
					text: "快捷键禁用",
					afterEnterDeepMenuCallBack:
						AutoOpenOrClose.afterEnterDeepMenuCallBack,
					forms: [
						{
							type: "forms",
							text: AutoOpenOrClose.text,
							forms: [
								UISwitch(
									"上翻页",
									"dy-keyboard-hook-arrowUp-w",
									false,
									void 0,
									"W"
								),
								UISwitch(
									"下翻页",
									"dy-keyboard-hook-arrowDown-s",
									false,
									void 0,
									"S"
								),
								UISwitch(
									"快退",
									"dy-keyboard-hook-videoRewind",
									false,
									void 0,
									"A"
								),
								UISwitch(
									"快进",
									"dy-keyboard-hook-videoFastForward",
									false,
									void 0,
									"D"
								),
							],
						},
					],
				},
			],
		},
		{
			text: "",
			type: "forms",
			forms: [
				{
					text: "屏蔽-视频区域内",
					type: "deepMenu",
					afterEnterDeepMenuCallBack:
						AutoOpenOrClose.afterEnterDeepMenuCallBack,
					forms: [
						{
							text: AutoOpenOrClose.text + "<br>右侧工具栏",
							type: "forms",
							forms: [
								UISwitch(
									"【屏蔽】切换播放",
									"shieldPlaySwitchButton",
									false,
									void 0,
									"屏蔽元素，在右侧作者头像上方"
								),
								UISwitch(
									"【屏蔽】作者头像",
									"shieldAuthorAvatar",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】点赞",
									"shieldLikeButton",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】评论",
									"shieldCommentButton",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】收藏",
									"shieldCollectionButton",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】分享",
									"shieldSharenButton",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】看相关",
									"shieldRelatedRecommendationsButton",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】更多",
									"shieldMoreButton",
									false,
									void 0,
									"...按钮，屏蔽元素"
								),
							],
						},
						{
							text: "底部工具栏",
							type: "forms",
							forms: [
								UISwitch(
									"【屏蔽】底部视频工具栏",
									"shieldBottomVideoToolBar",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】弹幕容器",
									"shieldBottomVideoToolbarDanmuContainer",
									false,
									void 0,
									"屏蔽元素（不包括屏蔽弹幕）"
								),
								UISwitch(
									"【屏蔽】视频信息",
									"dy-video-bottom-shieldVideoInfoWrap",
									false,
									void 0,
									"屏蔽元素，可代替【清屏】功能"
								),
							],
						},
						{
							text: "其它",
							type: "forms",
							forms: [
								UISwitch(
									"【屏蔽】右侧的展开评论按钮",
									"shieldRightExpandCommentButton",
									true,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】搜索悬浮栏",
									"shieldSearchFloatingBar",
									true,
									void 0,
									"屏蔽元素，一般出现在左上角"
								),
								UISwitch(
									"【屏蔽】网页全屏关闭按钮",
									"shieldCloseFullScreenButton",
									true,
									void 0,
									"屏蔽元素，一般开启网页全屏后出现在左上角"
								),
								UISwitch(
									"【屏蔽】购物信息",
									"dy-video-blockShopInfo",
									true,
									void 0,
									"屏蔽元素，该元素出现在视频底部的用户名、标题信息的上面"
								),
							],
						},
					],
				},
				{
					text: "屏蔽-评论区域内",
					type: "deepMenu",
					afterEnterDeepMenuCallBack:
						AutoOpenOrClose.afterEnterDeepMenuCallBack,
					forms: [
						{
							text: AutoOpenOrClose.text,
							type: "forms",
							forms: [
								UISwitch(
									"【屏蔽】评论工具栏",
									"dy-video-shieldUserCommentToolBar",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】大家都在搜",
									"dy-video-shieldUserCommentEveryOneAllSearch",
									false,
									void 0,
									"在评论区的顶部出现"
								),
							],
						},
					],
				},
			],
		},
	],
};

export { PanelVideoConfig };
