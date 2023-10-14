<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<view style="background-color: #fff;padding-bottom: 20px;">
			<title name="就诊信息"></title>
		</view>

		<van-notice-bar wrapable :scrollable="false" text="请输入真实信息实名就诊,如因信息错误产生的一切后果自行负责." />

		<view class="box">
			<van-cell-group>
				<van-field :value="name" required clearable label="姓名" placeholder="请输入姓名" @input="inputName" />
				<van-field :value="id" label="身份证号" placeholder="请输入身份证号" required @input="inputId" />
				<van-field :value="address" label="详细居住地址" placeholder="请输入住址" required @input="inputAddress" />
				<van-field :value="phone" label="手机号码" placeholder="请输入手机号码" required @input="inputPhone" />
			</van-cell-group>
		</view>
	</view>

	<view class="btn" @click="add">提交</view>
</template>

<script>
	import {
		addMedicalInfo,
		getMedicalInfo
	} from "@/api/api.js"

	import sizeUtil from '../../../utils/sizeUtil'

	export default {
		extends: sizeUtil,
		data() {
			return {
				name: "",
				id: "",
				address: "",
				phone: "",
				prevpage: {}
			}
		},
		onLoad(option) {
			const that = this

			let pages = getCurrentPages();
			this.prevpage = pages[pages.length - 2];

			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					getMedicalInfo(res.data.accountId).then((res1) => {
						if (res1.data != null) {
							uni.showToast({
								title: "您已添加过信息！",
								icon: "none"
							})
						}
					})
				}
			});
		},
		methods: {
			inputName(e) {
				this.name = e.detail
			},
			inputId(e) {
				this.id = e.detail
			},
			inputAddress(e) {
				this.address = e.detail
			},
			inputPhone(e) {
				this.phone = e.detail
			},
			add() {
				const that = this

				if (!this.name || !this.id || !this.address || !this.phone) {
					uni.showToast({
						title: "请输入完整信息",
						icon: "error"
					})
					return
				}

				if (this.id.length != 18) {
					uni.showToast({
						title: "身份证号码输入有误，请输入18位身份证号码",
						icon: "none"
					})
					return
				}

				uni.getStorage({
					key: 'userinfo',
					success(userinfo) {
						addMedicalInfo({
							medicalAddress: that.address,
							medicalIdcard: that.id,
							medicalName: that.name,
							medicalPhone: that.phone,
							userId: userinfo.data.accountId
						}).then((res) => {
							console.log(res);
							if (res.message == "成功") {
								uni.showToast({
									title: "添加成功",
									icon: 'success',
									success: () => {
										setTimeout(function() {
											if (that.prevpage.route ==
												"page_register/affirm/affirm") {
												uni.navigateBack({
													delta: 1
												});
											} else {
												uni.redirectTo({
													url: '/pages/my/my'
												});
											}
										}, 500)
									}
								})
							} else {
								uni.showToast({
									title: "添加失败",
									icon: "error"
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}

	.box {
		background-color: white;
		width: 100%;
		margin-top: 3px;
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
		bottom: 20px;
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>