<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="header">
		<title name="个人信息" color="#fff"></title>
	</view>

	<van-cell-group inset>
		<van-cell title="头像">
			<image :src="userInfo.avatar" slot="" @click="chooseImage()"></image>
		</van-cell>
		<van-cell @click="open" title="昵称" :value="name" />
	</van-cell-group>

	<view style="margin-top: 10px;">
		<van-cell-group inset>
			<van-cell @click="open1" title="手机号" :value="phone" />
		</van-cell-group>
	</view>

	<view class="btn" @click="add">提交</view>

	<uni-popup ref="popup" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="输入昵称" placeholder="请输入新的用户名"
			@confirm="changeNickName"></uni-popup-dialog>
	</uni-popup>

	<uni-popup ref="popup1" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="输入手机号" placeholder="请输入新的手机号"
			@confirm="changePhone"></uni-popup-dialog>
	</uni-popup>
</template>

<script>
	import {
		changeUserInfo
	} from '@/api/api.js'

	import {
		filterParams
	} from '@/utils/utils.js'

	import sizeUtil from '../../../utils/sizeUtil'
	export default {
		extends: sizeUtil,
		data() {
			return {
				userInfo: {},
				name: "",
				phone: "",
				avatar: "",
			}
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					that.userInfo = res.data
					that.name = that.userInfo.username
					that.phone = that.userInfo.phone
				}
			})
		},
		methods: {
			open() {
				this.$refs.popup.open('center')
			},
			open1() {
				this.$refs.popup1.open('center')
			},
			changeNickName(value) {
				this.name = value
			},
			changePhone(value) {
				this.phone = value
			},
			add() {
				const that = this
				console.log(this.name);
				console.log(this.phone);
				console.log(this.avatar);

				changeUserInfo({
					accountId: this.userInfo.accountId,
					patientName: this.name,
					patientPhone: this.phone,
					patientAvatar: this.avatar
				}).then((res) => {
					if (res.message = "成功") {
						uni.showToast({
							title: "修改成功",
							icon: 'success'
						})

						that.userInfo.patientName = that.name
						that.userInfo.patientPhone = that.phone
						if (that.avatar != "") {
							that.userInfo.patientAvatar = that.avatar
						}

						uni.setStorage({
							key: 'userinfo',
							data: that.userInfo
						})

					} else {
						uni.showToast({
							title: "修改失败",
							icon: 'error'
						})
					}
				})
			},
			chooseImage() {
				const that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						uni.showLoading({
							title: '上传中'
						})

						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'https://medical.sjrksxx.top/sms/system/scwj', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								"Content-Type": "multipart/form-data"
							},
							success: (uploadFileRes) => {
								const url = JSON.parse(uploadFileRes.data).data.url

								that.avatar = url

								uni.getStorage({
									key: 'userinfo',
									success: (data) => {
										let obj = {
											patientAvatar: url
										}
										let newUserInfo = Object.assign(data.data,
											obj)

										that.userInfo = newUserInfo

										uni.setStorage({
											key: 'userinfo',
											data: newUserInfo
										})
									}
								})

								uni.hideLoading()
								uni.showToast({
									title: '上传成功',
									icon: 'success'
								});
							},
							fail: (err) => {
								uni.hideLoading()
								uni.showToast({
									title: '上传失败',
									icon: 'error'
								})
							}
						});
					}
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.header {
		background-color: #4b97f8;
		padding-bottom: 20px;
		margin-bottom: 10px;

	}

	image {
		width: 64px;
		height: 64px;
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