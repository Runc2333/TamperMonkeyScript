import { BaiduRouter } from "@/router";
import { UISwitch } from "@/ui/common-components/ui-switch";

const PanelAiQiChaSettingUI: PopsPanelContentConfig = {
    id: "baidu-panel-config-aiqicha",
    title: "爱企查",
    headerTitle: "爱企查<br />aiqicha.baidu.com",
    isDefault() {
        return BaiduRouter.isAiQiCha();
    },
    scrollToDefaultView: true,
    forms: [
        {
            text: "屏蔽",
            type: "forms",
            forms: [
                UISwitch(
                    "【屏蔽】轮播图",
                    "baidu_aiqicha_shield_carousel",
                    true
                ),
                UISwitch(
                    "【屏蔽】行业热点新闻",
                    "baidu_aiqicha_shield_industry_host_news",
                    true
                ),
            ],
        },
    ],
}


export {
    PanelAiQiChaSettingUI
}