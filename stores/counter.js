import {
	defineStore
} from 'pinia'

export const useCounterStore = defineStore('counter', {
	state: () => {
		return {
			username: '',
			voice: false,
			token: '',
			city: "孝感",
			patientTabbar: [{
				"pagePath": "pages/index/index",
				"iconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/home.png",
				"selectedIconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/home2.png",
				"text": "首页"
			}, {
				"pagePath": "pages/info/info",
				"iconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/info.png",
				"selectedIconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/info2.png",
				"text": "消息"
			}, {
				"pagePath": "pages/news/news",
				"iconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/zixun1.png",
				"selectedIconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/zixun2.png",
				"text": "科普"
			}, {
				"pagePath": "pages/my/my",
				"iconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/my.png",
				"selectedIconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/my2.png",
				"text": "我的"
			}],
			doctorTabbar: [{
				"pagePath": "pages/info/info",
				"iconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/info.png",
				"selectedIconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/info2.png",
				"text": "消息"
			}, {
				"pagePath": "pages/my/my",
				"iconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/my.png",
				"selectedIconPath": "https://s3-us-east-1.ossfiles.com/demoas/tabbar/my2.png",
				"text": "我的"
			}],
			registerInfo: {}
		}
	},
	action: {

	},
	gettters: {

	}
})