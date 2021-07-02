<template>
  <div>
    <el-empty description="什么都没有哦～" v-show="total < 1" />
    <!-- 头部 -->
    <div class="header-wrap" v-show="total >= 1">
      <span class="title">歌曲列表</span>
      <span class="totla">共{{ total }}首</span>
      <span class="search">
        <svg class="icon-search" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <input type="text" placeholder=" 搜索歌曲列表" v-model="inputValue" @keyup.enter="searchMusic">
        <span class="clear" @click="inputValue = ''">X</span>
      </span>
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
      <li class="content" v-for="(item,index) in musicList" :key="item.id">
        <el-row>
          <el-col :span="1" class="public index" @click="getMusic(item.id)">{{ ++index }}</el-col>
          <el-col :span="1">
            <svg class="icon" aria-hidden="true" v-if="item.isLike" @click="delLike(item)">
              <use xlink:href="#icon-aixin1"></use>
            </svg>
          </el-col>
          <el-col :span="11" class="title" @click="getMusic(item.id)">{{ item.title }}</el-col>
          <el-col :span="3" class="public singer" @click="getMusic(item.id)">{{ item.singer }}</el-col>
          <el-col :span="4" class="public" @click="getMusic(item.id)">{{ item.album }}</el-col>
          <el-col :span="3" class="public" @click="getMusic(item.id)">{{ item.time }}</el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSongUrl } from '@/api'
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  setup() {
    let store = useStore()
    let state = reactive({
      inputValue: '',
      total: 0,
      musicList: []
    })

    onMounted(() => initMusicList())

    watch(state, () => {
      if (state.inputValue.length === 0) state.musicList = store.state.user.likesList
    })

    // 初始化
    const initMusicList = () => {
      state.musicList = store.state.user.likesList
      state.total = store.state.user.likesList.length
      console.log(state.musicList);
    }

    // 搜索当前列表
    const searchMusic = () => {
      let newList = []
      if (state.inputValue.trim() !== '') {
        state.musicList.forEach(item => {
          // 模糊匹配音乐标题
          if (!item.title.indexOf(state.inputValue)) {
            newList.push({
              id: item.id,
              title: item.title,
              album: item.album,
              singer: item.singer,
              time: item.time,
              isLike: item.isLike
            })
            state.musicList = newList
          }
          // 模糊匹配歌手名
          if (!item.singer.indexOf(state.inputValue)) {
            newList.push({
              id: item.id,
              title: item.title,
              album: item.album,
              singer: item.singer,
              time: item.time,
              isLike: item.isLike
            })
            state.musicList = newList
          }
          return console.log("请输入准确的歌曲名或歌手名");
        })
      } else {
        state.inputValue = ''
      }
    }

    // 取消当前我喜欢
    const delLike = item => {
      store.commit('user/deleteLikesList', item.id)
      initMusicList()
    }

    // 播放
    const getMusic = id => getSongUrl(id).then(res => store.commit('user/newCurrentSongUrl', res.data[0].url))

    return {
      ...toRefs(state),
      searchMusic,
      delLike,
      getMusic
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
  .search {
    position: absolute;
    left: 300px;
    top: 25px;
    width: 310px;
    .icon-search {
      position: absolute;
      top: 7px;
      left: 4px;
      width: 17px;
      height: 17px;
    }
    .clear {
      position: absolute;
      left: 150px;
      top: 7.5px;
      width: 10px;
      height: 10px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.4);
        color: $base-color;
      }
    }
    input {
      font-size: $font-size-small;
      width: 170px;
      height: 30px;
      border-radius: 6px;
      outline: none;
      border: none;
      border: 1px solid #ccc;
      // padding-left: 25px;
      padding: 0 25px;
      box-sizing: border-box;
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