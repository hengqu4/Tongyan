<template>
  <div class="content">
    <div class="extra">
      <a>
        <a-avatar :src="avatar" size="small" />{{ owner }}
      </a> 
      <em>{{ updateAt | moment }}</em>
    </div>
  <ellipsis-text :longText="description" />
</div>
</template>

<script>
import EllipsisText from '@/components/EllipsisText'
export default {
  name: 'ListContent',
  components: {
    EllipsisText
  },
  props: {
    avatar: {
      type: String,
      default: ''
    },
    owner: {
      type: String,
      default: ''
    },
    updateAt: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  data(){
    return{
      
    }
  },
  mounted(){
    // console.log(this.Avatar)
  },
  methods:{

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
  .extra {
    // margin-top: 16px;
    margin-bottom: 16px;
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

</style>
