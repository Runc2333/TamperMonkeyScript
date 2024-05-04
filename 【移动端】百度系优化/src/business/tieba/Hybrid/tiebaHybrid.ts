import { GM_addStyle } from "ViteGM";
import { DOMUtils, Qmsg, utils } from "@/env";
import { PopsPanel } from "@/ui";
import { TiebaCore } from "../core";
import { TieBaApi, TiebaUrlApi } from "../api/TieBaApi";
import { CommonUtil } from "@/util/CommonUtil";

const TiebaHybrid = {
    init() {
        this.blockAds();
        PopsPanel.execMenu("baidu_tieba_hybrid_search_openANewTab", () => {
            this.openANewTab();
        });
    },
    /**
     * 屏蔽广告
     */
    blockAds() {
        GM_addStyle(`
          /* 顶部横幅 */
          .tb-index-navbar .fix-nav-guide-bar,
          /* 底部的百度贴吧app内打开 */
          .tb-index-navbar div:has(.fix-nav-bar-bottom){
            display: none !important;
          }
          /* 把下面的内容往上移 */
          #app_container ul.navbar-box{
            top: 0px !important;
          }
          /* 把下面的内容往上移 */
          #app_container .navbar-view{
            padding-top: 0px !important;
          }
          `);
    },
    /**
     * 新标签页打开
     */
    openANewTab() {
        DOMUtils.on(
            document,
            "click",
            ".scroll-list-wrapper .threadcardclass",
            function (event) {
                utils.preventEvent(event);
                let clickNode = event.target;
                let tid = CommonUtil.getVue(clickNode)?.tid;
                if (utils.isNull(tid)) {
                    Qmsg.error("获取帖子的tid失败");
                    return;
                }
                window.open(TiebaUrlApi.getPost(tid), "_blank");
            },
            {
                capture: true,
            }
        );
    },
};

export {
    TiebaHybrid
}