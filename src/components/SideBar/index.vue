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
        <router-link to="/newMusic">
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
          推荐MV
        </router-link>
      </li>
      <li class="public">
        <div class="category-title">
          我的音乐
        </div>
        <router-link to="/history">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lishi"></use>
          </svg>
          最近播放
        </router-link>
      </li>
      <li class="public">
        <div class="category-title">
          创建的歌单
        </div>
        <router-link to="/likes">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
          我喜欢的音乐
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
  // 最近播放、我喜欢的音乐
  .public {
    margin-top: 50px;
    .category-title{
      padding-left: 20px;
      font-size: $font-size-small;
      color: #999;
    }
  }
}
</style>