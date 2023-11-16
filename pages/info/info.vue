<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<view style="background-color: white;padding-bottom: 20px;">
			<view @click="read($event)" data-val="信息列表" class="title" :style='"padding-top:" + top + "px;"'>信息列表</view>
		</view>

		<van-divider customStyle="margin:0px;" />

		<uni-badge :text="unreadTotal" absolute="rightTop" size="normal" :offset="[20, 47]"
			v-if="conversations.length != 0" v-for="(item,i) in conversations" :key="i">
			<view class="box" @click="chat(item)">
				<image :src="item.data.avatar"></image>
				<view style="display: flex;flex-direction: column;margin-top: 17px;margin-left: 20rpx;">
					<text @click="read($event)" :data-val="item.data.name"
						style="font-size: 28rem;">{{item.data.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.data.zhichen}}</text>
					<text @click="read($event)" :data-val="item.lastMessage.payload.text"
						v-if="item.lastMessage.payload.text"
						style="font-size: 24rem;color: rgba(128, 128, 128, 1);margin-top: 3px;">{{item.lastMessage.payload.text}}</text>
					<text @click="read($event)" :data-val="item.lastMessage.payload.text" v-else
						style="font-size: 24rem;color: rgba(128, 128, 128, 1);margin-top: 3px;">[其他消息]</text>
				</view>
			</view>
		</uni-badge>

		<view v-else>
			<van-empty description="暂无消息" />
		</view>

		<my-tabbar></my-tabbar>
	</view>
</template>

<script>
	import sizeUtil from '../../utils/sizeUtil';
	import GoEasy, {
		User
	} from 'goeasy';

	import {
		textToSpeech
	} from "@/utils/utils.js"

	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	export default {
		extends: sizeUtil,
		data() {
			return {
				unreadTotal: 0,
				conversations: [],
				top: 0,

				actionPopup: {
					conversation: null,
					visible: false
				},
				userInfo: {},
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userinfo');

			if (this.goEasy.getConnectionStatus() === 'disconnected') {
				this.connectGoEasy(); //连接goeasy
			}
			this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations); //监听会话列表变化
			this.loadConversations(); //加载会话列表
		},
		beforeDestroy() {
			this.goEasy.im.off(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
		},
		created() {
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.top = menuButtonInfo.top + ((menuButtonInfo.height - 20) / 2)
		},
		methods: {
			read(e) {
				if (counter.voice === true) {
					textToSpeech(e.currentTarget.dataset.val);
				}
			},
			chat(conversation) {
				uni.navigateTo({
					url: '/pages/info/privateChat?to=' + conversation.userId
				});
			},
			connectGoEasy() {
				let that = this
				uni.showLoading();

				this.goEasy.connect({

					// 用户id
					id: that.userInfo.user_id,

					// 用户信息
					data: {
						name: that.userInfo.username,
						avatar: that.userInfo.avatar
					},
					onSuccess: () => {
						console.log('GoEasy connect successfully. 用户Id为：' + that.userInfo.user_id)
					},
					onFailed: (error) => {
						console.log('Failed to connect GoEasy, code:' + error.code + ',error:' + error
							.content);
					},
					onProgress: (attempts) => {
						console.log('GoEasy is connecting', attempts);
					}
				});
			},

			// 加载最新的会话列表
			loadConversations() {
				this.goEasy.im.latestConversations({
					onSuccess: (result) => {
						uni.hideLoading();
						let content = result.content;
						this.renderConversations(content);
						let unreadTotal = content.unreadTotal;
						if (unreadTotal > 0) {
							this.unreadTotal = unreadTotal
						} else {
							this.unreadTotal = 0
						}
					},
					onFailed: (error) => {
						uni.hideLoading();
						console.log('获取最新会话列表失败, error:', error);
					}
				});
			},
			renderConversations(content) {
				this.conversations = content.conversations;
				console.log("会话列表", this.conversations);
			},
			topConversation() { //会话置顶
				this.actionPopup.visible = false;
				let conversation = this.actionPopup.conversation;
				let description = conversation.top ? '取消置顶' : '置顶';
				this.goEasy.im.topConversation({
					conversation: conversation,
					top: !conversation.top,
					onSuccess: function() {
						uni.showToast({
							title: description + '成功',
							icon: 'none'
						});
					},
					onFailed: function(error) {
						console.log(description, '失败：', error);
					}
				});
			},
			deleteConversation() {
				uni.showModal({
					content: '确认删除这条会话吗？',
					success: (res) => {
						if (res.confirm) {
							let conversation = this.actionPopup.conversation;
							this.actionPopup.visible = false;
							this.goEasy.im.removeConversation({
								conversation: conversation,
								onSuccess: function() {
									console.log('删除会话成功');
								},
								onFailed: function(error) {
									console.log(error);
								},
							});
						} else {
							this.actionPopup.visible = false;
						}
					},
				})
			},
			showAction(conversation) {
				this.actionPopup.conversation = conversation;
				this.actionPopup.visible = true;
			}
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}

	.title {
		font-size: 30rem;
		text-align: center;
		width: 100%;
		font-family: 'PingFang Bold';
	}

	.box {
		width: 680rpx;
		height: 142rem;
		background-color: white;
		border-radius: 5px;
		margin-left: 35rpx;
		margin-top: 10px;
		display: flex;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

		image {
			border-radius: 99px;
			width: 78rpx;
			height: 78rpx;
			margin-left: 30rpx;
			margin-top: 16px;
		}
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>