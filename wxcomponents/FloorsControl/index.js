// component/FMScrollGroupsControl/FMScrollGroupsControl.js
Component({
    /**
     * 组件的属性列表
     * floors: [{floorNumber, floorName}]
     */
    properties: {
        //楼层数组
        floors: {
            type: Array,
            value: []
        },
        //视野内显示多少个按钮，可手触上下滚动
        showBtnCount: {
            type: Number,
            value: 0,
            observer: function (newVal, oldVal) {
                if (this.properties.showBtnCount < this.properties.floors.length) {
                    this.setData({
                        needArrow: true,
                        scrollHeight: this.properties.showBtnCount * 84
                    })
                } else {
                    this.setData({
                        needArrow: false,
                        scrollHeight: this.properties.showBtnCount * 84
                    })
                }
            }
        },
        //当前的聚焦楼层id
        focus: {
            type: Number,
            value: 1,
            observer: function (newVal, oldVal) {
                this._setArrowBtnStatus(this.properties.focus);
            }
        },
        allLayer: {
            type: Boolean
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        btnUrl: './image/',
        scrollHeight: 250,
        scrollTop: 0,
        isTop: false,
        isBottom: true,
        needArrow: false,
        map: null,
        building: null,
        floorsScroll: null,
    },

    ready: function () {
        this.triggerEvent('ready')
    },

    /**
     * 组件的方法列表
     */
    methods: {

        /**
         * 切换聚焦楼层
         * @param {*} e 
         */
        switchFloor: function (e, isFloorNumber) {
            let focusId = isFloorNumber ? e : e.currentTarget.dataset.floornumber;

            this.building.focusFloors(focusId);
            // focus.value = e.detail
            this.setData({
                focus: focusId
            })

            this.triggerEvent('switchFloor', focusId);
        },

        /**
         * 设置上下箭头按钮的状态
         * @param {*} focusId 聚焦楼层id
         */
        _setArrowBtnStatus: function (focusId) {
            if (focusId === 1) {
                this.setData({
                    isBottom: true
                })
                // this.properties.isBottom = true
            } else if (focusId === this.properties.floors.length - 1) {
                this.setData({
                    isTop: true
                })
                // this.properties.isTop = true
            } else {
                this.setData({
                    isTop: false,
                    isBottom: false
                })

                // this.properties.isBottom = false
                // this.properties.isTop = false
            }
        },

        /**
         * 切换单层多层
         */
        showAllFloors: function () {
            var boo  = this.properties.allLayer

            this.setData({
                allLayer: !boo
            })

            if (this.properties.allLayer) {
                this.building.viewFloors();
            } else {
                this.building.viewFloors(this.building.currentFocus);
            }

            this.triggerEvent('showAllFloors', boo);
        },

        /**
         * 向上切换楼层
         */
        goTop: function () {
            let floorNumber = this.properties.focus + 1;
            this.switchFloor(floorNumber, true)
            this.triggerEvent('switchFloor', floorNumber);
        },

        /**
         * 向下切换楼层
         */
        goBottom: function () {
            let floorNumber = this.properties.focus - 1;
            this.switchFloor(floorNumber, true)
            this.triggerEvent('switchFloor', floorNumber);
        },

        bind: function (map) {
            this.map = map

            map.on('buildingLoaded', b => {
                this.building = b

                var fs = b.data.floors.map(f => {
                    return {
                        floorNumber: f.floorNumber, 
                        floorName: f.floorName
                    }
                }).sort((a, b) => b.floorNumber - a.floorNumber);

                this.setData({
                    floors: fs,
                    scrollTop: fs.length * 84,
                    needArrow: this.properties.showBtnCount < fs.length
                })

            })
        },

        // 2d / 3d 切换
        changeMode: function () {
            this.map.view.viewMode = this.properties.is3D ? '2d' : '3d';

            // is3D.value = !is3D.value
            this.setData({
                is3D: !this.properties.is3D
            })
        }
    }
})
