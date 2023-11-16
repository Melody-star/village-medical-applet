<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="box1">
		<text>欢迎使用乡村e疗</text>
		<view>
			<text>没有账户？</text>
			<text @click="toRegister()">去注册</text>
		</view>
	</view>
	<view class="box2">
		<view>
			<text>用户名</text>
			<input @input="inputUserName" value="张涛" placeholder="请输入您的用户名" />
			<!-- <input @input="inputUserName" placeholder="请输入您的用户名" /> -->
		</view>
		<view>
			<text>密码</text>
			<input type="password" value="123456" @input="inputPassWord" placeholder="请输入您的密码" />
			<!-- <input type="password" @input="inputPassWord" placeholder="请输入您的密码" /> -->
		</view>
		<view style="margin-left: 40rpx;">
			<radio-group @change="radioChange">
				<label>
					<radio color="rgba(33, 122, 255, 1)" value="1">医生</radio>
				</label>
				<label style="margin-left: 40rpx;">
					<radio color="rgba(33, 122, 255, 1)" value="2" :checked="true">患者</radio>
				</label>
			</radio-group>
		</view>
		<!-- 		<view style="margin-top: 40px;">
			<text>忘记密码</text>
		</view> -->
	</view>
	<view class="box3" @click="login">
		<view>登录</view>
	</view>
	<navigator url="/pages/login/login" class="toaa">一键登录</navigator>
</template>

<script>
	import {
		Login,
		// getUserInfo,
		// changeUserInfo,
		setOpenIdByUserId
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
				username: "123",
				password: "123",
				// username: "",
				// password: "",
				radio: 2, //1医生，2患者
				openId: ""
			}
		},
		methods: {
			// 切换用户类型
			radioChange(event) {
				this.radio = +event.detail.value
			},

			// 跳转
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

			// 登录事件
			login() {
				const that = this

				if (!this.username || !this.password || this.radio === 3) {
					this.showAlert("请输入用户名和密码并选择用户类型")
					return
				}

				uni.login({
					success: (res) => {
						uni.request({
							url: 'https://api.weixin.qq.com/sns/jscode2session',
							method: "GET",
							data: {
								appid: "wxa9960a74471f1524",
								secret: "2e2305791eea7c8933f5b08d08bc45b4",
								js_code: res.code,
								grant_type: "authorization_code"
							},
							success(res1) {
								Login({
									password: that.password,
									account: that.username,
									// userType: this.radio,
									// code: code
								}).then((res2) => {
									if (res2.status === 200) {
										counter.token = res2.data.authorization
										uni.setStorage({
											key: 'token',
											data: res2.data.authorization,
										});
										that.saveInfo(res2.data.userInfo)
										// return getUserInfo()
										that.changeOpenId(res2.data.userInfo.user_id, res1.data
											.openid)
									} else {
										that.showAlert("登录失败！")
									}
								})
							}
						})
					}
				})
			},

			// 设置openId
			changeOpenId(userId, openId) {
				setOpenIdByUserId({
					userId: userId,
					openId: openId,
				}).then((res) => {
					console.log(res);
				})
			},

			// 保存用户信息并跳转到首页
			saveInfo(userInfo) {
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

			// 显示提示框
			showAlert(title) {
				uni.showToast({
					title: title,
					icon: 'none'
				})
			},

			// 输入用户名
			inputUserName(event) {
				this.username = event.detail.value
			},

			// 输入密码
			inputPassWord(event) {
				this.password = event.detail.value
			},

			// 跳转到注册页面
			toRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}

	label {
		color: black;
		font-size: 28rem;
	}

	input {
		margin-top: 10px;
		height: 48px;
		width: 670rpx;
		background-color: rgba(196, 196, 196, 0.21);
		border-radius: 99px;
		font-size: 24rem;
		margin-left: 20rpx;
		padding-left: 37rpx;
	}

	.box1 {
		margin-top: 133px;
		margin-left: 40rpx;

		&>text {
			font-size: 50rem;
			color: rgba(33, 122, 255, 1);
			font-weight: 700;
		}

		view {
			font-size: 28rem;
			margin-top: 5px;


			text:first-child {
				color: rgba(196, 196, 196, 1);
			}

			text:last-child {
				color: rgba(33, 122, 255, 1);
			}
		}
	}

	.box2 {
		margin-top: 51px;

		text {
			font-size: 28rem;
			margin-left: 40rpx;

		}

		view:nth-child(2) {
			margin-top: 26px;
		}

		view:nth-child(3) {
			font-size: 24rem;
			color: rgba(196, 196, 196, 1);
			margin-top: 16px;
		}
	}

	.box3 {
		margin-top: 60px;
		display: flex;
		justify-content: center;

		view {
			width: 670rpx;
			height: 49px;
			border-radius: 134px;
			background: rgba(33, 122, 255, 1);
			box-shadow: 0px 13px 21px -16px rgba(33, 122, 255, 0.52);
			font-size: 36rem;
			color: #fff;
			text-align: center;
			line-height: 49px;
		}
	}

	.toaa {
		font-size: 14px;
		margin-left: 310rpx;
		color: rgba(33, 122, 255, 1);
		margin-top: 10px;
	}

	.toaa:hover {
		background-color: #fff;
	}
</style>

<style>
	page {
		background-color: rgba(255, 255, 255, 1.0);
	}
</style>