<template>
  <div>
    <page-header-wrapper>
      <template v-slot:content>
        <div class="page-header-content">
          <div class="avatar">
            <a-avatar size="large" :src="currentUser.avatar"/>
          </div>
          <div class="content">
            <div class="content-title">
              <!-- {{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome }}</span> -->
              <span class="welcome-text">{{ welcome }}</span>
            </div>
            <!-- <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div> -->
          </div>
        </div>
      </template>
      <template v-slot:extraContent>
        <div class="extra-content">
          <div class="stat-item">
            <a-statistic title="回答数" :value="56" />
          </div>
          <div class="stat-item">
            <a-statistic title="浏览数" :value="5600" />
          </div>
          <!-- <div class="stat-item">
            <a-statistic title="团队内排名" :value="8" suffix="/ 24" />
          </div> -->
          <!-- <div class="stat-item">
            <a-statistic title="项目访问" :value="2223" />
          </div> -->
        </div>
      </template>
    </page-header-wrapper>

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
          <a-list-item-meta>
            <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
            <!-- <template slot="description">
              <span>
                <a-tag>专业课</a-tag>
                <a-tag>计算机</a-tag>
                <a-tag>408</a-tag>
              </span>
            </template> -->
          </a-list-item-meta>
          <article-list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :href="item.href" :updateAt="item.updatedAt" />
        </a-list-item>
        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
// import { welcome } from '../../utils/util'
import IconText from './components/IconText'
const TagSelectOption = TagSelect.Option

import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'

export default {
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ArticleListContent,
    IconText,
    PageHeaderWrapper,
    Radar
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},
      welcome:'若a的首地址为2020 FEOOH, a的成员变量x2的机器数为1234 0000H,则其中34H所在存储单元的地址是什么',

      loading: true,
      loadingMore: false,
      data: [],
      form: this.$form.createForm(this)
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
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
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
    },
    setOwner () {
      const { form: { setFieldsValue } } = this
      setFieldsValue({
        owner: ['wzj']
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
