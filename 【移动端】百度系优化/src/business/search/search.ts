import { GM_addStyle } from "ViteGM";
import { DOMUtils, log, utils } from "@/env";
import { BaiduRouter } from "@/router";
import { PopsPanel } from "@/ui";
import SearchShieldCSS from "./shield.css?raw";
import SearchHealthShieldCSS from "./shieldHealth.css?raw";
import { BaiduHeadlth } from "./health";
import { BaiduSearchHook } from "./hook";
import { HandleItemURL } from "./resultItem";
import { HandleNextPage, HandleNextPage_SearchCraft } from "./nextPage";
import { HandleInputEvent } from "./searchInput";
import { BaiduSearchRule } from "./searchRule";

/**
 * 处理百度搜索自定义的样式添加
 */
const HandleUserOwnStyle = {
    getUserStyle() {
        return PopsPanel.getValue("baidu-search-user-style", "");
    },
};



const BaiduSearch = {
    async init() {
        GM_addStyle(HandleUserOwnStyle.getUserStyle());
        log.info("插入用户CSS规则");
        BaiduSearchRule.init();
        if (BaiduRouter.isSearchBh()) {
            /* 百度健康 */
            GM_addStyle(SearchHealthShieldCSS);
            log.info("插入CSS规则");
            BaiduHeadlth.init();
        } else {
            BaiduSearchHook.init();
            /* 默认的百度搜索 */
            GM_addStyle(SearchShieldCSS);
            log.info("插入CSS规则");
            PopsPanel.execMenu("baidu_search_hijack__onClick_to_blank", () => {
                this.openResultBlank();
            })
            DOMUtils.ready(function () {
                HandleItemURL.originURLMap =
                    HandleItemURL.parseScriptDOMOriginUrlMap(document);
                let baidu_search_handle_search_result_enable = PopsPanel.getValue(
                    "baidu_search_handle_search_result",
                    true
                );
                if (baidu_search_handle_search_result_enable) {
                    let searchUpdateRealLink = new utils.LockFunction(async () => {
                        try {
                            await HandleItemURL.replaceLink();
                        } catch (error) {
                            log.error(["替换为真实链接失败", error]);
                        }
                    }, 600);
                    let removeAdsLockFunction = new utils.LockFunction(
                        HandleItemURL.removeAds,
                        600
                    );
                    utils.waitNode("div#page.search-page").then((element) => {
                        utils.mutationObserver(element, {
                            callback: async () => {
                                if (baidu_search_handle_search_result_enable) {
                                    await searchUpdateRealLink.run();
                                }
                                removeAdsLockFunction.run();
                            },
                            config: {
                                childList: true,
                                subtree: true,
                            },
                        });
                    });

                    if (baidu_search_handle_search_result_enable) {
                        searchUpdateRealLink.run();
                    }
                    removeAdsLockFunction.run();
                }

                utils
                    .waitNodeList("style[class^='vsearch-sigma-style']")
                    .then((nodeList) => {
                        /* 这个style标签就是某些搜索置顶的卡片 */
                        log.success(["删除sigma的CSS", nodeList]);
                        (nodeList as unknown as HTMLElement[]).forEach((item) => item.remove());
                    });

                if (PopsPanel.getValue("baidu_search_redirect_top_link")) {
                    HandleItemURL.redirectTopLink();
                }
                HandleItemURL.replaceScriptBaiDuTip();
                if (PopsPanel.getValue("baidu_search_refactoring_input_boxes")) {
                    HandleInputEvent.init();
                }
                if (
                    PopsPanel.getValue("baidu_search_automatically_expand_next_page")
                ) {
                    HandleNextPage.init();
                } else if (
                    PopsPanel.getValue(
                        "baidu_search_automatically_click_on_the_next_page_with_searchcraft_ua"
                    )
                ) {
                    HandleNextPage_SearchCraft.init();
                }
                if (
                    utils.startsWith(
                        window.location.href,
                        "https://(m[0-9]{0,2}|www).baidu.com/sf/vsearch"
                    )
                ) {
                    utils
                        .waitNode("#realtime-container .c-infinite-scroll")
                        .then((element) => {
                            let replaceVSearchLinkLonkFunction = new utils.LockFunction(
                                HandleItemURL.replaceVSearchLink,
                                600
                            );
                            utils.mutationObserver(element, {
                                config: {
                                    subtree: true,
                                    childList: true,
                                },
                                callback: replaceVSearchLinkLonkFunction.run,
                            });
                        });
                }
            });
        }
    },
    /**
     * 新标签页打开
     */
    openResultBlank() {
        function globalResultClickEvent(event: PointerEvent | MouseEvent | Event) {
            let url = null;
            let srcElement = event.srcElement as HTMLElement;
            let eventTarget = event.target as HTMLElement;
            if (srcElement) {
                if (srcElement.closest("a")) {
                    let anchorNode = srcElement.closest("a") as HTMLAnchorElement;
                    if (utils.isNotNull(anchorNode.href)) {
                        log.info([
                            "链接来自上层a元素",
                            {
                                event,
                                srcElement,
                                anchorNode,
                            },
                        ]);
                        url = anchorNode.href;
                    }
                } else if (srcElement.closest("[rl-link-href]")) {
                    let rlLinkHrefNode = srcElement.closest("[rl-link-href]") as HTMLElement;
                    let rlLinkHref = rlLinkHrefNode.getAttribute("rl-link-href");
                    if (utils.isNotNull(rlLinkHref)) {
                        log.info([
                            "链接来自上层含有[rl-link-href]属性的元素",
                            {
                                event,
                                srcElement,
                                rlLinkHrefNode,
                            },
                        ]);
                        url = rlLinkHref;
                    }
                }
            } else {
                let $resultNode = eventTarget.querySelector("article") as HTMLElement;
                url = $resultNode.getAttribute("rl-link-href");
                log.info([
                    "链接来自顶层向下寻找article元素",
                    { event, eventTarget, $resultNode },
                ]);
            }
            if (utils.isNull(url)) {
                log.info([
                    "未找到有效链接",
                    { event, eventTarget, srcElement, url },
                ]);
                return;
            }
            /* 阻止事件传递 */
            utils.preventEvent(event);
            log.success(["新标签页打开-来自click事件", { url }]);
            window.open(url as string, "_blank");
        }
        DOMUtils.on(
            document,
            "click",
            ".c-result.result",
            globalResultClickEvent
        );
    },

}

export {
    BaiduSearch
}