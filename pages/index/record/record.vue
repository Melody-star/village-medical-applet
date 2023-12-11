<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="header">
		<title name="健康档案" color="#fff" :ceng="ceng"></title>

		<view class="hander_info">
			<view>
				<image :src="userInfo.avatar" class="avg"></image>
			</view>
			<view class="hander_info_right">
				<text>{{userInfo.username}}</text>
				<text>未知</text>
			</view>
		</view>

		<view class="health_info">
			<view class="base">
				<view class="base_box">
					<view class="base_title">基础信息</view>
					<view @click="change1111" class="base_xiugai">修改</view>
				</view>
				<view class="base_content">
					<view class="base_content_box">
						<view class="base_content_title">过往病史：</view>
						<view class="base_content_value">{{record.pastMedicalHistory}}</view>
					</view>
					<view class="base_content_box">
						<view class="base_content_title">家族病史：</view>
						<view class="base_content_value">{{record.familyMedicalHistory}}</view>
					</view>
					<view class="base_content_box">
						<view class="base_content_title">过敏史：</view>
						<view class="base_content_value">{{record.allergyHistory}}</view>
					</view>
					<view class="base_content_box">
						<view class="base_content_title">肝功能：</view>
						<view class="base_content_value">{{record.liverFunction}}</view>
					</view>
					<view class="base_content_box">
						<view class="base_content_title">肾功能：</view>
						<view class="base_content_value">{{record.kidneyFunction}}</view>
					</view>
					<view class="base_content_box">
						<view class="base_content_title">特殊人群：</view>
						<view class="base_content_value">{{record.specialPopulation}}</view>
					</view>
				</view>
			</view>

			<view class="data">
				<view class="base_box">
					<view class="base_title">健康数据</view>
				</view>

				<view class="data_content flex-row">
					<view>
						<view style="display: flex;">
							<view class="data_title">身高体重</view>
							<image class="data_icon"
								src="https://s3-us-east-1.ossfiles.com/demoas/%E7%94%BB%E6%9D%BF%201%20%283%29.png">
							</image>
						</view>
						<view class="flex-row" style="margin-top: 10px;">
							<view class="flex-col" style="align-items: center;">
								<text style="font-size: 30rem;">178</text>
								<text style="color: #A6A6A6;font-size: 18rem;margin-top: 5px;">身高/cm</text>
							</view>
							<view class="flex-col" style="margin-left: 67rpx;align-items: center;">
								<text style="font-size: 30rem;">65</text>
								<text style="color: #A6A6A6;font-size: 18rem;margin-top: 5px;">体重/kg</text>
							</view>
						</view>
					</view>
					<view>
						<view class="btn_jilu">记录</view>
					</view>
				</view>

				<view class="data_content flex-row">
					<view>
						<view style="display: flex;">
							<view class="data_title">血压</view>
							<image class="data_icon"
								src="https://s3-us-east-1.ossfiles.com/demoas/%E7%94%BB%E6%9D%BF%201%402x.png">
							</image>
						</view>
						<view class="flex-row" style="margin-top: 10px;">
							<view class="flex-col" style="align-items: center;">
								<text style="font-size: 30rem;">138</text>
								<text style="color: #A6A6A6;font-size: 18rem;margin-top: 5px;">收缩压/mmHg</text>
							</view>
							<view class="flex-col" style="margin-left: 67rpx;align-items: center;">
								<text style="font-size: 30rem;">65</text>
								<text style="color: #A6A6A6;font-size: 18rem;margin-top: 5px;">舒张压/mmHg</text>
							</view>
						</view>
					</view>
					<view>
						<view class="btn_jilu">记录</view>
					</view>
				</view>

				<view class="data_content flex-row">
					<view>
						<view style="display: flex;">
							<view class="data_title">心率</view>
							<image class="data_icon"
								src="https://s3-us-east-1.ossfiles.com/demoas/%E7%94%BB%E6%9D%BF%201%402x%20%281%29.png">
							</image>
						</view>
						<view class="flex-row" style="margin-top: 10px;">
							<view class="flex-col" style="align-items: center;">
								<text style="font-size: 30rem;">87</text>
								<text style="color: #A6A6A6;font-size: 18rem;margin-top: 5px;">心率/bpm</text>
							</view>
						</view>
					</view>
					<view>
						<view class="btn_jilu">记录</view>
					</view>
				</view>
			</view>
			<view>
			</view>
		</view>

		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="返回" confirmText="确定" title="提示" content="您还未添加健康信息是否现在去添加？"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	import sizeUtil from '@/utils/sizeUtil.js'

	import {
		getHealthRecordByUserId
	} from "@/api/api.js"

	export default {
		extends: sizeUtil,
		data() {
			return {
				guowang: "无",
				bingshi: "无",
				guomin: "无",
				gan: "无",
				sheng: "无",
				teshu: "无",

				ceng: 3,

				userinfo: {},
				show: 1,

				userInfo: {},
				record: {}
				// data: [{
				// 	title: "身高体重"

				// }, {
				// 	title: "血压"
				// }]
			}
		},
		onLoad() {
			const userInfo = uni.getStorageSync('userinfo')
			this.userInfo = userInfo
			this.initData()
		},
		methods: {
			initData() {
				getHealthRecordByUserId(this.userInfo.user_id).then((res) => {
					if (res.data == null) {
						this.$refs.alertDialog.open()
					} else {
						this.record = res.data
					}
				})
			},
			dialogConfirm() {
				uni.navigateTo({
					url: '/pages/index/recordDetail/recordDetail'
				})
			},
			dialogClose() {
				uni.navigateBack({
					delta: 1
				});
			},
			change(item) {
				this.show = item
			},
			change1111() {
				uni.navigateTo({
					url: "/pages/index/recordDetail/recordDetail"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.header {
		background-image: url('https://s3-us-east-1.ossfiles.com/demoas/%E7%94%BB%E6%9D%BF%201.png');
		background-size: 750rpx 453rpx;
		height: 330rpx;
	}

	.hander_info {
		margin-top: 40rpx;
		margin-left: 52rpx;
		display: flex;
	}

	.avg {
		border-radius: 9999px;
		height: 107rem;
		width: 107rem;
		border: 2px solid #fff;
	}

	.hander_info_right {
		margin-left: 35rpx;
		height: 107rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.hander_info_right text:first-child {
		color: #fff;
		font-size: 36rem;
		font-family: 'PingFang Regular';
	}

	.hander_info_right text:last-child {
		color: #fff;
		font-size: 18rem;
		margin-top: 3px;
		font-family: 'PingFang Regular';
	}

	.header_select {
		display: flex;
		align-items: flex-end;
		margin-left: 52rpx;
		margin-top: 25px;
	}

	.select {
		font-size: 30rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		margin-right: 33rpx;
	}

	.noselect {
		font-size: 24rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.6);
		margin-right: 33rpx;
	}

	.health_info {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.base {
		margin-top: 30px;
		width: 680rpx;
	}

	.base_box {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.base_title {
		font-size: 34rem;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
	}

	.base_xiugai {
		font-size: 24rem;
		font-weight: 400;
		color: rgba(75, 151, 248, 1)
	}

	.base_content {
		margin-top: 14px;
		width: 680rpx;
		background-color: #fff;
		padding-top: 5px;
		padding-left: 30rpx;
	}

	.base_content_title {
		font-size: 28rem;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		margin-bottom: 10px;
	}

	.base_content_box {
		display: flex;
	}

	.base_content_value {
		font-size: 28rem;
		font-weight: 400;
		color: rgba(128, 128, 128, 1);
		margin-bottom: 10px;
	}

	.data {
		margin-top: 20px;
		width: 680rpx;
	}

	.data_title {
		font-size: 28rem;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		margin-right: 35rpx;
	}

	.data_content {
		margin-top: 14px;
		width: 680rpx;
		background-color: #fff;
		padding-top: 14px;
		padding-left: 24rpx;
		padding-bottom: 14px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.data_icon {
		width: 36px;
		height: 18px;
	}

	.btn_jilu {
		border-radius: 99px;
		border: 2px solid rgba(75, 151, 248, 1);
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
		font-size: 24rem;
		color: rgba(75, 151, 248, 1);
		text-align: center;
		line-height: 16px;
		margin-right: 41rpx;
		padding: 3px 20rpx;
	}
</style>

<style>
	page {
		background-color: rgba(248, 249, 253, 1);

	}
</style>