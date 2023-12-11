<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view style="background-color: #4B97F8;padding-bottom: 21px;">
		<title name="服药提醒" color="#fff"></title>
	</view>

	<view v-if="list.length != 0" class="box" v-for="(item,i) in list" :key="i">
		<view>
			<text class="name">{{item.drug_name}}</text>
		</view>
		<view style="margin-top: 10px;">
			<text>提醒日期：每天</text>
		</view>
		<van-divider />
		<view class="box2">
			<view>
				<view>用药时间：</view>
				<view class="time">{{item.reminder_time}}</view>
			</view>
			<view style="color: red;" @click="delete1(item.reminder_id)">删除</view>
		</view>
	</view>

	<view v-else>
		<van-empty description="暂无记录" />
	</view>

	<image @click="add()" class="add" src="https://s3-us-east-1.ossfiles.com/demoas/%E5%88%86%E7%BB%84%201.png"></image>

</template>

<script>
	import sizeUtil from '../../../utils/sizeUtil'

	import {
		getMedicationReminderByUserId,
		deleteMedicationReminder
	} from "@/api/api.js"

	export default {
		extends: sizeUtil,
		data() {
			return {
				checked: false,
				list: []
			}
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData() {
				let info = uni.getStorageSync('userinfo')
				getMedicationReminderByUserId(info.user_id).then((res) => {
					this.list = res.data
				})
			},
			onClickLeft() {
				wx.showToast({
					title: '点击返回',
					icon: 'none'
				});
			},
			add() {
				uni.navigateTo({
					url: "/pages/my/adddrugremind/adddrugremind"
				})
			},
			onChange(e) {
				this.checked = !this.checked
				console.log(e);
			},
			delete1(id) {
				deleteMedicationReminder(id).then((res) => {
					if (res.status == 200) {
						uni.showToast({
							title: "删除成功",
							icon: "success"
						})
						this.initData()
					} else {
						uni.showToast({
							title: "删除失败",
							icon: "fail"
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}

	/deep/ .title-class {
		color: #fff !important;
	}

	.box {
		width: 680rpx;
		margin-left: 35rpx;
		background-color: white;
		border-radius: 5px;
		margin-top: 10px;
		padding: 10px 30rpx 15px 30rpx;
		font-size: 28rem;

		view:nth-child(1) {
			display: flex;
			justify-content: space-between;
			align-items: center;

			text {
				color: #4B97F8;
			}
		}

		.box2 {
			display: flex;
			color: #FDA632;
			align-items: center;
			justify-content: space-between;
		}

		.time {
			font-size: 28rem;
			width: 86rem;
			height: 42rem;
			border-radius: 5px;
			background-color: rgba(253, 166, 59, 0.2);
			text-align: center;
			line-height: 42rem;
			margin-right: 20rpx;
		}
	}

	.add {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		bottom: 100px;
		right: 10px;
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>