<template>
  <div class="new-music">

    <div class="category">
      <span v-for="(item,index) in category" :key="index" :class="{'category-active':currentIndex}">{{ item }}</span>
    </div>

    <ul class="list-music">
      <li v-for="(item,index) in currentSheet" :key="item.id + index" @click="songUrl(item.id)">
        <el-row>
          <el-col :span="2">
            <div class="index">{{ ++index }}</div>
          </el-col>
          <el-col :span="2">
            <div class="img"><img :src="item.album.blurPicUrl" alt=""></div>
          </el-col>
          <el-col :span="8">
            <div class="title">{{ item.name }}</div>
          </el-col>
          <el-col :span="5">
            <div class="author">{{ item.artists[0].name }}</div>
          </el-col>
          <el-col :span="4">
            <div class="sheet">{{ item.album.name }}</div>
          </el-col>
          <el-col :span="3">
            <div class="time">{{ timeFormat(item.duration) }}</div>
          </el-col>
        </el-row>
      </li>
      <el-button type="primary" class="loading" @click="loadMore" v-if="loading">点击加载更多</el-button>
    </ul>

  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'

import { geNewMusic } from '@/api/newMusic'
import { getSongUrl } from '@/api'
import { timeFormat as minutesSeconds } from '@/utils/dateFormat'

export default {
  name: 'spngs',
  setup(props, { emit }) {
    const store = useStore()
    let state = reactive({
      category: ['全部', '华语', '欧美', '韩国', '日本'],
      songSheet: [],
      currentSheet: [],
      loading: false,
      currentIndex: 0
    })

    onMounted(() => {
      geNewMusicData()
    })

    // 得到最新音乐
    const geNewMusicData = () => {
      // 全部:0  华语:7  欧美:96  日本:8  韩国:16
      const params = { type: 0 }
      geNewMusic(params).then(res => {
        state.songSheet = res.data
        state.currentSheet = state.songSheet.slice(0, 50)
        state.loading = true
      })
    }

    // 毫秒格式化
    const timeFormat = val => {
      let timeFormat = minutesSeconds(val)
      return timeFormat
    }

    // 点击播放
    const songUrl = id => {
      getSongUrl(id).then(res => {
        store.commit('user/newCurrentSongUrl', '')
        setTimeout(() => {
          store.commit('user/newCurrentSongUrl', res.data[0].url)
        }, 0);
      })
    }

    // 加载更多
    const loadMore = () => {
      state.loading = false
      state.songSheet.forEach((item, index) => {
        if (index > 49) state.currentSheet.push(item)
      })
    }

    return {
      ...toRefs(state),
      geNewMusicData,
      timeFormat,
      songUrl,
      loadMore
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.new-music {
  // 分类
  .category {
    padding: 20px;
    span {
      letter-spacing: 1px;
      margin-right: 30px;
      cursor: pointer;
      color: #999;
    }
  }
  // 当前激活分类
  .category-active {
    color: #000;
  }
  // 列表
  .list-music {
    li {
      height: 80px;
      line-height: 80px;
      cursor: pointer;
      &:nth-child(2n - 1) {
        background-color: #fafafa;
      }
      .index {
        color: #ccc;
        text-align: center;
      }
      .img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        @include nowrapEllipsis;
        padding-right: 20px;
      }
      .author {
        color: rgb(172, 172, 172);
      }
      .sheet {
        color: rgb(172, 172, 172);
        @include nowrapEllipsis;
      }
      .time {
        color: rgb(172, 172, 172);
        padding-left: 50px;
      }
    }
  }
  // 加载更多
  .loading {
    margin: 20px 20px 20px 50%;
    transform: translateX(-50%);
  }
}
</style>