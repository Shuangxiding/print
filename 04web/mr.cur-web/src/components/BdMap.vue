<template>
  <div class="bdmap map">
    <baidu-map class="bm-view map" :center="center" @ready="handler" :min-zoom="14" :max-zoom="30" :zoom="14" :scroll-wheel-zoom="true">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />-->
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT" />
      <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_DROP" :label="{content: this.$store.state.accManage.baidu_info.address, opts: {offset: {width: 20, height: -10}}}"></bm-marker>
    </baidu-map>
  </div>
</template>
<script>
  import servers from '@/config/servers'
  import net from '@/util/net'
  export default {
    name: 'bd-map',
    data() {
      return {
        center: { lng: 108, lat: 32 },
        zoom: '15',
        ready: false,
        callback: null
      }
    },
    methods: {
      /**
       * BaiduMap 组件的 ready 事件来执行地图 API 加载完毕后才能执行的代码
       */
      handler() {
        this.ready = true
        if (this.callback) {
          this.callback()
        }
      },
      /**
       * 解析地址
       */
      addressToLngLat(type) {
        let address
        this.zoom = 20
        if (!this.ready) {
          this.callback = this.addressToLngLat
          return
        }
        if (type) {
          let Address = this.$store.state.accManage.baidu_info.address
          let CityName = this.$store.state.accManage.baidu_info.cityName
          address = CityName + Address
        } else {
          address = this.$store.state.accManage.baidu_info.address
        }
        // let Address = this.$store.state.accManage.baidu_info.address
        // let CityName = this.$store.state.accManage.baidu_info.cityName
        // let address = CityName + Address
        net.send({
          server: servers.AccManage.get_map_info,
          data: {
            address: address
          }
        }).then((data) => {
          console.log(address)
          console.log(data)
          this.center = {
            lng: parseFloat(data.lng).toFixed(5),
            lat: parseFloat(data.lat).toFixed(5)
          }
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      }
    }
  }

</script>
<style>
  .bm-view {
    height: 100%;
    width: 100%;
    overflow: visible;
  }
  
  .message-label {
    font-size: 14px;
    color: #333;
  }
  
  .bdmap {
    width: 100%;
    height: 610px;
  }

</style>
