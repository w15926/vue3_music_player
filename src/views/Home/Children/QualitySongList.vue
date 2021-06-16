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
      123
    </div>

  </div>
</template>

<script>
import { getQSList } from '@/api/qualitySongList'
import { onMounted, reactive, toRefs } from '@vue/runtime-core'

export default {
  name: 'playlists',
  setup() {
    let state = reactive({
      banner: [],
      tags: ['全部', '华语', '摇滚', '民谣', '电子', '另类/独立', '轻音乐', '综艺', '影视原声', 'ACG'],
      currentIndex: 0
    })

    // 点击标签获取当前音乐
    const getCurrentMusic = index => {
      // 待修改：currentIndex保存在Vuex里
      state.currentIndex = index
    }

    onMounted(() => {
      // let data = { limit: 1 }
      // 得到banner
      getQSList({ limit: 1 }).then(res => {
        state.banner = res.playlists[0]
        console.log('banner', state.banner)
      })
    })

    return {
      ...toRefs(state),
      getCurrentMusic
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";

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
  .category {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
    letter-spacing: 1px;
    color: #666;
    font-size: $font-size-small;
    span {
      position: relative;
      padding: 3px 6px;
      margin-left: 8px;
      cursor: pointer;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        right: -4px;
        transform: translateY(-50%);
        width: 1px;
        height: 10px;
        background-color: #ccc;
      }

      &:last-child::before {
        content: "";
        background-color: transparent;
      }
    }
  }
}
</style>