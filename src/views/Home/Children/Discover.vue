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

    <!-- 推荐歌单 -->
    <div class="rMusic-box">
      <p class="title">推荐歌单</p>
      <div class="rMusic" v-for="item in recommendMusic" :key="item.id">
        <div class="rMusic-img">
          <img :src="item.picUrl" alt="">
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getBannerData, getRecommendMusic } from '@/api/discover'
import { onMounted, reactive, ref, toRefs } from '@vue/runtime-core'
export default {
  name: 'discover',
  setup() {
    let state = reactive({
      banner: [], // 轮播图
      recommendMusic: [], // 推荐歌单
    })

    onMounted(() => {
      // 获取轮播图
      getBannerData().then(res => {
        state.banner = res.banners
        console.log('轮播图', state.banner)
      })
      // 获取推荐歌单
      const data = { limit: 10 }
      getRecommendMusic(data).then(res => {
        state.recommendMusic = res.result
        console.log('推荐歌单', state.recommendMusic);
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
  // 宽度1240
  padding: 20px 35px;
  // 轮播图
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
  // 推荐歌单
  .rMusic-box {
    .title {
      font-size: 22px;
      margin-bottom: 20px;
    }
    margin-top: 30px;
    .rMusic:nth-child(6) {
      margin-right: 0;
    }
    .rMusic:nth-child(11) {
      margin-right: 0;
    }
    .rMusic:nth-child(6) {
      margin-right: 0;
    }
    .rMusic {
      display: inline-block;
      width: 170px;
      height: 220px;
      margin-right: 28px;
      margin-bottom: 30px;
      border-radius: 10px;
      overflow: hidden;

      .rMusic-img {
        width: 100%;
        height: 175px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
      p {
        margin-top: 13px;
      }
    }
  }
}
</style>