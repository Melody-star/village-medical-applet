<template>
	<view :style='"padding-top:" + top + "px;color:" + color + ";"' class="box12">
		<image @click="back()" v-if="color ==='#fff'" class="img"
			src="https://s3-us-east-1.ossfiles.com/demoas/%E7%AE%AD%E5%A4%B4%20%E5%8F%B3.png">
		</image>
		<image @click="back()" v-else class="img"
			src="https://s3-us-east-1.ossfiles.com/demoas/%E7%AE%AD%E5%A4%B4%20%E5%8F%B3%20%282%29.png">
		</image>
		<view class="title">{{name}}</view>
	</view>
</template>

<script>
	import {
		destroyAudio
	} from "../../utils/utils.js"

	export default {
		name: "title",
		data() {
			return {
				top: 0,
			};
		},
		created() {
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.top = menuButtonInfo.top + ((menuButtonInfo.height - 20) / 2)
		},
		methods: {
			back() {
				console.log(this.ceng);
				destroyAudio()
				uni.navigateBack({
					delta: this.ceng
				});
			}
		},
		// props: ['name', 'color']
		props: {
			name: {
				default: "标题"
			},
			color: {},
			ceng: {
				default: 1
			}
		}
	}
</script>

<style lang="less">
	.title {
		font-size: 30rem;
		font-family: 'PingFang Bold';
		// margin-left: 260rpx;
	}

	.box12 {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.img {
		width: 16px;
		height: 16px;
		position: absolute;
		left: 26rpx;
	}
</style>