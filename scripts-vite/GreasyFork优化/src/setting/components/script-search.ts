import { PopsPanelContentConfig } from "@whitesev/pops/dist/types/src/components/panel/indexType";
import i18next from "i18next";
import { UISwitch } from "../common-components/ui-switch";

export const SettingUIScriptSearch: PopsPanelContentConfig = {
	id: "greasy-fork-panel-config-script-search",
	title: i18next.t("搜索"),
	forms: [
		{
			type: "forms",
			text: "",
			forms: [
				UISwitch(
					i18next.t("新增【{{buttonText}}】按钮", {
						buttonText: i18next.t("名称-全词匹配"),
					}),
					"gf-script-search-filterScriptTitleWholeWordMatching",
					true,
					void 0,
					i18next.t("该Checkbox按钮开启后，自动过滤出包含搜索关键词的脚本")
				),
				UISwitch(
					i18next.t("新增【{{buttonText}}】按钮", {
						buttonText: i18next.t("描述-全词匹配"),
					}),
					"gf-script-search-filterScriptDescWholeWordMatching",
					true,
					void 0,
					i18next.t("该Checkbox按钮开启后，自动过滤出包含搜索关键词的脚本")
				),
				UISwitch(
					i18next.t("新增【{{buttonText}}】按钮", {
						buttonText: i18next.t("作者名称-全词匹配"),
					}),
					"gf-script-search-filterScriptAuthorNameWholeWordMatching",
					true,
					void 0,
					i18next.t("该Checkbox按钮开启后，自动过滤出包含搜索关键词的脚本")
				),
			],
		},
	],
};
