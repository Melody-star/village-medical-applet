<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="header">
		<title name="我的处方" color="#fff"></title>
	</view>
	<view style="width: 100%;display: flex;flex-direction: column;align-items: center;">
		<image class="img" mode="scaleToFill" v-for="(item,i) in data" :key="i" :src="item.userPrescription"></image>
	</view>
</template>

<script>
	import {
		getPrescription
	} from "@/api/api.js"

	import sizeUtil from '@/utils/sizeUtil.js'

	export default {
		extends: sizeUtil,
		data() {
			return {
				data: []
			}
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					getPrescription(res.data.accountId).then((value) => {
						that.data = value.data
					})
				}
			})
		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
	.header {
		background-color: #4b97f8;
		padding-bottom: 20px;
	}

	.img {
		height: 435px;
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>