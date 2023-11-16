<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view style="position: relative;">
		<view class="hander">
			<view class="title" :style='"padding-top:" + top + "px;"'>个人信息</view>
			<view class="hander_info">
				<view>
					<image :src="userinfo.avatar"></image>
				</view>
				<view class="hander_info_right">
					<text>{{userinfo.username}}</text>
					<text>{{userinfo.phone}}</text>
				</view>
			</view>
		</view>

		<view class="middle_box">
			<van-grid :border="false">
				<van-grid-item use-slot @click="goTo('/pages/my/myregister/myregister')">
					<image style="height: 68rem;width: 68rem;" src="../../static/my-guahao.png"></image>
					<text>我的挂号</text>
				</van-grid-item>
				<van-grid-item use-slot @click="goTo('/pages/my/mypresciption/mypresciption')">
					<image style="width: 78rem;height: 68rem;" src="../../static/my-wen.png"></image>
					<text>我的处方</text>
				</van-grid-item>
				<van-grid-item use-slot @click="goTo('/pages/my/addinfo/addinfo')">
					<image style="width: 78rem;height: 68rem;" src="../../static/my-dangan.png"></image>
					<text>就诊信息</text>
				</van-grid-item>
				<van-grid-item use-slot @click="goTo('/pages/my/drugremind/drugremind')">
					<image style="width: 78rem;height: 68rem;" src="../../static/my-tixin.png"></image>
					<text>用药提醒</text>
				</van-grid-item>
			</van-grid>
		</view>

		<view class="footer">
			<view @click="goTo('/pages/my/chageUserInfo/chageUserInfo')">
				<image src="../../static/xiugia.png"></image>
				<text>修改信息</text>
			</view>
			<view @click="show = true">
				<image src="https://s3-us-east-1.ossfiles.com/demoas/ziti.png"></image>
				<text>字体大小设置</text>
			</view>
			<view style="display: flex;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<image src="https://s3-us-east-1.ossfiles.com/demoas/yuyinmy.png"></image>
					<text>语音播放开关</text>
				</view>
				<van-switch :checked="checked" @change="changeVoice" size="22px"
					style="margin-top: 15px;margin-right: 32rpx;" />
			</view>
		</view>

		<view class="footer" style="margin-top: 10px;">
			<view>
				<image src="https://s3-us-east-1.ossfiles.com/demoas/kefu.png"></image>
				<button open-type="contact">在线客服</button>
			</view>
			<view>
				<image src="https://s3-us-east-1.ossfiles.com/demoas/fankui.png"></image>
				<button open-type="feedback">用户反馈</button>
			</view>
			<view @click="goTo('/pages/my/help/help')">
				<image src="https://s3-us-east-1.ossfiles.com/demoas/bangzhu.png"></image>
				<text>帮助中心</text>
			</view>
		</view>

		<view class="tuichu" @click="logOut">退出登录</view>

		<my-tabbar></my-tabbar>
	</view>

	<van-dialog use-slot title="请滑动选择字体大小" :show="show" show-cancel-button confirm-button-open-type="getUserInfo"
		@close="onClose" @getuserinfo="getUserInfo">
		<view style="margin: 70px 20px;">
			<van-slider @change="onChange" min="-10" max="30" step="10" />
		</view>
	</van-dialog>
</template>

