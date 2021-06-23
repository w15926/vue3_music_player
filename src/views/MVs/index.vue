<template>
  <div class="mv">
    <div class="recommend-mv">
      <p class="title">
        推荐MV
        <svg class="icon i-arrow" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
      <div class="wrap">
        <div class="detail" v-for="item in recMV" :key="item.id">
          <div class="play-count">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            {{ item.playCount }}
          </div>
          <div class="img-box"><img :src="item.picUrl" alt=""></div>
          <p class="mv-title">{{ item.name }}</p>
          <p class="mv-info">{{ item.artistName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { recommendMV } from '@/api/MV'
import { playCount } from '@/utils/playCount'
import { onMounted, reactive, toRefs, watch } from '@vue/runtime-core'

export default {
  name: 'MVs',
  setup() {
    let state = reactive({
      recMV: [], // 推荐音乐
    })

    onMounted(() => {
      getRecommendMV()
    })

    // 得到推荐音乐
    const getRecommendMV = () => {
      recommendMV().then(res => {
        state.recMV = res.result
        playCount(state.recMV) // 过滤播放次数  26000 -->  2万
      })
    }

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
.mv {
  padding: 20px;
  .recommend-mv {
    width: 100%;
    .title {
      color: #000;
      font-size: $font-size-big;
      font-weight: 500;
      cursor: pointer;
    }
    .wrap {
      display: flex;
      justify-content: space-between;
      height: 170px;
      margin-top: 15px;
      cursor: pointer;
      .detail {
        position: relative;
        flex: 0 0 23%;
        border-radius: 10px;
        overflow: hidden;
        .play-count {
          position: absolute;
          top: 5px;
          right: 8px;
          color: #fff;
        }
        .img-box {
          width: 100%;
          height: 110px;
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .mv-title {
          margin: 5px 0;
          @include nowrapEllipsis;
        }
        .mv-info {
          font-size: $font-size-small;
          color: $color4;
          @include nowrapEllipsis;
        }
      }
    }
  }
}
</style>