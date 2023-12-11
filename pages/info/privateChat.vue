<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="header">
		<title :name="friend.name"></title>
	</view>
	<view class="chatInterface" @contextmenu.prevent="">
		<view class="scroll-view">
			<image v-if="history.loading" class="history-loaded" src="../../static/loading.svg" />
			<view v-else :class="history.allLoaded ? 'history-loaded':'load'" @click="loadHistoryMessage(false)">
				<view>{{ history.allLoaded ? '已经没有更多的历史消息' : '点击获取历史消息' }}</view>
			</view>

			<checkbox-group @change="selectMessages">
				<!--消息记录-->
				<view v-for="(message,index) in history.messages" :key="message.messageId">
					<!--时间显示，类似于微信，隔5分钟不发言，才显示时间-->
					<view class="time-lag">
						{{ renderMessageDate(message, index) }}
					</view>

					<view class="message-recalled" v-if="message.recalled">
						<view v-if="message.senderId !== currentUser.id">{{ friend.name }}撤回了一条消息</view>
						<view v-else class="message-recalled-self">
							<view>你撤回了一条消息</view>
							<span v-if="message.type === 'text' && Date.now()-message.timestamp< 60 * 1000 "
								@click="editRecalledMessage(message.payload.text)">重新编辑</span>
						</view>
					</view>
					<view class="message-item" v-else>
						<view class="message-item-checkbox">
							<checkbox v-show="messageSelector.visible && message.status !== 'sending'"
								:value="message.messageId" :checked="messageSelector.messages.includes(message)" />
						</view>
						<view class="message-item-content" :class="{'self' : message.senderId ===  currentUser.id}">
							<view class="avatar">
								<image :src="message.senderId === currentUser.id? currentUser.avatar : friend.avatar">
								</image>
							</view>

							<view class="content" @longpress="showActionPopup(message)">
								<view
									:class="message.senderId === currentUser.id?'message-payload1': 'message-payload'">
									<!-- <view :class="userType == 1?'message-payload': 'message-payload1'"> -->
									<view v-if="message.type === 'text'" v-html="renderTextMessage(message)"
										@click="read($event)" :data-val="message.payload.text"></view>
									<image v-if="message.type === 'image'" :data-url="message.payload.url"
										:src="message.payload.url"
										:style="{height: getImageHeight(message.payload.width,message.payload.height)+'rpx' }"
										class="image-content" mode="heightFix" @click="showImageFullScreen"></image>
									<view class="video-snapshot" v-if="message.type === 'video'"
										:data-url="message.payload.video.url" @click="playVideo">
										<image :src="message.payload.thumbnail.url"
											:style="{height: getImageHeight(message.payload.thumbnail.width,message.payload.thumbnail.height)+'rpx' }"
											mode="heightFix"></image>
										<view class="video-play-icon"></view>
									</view>
									<view class="file-content" v-if="message.type === 'file'">
										<view class="file-info">
											<span class="file-name">{{ message.payload.name }}</span>
											<span
												class="file-size">{{ (message.payload.size / 1024).toFixed(2) }}KB</span>
										</view>
										<image class="file-img" src="/static/images/file-icon.png"></image>
									</view>
									<view v-if="message.type ==='audio'" class="audio-content"
										@click="playAudio(message)">
										<view class="audio-facade"
											:style="{width:Math.ceil(message.payload.duration)*7 + 50 + 'px'}">
											<view class="audio-facade-bg"
												:class="{'play-icon':audioPlayer.playingMessage && audioPlayer.playingMessage.messageId === message.messageId}">
											</view>
											<view>{{Math.ceil(message.payload.duration) || 1}}<span>"</span></view>
										</view>
									</view>
									<view v-if="message.type === 'prescription'">
										<view style="font-size: 24rem;color: #fff;">医师已为您开具处方，请点击查看，祝您早日康复！</view>
										<image :src="message.payload" mode="aspectFit"
											style="width: 484rpx;height: 351px;"></image>
									</view>
								</view>
								<view v-if="message.senderId === currentUser.id"
									:class="message.read ?'message-read':'message-unread'">
									<view v-if="message.status === 'success'">{{ message.read ? '已读' : '未读' }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>

		<view class="action-box" v-if="!videoPlayer.visible && !messageSelector.visible">
			<view class="action-top">
				<view @click="switchAudioKeyboard">
					<image class="more" v-if="audio.visible" src="../../static/jianpan.png"></image>
					<image class="more" v-else src="../../static/audio.png"></image>
				</view>
				<view v-if="audio.visible" class="record-input" @click="onRecordStart" @touchend.stop="onRecordEnd"
					@touchstart.stop="onRecordStart">
					{{ audio.recording ? '松开发送' : '按住录音' }}
				</view>
				<!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
				<input v-else v-model="text" @confirm="sendTextMessage" class="consult-input" maxlength="700"
					placeholder="发送消息" type="text" />
				<view @click="switchEmojiKeyboard">
					<image class="more" v-if="emoji.visible" src="../../static/jianpan.png"></image>
					<image class="more" v-else src="../../static/emoji.png"></image>
				</view>
				<view>
					<image @click="showOtherTypesMessagePanel()" class="more" src="../../static/more.png" />
				</view>
				<view v-if="text" class="send-btn-box">
					<text class="btn" @click="sendTextMessage()">发送</text>
				</view>
			</view>
			<!--展示表情列表-->
			<view class="action-bottom action-bottom-emoji" v-if="emoji.visible">
				<image class="emoji-item" v-for="(emojiItem, emojiKey, index) in emoji.map" :key="index"
					:src="emoji.url + emojiItem" @click="chooseEmoji(emojiKey)"></image>
			</view>

			<!--其他类型消息面板-->
			<view v-if="otherTypesMessagePanelVisible" class="action-bottom">
				<view class="more-icon">
					<image @click="sendImageMessage()" class="operation-icon" src="../../static/picture.png"></image>
					<view class="operation-title">图片</view>
				</view>
				<view class="more-icon">
					<image @click="sendVideoMessage()" class="operation-icon" src="../../static/video.png"></image>
					<view class="operation-title">视频</view>
				</view>
				<view class="more-icon" v-if="userType == 1">
					<image @click="goToPrescription()" class="operation-icon"
						src="https://s3-us-east-1.ossfiles.com/demoas/%E5%A4%84%E6%96%B9.png">
					</image>
					<view class="operation-title">处方</view>
				</view>
			</view>
		</view>

		<view class="action-popup" @touchmove.stop.prevent v-if="actionPopup.visible">
			<view class="layer"></view>
			<view class="action-list">
				<view class="action-item" @click="deleteSingleMessage">删除</view>
				<view class="action-item" v-if="actionPopup.recallable" @click="recallMessage">撤回</view>
				<view class="action-item" @click="showCheckBox">多选</view>
				<view class="action-item" @click="hideActionPopup">取消</view>
			</view>
		</view>

		<view class="messageSelector-box" v-if="messageSelector.visible">
			<image class="messageSelector-btn" @click="deleteMultipleMessages" src="/static/images/delete.png"></image>
		</view>
		<view class="record-loading" v-if="audio.recording"></view>
		<video v-if="videoPlayer.visible" :src="videoPlayer.url" id="videoPlayer"
			@fullscreenchange="onVideoFullScreenChange"></video>
	</view>
</template>

<script>
	import {
		textToSpeech
	} from "@/utils/utils.js"

	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	import {
		getUserInfoById
	} from '@/api/api.js'

	import EmojiDecoder from '../../lib/EmojiDecoder';
	import {
		formatDate
	} from '../../lib/utils';
	import sizeUtil from '../../utils/sizeUtil';

	const IMAGE_MAX_WIDTH = 200;
	const IMAGE_MAX_HEIGHT = 150;
	const recorderManager = uni.getRecorderManager();

	export default {
		extends: sizeUtil,
		data() {
			const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
			const emojiMap = {
				'[么么哒]': 'emoji_3@2x.png',
				'[乒乓]': 'emoji_4@2x.png',
				'[便便]': 'emoji_5@2x.png',
				'[信封]': 'emoji_6@2x.png',
				'[偷笑]': 'emoji_7@2x.png',
				'[傲慢]': 'emoji_8@2x.png'
			};
			return {
				//聊天文本框
				text: '',
				friend: {
					name: ""
				},
				to: {}, // 作为createMessage的参数
				currentUser: null,
				userType: null,

				//定义表情列表
				emoji: {
					url: emojiUrl,
					map: emojiMap,
					visible: false,
					decoder: new EmojiDecoder(emojiUrl, emojiMap),
				},
				//是否展示‘其他消息类型面板’
				otherTypesMessagePanelVisible: false,
				history: {
					messages: [],
					allLoaded: false,
					loading: false
				},
				audio: {
					startTime: null,
					//语音录音中
					recording: false,
					//录音按钮展示
					visible: false
				},
				audioPlayer: {
					playingMessage: null,
				},
				videoPlayer: {
					visible: false,
					url: '',
					context: null
				},
				// 展示消息删除弹出框
				actionPopup: {
					visible: false,
					message: null,
					recallable: false,
				},
				// 消息选择
				messageSelector: {
					visible: false,
					messages: []
				},
			}
		},
		onLoad(options) {
			let that = this

			uni.getStorage({
				key: 'userinfo',
				success(res) {
					that.userType = res.data.user_type
					console.log("that.userType", that.user_type);
					that.currentUser = {
						avatar: res.data.avatar,
						id: res.data.user_id.toString(),
						name: res.data.username,
						zhichen: res.data.title
					}

					console.log("发送人信息", that.currentUser);
				}
			})

			//聊天对象
			let id = options.to;
			getUserInfoById(id).then((res) => {
				this.friend = {
					id: res.data.user_id.toString(),
					name: res.data.username,
					avatar: res.data.avatar
				}

				console.log("接收人信息", this.friend);

				this.to = {
					id: this.friend.id,
					type: this.GoEasy.IM_SCENE.PRIVATE,
					data: {
						name: this.friend.name,
						avatar: this.friend.avatar,
						zhichen: this.currentUser.zhichen
					}
				};

				this.loadHistoryMessage(true);
				this.videoPlayer.context = uni.createVideoContext('videoPlayer', this);
				// https://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle
				uni.setNavigationBarTitle({
					title: this.friend.name
				});

				this.initialGoEasyListeners();
				// 录音监听器
				this.initRecorderListeners();
			})
		},
		onShow() {
			this.otherTypesMessagePanelVisible = false;
			this.emoji.visible = false;
		},
		onPullDownRefresh(e) {
			this.loadHistoryMessage(false);
		},
		onUnload() {
			//退出聊天页面之前，清空监听器
			this.goEasy.im.off(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onMessageReceived);
			this.goEasy.im.off(this.GoEasy.IM_EVENT.MESSAGE_DELETED, this.onMessageDeleted);
		},
		methods: {
			read(e) {
				if (counter.voice === true) {
					textToSpeech(e.currentTarget.dataset.val);
				}
			},
			getValue(prescription) {
				//GoEasyIM自定义消息,实现订单发送
				this.goEasy.im.createCustomMessage({
					type: 'prescription',
					payload: prescription,
					to: this.to,
					notification: {
						title: this.currentUser.name + '发来一个在线处方',
						body: '[处方消息]'
					},
					onSuccess: (message) => {
						this.otherTypesMessagePanelVisible = false;
						this.sendMessage(message);
					},
					onFailed: (e) => {
						console.log('error :', e);
					}
				});
			},
			//渲染文本消息，如果包含表情，替换为图片
			//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
			renderTextMessage(message) {
				return '<span class="text-content">' + this.emoji.decoder.decode(message.payload.text) + '</span>'
			},
			//像微信那样显示时间，如果有几分钟没发消息了，才显示时间
			//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
			renderMessageDate(message, index) {
				if (index === 0) {
					return formatDate(message.timestamp)
				} else {
					if (message.timestamp - this.history.messages[index - 1].timestamp > 5 * 60 * 1000) {
						return formatDate(message.timestamp)
					}
				}
				return '';
			},
			initialGoEasyListeners() {
				// 监听私聊消息
				this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onMessageReceived);
				//监听消息删除
				this.goEasy.im.on(this.GoEasy.IM_EVENT.MESSAGE_DELETED, this.onMessageDeleted);
			},
			onMessageReceived(message) {
				let senderId = message.senderId;
				let receiverId = message.receiverId;
				let friendId = this.currentUser.id === senderId ? receiverId : senderId;
				if (friendId === this.friend.id) {
					this.history.messages.push(message);

					console.log("收到的消息为", this.history.messages);
					//聊天时，收到消息标记为已读
					this.markPrivateMessageAsRead();
					//收到新消息，是滚动到最底部
					this.scrollToBottom();
				}
			},
			onMessageDeleted(deletedMessages) {
				deletedMessages.forEach(message => {
					let senderId = message.senderId;
					let receiverId = message.receiverId;
					let friendId = this.currentUser.id === senderId ? receiverId : senderId;
					if (friendId === this.friend.id) {
						let index = this.history.messages.indexOf(message);
						if (index > -1) {
							this.history.messages.splice(index, 1);
						}
					}
				});
			},
			initRecorderListeners() {
				// 监听录音开始
				recorderManager.onStart(() => {
					this.audio.recording = true;
					this.audio.startTime = Date.now();
				});
				//录音结束后，发送
				recorderManager.onStop((res) => {
					let endTime = Date.now();
					this.audio.recording = false;
					let duration = endTime - this.audio.startTime;
					if (duration < 1000) {
						uni.showToast({
							icon: 'error',
							title: '录音时间太短',
							duration: 500
						});
						return;
					}
					res.duration = duration;
					this.goEasy.im.createAudioMessage({
						to: this.to,
						file: res,
						notification: {
							title: this.currentUser.name + '发来一段语音',
							body: '[语音消息]' // 字段最长 50 字符
						},
						onProgress: function(progress) {
							console.log(progress)
						},
						onSuccess: (message) => {
							this.sendMessage(message);
						},
						onFailed: (e) => {
							console.log('error :', e);
						}
					});
				});
				// 监听录音报错
				recorderManager.onError((res) => {
					this.audio.recording = false;
					recorderManager.stop();
					uni.showToast({
						icon: 'none',
						title: '录音失败,请检查麦克风权限',
						duration: 1000
					});
				})
			},
			/**
			 * 核心就是设置高度，产生明确占位
			 *
			 * 小  (宽度和高度都小于预设尺寸)
			 *    设高=原始高度
			 * 宽 (宽度>高度)
			 *    高度= 根据宽度等比缩放
			 * 窄  (宽度<高度)或方(宽度=高度)
			 *    设高=MAX height
			 *
			 * @param width,height
			 * @returns number
			 */
			getImageHeight(width, height) {
				if (width < IMAGE_MAX_WIDTH && height < IMAGE_MAX_HEIGHT) {
					return height * 2;
				} else if (width > height) {
					return (IMAGE_MAX_WIDTH / width * height) * 2;
				} else if (width === height || width < height) {
					return IMAGE_MAX_HEIGHT * 2;
				}
			},
			sendMessage(message) {
				this.history.messages.push(message);
				this.scrollToBottom();
				this.goEasy.im.sendMessage({
					message: message,
					onSuccess: function(message) {
						console.log('发送成功.', message);
					},
					onFailed: function(error) {
						console.log('发送失败:', error);
					}
				});
			},
			sendTextMessage() {
				if (this.text.trim() !== '') {
					let body = this.text;
					if (this.text.length >= 50) {
						body = this.text.substring(0, 30) + '...';
					}
					this.goEasy.im.createTextMessage({
						text: this.text,
						to: this.to,
						qita: "asdas",
						notification: {
							title: this.currentUser.name + '发来一段文字',
							body: body
						},
						onSuccess: (message) => {
							console.log("发送的消息为：", message);
							this.sendMessage(message);
						},
						onFailed: (e) => {
							console.log('error :', e);
						}
					});
				}
				this.text = '';
			},
			sendVideoMessage() {
				uni.chooseVideo({
					success: (res) => {
						this.goEasy.im.createVideoMessage({
							to: this.to,
							file: res,
							notification: {
								title: this.currentUser.name + '发来一个视频',
								body: '[视频消息]' // 字段最长 50 字符
							},
							onProgress: function(progress) {
								console.log(progress)
							},
							onSuccess: (message) => {
								this.otherTypesMessagePanelVisible = false;
								this.sendMessage(message);
							},
							onFailed: (e) => {
								console.log('error :', e);
							}
						});
					}
				})
			},
			sendImageMessage() {
				uni.chooseImage({
					count: 9,
					success: (res) => {
						res.tempFiles.forEach(file => {
							this.goEasy.im.createImageMessage({
								to: this.to,
								file: file,
								notification: {
									title: this.currentUser.name + '发来一张图片',
									body: '[图片消息]' // 字段最长 50 字符
								},
								onProgress: function(progress) {
									console.log(progress)
								},
								onSuccess: (message) => {
									this.otherTypesMessagePanelVisible = false;
									this.sendMessage(message);
								},
								onFailed: (e) => {
									console.log('error :', e);
								}
							});
						})
					}
				});
			},
			showActionPopup(message) {
				const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
				this.messageSelector.messages = [message];
				if ((Date.now() - message.timestamp) < MAX_RECALLABLE_TIME && message.senderId === this.currentUser.id &&
					message.status === 'success') {
					this.actionPopup.recallable = true;
				} else {
					this.actionPopup.recallable = false;
				}
				this.actionPopup.visible = true;
			},
			hideActionPopup() {
				this.actionPopup.visible = false;
				this.actionPopup.message = null;
			},
			deleteSingleMessage() {
				uni.showModal({
					content: '确认删除？',
					success: (res) => {
						this.actionPopup.visible = false;
						if (res.confirm) {
							this.deleteMessage();
						}
					},
				})
			},
			deleteMultipleMessages() {
				if (this.messageSelector.messages.length > 0) {
					uni.showModal({
						content: '确认删除？',
						success: (res) => {
							this.messageSelector.visible = false;
							if (res.confirm) {
								this.deleteMessage();
							}
						},
					})
				}
			},
			deleteMessage() {
				this.goEasy.im.deleteMessage({
					messages: this.messageSelector.messages,
					onSuccess: (result) => {
						this.messageSelector.messages.forEach(message => {
							let index = this.history.messages.indexOf(message);
							if (index > -1) {
								this.history.messages.splice(index, 1);
							}
						});
						this.messageSelector.messages = [];
					},
					onFailed: (error) => {
						console.log('error:', error);
					}
				});
			},
			recallMessage() {
				this.actionPopup.visible = false;
				this.goEasy.im.recallMessage({
					messages: this.messageSelector.messages,
					onSuccess: () => {
						console.log('撤回成功');
					},
					onFailed: (error) => {
						console.log('撤回失败,error:', error);
					}
				});
			},
			editRecalledMessage(text) {
				if (this.audio.visible) {
					this.audio.visible = false;
				}
				this.text = text;
			},
			showCheckBox() {
				this.messageSelector.messages = [];
				this.messageSelector.visible = true;
				this.actionPopup.visible = false;
			},
			selectMessages(e) {
				const selectedMessageIds = e.detail.value;
				let selectedMessages = [];
				this.history.messages.forEach(message => {
					if (selectedMessageIds.includes(message.messageId)) {
						selectedMessages.push(message);
					}
				})
				this.messageSelector.messages = selectedMessages;
			},
			loadHistoryMessage(scrollToBottom) { //历史消息
				this.history.loading = true;
				let lastMessageTimeStamp = null;
				let lastMessage = this.history.messages[0];
				if (lastMessage) {
					lastMessageTimeStamp = lastMessage.timestamp;
				}
				this.goEasy.im.history({
					userId: this.friend.id,
					lastTimestamp: lastMessageTimeStamp,
					limit: 10,
					onSuccess: (result) => {
						uni.stopPullDownRefresh();
						this.history.loading = false;
						let messages = result.content;
						if (messages.length === 0) {
							this.history.allLoaded = true;
						} else {
							if (lastMessageTimeStamp) {
								this.history.messages = messages.concat(this.history.messages);
							} else {
								this.history.messages = messages;
							}
							if (messages.length < 10) {
								this.history.allLoaded = true;
							}
							if (scrollToBottom) {
								this.scrollToBottom();
								//收到的消息设置为已读
								this.markPrivateMessageAsRead();
							}

							console.log(this.history.messages);
						}
					},
					onFailed: (error) => {
						//获取失败
						console.log('获取历史消息失败:', error);
						uni.stopPullDownRefresh();
						this.history.loading = false;
					}
				});
			},
			//语音录制按钮和键盘输入的切换
			switchAudioKeyboard() {
				this.audio.visible = !this.audio.visible;
				if (uni.authorize) {
					uni.authorize({
						scope: 'scope.record',
						fail: () => {
							uni.showModal({
								title: '获取录音权限失败',
								content: '请先授权才能发送语音消息！'
							});
						}
					});
				}
			},
			onRecordStart() {
				try {
					recorderManager.start();
				} catch (e) {
					uni.showModal({
						title: '录音错误',
						content: '请在app和小程序端体验录音，Uni官方明确H5不支持getRecorderManager, 详情查看Uni官方文档'
					});
				}
			},
			onRecordEnd() {
				try {
					recorderManager.stop();
				} catch (e) {
					console.log(e);
				}
			},
			showImageFullScreen(e) {
				let imagesUrl = [e.currentTarget.dataset.url];
				uni.previewImage({
					urls: imagesUrl
				});
			},
			playVideo(e) {
				this.videoPlayer.visible = true;
				this.videoPlayer.url = e.currentTarget.dataset.url;
				this.$nextTick(() => {
					this.videoPlayer.context.requestFullScreen({
						direction: 0
					});
					this.videoPlayer.context.play();
				});
			},
			playAudio(audioMessage) {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;

				let playingMessage = this.audioPlayer.playingMessage;

				if (playingMessage) {
					innerAudioContext.stop();
					// 如果点击的消息正在播放，就认为是停止播放操作
					if (playingMessage === audioMessage) {
						return;
					}
				}
				this.audioPlayer.playingMessage = audioMessage;

				innerAudioContext.src = audioMessage.payload.url;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});

				innerAudioContext.onEnded(() => {
					this.audioPlayer.playingMessage = null;
				});
				innerAudioContext.onStop(() => {
					this.audioPlayer.playingMessage = null;
				});
			},
			onVideoFullScreenChange(e) {
				//当退出全屏播放时，隐藏播放器
				if (this.videoPlayer.visible && !e.detail.fullScreen) {
					this.videoPlayer.visible = false;
					this.videoPlayer.context.stop();
				}
			},
			messageInputFocusin() {
				this.otherTypesMessagePanelVisible = false;
				this.emoji.visible = false;
			},
			switchEmojiKeyboard() {
				this.emoji.visible = !this.emoji.visible;
				this.otherTypesMessagePanelVisible = false;
			},
			showOtherTypesMessagePanel() {
				this.otherTypesMessagePanelVisible = !this.otherTypesMessagePanelVisible;
				this.emoji.visible = false;
			},
			chooseEmoji(emojiKey) {
				this.text += emojiKey;
			},
			goToPrescription() {
				uni.navigateTo({
					url: '/pages/info/prescription?id=' + this.friend.id
				});
			},
			hideOrderMessageList() {
				this.orderList.visible = false;
			},
			scrollToBottom() {
				this.$nextTick(() => {
					uni.pageScrollTo({
						scrollTop: 2000000,
						duration: 0
					});
				});
			},
			markPrivateMessageAsRead() {
				this.goEasy.im.markMessageAsRead({
					id: this.to.id,
					type: this.to.type,
					onSuccess: function() {
						console.log('标记私聊已读成功');
					},
					onFailed: function(error) {
						console.log("标记私聊已读失败", error);
					}
				});
			}
		}
	}
