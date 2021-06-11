<template>
  <div class="result">
    <!-- tab选项卡 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲" name="first">用户管理<br><br><br><br><br><br><br><br><br><br><br></el-tab-pane>
      <el-tab-pane label="歌单" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="MV" name="third">角色管理</el-tab-pane>
    </el-tabs>
    <!-- 分页器 -->
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const activeName = 'first'
    let route = useRoute()

    watch(route, () => {
      console.log(route.query)
    }, { immediate: true })


    return {
      activeName
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  height: 700px;

  .el-pagination{
    position: absolute;
    left: 50%;
    margin-top: 10px;
    // margin-left: 50%;
    transform: translateX(-50%);
    // bottom: 10px;
  }
}
</style>