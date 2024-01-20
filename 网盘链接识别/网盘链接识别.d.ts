/**
 * 网盘匹配规则配置
 */
declare interface NetDiskRegularOption {
    /**
     * 正则字符串：使用innerText进行匹配
     */
    link_innerText: string;
    /**
     * 正则字符串：使用innerHTML进行匹配
     */
    link_innerHTML: string;
    /**
     * 正则：获取shareCode
     */
    shareCode: RegExp;
    /**
     * (可选)正则：用于判断提取到的shareCode是否是错误的shareCode
     */
    shareCodeNotMatch?: RegExp;
    /**
     * 正则：需要替换空的，比如pan.baidu.com/s/替换为空
     */
    shareCodeNeedRemoveStr: RegExp;
    /**
     * 正则：用来判断link_innerText或者link_innerHTML匹配到的字符串中是否存在密码
     */
    checkAccessCode: RegExp;
    /**
     * 正则：用来提取link_innerText或者link_innerHTML匹配到的字符串中的密码
     */
    accessCode: RegExp;
    /**
     * (可选)正则：用于判断提取到的accessCode是否是错误的accessCode
     */
    acceesCodeNotMatch?: RegExp;
    /**
     * 用于显示在弹窗中的字符串
     */
    uiLinkShow: string;
    /**
     * 用于点击跳转的链接
     */
    blank: string;
    /**
     * 用于复制到剪贴板的链接
     */
    copyUrl: string;
}
/**
 * 网盘匹配规则
 */
declare interface NetDiskRegular {
    [key: string]: NetDiskRegularOption[];
}

