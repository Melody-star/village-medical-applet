<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<view style="background-color: #4B97F8;padding-bottom: 20px;">
			<title name="选择医生" color="#fff"></title>
		</view>

		<view v-for="(item,i) in doctorList" :key="i">
			<view class="flex-row items-center page space-x-34" style="margin-top: 20px;margin-left: 30px;"
				@click="goTo(item)">
				<image class="image" :src="item.avatar" />
				<view class="flex-col">
					<view class="flex-row items-baseline space-x-18">
						<text class="text">{{item.username}}</text>
						<text class="font_1">{{item.title}}</text>
					</view>
					<view class="flex-row items-center group space-x-22">
						<text class="font_1 text_2">{{item.hospital}}</text>
						<text class="font_1 text_3">{{item.department}}</text>
					</view>
					<text class="text_4">擅长：{{item.expertise}}</text>
				</view>
			</view>
			<van-divider />
		</view>
	</view>
</template>

<script>
	import {
		getUserInfoByType
	} from '@/api/api.js'

	import sizeUtil from '../../../utils/sizeUtil'
	export default {
		extends: sizeUtil,
		data() {
			return {
				doctorList: [],
				userInfo: {}
			}
		},
		onLoad() {
			getUserInfoByType({
				type: 1
			}).then((res) => {
				console.log(res);
				this.doctorList = res.data
			})

			this.userInfo = uni.getStorageSync('userinfo');

			if (this.goEasy.getConnectionStatus() === 'disconnected') {
				this.connectGoEasy(); //连接goeasy
			}
		},
		methods: {
			goTo(value) {
				console.log(value);
				uni.navigateTo({
					url: '/pages/info/privateChat?to=' + value.user_id
				});
			},
			connectGoEasy() {
				let that = this
				this.goEasy.connect({
					// 用户id
					id: that.userInfo.user_id,

					// 用户信息
					data: {
						name: that.userInfo.username,
						avatar: that.userInfo.avatar
					},
					onSuccess: () => {
						console.log('GoEasy connect successfully.')
					},
					onFailed: (error) => {
						console.log('Failed to connect GoEasy, code:' + error.code + ',error:' + error
							.content);
					},
					onProgress: (attempts) => {
						console.log('GoEasy is connecting', attempts);
					}
				});
			}
		}
	}
</script>

<style scoped>
	.space-x-34>view:not(:first-child),
	.space-x-34>text:not(:first-child),
	.space-x-34>image:not(:first-child) {
		margin-left: 34rpx;
	}

	.image {
		border-radius: 10rpx;
		width: 107rpx;
		height: 99rpx;
	}

	.space-x-18>view:not(:first-child),
	.space-x-18>text:not(:first-child),
	.space-x-18>image:not(:first-child) {
		margin-left: 18rpx;
	}

	.text {
		color: #000000;
		font-size: 30rpx;
		font-family: SourceHanSansCN;
		line-height: 28rpx;
	}

	.font_1 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 22rpx;
		color: #000000;
	}

	.group {
		margin-top: 20rpx;
	}

	.space-x-22>view:not(:first-child),
	.space-x-22>text:not(:first-child),
	.space-x-22>image:not(:first-child) {
		margin-left: 22rpx;
	}

	.text_2 {
		line-height: 22.5rpx;
	}

	.text_3 {
		line-height: 24.5rpx;
	}

	.text_4 {
		margin-top: 14rpx;
		color: #a6a6a6;
		font-size: 18rpx;
		font-family: SourceHanSansCN;
		line-height: 16.5rpx;
	}
</style>