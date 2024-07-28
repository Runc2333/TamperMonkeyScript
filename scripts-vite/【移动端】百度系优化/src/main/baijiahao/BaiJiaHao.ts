import { addStyle, log } from "@/env";
import { PopsPanel } from "@/setting/setting";
import BaiJiaHaoShieldCSS from "./shield.css?raw";
import { BaiJiaHaoHook } from "./BaiJiaHaoHook";
import { CommonUtils } from "@/utils/CommonUtils";

export const BaiduBaiJiaHao = {
	init() {
		addStyle(BaiJiaHaoShieldCSS);
		log.info("插入CSS规则");
		BaiJiaHaoHook.init();
		PopsPanel.execMenuOnce("baijiahao_shield_recommended_article", () => {
			return this.shieldRecommendArticle();
		});
		PopsPanel.execMenuOnce("baijiahao_shield_user_comment", () => {
			return this.shieldUserComment();
		});
		PopsPanel.execMenuOnce("baijiahao_shield_user_comment_input_box", () => {
			return this.shieldBottomToolBar();
		});
	},
	/**
	 * 【屏蔽】推荐文章
	 */
	shieldRecommendArticle() {
		log.info("【屏蔽】推荐文章");
		return [
			CommonUtils.addBlockCSS(
				".infinite-scroll-component__outerdiv",
				"div#page_wrapper > div > div:nth-child(5)",
				"div:has(+ .infinite-scroll-component__outerdiv)",
				/* 电脑端的左边的按钮-屏蔽 */
				"#ssr-content > :last-child",
				/* 电脑端的右边的推荐-屏蔽 */
				"#ssr-content > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)"
			),
			addStyle(/*css*/ `
			/* 电脑端的文章居中 */
			#ssr-content > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) {
				width: 55% !important;
			}`),
			/* 某些情况下的CSS */
			CommonUtils.addBlockCSS(
				'#page_wrapper > div.other > div[class=""]:nth-child(4)'
			),
			/* 简单UA&链接参数wfr=spide下的精彩推荐 */
			CommonUtils.addBlockCSS(
				'#page_wrapper div.spider > div[class=""]:nth-child(4)',
				'page_wrapper div.spider > div[class=""]:nth-child(5)'
			),
			/* Gecko的简单UA下的精彩推荐 */
			CommonUtils.addBlockCSS('#page_wrapper .searchCraft > div[class=""]'),
		];
	},
	/**
	 * 【屏蔽】用户评论
	 */
	shieldUserComment() {
		log.info("【屏蔽】用户评论");
		return CommonUtils.addBlockCSS("#commentModule");
	},
	/**
	 * 【屏蔽】底部悬浮工具栏
	 */
	shieldBottomToolBar() {
		log.info("【屏蔽】底部悬浮工具栏");
		return CommonUtils.addBlockCSS("div#wise-invoke-interact-bar");
	},
};