</script>

<style scoped>
	.chufang {
		border-radius: 6px;
		background: rgba(255, 255, 255, 1);
		border: 2px solid rgba(0, 0, 0, 1);
		margin: 10px 10px 10px 10px;
		padding-top: 10px;
		padding-left: 24rpx;
		padding-bottom: 10px;
	}

	.chufang text:first-child {
		font-size: 28rem;
		font-weight: 500;
		color: #000000;
		display: block;
	}

	.chufang text {
		font-size: 24rem;
		color: rgba(128, 128, 128, 1);
		display: block;
	}

	.chashou {
		border-radius: 6px;
		border: 2px solid rgba(0, 0, 0, 1);
		color: #000000;
		font-size: 24rem;
		text-align: center;
		width: 350rpx;
		background-color: #fff;
		margin-left: 60rpx;
		margin-bottom: 20px;
	}

	.header {
		background-color: #fff;
		padding-bottom: 20px;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}

	.chatInterface {
		height: 100%;
		background-color: #eff5f9;
		padding-top: 93px;
	}

	.chatInterface .scroll-view {
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 140rpx;
		background-color: #eff5f9;
	}

	.chatInterface .scroll-view .history-loaded {
		font-size: 24rem;
		height: 60rpx;
		line-height: 60rpx;
		width: 100%;
		text-align: center;
		color: #cccccc;
	}

	.chatInterface .scroll-view .load {
		font-size: 24rem;
		height: 60rpx;
		line-height: 60rpx;
		width: 100%;
		text-align: center;
		color: #4B97F8;
	}

	.chatInterface .scroll-view .message-item {
		display: flex;
		margin: 20rpx 0;
	}

	.chatInterface .scroll-view .message-item .message-item-checkbox {
		height: 80rpx;
		display: flex;
		align-items: center;
	}

	.chatInterface .scroll-view .message-item .message-item-content {
		flex: 1;
		overflow: hidden;
		display: flex;
	}

	.chatInterface .scroll-view .message-item .message-item-content.self {
		overflow: hidden;
		display: flex;
		justify-content: flex-start;
		flex-direction: row-reverse;
	}

	.chatInterface .scroll-view .message-item .avatar {
		width: 80rpx;
		height: 80rpx;
		flex-shrink: 0;
		flex-grow: 0;
	}

	.chatInterface .scroll-view .message-item .avatar image {
		width: 100%;
		height: 100%;
	}

	.chatInterface .scroll-view .content {
		font-size: 34rem;
		line-height: 44rpx;
		margin: 0 20rpx;
		max-width: 520rpx;
	}

	.chatInterface .scroll-view .content .message-payload {
		display: flex;
		align-items: center;
		padding: 16rpx;
		color: #FFF;
		word-break: break-all;
		text-align: left;
		vertical-align: center;
		display: block;
		border-radius: 0rpx 99rpx 99rpx 99rpx;
		background: linear-gradient(to right, rgba(75, 151, 248, 1), rgba(75, 151, 248, 0.5));
	}

	.chatInterface .scroll-view .content .message-payload1 {
		display: flex;
		align-items: center;
		padding: 16rpx;
		word-break: break-all;
		text-align: left;
		vertical-align: center;
		display: block;
		border-radius: 99rpx 0rpx 99rpx 99rpx;
		background-color: #fff;
	}

	.chatInterface .scroll-view .content .image-content {
		border-radius: 12rpx;
		width: 300rpx;
		height: 300rpx;
	}

	.chatInterface .scroll-view .content .text-content {
		padding: 16rpx;
		border-radius: 12rpx;
		color: #000000;
		background: #FFFFFF;
		word-break: break-all;
		text-align: left;
		vertical-align: center;
		display: block;
	}

	.chatInterface .scroll-view .content .text-content img {
		width: 50rpx;
		height: 50rpx;
	}

	.chatInterface .scroll-view .content .file-content {
		width: 560rpx;
		height: 152rpx;
		font-size: 28rem;
		background: white;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		padding: 0 20rpx;
	}

	.chatInterface .scroll-view .content .file-content .file-info {
		width: 386rpx;
		height: 132rpx;
	}

	.chatInterface .scroll-view .content .file-content .file-info .file-name {
		width: 400rpx;
		margin-top: 15rpx;
		font-size: 30rem;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		word-break: break-all;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.chatInterface .scroll-view .content .file-content .file-info .file-size {
		width: 200rpx;
		font-size: 24rem;
		color: #ccc;
	}

	.chatInterface .scroll-view .content .file-content .file-img {
		width: 100rpx;
		height: 100rpx;
	}

	.chatInterface .scroll-view .content .pending {
		background: url("../../static/pending.gif") no-repeat center;
		background-size: 30rpx;
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.chatInterface .scroll-view .content .send-fail {
		background: url("../../static/failed.png") no-repeat center;
		background-size: 30rpx;
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.action-box {
		display: flex;
		backdrop-filter: blur(0.27rpx);
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		flex-direction: column;
		background-color: #F1F1F1;
	}

	.action-top {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		background: #F6F6F6;
		backdrop-filter: blur(27.1828px);
		border-top: 1px solid #ECECEC;
		padding: 0 20rpx;
	}

	.consult-input {
		flex: 1;
		height: 80rpx;
		padding-left: 20rpx;
		margin: 20rpx;
		margin-left: 0;
		border: none;
		outline: none;
		box-sizing: border-box;
		border-radius: 6px;
		background: #FFFFFF;
		font-size: 32rem;
	}

	.more {
		width: 62rpx;
		height: 62rpx;
		margin-right: 10rpx;
		display: flex;
	}

	.send-btn-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 110rpx;
		height: 60rpx;
		border-radius: 10rpx;
		background: #4B97F8;
	}

	.send-btn-box .btn {
		color: #FFFFFF;
		font-size: 28rem;
	}

	.action-bottom {
		height: 300rpx;
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
	}

	.action-bottom-emoji {
		justify-content: space-around;
	}

	.action-bottom image {
		width: 100rpx;
		height: 100rpx;
	}

	.action-box .action-bottom .more-icon {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 0 30rpx;
	}

	.action-box .action-bottom .operation-icon {
		width: 100rpx;
		height: 100rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		background: #FFFFFF;
	}

	.action-box .action-bottom .operation-title {
		font-size: 24rem;
		line-height: 50rpx;
		color: #82868E;
	}

	.action-box .action-top .record-input {
		flex: 1;
		width: 480rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 20rpx;
		margin: 20rpx;
		margin-left: 0;
		border: none;
		outline: none;
		box-sizing: border-box;
		border-radius: 6px;
		background: #cccccc;
		color: #FFFFFF;
		font-size: 28rem;
		text-align: center;
	}

	.chatInterface .messageSelector-box {
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(0.27rpx);
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		border-radius: 12rpx;
		background: #F6F6F6;
		height: 150rpx;
		padding: 20rpx 0;
		font-size: 32rem;
	}

	.chatInterface .messageSelector-box .messageSelector-btn {
		width: 60rpx;
		height: 60rpx;
	}

	uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
		border-color: #d1d1d1 !important;
	}

	uni-checkbox .uni-checkbox-input {
		border-radius: 50% !important;
	}

	/* #ifdef MP-WEIXIN */
	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #007aff !important;
	}

	/* #endif */

	.chatInterface .action-popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.chatInterface .action-popup .layer {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(51, 51, 51, 0.5);
		z-index: 999;
	}

	.chatInterface .action-popup .action-list {
		width: 350rpx;
		background: #434343;
		position: relative;
		z-index: 1000;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.chatInterface .action-popup .action-item {
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 34rem;
		color: #ffffff;
		border-bottom: 1px solid #EFEFEF;
	}

	.chatInterface .action-popup .action-item:last-child {
		border: none;
	}

	.chatInterface .record-loading {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 300rpx;
		height: 300rpx;
		margin: -150rpx -150rpx;
		background: #262628;
		background: url("https://s3-us-east-1.ossfiles.com/demoas/recording-loading.gif") no-repeat center;
		background-size: 100%;
		border-radius: 40rpx;
	}

	.chatInterface .img-layer {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000000;
		z-index: 9999;
		padding: 6rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.chatInterface .img-layer uni-image {
		height: 100% !important;
	}

	.chatInterface .img-layer {
		height: 100% !important;
		width: 100% !important;
	}

	.order-list {
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 10;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
	}

	.orders-content {
		position: absolute;
		width: 100%;
		bottom: 0;
		background: #F1F1F1;
		z-index: 200;
	}

	.title {
		font-weight: 600;
		font-size: 30rem;
		color: #000000;
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.close {
		font-size: 50rem;
	}

	.order-item {
		padding: 20rpx;
		background: #FFFFFF;
		margin: 20rpx;
		border-radius: 20rpx;
	}

	.order-id {
		font-size: 24rem;
		color: #666666;
		margin-bottom: 10rpx;
	}

	.order-body {
		display: flex;
		font-size: 28rem;
	}

	.order-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
	}

	.order-name {
		margin-left: 20rpx;
		width: 270rpx;
	}

	.order-right {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.order-price {
		font-weight: bold;
	}

	.order-count {
		font-size: 24rem;
		color: #666666;
	}

	.chatInterface .video-snapshot {
		position: relative;
	}

	.chatInterface .video-snapshot video {
		max-height: 300rpx;
		max-width: 400rpx;
	}

	.chatInterface .video-snapshot .video-play-icon {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background: url("../../static/play.png") no-repeat center;
		background-size: 100%;
		top: 50%;
		left: 50%;
		margin: -20rpx;
	}

	.chatInterface .group-icon {
		right: 20rpx;
		width: 60rpx;
		height: 60rpx;
		top: 14rpx;
		position: fixed;
		right: 20rpx;
		top: 120rpx;
		background-color: #C4C4C4;
		z-index: 2;
		border-radius: 60rpx;
	}

	.uni-toast {
		background-color: #ffffff !important;
	}

	.time-lag {
		font-size: 20rem;
		text-align: center;
	}

	.chatInterface .audio-content {
		height: 86rpx;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	.chatInterface .audio-facade {
		min-width: 20rpx;
		padding: 6rpx 10rpx;
		line-height: 72rpx;
		background: #FFFFFF;
		font-size: 24rem;
		border-radius: 14rpx;
		color: #000000;
		display: flex;
	}

	.chatInterface .audio-facade-bg {
		background: url("../../static/voice.png") no-repeat center;
		background-size: 30rpx;
		width: 40rpx;
	}

	.chatInterface .audio-facade-bg.play-icon {
		background: url("../../static/play.gif") no-repeat center;
		background-size: 30rpx;
	}

	.chatInterface .order-content {
		border-radius: 20rpx;
		background: #FFFFFF;
		padding: 16rpx;
		display: flex;
		flex-direction: column;
	}

	.scroll-view .content .order-id {
		color: #333333;
	}

	.scroll-view .content .order-body {
		padding: 10rpx;
	}

	.scroll-view .content .order-name {
		font-weight: normal;
	}

	.scroll-view .content .order-info {
		display: flex;
		justify-content: space-between;
		padding: 10rpx;
	}

	.scroll-view .content .order-info .order-price {
		font-weight: normal;
	}

	.message-read {
		color: grey;
		font-size: 24rem;
		text-align: end;
		height: 36rpx;
	}

	.message-unread {
		color: #d02129;
		font-size: 24rem;
		text-align: end;
	}

	.message-recalled {
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 56rpx;
		font-size: 26rem;
		text-align: center;
		color: grey;
	}

	.message-recalled .message-recalled-self {
		display: flex;
	}

	.message-recalled .message-recalled-self span {
		margin-left: 10rpx;
		color: #d02129;
	}
</style>