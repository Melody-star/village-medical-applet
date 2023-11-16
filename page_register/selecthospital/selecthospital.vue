<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<view class="header">
			<title name="预约挂号" color="#fff"></title>
			<view style="margin-top: 23px;width: 647rpx;margin-left: 52rpx;">
				<van-search class="van-search" background="rgba(255,255,255,0)" shape="round" placeholder="请输入搜索关键词" />
			</view>
		</view>

		<view class="footer">
			<view class="footer_box" v-for="(item,i) in hospitalList" :key="i" @click="goTo(item)">
				<image style="width: 151rpx;height: 79px;border-radius: 5px;" :src="item.hospital_image"></image>
				<view style="margin-left: 25rpx;">
					<view style="font-size: 28rem;">{{item.hospital_name}}</view>
					<view style="font-size: 18rem;width: 487rpx;margin-top: 13px;">{{item.hospital_address}}</view>
					<view
						style="font-size: 18rem;color: rgba(128, 128, 128, 1);display: flex;margin-top: 10px;margin-bottom: 4.5px;">
						<view>{{item.hospital_level}}</view>
					</view>
					<!-- 					<view>
						<image style="width: 40rpx;height: 26rpx;" src="../../static/sanjia.png"></image>
						<image style="width: 77rpx;height: 26rpx;margin-left: 9rpx;" src="../../static/zonghe.png">
						</image>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getHospitalsByCityName
	} from '@/api/api.js'
	import sizeUtil from '@/utils/sizeUtil.js';
	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	export default {
		extends: sizeUtil,
		data() {
			return {
				hospitalList: []
			}
		},
		onLoad() {
			getHospitalsByCityName(counter.city).then((res) => {
				this.hospitalList = res.data
			})
		},
		methods: {
			goTo(item) {
				counter.registerInfo = {}
				counter.registerInfo['hospitalName'] = item.hospital_name

				uni.navigateTo({
					url: "/page_register/department/department?name=" + item.hospital_name + "&img=" + item
						.hospital_image + "&id=" + item.hospital_id
				});
			}
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}

	.header {
		width: 100%;
		background-color: #4B97F8;
		padding-bottom: 20px;
	}

	.footer {
		margin-left: 36rpx;

		&_box {
			display: flex;
			margin-top: 16px;
		}
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>