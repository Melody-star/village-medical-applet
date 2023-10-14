<template>
	<view class="tabbar">
		<view class="navigator">
			<view class="navigator-item" v-for="(item,index) in tabBar.list" :key="item.pagePath"
				@click="switchTab(item,index)">
				<img :src="item.iconPath" class="icon" v-if="selectedIndex !== index">
				<img :src="item.selectedIconPath" class="icon" v-else>
				<text :class="['item-text',{'text-active':selectedIndex === index}]">{{item.text}}</text>
			</view>
		</view>
		<view class="isIPhoneXRegexBottom"></view>
	</view>
</template>

<script>
	import {
		textToSpeech
	} from "@/utils/utils.js"

	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	export default {
		name: "my-tabbar",
		data() {
			return {
				selectedIndex: 0,
				showselected: false,
				selectedIndex: uni.getStorageSync('selectedIndex') || 0,
				tabBar: {
					list: []
				},
			}
		},
		created() {
			let that = this
			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					if (res.data.userType == "1") {
						that.tabBar.list = counter.doctorTabbar
						uni.switchTab({
							url: '/pages/info/info'
						});
					} else {
						that.tabBar.list = counter.patientTabbar
					}
				}
			});
		},
		methods: {
			switchTab(item, index) {
				let url = '/' + item.pagePath
				let pagePath = url
				uni.switchTab({
					url
				})
				this.tabBar.list.forEach((v, i) => {
					if (item.pagePath === v.pagePath) {
						uni.setStorageSync('selectedIndex', index);
					}
				})
				if (counter.voice === true) {
					textToSpeech("切换到" + item.text + "页面")
				}
			}
		},
	}
</script>

<style>
	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		/* height: 100rpx; */
		z-index: 999;
		background: #ffffff;
		border-top: 1rpx solid #c2c2c2;
	}

	.navigator {
		display: flex;
		justify-content: space-around;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.navigator-item {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 50rpx;
		height: 100%;
	}

	.item-text {
		/* margin-top: 6rpx; */
		color: #000000;
		font-size: 23rpx;
	}

	.text-active {
		color: #2E92FD !important;
	}

	.icon {
		width: 27px;
		height: 27px;
	}

	.isIPhoneXRegexBottom {
		padding-bottom: constant(safe-area-inset-bottom) !important;
		/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom) !important;
		/*兼容 IOS>11.2*/
		background-color: transparent;
		/* 透明色 */
	}
</style>