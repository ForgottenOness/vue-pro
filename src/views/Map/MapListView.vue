<template>
  <div class="home">
    <!--创建地图容器-->
    <el-space>
      <el-input v-model="content" placeholder="请输入几路公交"></el-input>
      <el-button type="success" @click="getRoad">获取路线</el-button>
    </el-space>
    <div id="container" class="allmap"></div>
  </div>
</template>

<script>
import { BMPGL } from '@/maplist.js'
export default {
  name: 'home',
  data() {
    return {
      ak: 'owH9ZCdluSluQp2xnXMXadzzLyyyG3v5', // 百度的地图密钥
      content: ''
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    getRoad() {
      this.initMap((busSearch) => {
        busSearch(this.content)
      })
    },
    initMap(callback) {
      // 传入密钥获取地图回调。
      BMPGL(this.ak)
        .then((BMapGL) => {
          // 创建地图实例
          let map = new BMapGL.Map('container')
          // 创建点坐标 axios => res 获取的初始化定位坐标
          let point = new BMapGL.Point(120.330012, 36.0723)
          // 初始化地图，设置中心点坐标和地图级别
          map.centerAndZoom(point, 13)
          //开启鼠标滚轮缩放
          map.enableScrollWheelZoom(true)
          map.setHeading(64.5)
          map.setTilt(73)

          // 创建地图标识
          var marker = new BMapGL.Marker(point) // 创建标注
          map.addOverlay(marker) // 将标注添加到地图中
          var opts = {
            width: 200, // 信息窗口宽度
            height: 100, // 信息窗口高度
            title: '青岛市', // 信息窗口标题
            message: '这里是青岛地区'
          }
          var infoWindow = new BMapGL.InfoWindow('地址：山东省青岛市', opts) // 创建信息窗口对象
          marker.addEventListener('click', function () {
            map.openInfoWindow(infoWindow, point) //开启信息窗口
          })

          // 公交路况获取
          var busline = new BMapGL.BusLineSearch(map, {
            renderOptions: { map: map, panel: 'r-result' },
            onGetBusListComplete: function (result) {
              if (result) {
                var fstLine = result.getBusListItem(0) //获取第一个公交列表显示到map上
                busline.getBusLine(fstLine)
              }
            }
          })
          function busSearch(road) {
            var busName = road
            busline.getBusList(busName)
          }
          callback && callback(busSearch)
          // setTimeout(function () {
          //   busSearch()
          // }, 1500)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  padding: 14px;
  .el-space {
    margin-bottom: 5px;
  }
}
.allmap {
  height: 100%;
  position: relative;
  z-index: 1;
}
</style>
