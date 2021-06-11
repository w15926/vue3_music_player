<template>
  <div class="header">
    <el-row>
      <el-col :span="6">
        header
      </el-col>
      <el-col :span="12">
      </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入内容" v-model="inputValue" @keyup.enter="searchMusic" clearable />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    let inputValue = ref('')
    const searchMusic = () => {
      if (inputValue.value.trim() !== '') {
        console.log(1);
      } else {
        inputValue.value = ''
      }
    }

    return {
      inputValue,
      searchMusic
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #F9F9F8;
  height: 50px;
}
</style>