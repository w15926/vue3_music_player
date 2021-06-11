<template>
  <div class="discover">
    <!-- 轮播图 -->
    <el-carousel :interval="1500" type="card" height="200px">
      <el-carousel-item v-for="item in banner" :key="item.encodeId">
        <a href="">
          <div>
            <img :src="item.imageUrl" alt="">
            <span>{{ item.typeTitle }}</span>
          </div>
        </a>
      </el-carousel-item>
    </el-carousel>

    <!--  -->
  </div>
</template>

<script>
import { getBannerData } from '@/api/discover'
import { onMounted, reactive, ref, toRefs } from '@vue/runtime-core'
export default {
  setup() {
    let state = reactive({
      banner: [], // 轮播图
    })

    onMounted(() => {
      getBannerData().then(res => {
        state.banner = res.banners
        console.log(state.banner)
      })
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
.discover {
  padding: 20px 100px;
  .el-carousel {
    a {
      display: block;
      div {
        position: relative;
        border-radius: 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          vertical-align: bottom;
        }
        span {
          position: absolute;
          bottom: -1px;
          right: -1px;
          padding: 3px 10px 0;
          color: $color3;
          font-size: $font-size;
          height: 20px;
          border-radius: 10px 0 10px 0;
          background-color: $color2;
        }
      }
    }
  }
}
</style>