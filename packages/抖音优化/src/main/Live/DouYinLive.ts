import { DOMUtils, addStyle, log, utils } from "@/env";
import { PopsPanel } from "@/setting/setting";
import { DouYinElement } from "@/utils/DouYinElement";
import { DouYinLiveChatRoom } from "./DouYinLiveChatRoom";
import { DouYinLiveDanmuku } from "./DouYinLiveDanmuku";
import Qmsg from "qmsg";
import { DouYinUtils } from "@/utils/DouYinUtils";

/**
 * 直播画质
 * webcast_local_quality
 * + ld 标清
 * + sd 高清
 * + hd 超清
 * + origin 袁华
 *
 * 弹幕设置
 * DanmaSetting_GiftAndPackage
 * {
 *   "__tea_cache_tokens_随机4位数字["uuid"]_playRoom.split(",")[0]": {
 *        expired: Date.now(), # 过期时间
 *        giftOn: false, # 送礼信息
 *        packageOn: false, # 福袋口令
 *    }
 * }
 */
const DouYinLive = {
	init() {
		PopsPanel.execMenu("live-autoEnterElementFullScreen", () => {
			this.autoEnterElementFullScreen();
		});
		PopsPanel.execMenu("live-shieldGiftColumn", () => {
			this.shieldGiftColumn();
		});
		PopsPanel.execMenu("live-shieldTopToolBarInfo", () => {
			this.shieldTopToolBarInfo();
		});
		PopsPanel.execMenu("live-shieldGiftEffects", () => {
			this.shieldGiftEffects();
		});
		PopsPanel.execMenu("live-shieldDanmuku", () => {
			DouYinLiveDanmuku.shieldDanmu();
		});
		PopsPanel.execMenu("live-danmu-shield-rule-enable", () => {
			DouYinLiveDanmuku.filterDanmu();
		});
		PopsPanel.execMenu("live-unlockImageQuality", () => {
			this.unlockImageQuality();
		});
		PopsPanel.execMenuOnce("live-waitToRemovePauseDialog", () => {
			this.waitToRemovePauseDialog();
		});
		DouYinLiveChatRoom.init();
	},
	/**
	 * 自动进入网页全屏
	 */
	autoEnterElementFullScreen() {
		log.info("自动进入网页全屏");
		utils
			.waitNode<HTMLDivElement>(
				'xg-icon[classname] > div > div:has(path[d="M9.75 8.5a2 2 0 00-2 2v11a2 2 0 002 2h12.5a2 2 0 002-2v-11a2 2 0 00-2-2H9.75zM15 11.25h-3.75a1 1 0 00-1 1V16h2v-2.75H15v-2zm5.75 9.5H17v-2h2.75V16h2v3.75a1 1 0 01-1 1z"])'
			)
			.then((element) => {
				element.click();
			});
	},
	/**
	 * 【屏蔽】底部的礼物栏
	 */
	shieldGiftColumn() {
		log.info("屏蔽底部的礼物栏");
		DouYinUtils.addBlockCSS(
			'div[data-e2e="living-container"] >div> :last-child',
			/* 全屏状态下的礼物栏 */
			'div[data-e2e="living-container"] xg-controls > div:has(div[data-e2e="gifts-container"])'
		);
		addStyle(`
		/* 去除全屏状态下的礼物栏后，上面的工具栏bottom也去除 */
		div[data-e2e="living-container"] xg-controls xg-inner-controls:has(+div div[data-e2e="gifts-container"]){
			bottom: 0 !important;
		}
		`);
	},
	/**
	 * 【屏蔽】顶栏信息
	 * 包括直播作者、右侧的礼物展馆
	 */
	shieldTopToolBarInfo() {
		log.info("【屏蔽】顶栏信息");
		DouYinUtils.addBlockCSS(
			'div[data-e2e="living-container"] > div > pace-island[id^="island_"]'
		);
	},
	/**
	 * 【屏蔽】礼物特效
	 */
	shieldGiftEffects() {
		log.info("【屏蔽】礼物特效");
		DouYinUtils.addBlockCSS(
			// ↓该屏蔽会把连麦的用户也屏蔽了
			// '.basicPlayer[data-e2e="basicPlayer"]  pace-island[id^="island_"]:has(>div>div>div)'
			'.basicPlayer[data-e2e="basicPlayer"]  pace-island[id^="island_"]:has(>div>div:not([class*="video_layout_container"])>div)'
		);
	},
	/**
	 * 解锁画质选择
	 *
	 * 未登录情况下最高选择【高清】画质
	 */
	unlockImageQuality() {
		log.info("解锁画质选择");
		DOMUtils.on(
			document,
			"click",
			'div[data-e2e="quality-selector"] > div',
			function (event) {
				utils.preventEvent(event);
				let clickNode = event.target as HTMLElement;
				try {
					let reactObj = utils.getReactObj(clickNode);
					let key = reactObj?.reactFiber?.["key"];
					let parent = clickNode.closest("div[data-index]");
					let parentReactObj = utils.getReactObj(parent as HTMLDivElement);
					let current =
						parentReactObj?.reactProps?.["children"]["ref"]["current"];
					log.info("当前选择的画质: " + key);
					log.info(["所有的画质: ", current.getCurrentQualityList()]);
					/* getCurrentQuality */
					/* getCurrentQualityList */
					/* setCurrentQuality */
					current.setCurrentQuality(key);
				} catch (error) {
					log.error(error);
					Qmsg.error("切换画质失败");
				}
			},
			{
				capture: true,
			}
		);
	},
	/**
	 * 长时间无操作，已暂停播放
	 * 累计节能xx分钟
	 */
	waitToRemovePauseDialog() {
		log.info("监听【长时间无操作，已暂停播放】弹窗");
		function deepFindFunction(target: any, propName: string, funcName: string) {
			let targetValue = target[propName];
			if (typeof targetValue === "object") {
				if (typeof targetValue[funcName] === "function") {
					return targetValue[funcName];
				} else {
					return deepFindFunction(targetValue, propName, funcName);
				}
			}
		}
		function checkDialogToClose($ele: HTMLElement, from: string) {
			if (
				$ele.innerText.includes("长时间无操作") &&
				$ele.innerText.includes("暂停播放")
			) {
				log.info(`检测${from}：出现【长时间无操作，已暂停播放】弹窗`);
				Qmsg.info(`检测${from}：出现【长时间无操作，已暂停播放】弹窗`);
				let $rect = utils.getReactObj($ele);
				if (typeof $rect.reactContainer === "object") {
					let onClose = deepFindFunction(
						$rect.reactContainer,
						"child",
						"onClose"
					);
					if (typeof onClose === "function") {
						log.success(`检测${from}：调用onClose关闭弹窗`);
						Qmsg.success("调用onClose关闭弹窗");
						onClose();
					}
				}
			}
		}
		DOMUtils.ready(() => {
			utils.mutationObserver(document.body, {
				config: {
					subtree: true,
					childList: true,
				},
				callback() {
					document
						.querySelectorAll<HTMLDivElement>(
							"body > div[elementtiming='element-timing']"
						)
						.forEach(($elementTiming) => {
							checkDialogToClose($elementTiming, "1");
						});
					document
						.querySelectorAll<HTMLDivElement>('body > div:not([id="root"])')
						.forEach(($ele) => {
							checkDialogToClose($ele, "2");
						});
				},
			});
		});
	},
};

export { DouYinLive };
