<template>
  <div>
    <el-empty description="什么都没有哦～" v-show="total < 1" />
    <!-- 头部 -->
    <div class="header-wrap" v-show="total >= 1">
      <span class="title">歌曲列表</span>
      <span class="totla">共{{ total }}首</span>
      <span class="clearAll" @click="clearAll">清空列表</span>
    </div>
    <!-- 列表 -->
    <ul class="songs-list" v-show="total >= 1">
      <li class="header">
        <el-row>
          <el-col :span="11" class="song-title">音乐标题</el-col>
          <el-col :span="5" class="singer">歌手</el-col>
          <el-col :span="4" class="album">专辑</el-col>
          <el-col :span="4" class="time">时长</el-col>
        </el-row>
      </li>
      <li class="content" v-for="(item,index) in list" :key="item.id">
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
          <el-col :span="11" class="title" @click="getMusic(item)">{{ item.title }}</el-col>
          <el-col :span="3" class="public singer" @click="getMusic(item)">{{ item.singer }}</el-col>
          <el-col :span="4" class="public" @click="getMusic(item)">{{ item.album }}</el-col>
          <el-col :span="3" class="public" @click="getMusic(item)">{{ item.time }}</el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSongUrl } from '@/api'
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  setup() {
    let store = useStore()
    let state = reactive({
      list: [],
      total: 0,
    })

    onMounted(() => {
      initList()
      console.log(state.list);
    })

    // 初始化列表
    const initList = () => {
      state.list = store.state.user.playerHistory
      state.total = store.state.user.playerHistory.length
    }

    // 播放
    const getMusic = item => getSongUrl(item.id).then(res => {
      store.commit('user/newCurrentSongUrl', res.data[0].url)
      store.commit(
        'user/addPlayerHistory',
        {
          id: item.id,
          title: item.title,
          singer: item.singer,
          album: item.album,
          time: item.time,
          isLike: item.isLike
        }
      )
    })

    // 清除列表
    const clearAll = () => {
      store.commit('user/clearPlayerHistory')
      initList()
    }

    // 添加喜欢
    const addLike = item => {
      item.isLike = !item.isLike
      store.commit(
        'user/addLikesList',
        {
          id: item.id,
          title: item.title,
          singer: item.singer,
          album: item.album,
          time: item.time,
          isLike: true
        }
      )
    }

    // 删除当前喜欢
    const delLike = item => {
      item.isLike = !item.isLike
      store.commit('user/deleteLikesList', item.id)
    }

    return {
      ...toRefs(state),
      clearAll,
      getMusic,
      addLike,
      delLike
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
// 头部
.header-wrap {
  position: relative;
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 26px;
  }
  .totla {
    margin-left: 10px;
    color: #999;
  }
  .clearAll {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: $font-size-big;
    color: #aac0d7;
    cursor: pointer;
    &:hover {
      color: #0459ad;
    }
  }
}
// 列表
.songs-list {
  width: 100%;
  .header {
    color: #999;
    font-size: $font-size-small;
    margin-bottom: 10px;
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
</style>