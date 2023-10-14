import operate from '../common/operate.js'

import {
	useCounterStore
} from '../stores/counter.js'
const counter = useCounterStore();

export default class Request {
	http(param) {

		// 请求参数
		var url = param.url,
			method = param.method,
			data = param.data || {},
			hideLoading = param.hideLoading || false;

		// 拼接完整请求地址
		var requestUrl = operate.api + url;

		// 加载圈
		if (!hideLoading) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		}

		// 返回promise
		return new Promise((resolve, reject) => {

			// 请求
			uni.request({
				url: requestUrl,
				data: data,
				method: method,
				header: {
					'token': counter.token
				},
				success: (res) => {

					// 判断 请求api 格式是否正确
					if (res.code && res.code != 200) {
						uni.showToast({
							title: "状态码错误" + res.errMsg,
							icon: 'none'
						});
						return;
					}

					// 将结果抛出
					resolve(res.data)
				},
				fail: (e) => {
					uni.showToast({
						title: e.errMsg,
						icon: 'none'
					});
					resolve(e.data);
				},
				complete() {
					if (!hideLoading) {
						uni.hideLoading();
					}
					resolve();
					return;
				}
			})
		})
	}
}