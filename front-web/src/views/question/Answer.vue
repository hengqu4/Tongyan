<template>
  <div>
    <question-title :question="question"/>

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
          <list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :updateAt="item.updatedAt" />
        </a-list-item>
        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import IconText from './components/IconText'
import QuestionTitle from './components/QuestionTitle'
import ListContent from './components/ListContent'
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
    IconText,
    QuestionTitle,
    ListContent
  },
  data () {
    return {
      avatar: '',
      user: {},
      question: {},
      loading: true,
      loadingMore: false,
      data: []
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
    // console.log('question:',this.question)
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('/list/article').then(res => {
        // console.log('res', res)
        this.data = res.result
        this.loading = false
        console.log('Answer.vue.data', res.result)
      })
    },
    loadMore () {
      this.loadingMore = true
      this.$http.get('/list/article').then(res => {
        this.data = this.data.concat(res.result)
        console.log('Answer.vue.loadMore', res.result)
      }).finally(() => {
        this.loadingMore = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./Answer.less";

.ant-pro-page-header-search {
  text-align: center;
  margin-bottom: 16px;
}
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
</style>
