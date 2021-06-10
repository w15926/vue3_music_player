<template>
  <div class="container">
    <header-bar />

    <div class="box-sidebar">
      <ul>
        <li>发现音乐</li>
        <li>推荐歌单</li>
        <li>最新音乐</li>
        <li>最新MV</li>
      </ul>
    </div>
    <div class="box-main">
      <router-view />
    </div>
    <div class="box-footer"></div>

  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'

export default {
  components: {
    HeaderBar,
    // Sidebar
  },
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
.container{
  position: relative;

  .box-sidebar{
    width: 300px;
    height: 700px;
    background-color: wheat;
  }

  .box-main{
    position: absolute;
    top: 50px;
    right: 0;
    
    width: 1140px;
    height: 700px;
    background-color: tan;
  }

  .box-footer{
    width: 100%;
    height: 50px;
    background-color: tomato;
  }
}
</style>