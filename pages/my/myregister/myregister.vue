<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="header">
		<title name="我的挂号" color="#fff"></title>
	</view>
	<view class="box" v-for="(item,i) in list" :key="i">
		<image class="icon" src="https://s3-us-east-1.ossfiles.com/demoas/%E5%88%86%E7%BB%84%204.png"></image>
		<view class="doctor">{{userName}}</view>
		<view class="department">
			<!-- <image src="https://s3-us-east-1.ossfiles.com/demoas/%E9%83%A8%E9%97%A8.png"></image> -->
			<text>医院：{{item.hospitalName}}</text>
		</view>
		<view class="time">
			<!-- <image src="https://s3-us-east-1.ossfiles.com/demoas/%E6%97%B6%E9%97%B4%E6%88%B3.png"></image> -->
			<text>科室：{{item.departmentPosition}}</text>
		</view>
		<view class="time">
			<!-- <image src="https://s3-us-east-1.ossfiles.com/demoas/%E6%97%B6%E9%97%B4%E6%88%B3.png"></image> -->
			<text>时间：{{item.visitTime}}</text>
		</view>
	</view>
</template>

<script>
	import {
		getGuahao
	} from "@/api/api.js"

	import sizeUtil from '@/utils/sizeUtil.js'

	export default {
		extends: sizeUtil,
		data() {
			return {
				list: [{
						doctor: "张三",
						department: "内科",
						time: "2022-11-11 13:00"
					},
					{
						doctor: "张三",
						department: "内科",
						time: "2022-11-11 13:00"
					}
				],
				userName: ""
			}
		},
		onLoad() {
			const that = this

			uni.getStorage({
				key: 'userinfo',
				success(userinfo) {
					that.userName = userinfo.data.patientName

					getGuahao(userinfo.data.accountId).then((res) => {
						that.list = res.data
					})
				}
			})
		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
	.icon {
		width: 64px;
		height: 64px;
		position: absolute;
		right: 16px;
		top: 10px;
	}

	.header {
		background-color: #4b97f8;
		padding-bottom: 20px;
	}

	.box {
		position: relative;
		background-color: white;
		margin: 10px 20px 0px 20px;
		padding: 10px 10px 10px 10px;
		border-radius: 5px;

		.doctor {
			font-size: 30rem;
			font-weight: 600;
		}

		.department {
			font-size: 28rem;
			display: flex;
			flex-direction: row;
			align-items: center;
			color: #808080;
			margin-top: 5px;

			image {
				width: 16px;
				height: 16px;
				margin-right: 10rpx;
			}
		}

		.time {
			margin-top: 5px;
			font-size: 28rem;
			color: #808080;
			display: flex;
			flex-direction: row;
			align-items: center;

			image {
				width: 16px;
				height: 16px;
				margin-right: 10rpx;
			}
		}
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>