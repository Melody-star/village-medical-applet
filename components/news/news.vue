<template>
	<view class="box">
		<view style="width: 467rpx;">
			<view>
				<view style="font-size: 28rem;">{{title}}</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin-top: 17rem;">
				<text style="font-size: 24rem;color: rgba(128, 128, 128, 1);">乡村e疗</text>
				<text style="font-size: 24rem;color: rgba(128, 128, 128, 1);">{{time}}</text>
			</view>
		</view>
		<view style="margin-left: 36rpx;">
			<image style="width: 179rpx; height: 122.75rem;" :src="img" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "news",
		data() {
			return {

			};
		},
		props: ['title', 'time', 'img']
	}
</script>

<style scoped lang="less">
	.box {
		width: 668rpx;
		height: 149rem;
		display: flex;
		border-bottom: 1px rgba(204, 204, 204, 1) solid;
		margin-bottom: 27px;
	}
</style>