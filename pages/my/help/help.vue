<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="header">
		<title name="帮助中心" color="#fff"></title>
	</view>
	<view>
		<van-collapse accordion :value="activeNames" @change="onChange">
			<van-collapse-item title="一直在转圈圈" name="1">
				首次打开小程序连接服务器可能需要的时间较长，连接成功后速度就会非常快了
			</van-collapse-item>
			<van-collapse-item title="预约挂号失败" name="2">
				请检查网络状况，并重试，如还是失败请联系客服
			</van-collapse-item>
			<van-collapse-item title="如何注册医生账号" name="3">
				因注册医生账号需要人工审核，请联系客服
			</van-collapse-item>
		</van-collapse>

	</view>
</template>

<script>
	import sizeUtil from '@/utils/sizeUtil.js'

	export default {
		extends: sizeUtil,
		data() {
			return {
				activeNames: "1"
			}
		},
		methods: {
			onChange(e) {
				this.activeNames = e.detail
			}
		}
	}
</script>

<style scoped lang="less">
	.header {
		background-color: #4b97f8;
		padding-bottom: 20px;
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>