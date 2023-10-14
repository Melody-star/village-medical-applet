<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<title name="全部科室"></title>

		<view style="display: flex;margin-left: 29rpx;margin-top: 16px;">
			<image style="width: 75rpx;height: 75rpx;border-radius: 5px;" :src="hospitalImg"></image>
			<view style="margin-left: 29rpx;">
				<text style="font-size: 28rem;">{{hospitalName}}</text>
				<view style="margin-top: 3px;">
					<image style="width: 77rpx;height: 26rpx;margin-left: 9rpx;" src="../../static/zonghe.png"></image>
				</view>
			</view>
		</view>

		<van-divider />

		<van-tree-select @click-nav="clickNav" @click-item="clickItem" height="620px" :items="list"
			:main-active-index="mainActiveIndex" :active-id="activeId" />

	</view>
</template>

<script>
	import {
		getDepartmentsById
	} from "@/api/api.js"

	import {
		useCounterStore
	} from '@/stores/counter.js'
	const counter = useCounterStore();

	import sizeUtil from '@/utils/sizeUtil.js';
	export default {
		extends: sizeUtil,
		data() {
			return {
				mainActiveIndex: 0,
				activeId: null,
				navValue: "",
				hospitalName: "",
				hospitalImg: "",
				hospitalId: null,
				itemValue: "",
				list: []
			}
		},
		onLoad(option) {
			this.hospitalName = option.name
			this.hospitalImg = option.img
			this.hospitalId = option.id

			getDepartmentsById(this.hospitalId).then((res) => {
				console.log(res);
				const result = this.transformJson(res);
				this.list = result
			})
		},
		methods: {
			clickNav(e) {
				this.mainActiveIndex = e.detail.index
			},
			clickItem(e) {
				console.log(e);
				this.itemValue = e.detail.text
				const id = e.detail.id

				counter.registerInfo['department'] = e.detail.text
				counter.registerInfo['departmentPlace'] = "医技楼三楼"

				uni.navigateTo({
					url: '/page_register/doctor/doctor?id=' + id
				})
			},
			transformJson(data) {
				const result = [];
				for (const item of data) {
					const department = item.department;
					const departmentDict = {
						text: department.departmentName,
						children: []
					};
					for (const secondDepartment of item.secondDepartmentList) {
						departmentDict.children.push({
							text: secondDepartment.seconddepartmentName,
							id: secondDepartment.id
						});
					}
					result.push(departmentDict);
				}
				return result;
			}
		}
	}
</script>

<style scoped lang="less">
	@pf_bold: {
		font-family: 'PingFang Bold';
	}
</style>

<style>
	.van-sidebar-item--selected {
		border-color: rgba(75, 151, 248, 1) !important;
	}
</style>