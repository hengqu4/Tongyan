<template>
  <div>
    <template v-slot:content>
      <div class="extra-content">
        <div class="stat-item">
          <a-statistic title="回答数" :value="data.anwserNum" />
        </div>
        <div class="stat-item">
          <a-statistic title="浏览数" :value="data.viewNum" />
        </div>
      </div>
      <div>
      <div class="label-tag" >
        <span>
          <a-tag>{{data.tagList}}</a-tag>
          <a-tag>计算机</a-tag>
          <a-tag>408</a-tag>
        </span>
      </div>
      <div class="content">
        {{ data.content }}
      </div>
      {{ data.createTime }}
      <span class='el-icon-coin' style="color:#d35400;margin: 0 30px">{{ data.reward }}</span>
      <el-button type="text" icon="el-icon-edit">写回答</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
    
  },
  props: ['question'],
  data () {
    return {
      data: this.question
    }
  },
  created () {
    
  },
  methods: {
    changeFoldState() {
      this.brandFold = !this.brandFold
    },
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/list/article').then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';

.text-overflow() {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}

// mixins for clearfix
// ------------------------
.clearfix() {
  zoom: 1;
  &::before,
  &::after {
    display: table;
    content: ' ';
  }
  &::after {
    clear: both;
    height: 0;
    font-size: 0;
    visibility: hidden;
  }
}

.content {
  display: flex;
  position: relative;
  margin: 15px 0;
  flex: 1 1 auto;
  color: @heading-color;
  line-height: 22px;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
}

.extra-content {
  .clearfix();
  float: right;
  white-space: nowrap;
  font-size: 16px;

  .stat-item {
    position: relative;
    display: inline-block;
    padding: 0 32px;

    > p:first-child {
      margin-bottom: 4px;
      color: @text-color-secondary;
      font-size: @font-size-base;
      line-height: 22px;
    }

    > p {
      margin: 0;
      color: @heading-color;
      font-size: 30px;
      line-height: 38px;

      > span {
        color: @text-color-secondary;
        font-size: 20px;
      }
    }

    &::after {
      position: absolute;
      top: 8px;
      right: 0;
      width: 1px;
      height: 40px;
      background-color: @border-color-split;
      content: '';
    }

    &:last-child {
      padding-right: 0;

      &::after {
        display: none;
      }
    }
  }
}

</style>