import { VideoQualityMapWithPC } from "@/main/WeiBoUnlockQuality";
import { UISelect } from "../common-components/ui-select";
import { UISwitch } from "../common-components/ui-switch";
import { UITextArea } from "../common-components/ui-textarea";

const SettingUICommon: PopsPanelContentConfig = {
	id: "weibo-panel-config-currency",
	title: "通用",
	forms: [
		{
			text: "功能",
			type: "forms",
			forms: [
				UISelect(
					"视频清晰度",
					"weibo-common-lockVideoQuality",
					"",
					[
						{
							value: "",
							text: "自动",
						},
						...(() => {
							let result = <
								{
									value: string;
									text: string;
								}[]
							>[];
							Object.keys(VideoQualityMapWithPC).forEach((name) => {
								let value = VideoQualityMapWithPC[name];
								result.push({
									value: value.name,
									text: name,
								});
							});
							return result;
						})(),
					],
					void 0,
					"设置视频清晰度，默认自动，其它的清晰度将自动被删除(强制固定选择的清晰度)"
				),
				UISwitch(
					"解锁更多清晰度",
					"weibo-common-unlockVideoHigherQuality",
					true,
					void 0,
					"自动请求PC端的视频清晰度，如果请求成功，将解锁更多的清晰度，如1080p、2K、2K-60、4K-60"
				),
			],
		},
		{
			text: "屏蔽",
			type: "forms",
			forms: [
				UISwitch(
					"【屏蔽】广告",
					"weibo_remove_ads",
					true,
					void 0,
					"包括【登录/注册按钮】、【小程序横幅推荐】"
				),
				UISwitch(
					"【屏蔽】底部工具栏",
					"weibo_shield_bottom_bar",
					false,
					void 0,
					"屏蔽聊天/关注按钮"
				),
			],
		},
		{
			text: "拦截跳转",
			type: "forms",
			forms: [
				UISwitch("api/attitudes/create", "weibo_apply_attitudes_create", true),
				UISwitch(
					"点赞",
					"weibo_apply_likes_update",
					true,
					void 0,
					"未登录时，拦截点赞跳转登录"
				),
				UISwitch(
					"评论",
					"weibo_apply_comments_create",
					true,
					void 0,
					"未登录时，拦截评论跳转登录"
				),
				UISwitch(
					"关注",
					"weibo_apply_friendships_create",
					true,
					void 0,
					"未登录时，拦截关注跳转登录"
				),
				UISwitch(
					"转发",
					"weibo_apply_statuses_repostTimeline",
					true,
					void 0,
					"未登录时，拦截查看转发数据"
				),
				UISwitch(
					"回复",
					"weibo_apply_comments_reply",
					true,
					void 0,
					"未登录时，拦截回复跳转登录"
				),
				UISwitch(
					"优化跳转主页",
					"weibo_apply_profile_info",
					true,
					void 0,
					"未登录时，正确跳转至用户主页"
				),
				UISwitch(
					"下拉加载更多评论",
					"weibo_apply_comments_hotflow",
					true,
					void 0,
					"未登录时，拦截下拉加载更多评论跳转登录"
				),
				UISwitch(
					"楼中楼下拉加载更多评论",
					"weibo_apply_comments_hotFlowChild",
					true,
					void 0,
					"未登录时，拦截下拉加载更多评论跳转登录"
				),
			],
		},
		{
			text: "网络请求(不一定能劫持到)",
			type: "forms",
			forms: [
				UISwitch(
					"/api/config",
					"weibo_request_api_config",
					true,
					void 0,
					"Api为获取用户数据，未登录时伪装为已登录"
				),
				UISwitch(
					"/comments/hot",
					"weibo_request_comments_hot",
					true,
					void 0,
					"Api为获取评论数据，未登录时伪装为成功获取评论数据"
				),
				UISwitch(
					"/status/push",
					"weibo_request_status_push",
					true,
					void 0,
					"Api为获取顶部的热点新闻信息流"
				),
			],
		},
		{
			text: "Router路由",
			type: "forms",
			forms: [
				UISwitch(
					"监听路由改变",
					"weibo-listenRouterChange",
					true,
					void 0,
					"监听路由改变，动态加载功能"
				),
				UISwitch(
					"修复用户主页正确跳转",
					"weibo_router_profile_to_user_home",
					true,
					void 0,
					"可以正确跳转至用户主页"
				),
			],
		},
		{
			text: "函数禁用",
			type: "forms",
			forms: [
				UISwitch(
					"navigator.serviceWorker.register",
					"weibo_hijack_navigator_service_worker_register",
					true,
					void 0,
					"禁止注册serviceWorker"
				),
			],
		},
		{
			text: "cookie配置",
			type: "forms",
			forms: [
				UITextArea(
					"weibo.com",
					"weibo-common-cookie_weibo.com",
					"",
					void 0,
					void 0,
					"Cookie格式：xxx=xxxx;xxx=xxxx"
				),
			],
		},
	],
};

export { SettingUICommon };
