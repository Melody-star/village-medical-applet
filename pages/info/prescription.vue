<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="header">
		<title name="编写处方" color="#fff"></title>
	</view>
	<view>
		<van-cell-group>
			<van-field label="姓名" id="name" placeholder="请输入姓名" :border="false" @change="onChange" />
			<van-field label="年龄" id="sex" placeholder="请输入年龄" :border="false" @change="onChange" />
			<van-field label="性别" id="age" placeholder="请输入性别" :border="false" @change="onChange" />
			<van-field label="诊断结果" id="result" placeholder="请输入诊断结果" :border="false" @change="onChange" />
			<van-field label="药品名" id="drug" placeholder="请输入药品名" :border="false" @change="onChange" />
			<van-field label="剂量" id="usage" placeholder="请输入药品剂量" :border="false" @change="onChange" />
			<van-field label="医师" id="doctor" placeholder="请输入医师名字" :border="false" @change="onChange" />
		</van-cell-group>
	</view>

	<view class="btn" @click="affirm">确认</view>

	<canvas canvas-id="myCanvas"
		style="border: 1px solid red;width: 480px;height: 658px;position:fixed;left:100%;"></canvas>
</template>

<script>
	import {
		addPrescription
	} from "@/api/api.js"

	import sizeUtil from '@/utils/sizeUtil.js'

	export default {
		extends: sizeUtil,
		data() {
			return {
				name: "张三",
				sex: "男",
				age: "19",
				result: "喉咙不适，有痰",
				drug: "阿莫西林",
				usage: "用法用量：每天三次",
				doctor: "张三",
				url: "",
				id: ""
			}
		},
		onLoad(option) {
			console.log(option.id);
			this.id = option.id
		},
		methods: {
			onChange(e) {
				switch (e.currentTarget.id) {
					case "name":
						this.name = e.detail
						break;
					case "sex":
						this.sex = e.detail
						break;
					case "age":
						this.age = e.detail
						break;
					case "result":
						this.result = e.detail
						break;
					case "drug":
						this.drug = e.detail
						break;
					case "usage":
						this.usage = e.detail
						break;
					case "doctor":
						this.doctor = e.detail
						break;
				}
			},
			affirm() {
				let that = this
				const ctx = uni.createCanvasContext('myCanvas')

				ctx.drawImage("../../static/chufang.png", 0, 0)

				ctx.setFontSize(18)
				ctx.setFillStyle('#000')
				ctx.fillText(this.name, 93, 108);

				ctx.setFontSize(18)
				ctx.setFillStyle('#000')
				ctx.fillText(this.sex, 220, 108);

				ctx.setFontSize(18)
				ctx.setFillStyle('#000')
				ctx.fillText(this.age, 350, 108);

				ctx.setFontSize(18)
				ctx.setFillStyle('#000')
				ctx.fillText(this.result, 37, 190);

				ctx.setFontSize(18)
				ctx.setFillStyle('#000')
				ctx.fillText(this.drug, 37, 340);

				ctx.setFontSize(18)
				ctx.setFillStyle('rgba(128, 128, 128, 1)')
				ctx.fillText(this.usage, 37, 380);

				ctx.setFontSize(18)
				ctx.setFillStyle('rgba(128, 128, 128, 1)')
				ctx.fillText(this.doctor, 90, 537);

				ctx.setFontSize(18)
				ctx.setFillStyle('rgba(128, 128, 128, 1)')
				ctx.fillText(new Date().toLocaleString(), 265, 537);

				ctx.draw()

				uni.canvasToTempFilePath({
					destWidth: 480,
					destHeight: 658,
					canvasId: 'myCanvas',
					success: function(res) {
						uni.uploadFile({
							url: 'https://medical.sjrksxx.top/sms/system/scwj',
							filePath: res.tempFilePath,
							name: 'file',
							header: {
								"Content-Type": "multipart/form-data"
							},
							success: (uploadFileRes) => {
								that.url = JSON.parse(uploadFileRes.data).data.url

								addPrescription({
									userPrescription: that.url,
									userId: that.id
								}).then((res) => {
									console.log(res);
								})

								that.back()
							}
						});
					}
				})
			},
			back() {
				// 1. 获取当前页面栈实例（此时最后一个元素为当前页）
				let pages = getCurrentPages()

				// 2. 上一页面实例
				// 注意是length长度，所以要想得到上一页面的实例需要 -2
				// 若要返回上上页面的实例就 -3，以此类推
				let prevPage = pages[pages.length - 2]

				// 3. 给上一页面实例绑定getValue()方法和参数（注意是$vm）
				prevPage.$vm.getValue(this.url)

				// 4. 返回上一页面
				uni.navigateBack({
					delta: 1 // 返回的页面数
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.header {
		background-color: #4b97f8;
		padding-bottom: 20px;

	}

	.btn {
		width: 587rpx;
		height: 34.5px;
		background-color: rgba(75, 151, 248, 1);
		margin-left: 82rpx;
		border-radius: 5px;
		color: #fff;
		font-size: 28rem;
		text-align: center;
		line-height: 34.5px;
		position: absolute;
		bottom: 30px;
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>