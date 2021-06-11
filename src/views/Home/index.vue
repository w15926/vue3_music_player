<template>
  <div class="container">
    <header-bar />

    <div class="box-sidebar">
      <ul>
        <li>
          <router-link to="/discover">发现音乐</router-link>
        </li>
        <li>
          <router-link to="/playlists">推荐歌单</router-link>
        </li>
        <li>
          <router-link to="/songs">最新音乐</router-link>
        </li>
        <li>
          <router-link to="/mvs">最新MV</router-link>
        </li>
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
  },
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .box-sidebar {
    width: 200px;
    height: 700px;
    background-color: #ededed;

    a.router-link-active {
      color: #fff;
      background-color: tomato;
    }
  }

  .box-main {
    position: absolute;
    top: 50px;
    right: 0;

    width: 1240px;
    height: 700px;
    // background-color: #fff;
  }

  .box-footer {
    width: 100%;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 -1px 2px rgba($color: #000000, $alpha: 0.1);
  }
}
</style>