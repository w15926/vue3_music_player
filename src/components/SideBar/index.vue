<template>
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
        <router-link to="/qualitySongList">
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
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";

.box-sidebar {
  width: 200px;
  height: 700px;
  box-sizing: border-box;
  background-color: #ededed;

  li {
    width: 200px;
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
</style>