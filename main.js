import App from './App'
import GoEasy from './node_modules/goeasy/goeasy.esm.min.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

App.mpType = 'app'
try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}

const app = new Vue({
	...App
})
app.$mount()
// #endif

const goEasy = GoEasy.getInstance({
	host: "hangzhou.goeasy.io",
	appkey: "BC-539a7104637049c2a33ad39e211c148a",
	modules: ['im'],
});

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia'
export function createApp() {
	const app = createSSRApp(App)

	app.use(Pinia.createPinia())
	app.config.globalProperties.GoEasy = GoEasy
	app.config.globalProperties.goEasy = goEasy

	return {
		app,
		Pinia
	}
}
// #endif