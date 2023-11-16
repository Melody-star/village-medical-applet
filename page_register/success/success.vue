<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<view style="background-color: #fff;padding-bottom: 20px;">
			<title name="预约成功"></title>
		</view>
		<van-divider customStyle="margin:0px;" />

		<view style="padding-bottom: 10px;background-color: #fff;padding-top: 10px;">
			<view style="display: flex;margin-left: 240rpx;margin-bottom: 15px;">
				<image src="https://s3-us-east-1.ossfiles.com/demoas/success.png" style="width: 44rem;height: 44rem;">
				</image>
				<text style="font-size: 30rem;margin-left: 10rpx;">预约挂号成功</text>
			</view>
			<text style="font-size: 18rem;margin-left: 46rpx;">预约挂号成功，请在预约时间段内前往指定科室，具体就诊时间请以现场报道为准！</text>
		</view>

		<view class="box">
			<text>就诊凭条（凭以下凭条进行就诊）</text>
			<!-- <text>{{value.medical_code}}</text> -->
			<image src="https://s3-us-east-1.ossfiles.com/demoas/2d.png"></image>
		</view>

		<view class="box1">
			<view style="font-size: 28rem;">
				<text>就诊时间</text>
				<text>{{info.date}} {{info.time}}</text>
			</view>

			<van-divider />

			<view style="font-size: 28rem;">
				<text>就诊科室</text>
				<text>{{info.department}}</text>
			</view>

			<van-divider />

			<view style="font-size: 28rem;">
				<text>就诊医生</text>
				<text>{{info.doctorName}}</text>
			</view>

			<van-divider />

			<view style="font-size: 28rem;">
				<text>就诊人</text>
				<text>{{info.name}}</text>
			</view>

			<van-divider />

			<view style="font-size: 28rem;">
				<text>医院单号</text>
				<text>{{value?.medical_order_number}}</text>
			</view>
		</view>
	</view>

	<view class="cancel_btn" @click="goHome()">返回首页</view>
</template>

<script>
	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	import sizeUtil from '@/utils/sizeUtil.js'

	export default {
		extends: sizeUtil,
		data() {
			return {
				info: {},
				value: null
			}
		},
		onLoad(e) {
			this.value = JSON.parse(decodeURIComponent(e.result))
			this.info = counter.registerInfo

			console.log("this.value", this.value);
			console.log("this.info", this.info);
		},
		methods: {
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}

	.box {
		width: 100%;
		border-bottom: 6px solid #f7f7f7;
		border-top: 6px solid #f7f7f7;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 0px;
		background-color: #fff;

		image {
			width: 525rpx;
			height: 183rpx;
		}

		text {
			font-size: 24rem;
		}
	}

	.box1 {
		width: 100%;
		border-bottom: 6px solid #f7f7f7;
		padding: 10px 0px;
		background-color: #fff;

		>view {
			padding-left: 10px;
			padding-right: 10px;
			display: flex;
			justify-content: space-between;
		}
	}

	.cancel_btn {
		width: 587rpx;
		height: 34.5px;
		margin-left: 82rpx;
		border-radius: 5px;
		font-size: 28rem;
		text-align: center;
		line-height: 34.5px;
		position: absolute;
		bottom: 10px;
		border: 1px solid rgba(128, 128, 128, 0.3);
		background-color: #fff;
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>