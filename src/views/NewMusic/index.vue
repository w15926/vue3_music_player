<template>
  <div class="new-music">

    <div class="category">
      <span v-for="(item,index) in category" :key="index">{{ item }}</span>
    </div>

    <!-- <ul class="list">
      <li v-for="(item,index) in songSheet" :key="item.id + index">
        <div class="index">{{ ++index }}</div>
        <div class="img"><img :src="item.album.blurPicUrl" alt=""></div>
        <div class="title">{{ item.name }}</div>
        <div class="author">{{ item.artists[0].name }}</div>
        <div class="sheet">{{ item.album.name }}</div>
        <div class="time">03:57</div>
      </li>
    </ul> -->
    <ul class="list">
      <li v-for="(item,index) in songSheet" :key="item.id + index">
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
            <div class="time">03:57</div>
          </el-col>
        </el-row>
      </li>
    </ul>

  </div>
</template>

<script>
import { geNewMusic } from '@/api/newMusic'
import { reactive, toRefs } from '@vue/reactivity'
export default {
  name: 'spngs',
  setup() {
    let state = reactive({
      category: ['全部', '华语', '欧美', '韩国', '日本'],
      songSheet: [],
    })

    const geNewMusicData = () => {
      // 全部:0  华语:7  欧美:96  日本:8  韩国:16
      const params = { type: 0 }
      geNewMusic(params).then(res => {
        state.songSheet = res.data
        console.log(state.songSheet);
      })
    }
    geNewMusicData()

    return {
      ...toRefs(state),
      geNewMusicData
    }
  }
}
</script>

<style lang="scss" scoped>
.new-music {
  // 分类
  .category {
    padding: 20px;
    span {
      letter-spacing: 1px;
      margin-right: 30px;
      cursor: pointer;
      color: #999;

      &:hover {
        color: #000;
      }
    }
  }
  // 列表
  .list {
    li {
      height: 80px;
      line-height: 80px;
      cursor: pointer;
      &:nth-child(2n) {
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
          // vertical-align: middle;
        }
      }
      .author {
        color: rgb(172, 172, 172);
      }
      .sheet{
        color: rgb(172, 172, 172);
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .time {
        color: rgb(172, 172, 172);
        padding-left: 50px;
      }
    }
  }
}
</style>