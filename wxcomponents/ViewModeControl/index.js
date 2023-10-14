// component/FMViewModeControl/FMViewModeControl.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 2、3D状态
        is3D: {
            type: Boolean,
            value: true,
            observer: function (newVal, oldVal) {
                // console.log("is allLayer")
                this.setData({
                    viewMode: newVal ? '3D' : '2D'
                })
            }
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        btnUrl: './image/',
        viewMode: '3D',
        map: null
    },

    ready: function () {
        this.triggerEvent('ready')
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bind: function (map) {
            this.map = map
        },

        // 切换2、3D状态
        changeMode() {
            console.log('changemode.....')

            var boo = !this.properties.is3D

            this.map.view.viewMode = !boo ? '2d' : '3d';

            this.setData({
                is3D: boo
            })

            this.triggerEvent('changeMode');
        }
    }
})
