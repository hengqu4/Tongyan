<template>
  <a-card style="margin-top: 24px;" :bordered="false">
    <a-list
      size="large"
      rowKey="id"
      :loading="loading"
      itemLayout="vertical"
      :dataSource="data"
    >
      <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
        <template slot="actions">
          <icon-text type="like-o" :text="item.like" />
          <icon-text type="star-o" :text="item.star" />
          <icon-text type="message" :text="item.message" />
        </template>
        <!-- <list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :updateAt="item.updatedAt" /> -->
        <div class="content">
          <div :class="{'desc-ellipsis': !isExpend}" class="description">
              {{ item.description }}    
          </div>
          <el-button type="text" :icon="isExpend?'el-icon-arrow-up':'el-icon-arrow-down'" @click="expendClick" style='float:right'>
            {{isExpend? '收起': '展开' }}
          </el-button>
          <div class="extra">
            <a><a-avatar :src="item.avatar" size="small" />{{ item.owner }}</a> 
            <em>{{ item.updateAt | moment }}</em>
          </div>
        </div>
      </a-list-item>
      <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
        <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
      </div>
    </a-list>
  </a-card>
</template>

<script>
import IconText from './IconText'
// import ListContent from './ListContent'
import { mapState } from 'vuex'

const ques = {
  content:'c++课程学到了一半，觉得越想越不明白,为什么c++中要分为heap（堆）和stack（栈）?',
  anwserNum:14,
  viewNum:324,
  reward:50,
  tagList:'专业课',
  createTime:'2000-10-2'
}
export default {
  components: {
    IconText
  },

  props:['answer'],
  data(){
    return{
      data:this.answer,
      loading: true,
      loadingMore: false,
      isExpend: false
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname
      // welcome: (state) => state.user.welcome
    }),
    currentUser () {
      return {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    },
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.question = ques
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
  },
  mounted () {
    console.log('question:')
    console.log('question:',this.question)
    this.getList()
  },
  methods: {
    expendClick(){
      this.isExpend = !this.isExpend
    },
    getList () {
      this.$http.get('/list/article').then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    loadMore () {
      this.loadingMore = true
      this.$http.get('/list/article').then(res => {
        this.data = this.data.concat(res.result)
      }).finally(() => {
        this.loadingMore = false
      })
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

