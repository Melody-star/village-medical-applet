<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view style="position: relative;">
		<view class="box">
			<title name="确认挂号信息" color="#fff"></title>
		</view>

		<view class="list">
			<image style="border-radius: 99px;width: 97rpx;height: 97rpx;margin-left: 25rpx;"
				:src="info.doctorAvatar" />
			<view style="display: flex;flex-direction: column;margin-left: 40rpx;">
				<text style="font-size: 30rem;">{{info.doctorName}}</text>
				<text style="font-size: 18rem;">{{info.doctorTitle}}</text>
				<text style="font-size: 18rem;color: #808080;width: 510rpx;">擅长：{{info.doctorIntroduction}}</text>
			</view>
		</view>

		<view class="box2">
			<view style="display: flex;font-size: 28rem;justify-content: space-between">
				<text>医院名称</text>
				<text style="color: rgba(128, 128, 128, 1);">{{info.hospitalName}}</text>
			</view>

			<van-divider />

			<view style="display: flex;font-size: 28rem;justify-content: space-between">
				<text>科室位置</text>
				<text style="color: rgba(128, 128, 128, 1);">{{info.departmentPlace}}</text>
			</view>

			<van-divider />

			<view style="display: flex;justify-content: space-between;">
				<text style="font-size: 28rem;">预约时间</text>
				<view class="example-body">
					<picker mode="time" :value="time" start="09:00" end="17:00" @change="onChange"
						style="font-size: 28rem;">
						<view style="font-size: 28rem;">{{time}}
						</view>
					</picker>
				</view>
			</view>
		</view>

		<view class="box2" style="margin-top: 10px;">
			<view style="display: flex;font-size: 28rem;justify-content: space-between">
				<text>就诊人</text>
				<text style="color: rgba(128, 128, 128, 1);">{{guahaoInfo.medicalName}}</text>
			</view>

			<van-divider />

			<view style="display: flex;font-size: 28rem;justify-content: space-between">
				<text>就诊卡</text>
				<text style="color: rgba(128, 128, 128, 1);">3242123</text>
			</view>

			<van-divider />

			<view style="display: flex;font-size: 28rem;justify-content: space-between">
				<text>身份证</text>
				<text style="color: rgba(128, 128, 128, 1);">{{guahaoInfo.medicalIdcard}}</text>
			</view>

			<van-divider />

			<view style="display: flex;font-size: 28rem;justify-content: space-between">
				<text>挂号费</text>
				<text style="color: rgba(128, 128, 128, 1);">10元</text>
			</view>
		</view>
	</view>

	<view class="btn" @click="add">预约</view>

	<!-- <van-dialog id="van-dialog" /> -->
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog :type="msgType" cancelText="返回" confirmText="确定" title="提示" content="您还未添加挂号信息是否现在去添加？"
			@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
	</uni-popup>
</template>

<script>
	// import Dialog from "@/wxcomponents/@vant/weapp/dialog/dialog.js"

	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	import {
		addGuahao,
		getMedicalInfo
	} from '@/api/api.js'

	import sizeUtil from '@/utils/sizeUtil.js'
	export default {
		extends: sizeUtil,
		data() {
			return {
				info: {},
				userInfo: {},
				time: '请选择预约时间',
				doctorAvatar: "",
				guahaoInfo: {},
				msgType: 'success',
			}
		},
		onShow(option) {
			const that = this

			this.info = counter.registerInfo
			uni.getStorage({
				key: 'userinfo',
				success: (e) => {
					that.userInfo = e.data

					getMedicalInfo(that.userInfo.accountId).then((res) => {
						if (res.data == null) {
							this.msgType = "info"
							this.$refs.alertDialog.open()
						} else {
							that.guahaoInfo = res.data
							console.log(that.guahaoInfo);
						}
					})
				}
			})
		},
		methods: {
			dialogConfirm() {
				uni.navigateTo({
					url: '/pages/my/addinfo/addinfo'
				})
			},
			dialogClose() {
				uni.navigateBack({
					delta: 1
				});
			},
			add() {
				if (this.time == '请选择预约时间') {
					uni.showToast({
						title: "请选择预约时间",
						icon: 'none'
					})
					return
				}

				const that = this

				uni.requestSubscribeMessage({
					tmplIds: ['NsWDcXJNVaJ8U2UxYZCuzFpJkurt61434lAtLg-bFRk'],
					success(res) {
						addGuahao({
							accountId: that.userInfo.accountId,
							hospitalName: that.info.hospitalName,
							departmentPosition: that.info.departmentPlace,
							visitTime: that.time,
							doctorId: that.info.accountId
						}).then((res) => {
							if (res.message == '成功') {

								counter.registerInfo['time'] = that.time
								counter.registerInfo['name'] = that.guahaoInfo.medicalName

								uni.showToast({
									title: '预约成功',
									icon: 'success',
									success() {
										uni.navigateTo({
											url: '/page_register/success/success'
										})
									}
								})
							} else {
								uni.showToast({
									title: '预约失败',
									icon: 'error'
								})
							}
						})
					}
				})
			},
			onChange(e) {
				this.time = e.detail.value
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
		background-color: #4B97F8;
		height: 275rem;
	}

	.list {
		display: flex;
		align-items: center;
		margin-top: 20px;
		background-color: #fff;
		border-radius: 5px;
		position: absolute;
		top: 80px;
		margin-left: 35rpx;
		padding-top: 14px;
		padding-bottom: 14px;
		width: 680rpx;
	}

	.box2 {
		width: 677rpx;
		background-color: #fff;
		margin-top: 55px;
		margin-left: 35rpx;
		border-radius: 5px;
		padding: 14px;
	}

	.btn {
		width: 587rpx;
		height: 34.5px;
		background-color: rgba(75, 151, 248, 1);
		margin-left: 82rpx;
		border-radius: 5px;
		color: #fff;
		font-size: 28rem;
		text-align: center;
		line-height: 34.5px;
		position: absolute;
		bottom: 30px;
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>