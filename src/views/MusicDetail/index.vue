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
      <el-tab-pane label="评论" name="comment">
        <div class="commentContent">
          <textarea name="" id="areaVal" class="commentArea" maxlength="139" placeholder="来点评论吧～"></textarea>
          <span class="maxText">MAX 139</span>
          <div class="btn" @click="submitComment">评论</div>
        </div>
        <ul class="commentList">
          <li class="list" v-for="item in commentList" :key="item.id">
            <el-row>
              <el-col :span="2" class="avatar">
                <div class="img"><img :src="item.user.avatarUrl" alt="">
                </div>
              </el-col>
              <el-col :span="22">
                <div class="detail">
                  <span class="name">{{ item.user.nickname }}：</span><span>{{ item.content }}</span>
                  <!-- <p>{{ item.user.nickname }}：{{ item.content }}</p> -->
                  <p class="time">{{ filterYMD_HHMM(item.time) }}</p>
                </div>
              </el-col>
            </el-row>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getSongUrl, musicDetail, songDetail, commentPlaylist } from '@/api'
import { currentPlayCount } from '@/utils/playCount'
import { timeFormatYMD, timeFormat as timeFormatMMSS, timeFormatYMD_HHMM } from '@/utils/dateFormat'

import { reactive, toRefs } from '@vue/reactivity'
import { computed, onMounted, watch } from '@vue/runtime-core'
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
      reqestComment: {
        id: computed(() => route.query.id),
        type: 2
      },
      commentContent: '',
      commentList: [],
    })

    onMounted(() => {
      state.likesList = store.state.user.likesList
      getMusicDeatil(state.requestId)
      // getCommentPlaylist(state.reqestComment)
    })

    // 获取数据
    const getMusicDeatil = id => {
      musicDetail(id).then(res => {
        // state.reqestComment.id = res.playlist.id
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
    // 过滤年月日时分
    const filterMMSS = val => timeFormatMMSS(val)
    const filterYMD_HHMM = val => timeFormatYMD_HHMM(val)

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
      if (val.props.label === '评论') getCommentPlaylist(state.reqestComment)
    }

    // 获取对应的所有评论数据
    const getCommentPlaylist = params => {
      commentPlaylist(params).then(res => { state.commentList = res.comments, console.log(state.commentList); })
    }

    // 提交评论
    const submitComment = () => {
      const subText = document.querySelector('#areaVal').value
      // 判断是否登录(cookie是否存在token)  未登录先登录，已登录直接提交
      console.log(subText);
    }

    return {
      ...toRefs(state),
      filterPlayCount,
      filterYMD,
      handleClick,
      getMusic,
      addLike,
      delLike,
      filterMMSS,
      filterYMD_HHMM,
      submitComment
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
  // 评论文本域
  .commentContent {
    position: relative;
    height: 160px;
    .commentArea {
      width: 99.9%;
      height: 100px;
      outline: none;
      resize: none;
      border: 2px solid #e5e5e5;
      border-radius: 10px;
      padding: 5px 20px;
      box-sizing: border-box;
    }
    .maxText {
      position: absolute;
      bottom: 70px;
      right: 20px;
      color: #ccc;
    }
    .btn {
      position: absolute;
      right: 0;
      top: 110px;
      width: 70px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #ccc;
      border-radius: 30px;
      text-align: center;
      padding: 5px;
      &:hover {
        cursor: pointer;
        background-color: #f2f2f2;
      }
    }
  }
  // 评论列表
  .commentList {
    margin-top: 20px;
    .list {
      width: 100%;
      height: 80px;
      .avatar {
        .img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          box-sizing: border-box;
          margin-top: 50%;
          transform: translateY(-50%);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .detail {
        padding: 20px 0;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        .name {
          color: #5783b0;
        }
        .time {
          margin-top: 5px;
          color: #ccc;
        }
        &:first-child {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>