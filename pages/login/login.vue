<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>

	<view class="box">
		<image src="../../static/logo.png" mode='aspectFit' class="logo"></image>
		<van-button type="info" :disabled="isButtonDisabled" @click="login" icon="wechat" block
			class="btn1">微信一键登录</van-button>
		<van-button type="default" block class="btn2" @click="navigateToLogin">账号密码登录</van-button>
		<view class="agree">
			<van-radio-group @change="isButtonDisabled = false">
				<van-radio name="1">我已阅读并同意<text style="color:#1989fa" @click="open">
						《隐私政策》
					</text></van-radio>
			</van-radio-group>
		</view>
	</view>
</template>

<script>
	import {
		wxLogin
	} from '../../api/api.js'

	import sizeUtil from '../../utils/sizeUtil'

	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	export default {
		extends: sizeUtil,
		data() {
			return {
				isButtonDisabled: true
			}
		},
		methods: {
			open() {
				wx.openPrivacyContract({
					success: () => {}, // 打开成功
					fail: () => {}, // 打开失败
					complete: () => {}
				})
			},
			login() {
				const _ = this
				wx.getUserProfile({
					desc: "用于展示用户信息",
					success: function(res) {
						wx.login({
							success(res1) {
								if (res1.code) {
									wxLogin({
										code: res1.code,
										userInfo: res.userInfo
									}).then((res) => {
										counter.token = res.data.authorization
										uni.setStorage({
											key: 'token',
											data: res.data.authorization
										})
										_.savaInfo(res.data.userInfo)
									})
								} else {
									console.log('登录失败！' + res.errMsg)
								}
							}
						})
					}
				})

			},
			navigateToLogin() {
				uni.navigateTo({
					url: '/pages/login/account-login'
				})
			},
			savaInfo(userInfo) {
				let that = this
				uni.setStorage({
					key: 'userinfo',
					data: userInfo,
					success: () => {
						if (userInfo.user_type == 1) {
							that.switchTab('/pages/info/info')
						} else if (userInfo.user_type == 0) {
							that.switchTab('/pages/index/index')
						}
					}
				})
			},
			switchTab(url) {
				uni.showToast({
					title: "登录成功",
					icon: 'success',
					success: () => {
						setTimeout(() => {
							uni.switchTab({
								url: url
							})
						}, 1500)
					}
				})
			},
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}

	.box {
		display: flex;
		flex-direction: column;
		align-items: center;

		.logo {
			height: 100px;
			margin-top: 180px;
		}

		.btn1 {
			width: 90%;
			margin-top: 60px;
		}

		.btn2 {
			width: 90%;
			margin-top: 20px;
		}

		.agree {
			font-size: 16px;
			margin-top: 20px;
		}
	}
</style>

<style>
	page {
		background-color: rgba(255, 255, 255, 1.0);
	}
</style>