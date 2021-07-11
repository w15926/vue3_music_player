<template>
  <div class="mv">
    <!-- 推荐MV -->
    <div class="recommend-mv">
      <p class="title">
        推荐MV
        <svg class="icon i-arrow" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
      <div class="wrap">
        <div class="detail" v-for="item in recMV" :key="item.id" @click="playerMV(item)">
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
    <!-- 最新MV -->
    <div class="new-mv">
      <p class="title title-new">
        最新MV
        <svg class="icon i-arrow" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
      <div class="category">
        <span v-for="(item,index) in tags" :key="index" :class="{'tag-active':currentIndex == index}"
          @click="getCurrentMusic(index)">{{ item }}</span>
      </div>
      <div class="wrap">
        <div class="detail" v-for="item in newMV" :key="item.id" @click="playerMV(item)">
          <div class="play-count">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            {{ item.playCount }}
          </div>
          <div class="img-box"><img :src="item.cover" alt=""></div>
          <p class="mv-title">{{ item.name }}</p>
          <p class="mv-info">{{ item.artistName }}</p>
        </div>
      </div>
    </div>
    <!-- 网易出品 -->
    <div class="wangyi-mv">
      <p class="title">
        网易出品
        <svg class="icon i-arrow" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
      <div class="wrap">
        <div class="detail" v-for="item in wangYiMV" :key="item.id" @click="playerMV(item)">
          <div class="play-count">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            {{ item.playCount }}
          </div>
          <div class="img-box"><img :src="item.cover" alt=""></div>
          <p class="mv-title">{{ item.name }}</p>
          <p class="mv-info">{{ item.artistName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { recommendMV, newMv, wangYiRelease } from '@/api/MV'
import { playCount } from '@/utils/playCount'
import { computed, onMounted, reactive, toRefs, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'MVs',
  setup() {
    let router = useRouter()
    let store = useStore()
    let state = reactive({
      recMV: [], // 推荐音乐
      tags: ['内地', '港台', '欧美', '日本', '韩国'],
      currentIndex: computed(() => store.state.user.newMVCurrentIndex),
      newMV: [], // 最新音乐
      wangYiMV: [], // 网易出品
    })

    onMounted(() => {
      getRecommendMV()
      getNewMv()
      getWangYiRelease()
    })

    // 推荐音乐
    const getRecommendMV = () => {
      recommendMV().then(res => {
        state.recMV = res.result
        playCount(state.recMV) // 过滤播放次数  26000 -->  2万
      })
    }
    // 最新音乐
    const getNewMv = () => {
      const params = { area: state.tags[state.currentIndex], limit: 8 }
      newMv(params).then(res => {
        state.newMV = res.data
        playCount(state.newMV)
      })
    }

    // 点击标签得到当前音乐
    const getCurrentMusic = index => {
      store.commit('user/changeNewMVCurrentIndex', index)
      getNewMv()
    }

    // 网易出品
    const getWangYiRelease = () => {
      const params = { limit: 8 }
      wangYiRelease(params).then(res => {
        state.wangYiMV = res.data
        playCount(state.wangYiMV)
      })
    }

    // 播放mv
    const playerMV = item => {
      console.log(item);
      return router.push({
        path: '/playerMV',
        query: {
          id: item.id,
          name: item.name,
          coverImg: item.cover,
          picUrl: item.picUrl,
          playCount:item.playCount
        }
      })
    }

    return {
      ...toRefs(state),
      getCurrentMusic,
      playerMV
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
.mv {
  padding: 20px;
  @include tagActive;
  .recommend-mv,
  .new-mv,
  .wangyi-mv {
    width: 100%;
    position: relative;
    .title {
      color: #000;
      font-size: $font-size-big;
      font-weight: 500;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .title-new {
      position: absolute;
      top: 0;
      left: 0;
    }
    .wrap {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      // height: 170px;
      // margin-top: 15px;
      cursor: pointer;
      .detail {
        position: relative;
        flex: 0 0 23%;
        border-radius: 10px;
        margin-bottom: 25px;
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
          padding: 0 5px;
          @include nowrapEllipsis;
        }
        .mv-info {
          font-size: $font-size-small;
          color: $color4;
          padding: 0 5px;
          @include nowrapEllipsis;
        }
      }
    }
    @include categoryTag;
  }
  .wangyi-mv {
    margin-bottom: 100px;
  }
}
</style>