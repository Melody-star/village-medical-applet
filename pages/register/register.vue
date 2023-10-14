<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<view class="box1">
			<text>注册账户</text>
			<view>
				<text>已经有账户了？</text>
				<text @click="toLogin()">去登录</text>
			</view>
		</view>
		<view class="box2">
			<view>
				<text>用户名</text>
				<input @input="inputUserName" placeholder="请输入用户名" />
			</view>
			<view>
				<text>密码</text>
				<input type="password" @input="inputPassWord" placeholder="请输入密码" />
			</view>
			<view>
				<text>确认密码</text>
				<input type="password" @input="inputPassWord2" placeholder="请再次输入密码" />
			</view>
		</view>
		<view class="box3" @click="register()">
			<view>注册</view>
		</view>
	</view>
</template>

<script>
	import {
		addRegister
	} from '@/api/api.js'

	import sizeUtil from '@/utils/sizeUtil.js'

	export default {
		extends: sizeUtil,
		data() {
			return {
				username: null,
				password: null,
				password2: null
			}
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			register() {
				if (!this.username || !this.password) {
					this.showAlert("请输入用户名和密码")
					return
				}

				if (this.password != this.password2) {
					this.showAlert("两次输入的密码不一致")
					return
				}

				addRegister({
					accountName: this.username,
					accountPassword: this.password,
					accountUsertype: 2,
					openId: "string"
				}).then((res) => {
					console.log(res);
					if (res.code == 200) {
						uni.showToast({
							title: "注册成功",
							icon: 'success',
							success: () => {
								setTimeout(function() {
									uni.redirectTo({
										url: '/pages/login/login'
									});
								}, 500)
							}
						})
					} else {
						uni.showToast({
							title: "注册失败",
							icon: 'error',
						})
					}
				})
			},
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

			inputPassWord2(event) {
				this.password2 = event.detail.value
			}
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
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
		color: #000000;
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
			color: #000000;
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
</style>

<style>
	page {
		background-color: rgba(255, 255, 255, 1.0);
	}
</style>