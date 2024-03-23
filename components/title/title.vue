<template>
	<view :style='"padding-top:" + top + "px;color:" + color + ";"' class="box12">
		<image v-if="color == '#fff'" @click="back()" class="img" src="@/static/back.svg" />
		<image v-else @click="back()" class="img" src="@/static/back2.svg" />
		<view class="title">{{name}}</view>
	</view>
</template>
<!--  -->
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

	.img path {
		fill: aqua;
	}
</style>