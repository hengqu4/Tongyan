<template>
  <div>
  <div :class="{'text-ellipsis': !isExpend}" class="text-expend" ref="text">
  <!-- <div class="text-ellipsis" ref="text"> -->
    {{ longText }} 
  </div>
  <el-button 
    type="text" 
    :icon="isExpend?'el-icon-arrow-up':'el-icon-arrow-down'"
    @click="expendClick" 
    :class="{'expend-btn': !isNeedExpend}"
  >
    <!-- style='display:none' -->
    {{isExpend? '收起': '展开' }}
  </el-button>
  </div>
</template>

<script>
export default {
  name: 'EllipsisText',
  props: {
    longText: {
      type: String,
      default: ''
    }
  },
  data(){
    return{
      isNeedExpend: false,
      isExpend: false
    }
  },
  mounted(){
    // var textStyle = this.$refs.text.style.webkitLineClamp
    
    var textStyle = this.$refs.text.className
    console.log('textStyle',textStyle)
    // var test=window.getComputedStyle(element, null)
    // var lineNum=Math.round($(".text-ellipsis").height()/parseFloat($(".text-ellipsis").css('line-height')))
    // console.log('test',test)
    // console.log('lineNum',lineNum)
  },
  methods:{
    expendClick(){
      this.isExpend = !this.isExpend
    }
  }
}

</script>

<style lang="less" scoped>
.text-ellipsis{
  line-height: 22px;
  white-space:pre-line;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.text-expend {
  line-height: 22px;
}
.expend-btn{
  float:right;
}
</style>
