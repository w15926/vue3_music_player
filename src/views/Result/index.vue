<template>
  <div class="result">
    <div class="header">
      <span class="title">{{ queryContent }}</span>
      <span class="title-search">找到 {{ songCount }} 首单曲</span>
    </div>
    <!-- tab选项卡 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 歌曲 -->
      <el-tab-pane label="歌曲" name="songs">
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
              <el-col :span="11" class="p2" @click="getMusic(item)">{{ item.name }}</el-col>
              <el-col :span="3" class="public p2" @click="getMusic(item)">{{ item.ar[0].name }}</el-col>
              <el-col :span="4" class="public p2 al" @click="getMusic(item)">{{ item.al.name }}</el-col>
              <el-col :span="3" class="public time" @click="getMusic(item)">{{ timeFormat(item.dt) }}</el-col>
            </el-row>
          </li>
        </ul>
      </el-tab-pane>
      <!-- 歌手 -->
      <el-tab-pane label="歌手" name="singer">歌手</el-tab-pane>
      <!-- 专辑 -->
      <el-tab-pane label="专辑" name="album">专辑</el-tab-pane>
      <!-- 视频 -->
      <el-tab-pane label="视频" name="video">视频</el-tab-pane>
      <!-- 歌单 -->
      <el-tab-pane label="歌单" name="songSheet">歌单</el-tab-pane>
      <!-- 歌词 -->
      <el-tab-pane label="歌词" name="wordsOfASon">歌词</el-tab-pane>
      <!-- 主播电台 -->
      <el-tab-pane label="主播电台" name="radioStation">主播电台</el-tab-pane>
      <!-- 用户 -->
      <el-tab-pane label="用户" name="user">用户</el-tab-pane>
    </el-tabs>
    <!-- 分页器 -->
    <el-pagination background layout="prev, pager, next" :total="songCount" :current-page="pageNum"
      :page-size="pageSize" @current-change="handleCurrentChange" v-show="musicList.length >= 1" />
  </div>
</template>

<script>
import { search } from '@/api/search'
import { getSongUrl } from '@/api'
import { timeFormat as minutesSeconds } from '@/utils/dateFormat'
import { computed, onMounted, reactive, toRefs, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'result',
  setup() {
    let store = useStore()
    let route = useRoute()
    let state = reactive({
      activeName: 'songs', // 默认激活标签
      queryContent: computed(() => route.query.query), // 查询内容
      queryRequestParams: { // 查询内容请求参数
        keywords: null,
        offset: 0
      },
      songCount: 0, // 查询歌曲数量
      musicList: [],
      pageSize: 0,
      pageNum: 1,
      likesList: [], // vuex里的我喜欢
    })

    onMounted(() => {
      state.likesList = store.state.user.likesList
      console.log('store.state.user.likesList', state.likesList)
    })

    watch(route, () => {
      searchContent(route.query.query)
    }, { immediate: true })

    // 搜索
    function searchContent(val) {
      // const searchContent = val => { // 箭头函数无法在watch中使用
      if (val) {
        state.queryRequestParams.keywords = val
        search(state.queryRequestParams).then(res => {
          state.songCount = res.result.songCount
          state.musicList = res.result.songs
          state.pageSize = res.result.songs.length
          matching()
          console.log(res);
        })
      }
    }

    // 毫秒格式化
    const timeFormat = val => minutesSeconds(val)

    // 点击播放
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
            time: timeFormat(item.dt),
            isLike: item.isLike
          }
        )
      })
    }

    // 添加我喜欢
    const addLike = item => {
      item.isLike = !item.isLike
      store.commit(
        'user/addLikesList',
        {
          id: item.id,
          title: item.name,
          singer: item.ar[0].name,
          album: item.al.name,
          time: timeFormat(item.dt),
          isLike: true
        }
      )
      console.log('store.state.user.likesList', store.state.user.likesList);
    }

    // 删除当前我喜欢
    const delLike = item => {
      item.isLike = false
      store.commit('user/deleteLikesList', item.id)
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

    // 分页器改变当前页
    const handleCurrentChange = val => {
      state.queryRequestParams.offset = (val - 1) * 30
      search(state.queryRequestParams).then(res => {
        state.musicList = res.result.songs
        matching()
      })
    }

    // 点击分类标签
    const handleClick = val => {
      console.log(val.props.label);
    }

    return {
      ...toRefs(state),
      handleClick,
      timeFormat,
      getMusic,
      handleCurrentChange,
      addLike,
      delLike,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
.result {
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  height: 700px;
  margin-bottom: 800px;

  // 头部
  .header {
    .title {
      display: inline-block;
      font-size: 26px;
      font-weight: 700;
      margin-right: 5px;
      max-width: 600px;
      @include nowrapEllipsis;
    }
    .title-search {
      color: #777;
    }
  }

  // 单曲列表
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
        padding-left: 120px;
      }
      .album {
        padding-left: 40px;
      }
      .time {
        padding-left: 80px;
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
      .public {
        color: #ccc;
        font-size: $font-size-small;
      }
      .p2 {
        padding-right: 20px;
        @include nowrapEllipsis;
      }
      .al {
        padding-right: 0;
      }
      .time {
        padding-left: 40px;
      }
    }
  }

  .el-pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 0;
  }
}
</style>