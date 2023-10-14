<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<title name="医生列表"></title>

		<van-divider />

		<van-tabs>
			<van-tab @click="onClick" v-for="(item,i) in date" :key="i" :title="item">
				<view v-for="(item1,j) in doctorInfo" :key="j" class="list">
					<view style="display: flex;">
						<image style="border-radius: 99px;width: 97rpx;height: 97rpx;margin-left: 58rpx;"
							:src="item1.doctorAvatar">
						</image>
						<view style="display: flex;flex-direction: column;margin-left: 40rpx;">
							<text style="font-size: 30rem;">{{item1.doctorName}}</text>
							<text style="font-size: 18rem;">{{item1.doctorTitle}}</text>
							<text style="font-size: 18rem;color: #808080;width: 370rpx;">擅长：
								{{item1.doctorIntroduction}}</text>
						</view>
					</view>
					<view class="yuyue_btn" @click="goTo(item1)">
						<text style="font-size: 18rem;color: white;">预约</text>
					</view>
				</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	import {
		getDoctor
	} from '@/api/api.js'

	import sizeUtil from '@/utils/sizeUtil.js';
	export default {
		extends: sizeUtil,
		data() {
			return {
				doctorInfo: [],
				date: [],
				selectDate: ""
			}
		},
		onLoad(option) {
			console.log("================");
			console.log(option.id);

			let id = option.id;
			if (option.id == 25) {
				id = 1
			}

			const today = new Date(); // 获取当前日期
			const days = []; // 定义数组存储日期

			// 将今天的日期加入数组
			days.push(this.formatDate(today));

			// 将后三天的日期加入数组
			for (let i = 1; i <= 3; i++) {
				const nextDay = new Date(today);
				nextDay.setDate(today.getDate() + i);
				days.push(this.formatDate(nextDay));
			}
			this.date = days
			this.selectDate = days[0]

			getDoctor(id).then((res) => {
				console.log(res);
				this.doctorInfo = res.data
			})
		},
		methods: {
			goTo(item) {
				console.log(item);
				counter.registerInfo['doctorName'] = item.doctorName
				counter.registerInfo['doctorTitle'] = item.doctorTitle
				counter.registerInfo['doctorIntroduction'] = item.doctorIntroduction
				counter.registerInfo['doctorId'] = item.accountId
				counter.registerInfo['doctorAvatar'] = item.doctorAvatar
				counter.registerInfo['date'] = this.selectDate

				uni.navigateTo({
					url: '/page_register/affirm/affirm'
				})
			},
			formatDate(date) {
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return `${month}/${day}`;
			},
			onClick(event) {
				this.selectDate = event.detail.name
			}
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}

	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;

		.yuyue_btn {
			width: 82rem;
			height: 42rem;
			border-radius: 99px;
			background-color: #4B97F8;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 67rpx;
		}
	}
</style>