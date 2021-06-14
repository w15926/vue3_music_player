<template>
  <div class="box-footer">
    <audio class="player" :src="currentSongUrl" controls autoplay></audio>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  setup() {
    let store = useStore()
    let currentSongUrl = computed(() => store.state.user.currentSongUrl)

    return { currentSongUrl }
  }
}
</script>

<style lang="scss" scoped>
.box-footer {
  width: 100%;
  height: 50px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 -1px 2px rgba($color: #000000, $alpha: 0.1);
  overflow: hidden;
  z-index: 999;
  audio {
    width: 100%;
    height: 100%;
    outline: none;
    // filter: invert(180); //c3 filter(滤镜) 属性
  }

  audio::-webkit-media-controls-enclosure {
    background: #fff !important;
    /* 滤镜反转为 rgba(0, 162, 255, 1);rgba(255, 93, 0, 0.8)  #7eb637   10,10,10  #757575 */
    border-radius: 0;
  }
}
</style>