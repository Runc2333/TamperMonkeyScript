export const DouYinRouter = {
	/** 直播 */
	isLive() {
		return (
			window.location.hostname === "live.douyin.com" || this.isFollowLive()
		);
	},
	/** 关注-直播 */
	isFollowLive() {
		return (
			this.isIndex() && window.location.pathname.startsWith("/follow/live/")
		);
	},
	/**
	 * 是否是抖音主站
	 */
	isIndex() {
		return window.location.hostname === "www.douyin.com";
	},
	/**
	 * 推荐视频
	 */
	isRecommend() {
		return this.isIndex();
	},
	/** 搜索 */
	isSearch() {
		return (
			this.isIndex() &&
			(window.location.pathname.startsWith("/search") ||
				window.location.pathname.startsWith("/root/search"))
		);
	},
	/** 精选 */
	isDiscover() {
		return this.isIndex() && window.location.pathname.startsWith("/discover");
	},
	/**
	 * 用户主页
	 */
	isUser() {
		return this.isIndex() && window.location.pathname.startsWith("/user");
	},
	/**
	 *
	 */
	isVideo() {
		return this.isIndex() && window.location.pathname.startsWith("/video");
	},
};
