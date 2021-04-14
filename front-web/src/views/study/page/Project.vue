<template>
  <div class="ant-pro-pages-account-projects-cardList">
    <el-calendar v-model="value">
    </el-calendar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: new Date()
      }
    }
  }
</script>