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
      <div class="rMusic" v-for="item in songSheet" :key="item.id">
        <div class="rMusic-img">
          <img :src="item.picUrl" alt="">
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>

    <!-- 最新音乐 -->
    <div class="nMusic-box">
      <p class="title">最新音乐</p>
      <div class="nMusic-wrap">
        <div class="nMusic" v-for="(item, index) in newSong" :key="index + item.id" @click="songUrl(item)">
          <div class="nMusic-img">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="nMusic-info">
            <div class="nMusic-index">{{ ++index }}</div>
            <div class="nMusic-detail">
              <div class="detail-name">{{ item.name }}</div>
              <div class="detail-author">{{ item.song.artists[0].name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐mv -->
    <div class="rMv-box">
      <div class="title">推荐MV</div>
      <div class="rMv-wrap">

        <div class="rMv" v-for="item in recommendMv" :key="item.id">
          <div class="rMv-img"><img :src="item.picUrl" alt=""></div>
          <div class="rMv-info-top">{{ item.name }}</div>
          <div class="rMv-info-bottom">{{ item.artistName }}</div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
// request api
import { getBannerData, getSongSheet, getNewSong, getRecommendMv } from '@/api/discover'
import { getSongUrl } from '@/api'
// utils
import { timeFormat as minutesSeconds } from '@/utils/dateFormat'
// composition api
import { onMounted, reactive, ref, toRefs } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  name: 'discover',
  setup(props, { emit }) {
    let store = useStore()
    let state = reactive({
      banner: [], // 轮播图
      songSheet: [], // 推荐歌单
      newSong: [], // 最新音乐（推荐排行）
      recommendMv: [] // 推荐mv
    })

    // 当前歌曲url
    const songUrl = item => {
      getSongUrl(item.id).then(res => {
        // emit('currentSongUrl', res.data[0].url)
        store.commit('user/newCurrentSongUrl', '')
        setTimeout(() => {
          store.commit('user/newCurrentSongUrl', res.data[0].url)
          store.commit(
            'user/addPlayerHistory',
            {
              id: item.id,
              title: item.name,
              singer: item.song.artists[0].name,
              album: item.song.album.name,
              time: timeFormat(item.song.duration),
              isLike: false
            }
          )
        }, 0)
      })
    }

    // 毫秒格式化
    const timeFormat = val => minutesSeconds(val)

    // 获取轮播图
    getBannerData().then(res => {
      state.banner = res.banners
      console.log('轮播图', state.banner)
    })

    // 获取推荐歌单
    const data = { limit: 10 }
    getSongSheet(data).then(res => {
      state.songSheet = res.result
      console.log('推荐歌单', state.songSheet);
    })

    // 获取最新音乐（推荐排行）
    getNewSong(data).then(res => {
      state.newSong = res.result
      console.log('最新音乐（推荐排行）', state.newSong)
    })

    getRecommendMv().then(res => {
      state.recommendMv = res.result
      console.log('推荐MV', state.recommendMv)
    })

    return {
      ...toRefs(state),
      songUrl
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
.discover {
  // 1240
  padding: 20px 35px;

  // common
  .title {
    font-size: 22px;
    margin-bottom: 20px;
  }
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
      width: 165px;
      height: 200px;
      margin-right: 27px;
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
        padding: 0 5px 0;
        margin-top: 10px;
        @include nowrapEllipsis;
      }
    }
  }
  // 最新音乐
  .nMusic-box {
    margin-top: 50px;
    .nMusic-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-content: flex-start;
      .nMusic {
        box-sizing: border-box;
        background-color: white;
        flex: 0 0 47%; // 放大比例、缩小比例、占比
        height: 100px;
        border-top: 1px solid $color4;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:nth-child(n + 9) {
          border-bottom: 1px solid $color4;
        }
        &:hover {
          background-color: #fafafa;
        }
        .nMusic-img {
          width: 78px;
          height: 78px;
          padding-left: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
        .nMusic-info {
          display: flex;
          .nMusic-index {
            padding: 0 10px;
            align-self: center;
            color: rgb(196, 195, 195);
          }
          .nMusic-detail {
            .detail-name {
              font-size: 18px;
              padding-bottom: 10px;
              @include nowrapEllipsis;
            }
            .detail-author {
              font-size: $font-size;
              color: #777;
            }
          }
        }
      }
    }
  }
  // 推荐MV
  .rMv-box {
    margin-top: 50px;
    .rMv-wrap {
      display: flex;
      justify-content: space-around;
      width: 100%;
      .rMv {
        width: 23%;
        height: 150px;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        .rMv-img {
          width: 100%;
          height: 100px;
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .rMv-info-top {
          padding: 5px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rMv-info-bottom {
          color: #ccc;
          font-size: $font-size-small;
        }
      }
    }
  }
}
</style>