export const BilibiliUrlUtils = {
	/**
	 * 获取用户个人空间链接
	 * @param userId 用户id
	 */
	getUserSpaceUrl(userId: string) {
		return `https://m.bilibili.com/space/${userId}`;
	},
	/**
	 * 获取用户个人空间动态链接-dynamic
	 * @param userId 用户id
	 */
	getUserSpaceDynamicUrl(userId: string) {
		return `https://m.bilibili.com/dynamic/${userId}`;
	},
	/**
	 * 获取用户个人空间动态链接-opus
	 * @param userId 用户id
	 */
	getUserSpaceOpusUrl(userId: string) {
		return `https://m.bilibili.com/opus/${userId}`;
	},
	/**
	 * 获取视频链接
	 * @param id bv/av号
	 */
	getVideoUrl(id: string) {
		return `https://m.bilibili.com/video/${id}`;
	},
};
