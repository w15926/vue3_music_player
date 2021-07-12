<template>
  <div class="box">

    <div class="mv">
      <h2 class="title">MV详情</h2>
      <div class="mv-wrap">
        <video :src="url" controls autoplay muted></video>
      </div>
    </div>

    <div class="simi">
      <h2 class="title">相关推荐</h2>

      <div class="simi-wrap" v-for="item in simiMvList" :key="item.id" @click="playerMV(item)">
        <div class="img-box"><img :src="item.cover" alt=""></div>
        <div class="detail">
          <p class="detail-title"> {{ item.name }}</p>
          <p class="author">by {{ item.artistName }}</p>
        </div>
      </div>

    </div>

    <div class="mv-author">
      <div class="avatar">
        <img v-if="coverImg !== undefined" :src="coverImg" alt="">
        <img v-else :src="picUrl" alt="">
      </div>
      <div class="mv">
        <p class="mv-title">{{ mvTitle }}</p>
        <p class="publish">发布：{{ mvDetail.publishTime }} &nbsp;&nbsp;&nbsp; 播放：{{ playCount }}次</p>
      </div>
    </div>

  </div>
</template>

<script>
import { mvUrl, simiMv, mvDetail } from '@/api/MV'
import { timeFormatYMD, timeFormatYMD_HHMM } from '@/utils/dateFormat'
import { reactive, toRefs } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'

export default {
  setup() {
    let route = useRoute()
    let router = useRouter()
    let store = useStore()
    let state = reactive({
      requestId: computed(() => route.query.id),
      url: computed(() => store.getters.getMvUrl),
      mvTitle: computed(() => route.query.name),
      coverImg: computed(() => route.query.coverImg),
      picUrl: computed(() => route.query.picUrl),
      playCount: computed(() => route.query.playCount),
      mvDetail: [], // 发布时间
      simiMvList: [], // 相关mv
    })

    onMounted(() => {
      getMvUrl(state.requestId)
      getSimiMv(state.requestId)
      getMvDetail(state.requestId)
    })

    // 获取播放地址
    const getMvUrl = id => {
      mvUrl(id).then(res => { store.commit('user/getMvUrl', res.data.url), console.log(res); })
    }

    // 获取mv详情
    const getMvDetail = id => {
      mvDetail(id).then(res => { state.mvDetail = res.data, console.log(res.data) })
    }

    // 获取相关推荐
    const getSimiMv = id => {
      simiMv(id).then(res => state.simiMvList = res.mvs)
    }

    // 播放mv
    const playerMV = item => {
      console.log(item);
      router.push({
        path: '/playerMV',
        query: {
          id: item.id,
          name: item.name,
          coverImg: item.cover,
          picUrl: item.picUrl,
          playCount: item.playCount
        }
      })
      setTimeout(() => {
        getMvUrl(state.requestId)
        getMvDetail(state.requestId)
      }, 100);
    }

    return {
      ...toRefs(state),
      playerMV
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
.box {
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  .mv {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 620px;
    .title {
      margin-bottom: 20px;
    }
    .mv-wrap {
      height: 400px;
      display: block;
      border-radius: 10px;
      overflow: hidden;
      background-color: #000;
      video {
        width: 100%;
        height: 100%;
      }
    }
  }
  .simi {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 300px;
    cursor: pointer;
    .title {
      margin-bottom: 20px;
    }
    .simi-wrap {
      display: flex;
      margin-bottom: 12px;
      height: 95px;
      .img-box {
        width: 150px;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .detail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        width: 150px;
        padding: 5px;

        .detail-title {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .author {
          left: 0;
          color: #ccc;
          @include nowrapEllipsis();
        }
      }
    }
  }
  .mv-author {
    width: 600px;
    height: 100px;
    position: absolute;
    top: 480px;
    left: 20px;
    display: flex;
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mv {
      margin-left: 60px;
      .mv-title {
        font-size: 22px;
      }
      .publish {
        margin-top: 10px;
        color: #ccc;
      }
    }
  }
}
</style>