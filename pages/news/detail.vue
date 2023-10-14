<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>

	<title name="科普文章"></title>

	<view class="title">{{info.scienceTitile}}</view>

	<view v-if="info.scienceType == '1'">
		<view class="time">
			<text>乡村e疗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{info.createTime}}</text>
			<image src="https://s3-us-east-1.ossfiles.com/demoas/%E5%96%87%E5%8F%AD.png" @click="play()"></image>
		</view>
		<video id="myVideo" :src="info.scienceInfo"></video>
	</view>

	<view v-else>
		<view class="time">
			<text>乡村e疗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{info.createTime}}</text>
			<image src="https://s3-us-east-1.ossfiles.com/demoas/%E5%96%87%E5%8F%AD.png" @click="play()"></image>
		</view>
		<!-- <view class="content">{{info.scienceInfo}}</view> -->
		<view class="content">
			<rich-text :nodes="info.scienceInfo"></rich-text>
		</view>
	</view>
</template>

<script>
	import {
		textToSpeech
	} from "../../utils/utils.js"

	import sizeUtil from '../../utils/sizeUtil';
	export default {
		extends: sizeUtil,
		data() {
			return {
				info: {},
				top: 0
			}
		},
		onLoad(option) {
			this.info = JSON.parse(decodeURIComponent(option.item))
			console.log(this.info);
		},
		created() {
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.top = menuButtonInfo.top + 40;
		},
		methods: {
			play() {
				let text = this.info.scienceTitile + this.info.scienceInfo
				textToSpeech(text);
			}
		}
	}
</script>

<style scoped lang="less">
	.title {
		font-size: 40rem;
		margin: 20rpx;
	}

	.time {
		font-size: 28rem;
		margin: 20rpx;
		color: #808080;
		display: flex;
		flex-direction: row;
		// align-items: center;
	}

	.content {
		font-size: 30rem;
		line-height: 2;
		margin: 20rpx;
		// margin: 20px 20px 50px 20px;
		padding-bottom: 80px;
	}

	image {
		width: 23px;
		height: 23px;
		margin-left: 20rpx;
	}

	#myVideo {
		margin-left: 74rpx;
	}
</style>