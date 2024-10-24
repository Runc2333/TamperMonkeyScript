import type { PopsPanelContentConfig } from "@whitesev/pops/dist/types/src/components/panel/indexType";
import { UISwitch } from "../common-components/ui-switch";

export const Component_ForumPost: PopsPanelContentConfig = {
	id: "component-forum-post",
	title: "帖子",
	forms: [
		{
			text: "功能",
			type: "forms",
			forms: [
				UISwitch(
					"拦截附件",
					"mt-forum-post-interceptionAttachment",
					true,
					void 0,
					"点击附件时弹出提示框进行确认是否下载附件"
				),
				UISwitch(
					"图片查看优化",
					"mt-forum-post-optimizationImagePreview",
					true,
					void 0,
					"使用Viewer查看图片"
				),
				UISwitch(
					"自动加载下一页",
					"mt-forum-post-loadNextPageComment",
					true,
					void 0,
					"无缝预览下一页"
				),
				UISwitch(
					"代码块优化",
					"mt-forum-post-codeQuoteOptimization",
					true,
					void 0,
					"自动检测代码块语言并设置关键字高亮"
				),
			],
		},
		{
			type: "forms",
			text: "用户信息块",
			forms: [
				UISwitch(
					"探测用户在线状态",
					"mt-forum-post-detectingUserOnlineStatus",
					false,
					void 0,
					"获取用户在线状态并在用户信息处显示状态表情"
				),
				UISwitch(
					"显示用户等级",
					"mt-forum-post-showUserLevel",
					true,
					void 0,
					"在用户信息处显示当前用户的等级"
				),
			],
		},
		{
			type: "forms",
			text: "右侧悬浮工具栏",
			forms: [
				UISwitch(
					"快捷收藏",
					"mt-forum-post-quickCollentBtn",
					true,
					void 0,
					"在右侧悬浮工具栏添加【收藏】按钮，用于快捷收藏"
				),
				UISwitch(
					"快捷回复",
					"mt-forum-post-quickReplyOptimization",
					true,
					void 0,
					"为快捷回复弹窗添加【一键空格】按钮"
				),
			],
		},
	],
};
