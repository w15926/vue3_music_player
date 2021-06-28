<template>
  <div class="quality-song">

    <div class="banner">
      <div class="banner-img"><img :src="banner.coverImgUrl" alt=""></div>
      <div class="banner-info">
        <div class="info-logo">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huangguan"></use>
          </svg>
          精品歌单
        </div>
        <div class="info">
          <p>{{ banner.name }}</p>
          <p class="detail">{{ banner.copywriter }}</p>
        </div>
      </div>
    </div>

    <div class="category">
      <span v-for="(item,index) in tags" :key="index" :class="{'tag-active':currentIndex == index}"
        @click="getCurrentMusic(index)">{{ item }}</span>
    </div>

    <div class="category-detail">
      <div class="detail-wrap" v-for="item in currentSongSheet" :key="item.id">
        <div class="detail-img"><img :src="item.coverImgUrl" alt=""></div>
        <p>{{ item.name }}</p>
      </div>
    </div>

    <!-- 分页器 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
      @current-change="handleCurrentChange" :current-page="pageNum" v-if="loading" />

  </div>
</template>

<script>
// request api
import { getQSList, getBanner } from '@/api/qualitySongList'
// composition api
import { computed, onMounted, reactive, toRefs } from '@vue/runtime-core'
import { useStore } from 'vuex'

import Pagination from '@/components/Pagination'

export default {
  name: 'playlists',
  components: {
    Pagination
  },
  setup() {
    const store = useStore()
    let state = reactive({
      banner: [],
      tags: ['全部', '华语', '粤语', '摇滚', '民谣', '电子', '轻音乐', '影视原声', 'ACG'],
      currentIndex: computed(() => store.state.user.recommendCurrentIndex),
      currentSongSheet: [],
      total: 0,
      pageSize: 20,
      pageNum: 1,
      loading: false
    })

    onMounted(() => {
      getQSListData()
      getBannerData()
    })

    // 点击标签获取当前音乐
    const getCurrentMusic = index => {
      store.commit('user/changeRecommendCurrentIndex', index)
      state.pageNum = 1 // 默认返回第一页
      getQSListData()
      getBannerData()
    }

    // 改变当前页时触发
    const handleCurrentChange = val => {
      state.pageNum = val
      console.log('state.pageNum', state.pageNum);
      getQSListData()
    }

    // 获取当前歌单
    const getQSListData = () => {
      let data = {
        limit: state.pageSize,
        cat: state.tags[state.currentIndex],
        offset: (state.pageNum - 1) * 10
      }
      getQSList(data).then(res => {
        state.currentSongSheet = res.playlists
        state.total = res.total
        state.loading = true
      })
    }

    // 获取banner
    const getBannerData = () => {
      getBanner({ limit: 1, cat: state.tags[state.currentIndex] })
        .then(res => state.banner = res.playlists[0])
    }

    return {
      ...toRefs(state),
      getCurrentMusic,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
.quality-song {
  .tag-active {
    color: $base-color;
    background-color: #fcf6f5;
    border-radius: 20px;
  }
  padding: 20px 35px;
  .banner {
    display: flex;
    align-items: center;
    background-color: #413b2ed7;
    width: 100%;
    height: 170px;
    border-radius: 10px;
    .banner-img {
      width: 150px;
      height: 150px;
      margin: 0 10px;
      background-color: #ccc;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .banner-info {
      .info-logo {
        width: 90px;
        height: 23px;
        line-height: 23px;
        color: #deac67;
        font-size: $font-size-small;
        text-align: center;
        border: 1px solid #deac67;
        border-radius: 20px;
        margin-bottom: 20px;
        .icon {
          font-size: $font-size-big;
        }
      }
      .info {
        color: $color3;
        font-size: $font-size;
        .detail {
          color: #ccc;
          font-size: $font-size-small;
          margin-top: 7px;
        }
      }
    }
  }
  @include categoryTag;
  .category-detail {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    cursor: pointer;
    .detail-wrap {
      flex: 0 0 18%;
      height: 220px;
      margin-bottom: 30px;
      border-radius: 10px;
      overflow: hidden;
      .detail-img {
        width: 100%;
        height: 180px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        // 强制文字最多保留两行，溢出省略号隐藏
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;

        margin-top: 7px;
        font-size: $font-size-small;
      }
    }
  }
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
</style>