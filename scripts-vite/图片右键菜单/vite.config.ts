import { defineConfig } from "vite";
import monkey, { cdn, util } from "vite-plugin-monkey";
import { ViteUtils, GetLib } from "../../vite.utils";
import mkcert from "vite-plugin-mkcert";

const SCRIPT_NAME = "图片右键菜单";
const Utils = new ViteUtils(__dirname);
let FILE_NAME = SCRIPT_NAME + ".user.js";

/* 是否压缩代码 */
let isMinify = false;
if (process.argv.includes("--minify")) {
	isMinify = true;
	FILE_NAME = SCRIPT_NAME + ".min.user.js";
}

let isEmptyOutDir = true;
if (process.argv.includes("--no-empty-outDir")) {
	isEmptyOutDir = false;
}

let VERSION = "0.0.1";
if (process.argv.findIndex((i) => i.startsWith("build")) !== -1) {
	VERSION = Utils.getScriptVersion(!isEmptyOutDir);
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		mkcert({
			force: true,
		}),
		monkey({
			// 脚本入口
			entry: "src/main.ts",
			userscript: {
				// 脚本名
				name: SCRIPT_NAME,
				// 命名空间
				namespace: "https://github.com/WhiteSevs/TamperMonkeyScript",
				// 反馈地址
				supportURL: "https://github.com/WhiteSevs/TamperMonkeyScript/issues",
				version: VERSION,
				// 版本号
				author: "WhiteSevs",
				// 运行时刻
				"run-at": "document-end",
				// 许可证
				license: "GPL-3.0-only",
				// 引用库
				require: await GetLib(["CoverUMD"]),
				// 图标
				icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACACAYAAACMY2IbAAAAAXNSR0IArs4c6QAADrpJREFUeF7tnXlwFFUex789SWaSEHIfM5OEISThnIQjBgKR+xIQSQIBJAOIqICWxR5a7rqusuJilVq7UuJRblm7C3F3USGslq6itbrGVUTwCAhBQCAHSA6ukEAO0uvrEBZJz8xLd8909/R7fzB/pN/vvd/39+G9ft2vf4+Dl7LcWZDeCW46z2EGgAwAdgBx3uqxvxtSgUYAJwFU8jz/Jn/FVP63g9tPeFKCc/fHpdnFaXxnx1pwWGtIKZnTyijAYyNnCt64peL1Y2IGRQFcmlVYzAObACQq0wtmxeAK1PEc/+SrFTuevVGHHgC6sgpLfpxqSw0uGHPfFwrw3LbS/dsXXG/6JwC6nAXrwHGP+aJtZpMp0KUAt6l03/b7u9W4BuBSZ+FqnsOLTCamgM8V4LC8tKJss4Aj+UdYcPAdu2ju+Syx4Qi39fV5H1kD+lPgUn0zLtddpOl4HccF55GFiQCgy1n4rLfV7sCVuYjPsSPMyuCjUdio17Sdu4xzB+tw8IVd6Ghucy8Dj42l+8t+xi0ZUuQwBfPHPQk29vl5bNQzKlES/b7S2oG9D+9E07Ezbi0E8XwGV+IscHEct8XdVTdtmImowQkSu8GqGV2BT9fswKXT4tMyx2MN58oqfA1AsZhQ6SUj0H++0+gaMv9lKECm472/2enOQhkBsAJAltgV+S8VIDQxQkbzrCpTANi19i00V58Xk2IfAbBB7N1uaHw48l8uYvoxBWQrsO+ZctR9KvpKuJEAyIu1EDMsCaPWT5fdODPAFPh+awWObSUTbc/CAGR8+FwBBqDPJWYNeFKAAcj4UFUBBqCq8rPGGYCMAVUVYACqKj9rnAHIGFBVAc0DeOabUzj77Wm0X2hFe1Or8BsSFQpzlAUhkaFIGudAn9QoVUVkjUtXQJMAXjxxDrXvH0bD7hpcbmj26h3ZEBE73IbUOYMQEmHxej27QDsKaArA1sYWVL9zCNVvV6Kz7UqvVSKbYVNmDxZAZEUfCmgGwPOH6nFg02doqb0gW7mYLCuGrR0HskObFW0roAkA63ZVYd9THyuqlMkchJz1MxCZyb6TV1RYhY2pDmDVmwdx+C97FXbr/+byNs5lixSfqSvfsKoAnv7kBPb/oVy+Fx4smEKCMPqZ2QxCn6os3bhqAJIFx95Hdrrdkt3tUqrFjH4WC+zmEDhCLehvsaC+vR317R3C796Lzfj+cqtHBfqmx2L007Olq8Rq+kwB1QA8suUrnCj71qNjt8bGYGp0JEI4t2lqhPpb6xtRfqHJo63Bq8cgeUamz4RkhqUpoAqA5DnfFw/9y+OjlkdSk2E1h1B71djegceqatxez0ZBain9eqEqAJJFB1l8uCv3260YFBbaayEqWy5h06nTbus5fzkeSfmOXttlFXyngCoA7nn4PZyvrBf1anTfCCxLjJfs8ea6BuxuEv/UL2XWIAy6O1eybVZReQX8DmD7xTZ8vIx87dmzJJvN+HmyFaEmk2RPT7S24umaU6L1IxwxGPPHOZJts4rKK+B3ABv21uKb338o6smEqL5YGC//wfGT1SdR2yae+mHS3xcjyBKsvJLMoiQF/A7giR0HcGTzl6KdLUmIx9hI+d8ae5qGc5+ahcgM+ZBLUptV6qGA3wE88NxnOPXhUdFQPJRiB3nuJ7f85/wFvN4gnndk6P3jYJs8QG4TqtYnC7j6z6txqe4i7NMydL0lze8Afv3Eh2j8slY0gJvS+ysS2IrmFrz8Q52orYxlo+AoGKpIO2oYEfuQm+yHzHpggi7f9vgdwMN/3ouqt8QfwTyYYoPDIn8/347Gs/jgnGi6B2T/ahISRqeowY7sNj1kERDg0yOEfgewdudhVL70uWgwFiXEYXyk/ByD5FkgeSYoVsY+dxvCkyNlw+BvA57g6+6LHiH0O4Bn95/Gl4++Lxq/vL4RcMl4Btht9NfHq9F0RXxD69TtLn+zI7s9Gvj0CqHfAeSvdOKj2/+Bzo7OHoGxmDjcZ7NiQKj0adjTAiR6aCJyniBn6uin9AY+PULodwCJSOQ5IHkeKFYIfL9Itkki5FJnJx48VuW2bv8FTqQvGSHJthqVpMCnNwhVAdBTo0TAorhYTInu/X3an36owzfNLW5ZGfHbKYgbSU4T036RA5+eIFQFwPaLrdjz0LtoOeV+C1VxfCwmRtFB2MHzeO7kaRy9fNktWWQTAtmMoIdCA9/o3Djk3hSL51887NElrS9MVAGQKFb99iF898oXHsUbGh6GWTHRSPNwT0j2Ae5oPIPWTtFUhtfs52yYiWgd5LOmgW/M6Djcu6prb+PuPY26hlA1AIl4X6//Nxq/Igcoei42cwjsZjNSLGZhR3RVaxuqW1uF37r2dm/VkbYoGwMWZXu9Tu0LaODLGx2HNVfh6+6vniFUFUAi4H9XleFyvfePz6XC4SgahgzXSKnV/VaPCr4x8VhzDzkVt2fRK4SqA0ikLF/xBtrOu79/k0pBbLYVI9dNk1rdb/Vo4BubF4/Vd4vDp+eRUBMAEgG/e2WPkBFBqZI8MxODV41RypzP7NDAN25sPFbd5Rk+vUKoGQCJgKQzNW8fAlklSy0Rjmj0mzcUtkna3/FCA1/+2HjcQwmfHiHUFIBEQPJopuadSmGV3JtiiQtH6uxBSJ0zGCQrgtYLFXzjEnDPynRJrujlnlBzAHarTXLE1H9Rg/rd1W6/HyHXWiemISE3BbHZNgRHyN9LKCnavaxEA9/N+Qm4+05p8OlpJNQsgNfHlLw/JnkB267mBzRHhSIk0gLyq7dCA9/4/ATcJRM+vUCoCwD1Bpm7/tLAN+HmBKxcIW/ku7F9LU/HDEA/0U0F3/hErLzDN4snrULIAPQDgDTwTZyQiDuX+wY+LU/HDEAfA0gD36QJiVjhY/i0CiED0IcA0sA3eWIS7liW5sNe9DStpemYAeij0FPBNykJdyz1L3xaGwkZgD4AkAa+KZOTsNylDnxagpABqDCANPBNnZyEZSrDpxUIGYAKAkgD37QpViwtUeYDfKW6ruY9IQNQoShSwTfViqVLtAWf2iMhA1ABAGngmz7VCpdG4VMTwoAEsGFPDWp3HkFL7XmkLcwWNiz4qtDAN2OaFSW3a3PkU/u1XcABKOZQ4jgHsh5Q/os4GvhmTrdhyWJ9pQX25z1hQAHoyRmlIaSCb4YNSxbpCz5/T8cBA6C3j92JsEpBSAPfLTNsuF2n8PUWwpGPTgXZECylBASANPB1iyMXQhr4Zs20YfFCfY58Uu4J+80dgswVOVL4Ez7DOLa1QrQu58oqFP3aO2ZYEkatny6pQaUr9QY+uRDSwDf7FjsWFfdT2k1V7dHcE0rNOqZrAKXAJxVCKvhm2bFoQWDBRzsdGw5AOfD1FkIa+ObMsmNhgMLXrdeTTx1A5SHx85wNBSANfOR4udycOCF3iqfi7Z6QBr5bZ9tRPD8wR77rtWMAXv122N1Na7dYJhOHe1dnIjenK3uUVAhp4Js7JxkLilJVvUfzV+OGB5Bm5AsO6oIvZ1TstbjQQBiWFIGYLCusE9JA3qQ07KlFy0nx6abbsJHgIz4bGkAa+EJCTELaslEjY3oMCjQQ9mYkue3WZMwvNMbIZ/h7QBr4zGaTMPKNHN4Tvm4BlYJw3txkFBUYCz7DjoA08FksQbhvdSaGZ0d7HcTkQlhwWwoK5+nznBGv4ni5wHBTMA18YWFBwrSbneUdPrkjoZHhM9wISANfeHiwMPI5h0X1+j/3O++exPayGrSLHBdxo7GoyBAsWugAyVRl5GKYEZAGvj59uuAbNrT38HVDdPhIE7aVVeNgpfvVLoF7cbEDqanSXrYHErCGAJAGvr4RwcKCY+gQ6fBdD0ZVdQuqqppx4upv+oAIOPr1QXJyGFKSGXiGWQXTwBcZGSKMfIMH0R3hEEgjkNq+BPQISANfVFQXfIMGMvjUgDFgAaSBLybaLEy7AzPln6apRvACoc2ABJAGvtgYM+5bk4mMdAafmiAHHIA08MXFWYRplywMWFFXgYACkAa+hHiLMO0OSGPwqYteV+sBAyANfIkJocK029/RRwvasz4ECoDkDJBP7tqOzjbxE81JpJOSQoVplzyLY0U7CgTECHjygyM4+MIut6parWECfP3YmwftkHe1JwEBoKfp127rgi8lhb190Bx9gTIFewJww/rhSLaHaVF71icjAPjXV/JYoDWsQMBPwQxADdPHRkBtB8cIvWMjoBGirGEfGYAaDo4RusYANEKUNexjwAPINplqmL6rXdN9bhia98DaDwPr4Y0K6CY5EQMwMOFlAAZmXHXjFQNQN6EKvI7KyZjr9wyp5yvrsefh9wIvCgb2aNTj0xHjTJKkgN8BJL1sOnoGpz46iovHz0nqNKukDQUiB8YjMS8VkZnSM0aoAqA25GO90IICDEAtRMHAfWAAGjj4WnCdAaiFKBi4DwxAAwdfC64zALUQBQP3gQFo4OBrwXUGoBaiYOA+eAOwAUDcjfqExocj/+UiA8vGXFdKAW8AknM0s8Qay3+pAKGJLGeLUoEwqh2SpIAkKxAr5LjW1wAUi/0xvWQE+s93GlU35rcCCpD0LCRNC0nXcmPhgTNcibPAxXHcFndt3bRhJqIGJyjQFWbCiAp42Rv6KrdkSJHDFMwf9yTO2OfnIdzGEkcaESA5PlNsTHZxpAGXs/BZcFjrqbGBK3MRn2NHmJWBKCcoRqhLDoKs3XlEOBDSQykv3Vc2QQBwaXZxGs93kHRWid4EssSGs9HQm0gG/Xt7Uytaz14C+fVaOH5BacWObQKAAoTOwtU8hxe9VmQXMAXkKsDzvyvdv2MdMXMNwK6puGAdOO4xufZZfaaABwVeLd1X5ur++08AFCDMKiwBUMokZAr4QIGdpfvKZl5vtweAwnScVVjMA5to7gl90ElmMhAV4PBMaUXZgze6JgrgtYVJZ8dab6vjQNSK+aSgAjy3DaYrG0sr/lkuZtUtgN0XL3cWpHeCm85zmPHj1JwBwC727ljBLjNTulWAPwtwPwA4zQFvcLypfPP+beRVr9vyP3gtOOOcaecAAAAAAElFTkSuQmCC",
				// 脚本描述
				description:
					"在浏览器预览图片页面添加全局右键菜单，右键直接复制该图片的Uri编码，支持自动判断图片类型，包括：jpg、jpeg、png、gif、webp、ico，支持手动判断图片类型，包括：jpg、jpeg、png、gif。",
				// 脚本运行域
				match: ["*://*/*"],
				// GM_xmlhttpRequest允许访问的域
				// connect: [""],
				// GM api权限申请
				// grant: [
				// 	"GM_addStyle",
				// 	"GM_registerMenuCommand",
				// 	"GM_unregisterMenuCommand",
				// 	"GM_getValue",
				// 	"GM_setValue",
				// 	"GM_deleteValue",
				// 	"GM_xmlhttpRequest",
				// 	"GM_info",
				// 	"unsafeWindow",
				// 	"GM_getResourceText",
				// ],
			},
			clientAlias: "ViteGM",
			server: {
				// 把GM api 挂载到unsafeWindow上
				mountGmApi: false,
				// dev时浏览器自动访问地址从而触发脚本管理器安装本脚本
				open: false,
			},
			build: {
				// 自动申请权限，可以不用填上面的grant
				autoGrant: true,
				// 输出文件名
				fileName: FILE_NAME,
				// 引入外部库
				externalGlobals: {
					qmsg: cdn.jsdelivrFastly("Qmsg", "dist/index.umd.js"),
					"@whitesev/utils": cdn.jsdelivrFastly("Utils", "dist/index.umd.js"),
					"@whitesev/domutils": cdn.jsdelivrFastly(
						"DOMUtils",
						"dist/index.umd.js"
					),
					"@whitesev/pops": cdn.jsdelivrFastly("pops", "dist/index.umd.js"),
				},
				// 样式添加到页面的自定义处理
				cssSideEffects: () => {
					return (cssText: string) => {
						function addStyle(cssText: string) {
							if (typeof cssText !== "string") {
								throw new TypeError("cssText must be a string");
							}
							let cssNode = document.createElement("style");
							cssNode.setAttribute("type", "text/css");
							cssNode.innerHTML = cssText;
							if (document.head) {
								/* 插入head最后 */
								document.head.appendChild(cssNode);
							} else if (document.body) {
								/* 插入body后 */
								document.body.appendChild(cssNode);
							} else if (document.documentElement.childNodes.length === 0) {
								/* 插入#html第一个元素后 */
								document.documentElement.appendChild(cssNode);
							} else {
								/* 插入head前面 */
								document.documentElement.insertBefore(
									cssNode,
									document.documentElement.childNodes[0]
								);
							}
							return cssNode;
						}
						// @ts-ignore
						if (typeof GM_addStyle == "function") {
							// @ts-ignore
							GM_addStyle(cssText);
							return;
						}
						addStyle(cssText);
					};
				},
			},
		}),
	],
	resolve: {
		alias: {
			"@": Utils.getAbsolutePath("./src"),
		},
	},
	server: {
		host: "::",
	},
	optimizeDeps: {
		force: true,
	},
	build: {
		/* 构建的.user.js是否压缩 */
		minify: isMinify,
		// 构建输出目录是否清空
		emptyOutDir: isEmptyOutDir,
	},
});
