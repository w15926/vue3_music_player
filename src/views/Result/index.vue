<template>
  <div class="result">
    <div class="header">
      <span class="title">{{ queryContent }}</span>
      <span class="title-search">找到 {{ songCount }} 首单曲</span>
    </div>
    <!-- tab选项卡 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲" name="songs">
        <ul class="songs-list">
          <li class="header">
            <el-row>
              <el-col :span="11" class="song-title">音乐标题</el-col>
              <el-col :span="5" class="singer">歌手</el-col>
              <el-col :span="5" class="album">专辑</el-col>
              <el-col :span="3" class="time">时长</el-col>
            </el-row>
          </li>
          <li class="content">
            <el-row>
              <el-col :span="1" class="index">01</el-col>
              <el-col :span="1">💗</el-col>
              <el-col :span="1">⏬</el-col>
              <el-col :span="10">namenamemnamenbansadadagdada</el-col>
              <el-col :span="3">歌手名字</el-col>
              <el-col :span="3">专辑名字</el-col>
              <el-col :span="3">02:00</el-col>
            </el-row>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="singer">歌手</el-tab-pane>
      <el-tab-pane label="歌手" name="singer">歌手</el-tab-pane>
      <el-tab-pane label="专辑" name="album">专辑</el-tab-pane>
      <el-tab-pane label="视频" name="video">视频</el-tab-pane>
      <el-tab-pane label="歌单" name="songSheet">歌单</el-tab-pane>
      <el-tab-pane label="歌词" name="wordsOfASon">歌词</el-tab-pane>
      <el-tab-pane label="主播电台" name="radioStation">主播电台</el-tab-pane>
      <el-tab-pane label="用户" name="user">用户</el-tab-pane>
    </el-tabs>
    <!-- 分页器 -->
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script>
import { search } from '@/api/search'
import { onMounted, reactive, toRefs, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
export default {
  name: 'result',
  setup() {
    let route = useRoute()
    let state = reactive({
      activeName: 'songs', // 默认激活标签
      queryContent: '', // 查询内容
      songCount: 0, // 查询歌曲数量
    })

    onMounted(() => {
      searchContent(state.queryContent)
    })

    watch(route, () => {
      state.queryContent = route.query.query
    }, { immediate: true })

    // 搜索
    const searchContent = val => {
      console.log(val);
      const params = { keywords: val }
      search(params).then(res => {
        state.songCount = res.result.songCount
        console.log(res);
      })
    }

    // 点击分类标签
    const handleClick = val => {
      console.log(val.props.label);
    }


    return {
      ...toRefs(state),
      handleClick
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
      margin: 10px 0;
      .song-title {
        padding-left: 162px;
      }
      .singer{

      }
    }
    .content{
      .index{
        margin-left: 40px;
      }
    }
  }

  .el-pagination {
    position: absolute;
    left: 50%;
    margin-top: 10px;
    // margin-left: 50%;
    transform: translateX(-50%);
    // bottom: 10px;
  }
}
</style>