/** Utils.Log的初始化配置 */
declare interface UtilsLogOptions {
    /** 是否输出Tag，false的话其它的颜色也不输出 @default true */
    tag: boolean;
    /** log.success的颜色 @default "#0000FF" */
    successColor: string;
    /** log.warn的颜色 @default "0" */
    warnColor: string;
    /** log.error的颜色 @default "#FF0000" */
    errorColor: string;
    /** log.info的颜色 @default "0" */
    infoColor: string;
    /** 是否开启debug模式，true会在控制台每次调用时输出调用函数的所在位置，false不会输出位置 @default false */
    debug: boolean;
    /** 当console输出超过logMaxCount数量自动清理控制台 @default false */
    autoClearConsole: boolean;
    /** console输出的最高数量，autoClearConsole开启则生效 @default 999 */
    logMaxCount: number;
}
declare class Log {
    #private;
    /** 前面的TAG标志 */
    tag: string;
    /**
     * @param __GM_info 油猴管理器的API GM_info，或者是一个对象，如{"script":{name:"Utils.Log"}}，或者直接是一个字符串，用作tag名
     * @param console 可指定console对象为unsafeWindow下的console或者是油猴window下的console
     */
    constructor(__GM_info?: {
        script: {
            name: string;
        };
    } | string, console?: Console);
    /**
     * 解析Error的堆栈获取实际调用者的函数名及函数所在的位置
     * @param stack
     */
    private parseErrorStack;
    /**
     * 检测清理控制台
     */
    private checkClearConsole;
    /**
     * 输出内容
     * @param msg 需要输出的内容
     * @param color 颜色
     * @param otherStyle 其它CSS
     */
    private printContent;
    /**
     * 控制台-普通输出
     * @param args 需要输出的内容
     * @example
     * log.info("输出信息","输出信息2","输出信息3","输出")
     */
    info(...args: any[]): void;
    /**
     * 控制台-警告输出
     * @param args 需要输出的内容
     * @example
     * log.warn("输出警告","输出警告2","输出警告3","输出警告4")
     */
    warn(...args: any[]): void;
    /**
     * 控制台-错误输出
     * @param args 需要输出的内容
     * @example
     * log.error("输出错误","输出错误2","输出错误3","输出错误4")
     */
    error(...args: any[]): void;
    /**
     * 控制台-成功输出
     * @param args 需要输出的内容
     * @example
     * log.success("输出成功")
     */
    success(...args: any[]): void;
    /**
     * 控制台-输出表格
     * @param msg 需要输出的内容
     * @example
     * log.table([{"名字":"example","值":"123"},{"名字":"example2","值":"345"}])
     */
    table(msg: any[]): void;
    /**
     * 配置Log对象的颜色
     * @param paramDetails 配置信息
     */
    config(paramDetails: Partial<UtilsLogOptions>): void;
    /** 禁用输出 */
    disable(): void;
    /** 恢复输出 */
    recovery(): void;
}
export { Log };
