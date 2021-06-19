<template>
  <div>
    <!-- 分页器 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
      @current-change="handleCurrentChange" :current-page="pageNum" />
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default() {
        return 0
      }
    },
    pageSize: {
      type: Number,
      default() {
        return 1
      }
    },
    pageNum: {
      type: Number,
      default() {
        return 1
      }
    }
  },
  setup(props, { emit }) {
    const handleCurrentChange = val => {
      emit('handleCurrentChange', val)
    }

    return { handleCurrentChange }
  }
}
</script>

<style lang="scss" scoped>
</style>