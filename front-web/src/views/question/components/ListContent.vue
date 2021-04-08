<template>
  <div class="content">
    <div :class="{'desc-ellipsis': !isExpend}" class="description">
        {{ description }}    
    </div>
    <el-button type="text" :icon="isExpend?'el-icon-arrow-up':'el-icon-arrow-down'" @click="expendClick" style='float:right'>
      {{isExpend? '收起': '展开' }}
    </el-button>
    <div class="extra">
      <a>
      <!-- <a :href="href"> -->
        <a-avatar :src="avatar" size="small" />{{ owner }}
      </a> 
      <em>{{ updateAt | moment }}</em>
    </div>
  </div>
</template>

<script>
import { Ellipsis } from '@/components'
export default {
  name: 'ListContent',
  props: {
    prefixCls: {
      type: String,
      default: 'content'
    },
    description: {
      type: String,
      default: ''
    },
    owner: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    updateAt: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      isExpend: false
    }
  },
  methods:{
    expendClick(){
      this.isExpend = !this.isExpend
    }
  }
}

</script>

<style lang="less" scoped>
@import "~ant-design-vue/lib/style/index";

// The prefix to use on all css classes from ant-pro.
@ant-pro-prefix             : ant-pro;
@ant-global-sider-zindex    : 106;
@ant-global-header-zindex   : 105;

.content {
  .desc-ellipsis{
    line-height: 22px;
    white-space:pre-line;
  //   width: 10.3rem;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    
  }
  .description {
    // max-width: 720px;
    line-height: 22px;
  }
  .extra {
    margin-top: 16px;
    color: @text-color-secondary;
    line-height: 22px;

    & /deep/ .ant-avatar {
      position: relative;
      top: 1px;
      width: 20px;
      height: 20px;
      margin-right: 8px;
      vertical-align: top;
    }

    & > em {
      margin-left: 16px;
      color: @disabled-color;
      font-style: normal;
    }
  }
}

@media screen and (max-width: @screen-xs) {
  .content {
    .extra {
      & > em {
        display: block;
        margin-top: 8px;
        margin-left: 0;
      }
    }
  }
}
</style>
