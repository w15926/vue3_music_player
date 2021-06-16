<template>
  <div class="container">

    <header-bar />

    <div class="wrap">
      <side-bar />
      <div class="box-main">
        <el-scrollbar height="700px">
          <router-view />
        </el-scrollbar>
      </div>
    </div>

    <footer-bar />
    
  </div>
</template>

<script>
// components
import HeaderBar from '@/components/HeaderBar'
import SideBar from '@/components/SideBar'
import FooterBar from '@/components/FooterBar'

export default {
  components: {
    HeaderBar,
    SideBar,
    FooterBar
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";

.wrap {
  display: flex;

  .box-main {
    width: 1240px;
    height: 700px;
  }
}
</style>