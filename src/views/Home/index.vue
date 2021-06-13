<template>
  <div class="container">
    <header-bar />
    <div class="wrap">

      <div class="box-sidebar">
        <ul>
          <li>
            <router-link to="/discover">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinle2"></use>
              </svg>
              发现音乐
            </router-link>
          </li>
          <li>
            <router-link to="/playlists">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
              </svg>
              推荐歌单
            </router-link>
          </li>
          <li>
            <router-link to="/songs">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuixin"></use>
              </svg>
              最新音乐
            </router-link>
          </li>
          <li>
            <router-link to="/mvs">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-MV"></use>
              </svg>
              最新MV
            </router-link>
          </li>
        </ul>
      </div>

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
import HeaderBar from '@/components/HeaderBar'
import FooterBar from '@/components/FooterBar'

export default {
  components: {
    HeaderBar,
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

  .box-sidebar {
    width: 230px;
    height: 700px;
    background-color: #ededed;

    li {
      height: 33px;
      line-height: 33px;

      a {
        padding-left: 30px;
        box-sizing: border-box;

        .icon {
          font-size: 20px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }

      a.router-link-active {
        display: inline-block;
        width: 100%;
        color: $base-color;
        background-color: #e1e1e1;
      }
    }
  }

  .box-main {
    width: 1240px;
    height: 700px;
  }
}
</style>