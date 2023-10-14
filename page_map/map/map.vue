<template>
	<view style="height: 100%">
		<!-- 绘制3D地图所用的canvas -->
		<canvas type="webgl" id="ooomap" style="width: 100%; height: 100%" disable-scroll @touchstart="touchStart"
			@touchmove="touchMove" @touchend="touchEnd"></canvas>

		<!-- 创建2d平面图像画布 -->
		<canvas type="2d" id="canvas2d" style="pointer-events: none; position: absolute; left: -1000px;"></canvas>

		<!-- 楼层控件 -->
		<floors-control v-if="mapLoaded" id="floors-control" showBtnCount="4" @ready="floorsControlReady" />

		<!-- 2d、3d控件 -->
		<viewmode-control v-if="mapLoaded" id="view-mode" :is3D="true" @ready="viewModeReady" />
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onBeforeUnmount,
		getCurrentInstance
	} from "vue"

	// 在uni-app中需要这样引入ooomap SDK
	var om = require("../static/ooomap.xcx.min.js")

	// var om = require('../../static/ooomap.xcx.min.js')

	// ooomap map 实例
	var map
	var canvas2d, canvas3d
	var fc, vm
	var building
	var startMarker, endMarker;
	var pickCount = 0;
	var from, to;

	var mapLoaded = ref(false)

	// page instance
	var self

	// 封装在微信小程序中得到domElement的方法
	function getElement(id, callback) {
		uni.createSelectorQuery().select(`#${id}`).fields({
			node: true,
			size: true
		}).exec(res => {
			if (res[0]) {
				var node = res[0].node

				if (callback) {
					callback(node)
				}
			}
		})
	}

	// 初始化楼层组件
	function floorsControlReady() {
		fc = self.ctx.selectComponent('#floors-control')
		fc.bind(map)
	}

	// 初始化2d/3d切换组件
	function viewModeReady() {
		vm = self.ctx.selectComponent('#view-mode')
		vm.bind(map)
	}

	onMounted(() => {

		// 得到当前的页面实例
		// 用于获取 使用到的微信组件
		// self.ctx.selectComponent('#id')
		self = getCurrentInstance()

		getElement('ooomap', node => {
			canvas3d = node
			getElement('canvas2d', node => {
				canvas2d = node

				// 得到2个必需的 canvas 后, 创建 ooomap 对象
				createOMMap(canvas3d, canvas2d)

			})
		})
	})

	// 在离开页面时销毁地图对象
	onBeforeUnmount(() => {
		if (map) {
			map.dispose()
		}
	})

	//
	// 创建 ooomap 地图实例
	//
	function createOMMap(canvas3d, canvas2d) {

		// 创建 ooomap 地图对象
		map = new om.Map({
			container: canvas3d, // canvas type: webgl
			canvas2d: canvas2d, // canvas type: 2d

			appID: '87ae6a00e5ca4e33dd7e858a66b73475',
			verifyUrl: 'https://www.ooomap.com/ooomap-verify/check/50689bb01e0ac2a9d93bb18f1e1260f8',

			viewMode: '3d',
			viewAngle: 0,

			frameRate: 20,
		})

		console.log("地图创建完成", map);

		// ooomap 已经创建
		// 可以初始化楼层组件了
		mapLoaded.value = true

		map.on('picked', res => {
			if (!res.node) {
				return
			}

			if (res.node.type === 'SpriteMarkerNode') {
				res.node.flash()
			}
		})

		// 得到建筑对象
		map.on('buildingLoaded', b => {
			building = b;

			// 创建起终点marker
			startMarker = createMarker('https://www.ooomap.com/assets/map_images/start2.png');
			endMarker = createMarker('https://www.ooomap.com/assets/map_images/end2.png');

		})

		// 拾取地图中的对象
		map.on('picked', result => {

			var node = result.node;

			// 只针对 POI 对象
			if (!node || node.type !== 'SpriteMarkerNode') {
				if (building) {
					building.clearRoutes();
					startMarker.show = endMarker.show = false;
				}
				return;
			}

			console.log(node);

			node.flash();

			// 先得到此结点的所有父级, 知道他是属于哪个楼层, 哪个建筑
			// ancestor: {buildingID: string, floorNumber: int, building: OMBuilding, floor: OMFloor}
			var ancestor = node.getAncestor();

			// 拾取点计数
			pickCount++;

			// 当拾取2个点后, 创建路径
			if (pickCount % 2 === 0) {
				pickCount = 0;

				// 到达点的数据
				to = {
					floorNumber: ancestor.floorNumber,
					point: node.position.clone()
				}

				endMarker.position = node.position;
				ancestor.floor.markerNode.add(endMarker);
				endMarker.show = true;

				// 可以设置一下途经点
				var tujing = {
					floorNumber: ancestor.floorNumber,
					point: [36, 25]
				}

				//
				// 得到两点间的最优路线
				//
				building.findPath(from, tujing, to).then(res => {
					console.log('routeResult: ', res)
				})


			} else {

				// 先清空之前的路径线
				building.clearRoutes();

				// 起始点数据, 生成的路径线较楼板的高度为 1米
				from = {
					floorNumber: ancestor.floorNumber,
					point: node.position.clone()
				}

				startMarker.position = node.position;
				ancestor.floor.markerNode.add(startMarker);
				startMarker.show = true;
				endMarker.show = false;
			}

		})
	}

	//
	// 创建POI标记的方法
	//
	function createMarker(url) {
		var marker = new om.SpriteMarkerNode(map, {
			type: 'poi',
			autoHide: false, // 在遮挡时, 不会自动避让
			priority: 10,
			renderOrder: 3,
			content: {
				image: {
					url: url,
					width: 60,
					height: 60
				}
			}
		})

		// 先将标注隐藏, 在点击起/终点时再显示出来
		marker.show = false
		map.omScene.markerNode.add(marker)

		return marker;
	}

	// 必要的几个canvas3d事件
	function touchStart(e) {
		canvas3d.dispatchTouchEvent({
			...e,
			type: 'touchstart'
		})
	}

	function touchMove(e) {
		canvas3d.dispatchTouchEvent({
			...e,
			type: 'touchmove'
		})
	}

	function touchEnd(e) {
		canvas3d.dispatchTouchEvent({
			...e,
			type: 'touchend'
		})
	}

	// window.addEventListener('resize', () => {
	// 	map.view.resize();
	// })
</script>

<style>
</style>