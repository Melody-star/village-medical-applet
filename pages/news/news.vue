<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<!-- <title name="科普"></title> -->
		<view class="title" :style='"padding-top:" + top + "px;"'>科普</view>
		<view class="box">
			<van-tabs color="rgba(75, 151, 248, 1)" title-active-color="rgba(75, 151, 248, 1)">
				<van-tab title="推荐">
					<div class="list">
						<view @click='toDetail(item,true)' v-for="(item,i) in newsList" :key="i">
							<news :title="item.scienceTitile" :time="item.createTime" :img="item.scienceImg">
							</news>
						</view>
					</div>
				</van-tab>
				<van-tab title="热门">
					<div class="list">
						<view @click='toDetail(item,true)' v-for="(item,i) in hotList" :key="i">
							<news :title="item.scienceTitile" :time="item.createTime" :img="item.scienceImg">
							</news>
						</view>
					</div>
				</van-tab>
				<van-tab title="精华">
					<div class="list">
						<view @click='toDetail(item,true)' v-for="(item,i) in jinhuaList" :key="i">
							<news :title="item.scienceTitile" :time="item.createTime" :img="item.scienceImg">
							</news>
						</view>
					</div>
				</van-tab>
			</van-tabs>
		</view>

		<my-tabbar></my-tabbar>
	</view>
</template>

<script>
	import {
		getAllScience
	} from '@/api/api.js'

	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	import {
		textToSpeech,

	} from "@/utils/utils.js"

	import sizeUtil from '../../utils/sizeUtil';
	export default {
		extends: sizeUtil,
		data() {
			return {
				top: 0,
				news: [],
				newsList: [],
				hotList: [],
				jinhuaList: []
			};
		},
		created() {
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.top = menuButtonInfo.top + ((menuButtonInfo.height - 20) / 2)
		},
		onLoad() {
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.top = menuButtonInfo.top + ((menuButtonInfo.height - 20) / 2)

			getAllScience().then((res) => {
				console.log(res);
				this.newsList = res.data
				this.hotList = this.newsList.filter(obj => obj.scienceType == "3");
				this.jinhuaList = this.newsList.filter(obj => obj.scienceType == "4");
			})
		},

		methods: {
			toDetail(item, value) {
				uni.navigateTo({
					url: '/pages/news/detail?item=' + encodeURIComponent(JSON.stringify(item))
				})

				if (value && counter.voice === true) {
					textToSpeech(item.scienceTitile);
				}
			},
			read(e) {
				if (counter.voice === true) {
					textToSpeech(e.currentTarget.dataset.val);
				}
			},
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

	.list {
		border-top: 5px solid rgba(245, 245, 245, 1);
		padding-left: 41rpx;
		padding-top: 13px;
	}

	.box {
		border-top: 2px solid rgba(245, 245, 245, 1);
		margin-top: 24px;
		padding-bottom: 80px;
	}
</style>