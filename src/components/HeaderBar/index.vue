<template>
  <div class="header">

    <div class="box-left">
      <span class=" red" @click="reset"></span>
      <span class=" yellow" @click="narrow"></span>
      <span class=" green" @click="enlarge"></span>
      <span class="arrow-left" @click="back">
        <svg class="icon i-arrow" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </span>
      <span class="arrow-right" @click="front">
        <svg class="icon i-arrow" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </span>
    </div>

    <div class="box-right">
      <svg class="icon-search" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <input type="text" placeholder=" 搜索" v-model="inputValue" @keyup.enter="searchMusic">
      <span class="clear" @click="inputValue = ''">X</span>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    let router = useRouter()

    let inputValue = ref('')

    // 返回按钮
    const back = () => router.back()
    // 前进按钮
    const front = () => router.go(1)
    // 红色重置按钮
    const reset = () => document.body.style.zoom = 1
    // 黄色缩小按钮
    const narrow = () => document.body.style.zoom = .8
    // 绿色放大按钮
    const enlarge = () => document.body.style.zoom = 1.2

    // 搜索
    const searchMusic = () => {
      if (inputValue.value.trim() !== '') {
        router.push({
          path: '/result',
          query: { query: inputValue.value.trim() }
        })
        inputValue.value = ''
      } else {
        inputValue.value = ''
      }
    }

    return {
      inputValue,
      searchMusic,
      back,
      front,
      reset,
      narrow,
      enlarge
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
.header {
  background-color: #f9f9f8;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  .box-left {
    position: relative;
    width: 180px;
    .red,
    .yellow,
    .green {
      display: inline-block;
      width: 15px;
      height: 15px;
      color: #fff;
      border-radius: 50%;
      margin-right: 10px;
      margin-top: 3px;
    }
    .red {
      cursor: pointer;
      background-color: #ff5f59;
    }
    .yellow {
      cursor: pointer;
      background-color: #ffbc40;
    }
    .green {
      cursor: pointer;
      background-color: #28c94e;
    }
    .arrow-left {
      position: absolute;
      top: 12px;
      right: 30px;
      cursor: pointer;
    }
    .arrow-right {
      position: absolute;
      top: 12px;
      right: 0;
      cursor: pointer;
    }
    .i-arrow {
      font-size: 20px;
    }
  }
  .box-right {
    position: absolute;
    right: 0;
    top: 25px;
    transform: translateY(-50%);
    width: 310px;
    // el-input{
    //   width: 200px;
    // }
    .icon-search {
      position: absolute;
      top: 3px;
      left: 4px;
      width: 17px;
      height: 17px;
    }
    .clear {
      position: absolute;
      left: 131px;
      top: 3.5px;
      width: 10px;
      height: 10px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.4);
        color: $base-color;
      }
    }
    input {
      font-size: $font-size-small;
      width: 150px;
      height: 23px;
      border-radius: 10px;
      outline: none;
      border: none;
      background-color: #ececeb;
      // padding-left: 25px;
      padding: 0 25px;
      box-sizing: border-box;
    }
  }
}
</style>