<template>
  <div class="musicDetail">
    <!-- 头部 -->
    <div class="header">
      <div class="img-box"><img :src="list.coverImgUrl" alt=""></div>
      <div class="detail-box">
        <div class="title">
          <span class="category-logo">歌单</span>
          {{ list.name }}
        </div>
        <div class="author">
          <div class="img"><img :src="authorAvatar" alt=""></div>
          <div class="author-name">{{ authorName }}</div>
          <div class="publish-date">{{ filterYMD(list.createTime) }} 创建</div>
        </div>
        <p class="tag">标 签: {{ tags }}</p>
        <p class="tag">歌曲数：{{ list.trackCount }} 播放数：{{ filterPlayCount(list.playCount) }}</p>
        <p class="tag">简介：{{ list.description }}</p>
      </div>
    </div>
    <!-- 主体 -->
    <!-- tab选项卡 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 歌曲 -->
      <el-tab-pane label="歌曲" name="songs">
        <!-- 列表 -->
        <ul class="songs-list">
          <li class="header">
            <el-row>
              <el-col :span="11" class="song-title">音乐标题</el-col>
              <el-col :span="5" class="singer">歌手</el-col>
              <el-col :span="4" class="album">专辑</el-col>
              <el-col :span="4" class="time">时长</el-col>
            </el-row>
          </li>
          <li class="content" v-for="(item,index) in musicList" :key="item.id">
            <el-row>
              <el-col :span="1" class="public index" @click="getMusic(item)">{{ ++index }}</el-col>
              <el-col :span="1">
                <svg class="icon" aria-hidden="true" v-if="!item.isLike" @click="addLike(item)">
                  <use xlink:href="#icon-aixin"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="item.isLike" @click="delLike(item)">
                  <use xlink:href="#icon-aixin1"></use>
                </svg>
              </el-col>
              <el-col :span="11" class="title" @click="getMusic(item)">{{ item.name }}</el-col>
              <el-col :span="3" class="public singer" @click="getMusic(item)">{{ item.ar[0].name }}</el-col>
              <el-col :span="4" class="public" @click="getMusic(item)">{{ item.al.name }}</el-col>
              <el-col :span="3" class="public" @click="getMusic(item)">{{ filterMMSS(item.dt) }}</el-col>
            </el-row>
          </li>
        </ul>
      </el-tab-pane>
      <!-- 评论 -->
      <el-tab-pane label="评论" name="comment">评论</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getSongUrl, musicDetail, songDetail } from '@/api'
import { currentPlayCount } from '@/utils/playCount'
import { timeFormatYMD, timeFormat as timeFormatMMSS } from '@/utils/dateFormat'

import { reactive, toRefs } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  setup() {
    let store = useStore()
    let route = useRoute()
    let state = reactive({
      requestId: computed(() => route.query.id),
      list: [],
      authorName: '',
      authorAvatar: null,
      tags: [], // 歌单标签 
      musicList: [],
      activeName: 'songs', // 默认激活标签
      likesList: [], // vuex里的我喜欢
    })

    onMounted(() => {
      state.likesList = store.state.user.likesList
      getMusicDeatil(state.requestId)
    })

    // 获取数据
    const getMusicDeatil = id => {
      musicDetail(id).then(res => {
        state.list = res.playlist
        state.authorName = res.playlist.creator.nickname
        state.authorAvatar = res.playlist.creator.avatarUrl
        state.tags = res.playlist.tags.join('/')
        getMusicList(res.playlist.trackIds.map(item => item.id).join(','))
      })
    }

    // 获取歌单所有歌曲
    const getMusicList = ids => {
      songDetail(ids).then(res => {
        state.musicList = res.songs
        matching()
      })
    }

    // 与vuex匹配已激活爱心
    const matching = () => {
      state.musicList.forEach(item => {
        item.isLike = false // 给每一个对象赋初始值（未选中）
        state.likesList.forEach(storeList => {
          if (item.id == storeList.id) item.isLike = true // 匹配选中状态让爱心激活
        })
      })
    }

    // 过滤播放数
    const filterPlayCount = val => currentPlayCount(val)

    // 过滤年月日
    const filterYMD = val => timeFormatYMD(val)

    // 过滤分秒
    const filterMMSS = val => timeFormatMMSS(val)

    // 播放
    const getMusic = item => {
      getSongUrl(item.id).then(res => {
        store.commit('user/newCurrentSongUrl', res.data[0].url)
        store.commit(
          'user/addPlayerHistory',
          {
            id: item.id,
            title: item.name,
            singer: item.ar[0].name,
            album: item.al.name,
            time: filterMMSS(item.dt),
            isLike: item.isLike
          }
        )
      })
    }

    // 添加喜欢
    const addLike = item => {
      item.isLike = !item.isLike
      store.commit(
        'user/addLikesList',
        {
          id: item.id,
          title: item.name,
          singer: item.ar[0].name,
          album: item.al.name,
          time: filterMMSS(item.dt),
          isLike: item.isLike
        }
      )
      console.log('store.state.user.likesList', store.state.user.likesList);
    }

    // 删除当前我喜欢
    const delLike = item => {
      item.isLike = false
      store.commit('user/deleteLikesList', item.id)
    }

    // 点击分类标签
    const handleClick = val => {
      console.log(val.props.label);
    }

    return {
      ...toRefs(state),
      filterPlayCount,
      filterYMD,
      handleClick,
      getMusic,
      addLike,
      delLike,
      filterMMSS
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
.musicDetail {
  padding: 20px;
  box-sizing: border-box;
  // 头部
  .header {
    display: flex;
    width: 100%;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 20px;

    .img-box {
      width: 200px;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .detail-box {
      width: calc(100% - 200px);
      padding-left: 20px;
      box-sizing: border-box;

      .title {
        padding-right: 100px;
        font-size: $font-size-max;
        @include nowrapEllipsis;

        .category-logo {
          display: inline-block;
          color: $base-color;
          font-size: $font-size;
          border: 1px solid $base-color;
          vertical-align: middle;
          padding: 1px 6px;
          margin-bottom: 2px;
          border-radius: 5px;
        }
      }

      .author {
        display: flex;
        align-items: center;
        margin: 20px 0;
        font-size: $font-size-small;

        .img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .author-name {
          margin: 0 10px;
        }

        .publish-date {
          color: #777;
        }
      }

      .tag {
        color: #666;
        margin-bottom: 10px;
      }
    }
  }
  // 歌曲列表
  .songs-list {
    .header {
      height: 100%;
      .el-row {
        width: 100%;
        color: #999;
        font-size: $font-size-small;
        .song-title {
          padding-left: 162px;
        }
        .singer {
          padding-left: 124px;
        }
        .album {
          padding-left: 40px;
        }
        .time {
          padding-left: 40px;
        }
      }
    }
    .content {
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      &:nth-child(2n) {
        background-color: $list-high;
      }
      .index {
        margin-left: 40px;
      }
      .title {
        padding: 0 40px;
        @include nowrapEllipsis;
      }
      .public {
        color: #ccc;
        font-size: $font-size-small;
        @include nowrapEllipsis;
      }
    }
  }
}
</style>