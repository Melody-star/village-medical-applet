<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="box" ref="classifyLayout">
		<view class="title" :style='"padding-top:" + top + "px;"'>乡村e疗</view>
		<view class="box2">
			<view class="box2_text" @click="selectCity($event)" :data-val="city">{{city}}</view>
			<view>
				<image class="box2_down" src="../../static/down.png"></image>
			</view>
			<view class="box2_search">
				<van-search class="van-search" background="rgba(255,255,255,0)" shape="round" placeholder="请输入搜索关键词" />
			</view>
			<view @click="scanCode()">
				<image class="box2_saoma" src="../../static/saoma.png"></image>
			</view>
		</view>

		<view class="box3">
			<view @click="goTo('/page_register/selecthospital/selecthospital')">
				<image src="https://s3-us-east-1.ossfiles.com/demoas/guahao.png"></image>
				<text @click="read($event)" data-val="预约挂号">预约挂号</text>
			</view>
			<view @click="goTo('/pages/index/ask/selectdoctor')">
				<image src="https://s3-us-east-1.ossfiles.com/demoas/zixun.png"></image>
				<text @click="read($event)" data-val="症状咨询">症状咨询</text>
			</view>
			<view @click="goTo('/page_map/2dmap/2dmap')">
				<image src="https://s3-us-east-1.ossfiles.com/demoas/daohang.png"></image>
				<text @click="read($event)" data-val="医院导航">医院导航</text>
			</view>
			<view @click="goTo('/pages/index/record/record')">
				<image src="https://s3-us-east-1.ossfiles.com/demoas/pinggu.png"></image>
				<text @click="read($event)" data-val="健康档案">健康档案</text>
			</view>
		</view>

		<view class="box4">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<image src="https://s3-us-east-1.ossfiles.com/demoas/banner1.png"></image>
				</swiper-item>
				<swiper-item>
					<image src="https://s3-us-east-1.ossfiles.com/demoas/banner2.png"></image>
				</swiper-item>
				<swiper-item>
					<image src="https://s3-us-east-1.ossfiles.com/demoas/banner3.png"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="box5">
			<view class="box5_left" @click="read($event)" data-val="最新动态">
				<text>最新</text>
				<text>动态</text>
			</view>
			<view class="box5_right">
				<view>
					<image src="../../static/hot.png"></image>
					<!-- <navigator :url="'../news/detail?item='+ encodeURIComponent(JSON.stringify(newHot))"> -->
					<text @click="read($event)" :data-val="newHot.title">{{newHot.title}}</text>
					<!-- </navigator> -->
				</view>
				<view>
					<image src="../../static/new.png"></image>
					<!-- <navigator :url="'../news/detail?item='+ encodeURIComponent(JSON.stringify(newHot2))"> -->
					<text @click="read($event)" :data-val="newHot2.title">{{newHot2.title}}</text>
					<!-- </navigator> -->
				</view>
			</view>
		</view>

		<view class="box6">
			<view class="box6_header">
				<text @click="read($event)" data-val="热门科室">热门科室</text>
				<view @click="to()">
					<text @click="read($event)" data-val="查看全部">查看全部</text>
					<image src="../../static/you.png"></image>
				</view>
			</view>
			<view class="box6_footer">
				<view class="box6_footer_up">
					<view @click="to()">
						<image src="../../static/waike.png"></image>
						<text @click="read($event)" data-val="外科">外科</text>
					</view>
					<view @click="to()">
						<image src="../../static/neike.png"></image>
						<text @click="read($event)" data-val="内科">内科</text>
					</view>
					<view @click="to()">
						<image src="../../static/fuke.png"></image>
						<text @click="read($event)" data-val="妇科">妇科</text>
					</view>
					<view @click="to()">
						<image src="../../static/kouqiang.png"></image>
						<text @click="read($event)" data-val="口腔">口腔</text>
					</view>
				</view>
				<view class="box6_footer_down">
					<view @click="to()">
						<image src="../../static/nanke.png"></image>
						<text @click="read($event)" data-val="男科">男科</text>
					</view>
					<view @click="to()">
						<image src="../../static/guke.png"></image>
						<text @click="read($event)" data-val="骨科">骨科</text>
					</view>
					<view @click="to()">
						<image src="../../static/pifu.png"></image>
						<text @click="read($event)" data-val="皮肤">皮肤</text>
					</view>
					<view @click="to()">
						<image src="../../static/zhengxin.png"></image>
						<text @click="read($event)" data-val="整形">整形</text>
					</view>
				</view>
			</view>
		</view>

		<view class="box7">
			<view>
				<text @click="read($event)" data-val="在线问诊">在线问诊</text>
			</view>
			<view>
				<scroll-view class="scroll-view_H" scroll-x="true">
					<image @click="goTo('/pages/index/ask/selectdoctor')"
						src="https://s3-us-east-1.ossfiles.com/demoas/tuwen.png"></image>
					<image @click="goTo('/pages/index/ask/selectdoctor')"
						src="https://s3-us-east-1.ossfiles.com/demoas/%E7%94%BB%E6%9D%BF%204.png"></image>
					<image @click="goTo('/pages/index/ask/selectdoctor')"
						src="https://s3-us-east-1.ossfiles.com/demoas/yuyin.png"></image>
				</scroll-view>
			</view>
		</view>

		<view class="box8">
			<view class="box8_top">
				<text @click="read($event)" data-val="周边医院">周边医院</text>
			</view>
			<view class="box8_down">
				<view v-for="(item,i) in hospitalList" :key="i">
					<image :src="item.hospital_image" mode=""></image>
					<view class="box8_right">
						<view>
							<text class="box8_right_name" @click="read($event)"
								:data-val="item.hospital_name">{{item.hospital_name}}</text>
							<text class="box8_right_jieshao" @click="read($event)"
								:data-val="item.hospital_address">{{item.hospital_address}}</text>
						</view>
						<view>
							<text class="box8_right_place" @click="read($event)"
								:data-val="item.hospital_level">{{item.hospital_level}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="box9">
			<text class="box9_title">最新资讯</text>
			<view class="box9_list">
				<view @click='toDetail(item,true)' v-for="(item,i) in news" :key="i">
					<news :title="item.title" :time="item.publish_date" :img="item.images" />
				</view>
			</view>
		</view>

		<my-tabbar></my-tabbar>
	</view>
</template>

<script>
	import {
		getHospitalsByCityName,
		getAllScience
	} from '@/api/api.js'

	import sizeUtil from '../../utils/sizeUtil'

	import {
		textToSpeech
	} from "../../utils/utils.js"

	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	const citySelector = requirePlugin('citySelector')

	export default {
		extends: sizeUtil,
		data() {
			return {
				select: "0",
				top: 0,
				city: "孝感",
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				hospitalList: [],
				news: [],
				newHot: {
					title: "打疫苗得肺结节、白血病？这10个流传甚广的...",
					type: "0",
					time: "2023-4-29",
					img: "",
					content: "sadsadsadasd"
				},
				newHot2: {
					title: "HPV疫苗有副作用吗？",
					type: "1",
					time: "2023-4-29",
					img: "",
					content: "sadsadsadasd"
				}
			}
		},
		methods: {
			selectCity(e) {
				const key = 'NA4BZ-FDJRJ-YWDFO-DRJ56-YUGPQ-XXFAF'; // 使用在腾讯位置服务申请的key
				const referer = '乡村e疗'; // 调用插件的app的名称
				const hotCitys = ''; // 用户自定义的的热门城市

				uni.navigateTo({
					url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
				})
			},
			goTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			read(e) {
				if (counter.voice === true) {
					textToSpeech(e.currentTarget.dataset.val);
				}
			},
			toDetail(item, value) {
				uni.navigateTo({
					url: '/pages/news/detail?item=' + encodeURIComponent(JSON.stringify(item))
				})

				console.log(value);

				if (value && counter.voice === true) {
					textToSpeech(item.scienceTitile);
				}
			},
			to() {
				uni.navigateTo({
					url: "/page_register/selecthospital/selecthospital",
				})
			},
			scanCode() {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			}
		},
		onShow() {
			const selectedCity = citySelector.getCity(); // 选择城市后返回城市信息对象，若未选择返回null
			if (selectedCity) {
				this.city = selectedCity.name
				counter.city = this.city
				getHospitalsByCityName({
					city: selectedCity.name
				}).then((res) => {
					this.hospitalList = res.data
				})
			}
		},
		created() {
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.top = menuButtonInfo.top + ((menuButtonInfo.height - 20) / 2)
		},
		onLoad() {
			uni.hideTabBar()

			const token = uni.getStorageSync('token');
			if (token) {
				getHospitalsByCityName('孝感').then((res) => {
					this.hospitalList = res.data
				})

				getAllScience().then((res) => {
					this.news = (res.data).slice(0, 3)
				})
			} else {
				uni.showToast({
					title: "登录过期",
					icon: 'none',
					success: () => {
						setTimeout(function() {
							uni.redirectTo({
								url: '/pages/login/login'
							});
						}, 500)
					}
				})
			}
		},
		onUnload() {
			// 页面卸载时清空插件数据，防止再次进入页面，getCity返回的是上次的结果
			citySelector.clearCity();
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}

	@pf_regular: {
		font-family: 'PingFang Regular';
	}

	@pf_medium: {
		font-family: 'PingFang Medium';
	}

	.title {
		font-size: 30rem;
		text-align: center;
		width: 100%;
		font-family: 'PingFang Bold';
		color: #ffffff;
	}

	.height(@value) {
		height: @value/2px;
	}

	/deep/ .van-search {
		width: 403rpx !important;
	}

	.box {
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, rgba(32, 140, 247, 1) 0%, rgba(163, 189, 237, 0.12) 15%);

		&_text {
			// 字体用rem
			font-size: 30rem;
			@pf_bold();
			color: white;
			text-align: center;
		}
	}

	.box2 {
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		&_text {
			font-size: 30rem;
			color: white;
			@pf_regular();
			margin-left: 46rpx;
		}

		&_down {
			width: 23rpx;
			height: 23rpx;
			margin-left: 8rpx;
		}

		&_saoma {
			width: 60rpx;
			height: 60rpx;
			margin-left: 43rpx;
		}

		&_search {
			margin-left: 43rpx;
		}
	}

	.box3 {
		width: 680rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 17rpx;
		margin-top: 32rpx;
		margin-left: 35rpx;
		padding: 17px 0px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		image {
			width: 73rpx;
			height: 66rpx;
		}

		text {
			font-size: 28rem;
			@pf_medium();
			margin-top: 15rpx;
		}

		view {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}

	.box4 {
		width: 680rpx;
		border-radius: 13px;
		margin-left: 35rpx;
		margin-top: 27rpx;

		swiper {
			.height(192);

			swiper-item image {
				width: 680rpx;
				.height(192);
			}
		}
	}

	.box5 {
		width: 660rpx;
		background-color: rgba(255, 255, 255, 0.7);
		padding: 12.5px 0px 12.5px 20rpx;
		border-radius: 8.5px;
		margin-left: 35rpx;
		margin-top: 31px;
		display: flex;
		flex-direction: row;

		&_left {
			display: flex;
			flex-direction: column;

			text:first-child {
				font-size: 28rem;
				color: rgba(43, 206, 81, 1);
			}

			text:last-child {
				font-size: 28rem;
			}
		}

		&_right {
			margin-left: 12rpx;

			text {
				font-size: 24rem;
				margin-left: 12rpx;
				// border: 1px solid red;
				width: 507rpx;
			}

			view:first-child {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 2px;
			}

			view:last-child {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 3px;
			}

			image {
				width: 24rem;
				height: 24rem;
			}
		}
	}

	.box6 {
		width: 680rpx;
		margin-left: 35rpx;
		margin-top: 15.5px;
		display: flex;
		flex-direction: column;

		&_header {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;

			>text {
				font-size: 36rem;
			}

			view {
				display: flex;
				flex-direction: row;
				align-items: center;

				text {
					font-size: 24rpx;
					color: rgba(128, 128, 128, 1);
					margin-right: 6rpx;
				}

				image {
					width: 22rpx;
					height: 22rpx;
				}
			}
		}

		&_footer {
			background-color: rgba(255, 255, 255, 0.7);
			border-radius: 8.5px;
			margin-top: 15.5px;
			padding-top: 15px;
			padding-bottom: 15px;

			&_up {
				display: flex;
				flex-direction: row;
				justify-content: space-around;

				view {
					// width: 60rpx;
					// .height(142.03);
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 60rpx;
						.height(59);
					}

					text {
						font-size: 24rem;
						margin-top: 12px;
					}
				}
			}

			&_down {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				margin-top: 14px;

				view {
					// width: 60rpx;
					// .height(115);
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 60rpx;
						.height(59);
					}

					text {
						font-size: 24rem;
						margin-top: 12px;
					}
				}
			}
		}
	}

	.box7 {
		margin-left: 35rpx;
		margin-top: 31rpx;

		text {
			font-size: 36rem;
		}

		.scroll-view_H {
			margin-top: 15.5px;
			white-space: nowrap;
			width: 100%;

			image {
				width: 287rem;
				height: 148rem;
				margin-right: 8rpx;
			}

		}
	}

	.box8 {
		margin-top: 31rpx;
		margin-left: 35rpx;

		&_top {
			text {
				font-size: 36rem;
			}
		}

		image {
			width: 202rpx;
			height: 148rem;
		}

		&_down {
			margin-top: 19px;

			>view {
				display: flex;
				flex-direction: row;
				width: 680rpx;
				height: 148rem;
				background-color: rgba(255, 255, 255, 0.7);
				border-radius: 8.5px;
				margin-bottom: 20rem;
			}
		}

		&_right {
			margin-left: 42rpx;


			&_name {
				font-size: 28rem;
			}

			&_jieshao {
				color: rgba(128, 128, 128, 1);
				font-size: 18rem;
				margin-top: 4px;
			}

			&_juli {
				color: rgba(111, 182, 252, 1);
				font-size: 18rem;
			}

			&_place {
				font-size: 18rem;
				color: rgba(128, 128, 128, 1);
			}

			view:first-child {
				display: flex;
				flex-direction: column;
				margin-top: 15rem;
			}

			view:last-child {
				margin-top: 26rem;
			}
		}
	}

	.box9 {
		margin-left: 35rpx;
		margin-top: 5px;
		width: 668rpx;
		margin-bottom: 70px;

		&_title {
			font-size: 36rem;
		}

		&_list {
			margin-top: 10px;
		}
	}
</style>