<script>
	import GoEasy, {
		User
	} from 'goeasy';

	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	import sizeUtil from '../../utils/sizeUtil';

	export default {
		extends: sizeUtil,
		data() {
			return {
				show: false,
				sliderValue: 0,
				checked: false,
				userinfo: {},
				top: 0
			};
		},
		onShow() {
			const userinfo = uni.getStorageSync('userinfo');
			if (userinfo) {
				this.userinfo = userinfo
			}
		},
		created() {
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.top = menuButtonInfo.top + ((menuButtonInfo.height - 20) / 2)
		},
		methods: {
			logOut() {
				if (this.goEasy.getConnectionStatus() != 'disconnected') {
					//断开连接
					this.goEasy.disconnect({
						onSuccess: function() {
							console.log("断开连接成功！")
						},
						onFailed: function(error) {
							console.log("断开连接失败, code:" + error.code + ",error:" + error
								.content);
						}
					});
				}

				uni.clearStorage();
				uni.showToast({
					title: "退出登录成功",
					icon: 'success',
					success: function() {
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}, 1000)
					}
				})
			},
			goTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			changeVoice(e) {
				this.checked = e.detail
				counter.voice = e.detail

				console.log(counter.voice);
			},
			onChange(value) {
				this.sliderValue = value.detail
			},
			onClose() {
				this.show = false
				if (this.sliderValue == -10) {
					this.setRootFont('0.4px')
				} else if (this.sliderValue == 10) {
					this.setRootFont('0.6px')
				} else if (this.sliderValue == 20) {
					this.setRootFont('0.7px')
				} else if (this.sliderValue == 30) {
					this.setRootFont('0.8px')
				} else if (this.sliderValue == 0) {
					this.setRootFont('0.5px')
				}
			},
			setRootFont(value) {
				uni.setStorage({
					key: 'root_font_size',
					data: value,
					success: function() {
						uni.showToast({
							title: "请重新进入小程序！",
							icon: 'none'
						})
					}
				});
			},
			getUserInfo() {

			}
		}
	}
</script>

<style scoped lang="less">
	.title {
		font-size: 30rem;
		text-align: center;
		width: 100%;
		font-family: 'PingFang Bold';
		color: #fff;
	}

	button {
		background-color: #fff;
		margin: 0px;
		padding: 0px;
		font-size: 28rem;
		margin-left: 35rpx;
		padding-top: 20px;
		line-height: 1;

		&::after {
			border: none;
		}
	}

	.hander {
		background-image: url('https://s3-us-east-1.ossfiles.com/demoas/bgimg.png');
		width: 100%;
		height: 404rem;

		&_info {
			margin-top: 40rpx;
			margin-left: 94rpx;
			display: flex;

			image {
				border-radius: 9999px;
				height: 107rem;
				width: 107rem;
				border: 2px solid #fff;
			}

			&_right {
				margin-left: 35rpx;
				height: 107rem;
				display: flex;
				flex-direction: column;
				justify-content: center;

				text:first-child {
					color: #fff;
					font-size: 36rem;
					font-family: 'PingFang Regular';
				}

				text:last-child {
					color: #fff;
					font-size: 18rem;
					margin-top: 3px;
					font-family: 'PingFang Regular';
				}
			}
		}
	}

	.middle_box {
		position: absolute;
		width: 680rpx;
		border-radius: 8.5px;
		overflow: hidden;
		top: 325rem;
		margin-left: 35rpx;

		text {
			font-size: 24rem;
			font-family: 'PingFang Medium';
			margin-top: 5px;
		}
	}

	.footer {
		width: 680rpx;
		background-color: #fff;
		margin-top: 114rem;
		margin-left: 35rpx;
		border-radius: 8.5px;

		>view {
			padding-bottom: 13.5px;
			border-bottom: 1px solid rgba(166, 166, 166, 1);
			display: flex;
			margin: 0px 10rpx;

			&:last-child {
				border: 0px;
			}

		}

		image {
			width: 23px;
			height: 23px;
			margin-left: 26rpx;
			margin-top: 16.5px;
		}

		text {
			font-size: 28rem;
			font-family: 'PingFang Medium';
			margin-left: 35rpx;
			margin-top: 18px;
		}
	}

	.tuichu {
		width: 680rpx;
		background-color: #fff;
		font-size: 28rem;
		text-align: center;
		padding: 7.5px 0px;
		border-radius: 8.5px;
		margin: 100rem 0px 20px 35rpx;
		color: rgba(255, 87, 51, 1);
	}
</style>

<style>
	page {
		background-color: #F5F5F5;
	}
</style>