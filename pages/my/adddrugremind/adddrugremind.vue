<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="header">
		<title name="添加用药提醒" color="#fff"></title>
	</view>

	<van-cell-group>
		<van-field :value="name" label="药品名" placeholder="请输入药品名" @input="inputName" />
		<van-field :value="dose" label="剂量" placeholder="请输入服用剂量" @input="inputDose" />
		<view class="select_time">
			<text>用药时间</text>
			<text @click="openPopup">{{time}}</text>
		</view>
		<van-field :value="notes" label="备注" placeholder="请输入备注" @input="inputNotes" />
	</van-cell-group>

	<van-popup :show="show" position="bottom" custom-style="height: 50%;">
		<van-datetime-picker type="time" @confirm="confirm" @cancel="cancel" />
	</van-popup>

	<view class="btn" @click="add">添加</view>
</template>

<script>
	import {
		addMedicationReminder
	} from '@/api/api.js'

	import sizeUtil from '../../../utils/sizeUtil'

	export default {
		extends: sizeUtil,
		data() {
			return {
				name: "",
				dose: "",
				notes: "",
				show: false,
				time: "点击选择",
			}
		},
		methods: {
			confirm(value) {
				this.show = false
				this.time = value.detail
			},
			openPopup() {
				this.show = true
			},
			cancel() {
				this.show = false
			},
			add() {
				const that = this

				if (!this.name || !this.dose || this.time === "点击选择") {
					uni.showToast({
						title: "请完整填写用药信息",
						icon: "none",
					});
					return;
				}
				let info = uni.getStorageSync('userinfo')

				addMedicationReminder({
					userId: info.user_id,
					drugName: this.name,
					reminderTime: this.time,
					status: 1,
					dose: this.dose
				}).then((res) => {
					if (res.status == 200) {
						uni.showToast({
							title: "添加成功",
							icon: 'success',
						})

						uni.requestSubscribeMessage({
							tmplIds: ['GPeHLiXQrUMiY9EpZReIMtuFttGyMF5PClEPG-uC9ws'],
							success(res) {
								uni.redirectTo({
									url: '/pages/my/drugremind/drugremind'
								})
							}
						})
					} else {
						uni.showToast({
							title: "添加失败",
							icon: 'fail',
						})
					}
				})
			},
			inputName(e) {
				this.name = e.detail
			},
			inputDose(e) {
				this.dose = e.detail
			},
			inputNotes(e) {
				this.notes = e.detail
			}
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}

	/deep/ .van-field__label {
		color: #000 !important;
	}

	.header {
		background-color: #4B97F8;
		padding-bottom: 20px;
		margin-bottom: 10px;
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

	.select_time {
		font-size: 14px;
		background-color: white;
		display: flex;

		text:first-child {
			padding-top: 10px;
			margin-left: 16px;
			display: block;
			padding-bottom: 10px;
		}

		text:last-child {
			padding-top: 10px;
			margin-left: 85rpx;
			display: block;
			padding-bottom: 10px;
		}
	}
</style>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
</style>