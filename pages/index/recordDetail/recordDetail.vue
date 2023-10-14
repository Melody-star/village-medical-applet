<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="header">
		<title name="修改信息" color="#fff"></title>
	</view>
	<view>
		<van-cell-group>
			<van-field label="过往病史" id="name" placeholder="请输入过往病史" :border="false" @change="onChange" />
			<van-field label="家族病史" id="sex" placeholder="请输入家族病史" :border="false" @change="onChange" />
			<van-field label="过敏史" id="age" placeholder="请输入过敏史" :border="false" @change="onChange" />
			<van-field label="肝功能" id="result" placeholder="请输入肝功能" :border="false" @change="onChange" />
			<van-field label="肾功能" id="usage" placeholder="请输入肾功能" :border="false" @change="onChange" />
			<van-field label="特殊人群" id="doctor" placeholder="请输入特殊人群" :border="false" @change="onChange" />
		</van-cell-group>
	</view>

	<view class="btn" @click="affirm">确认</view>
</template>

<script>
	import sizeUtil from '@/utils/sizeUtil.js'

	export default {
		extends: sizeUtil,
		data() {
			return {
				name: "",
				sex: "",
				age: "",
				result: "",
				drug: "",
				doctor: "",
				url: "",
				id: ""
			}
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
					case "usage":
						this.usage = e.detail
						break;
					case "doctor":
						this.doctor = e.detail
						break;
				}
			},
			affirm() {
				uni.navigateTo({
					url: "/pages/index/record/record?name=" + this.name + '&sex=' + this.sex + '&age=' + this.age +
						'&result=' + this.result + '&usage=' + this.usage + '&doctor=' + this.doctor
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