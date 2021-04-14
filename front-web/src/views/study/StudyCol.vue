<template>
  <div>
    <a-card class="page-header-wrapper-grid-content-main">
      <a-row :gutter="24">
        <a-col :md="24" :lg="8">
          <div class="account-center-avatarHolder">
            <a-avatar :src="avatar" size="middle" />
            <span class="username">{{ nickname }}</span>
            <div style="padding-top:10px">海纳百川，有容乃大</div>
          </div>
        </a-col>

        <a-col :md="24" :lg="8">
          <div class="account-center-detail">
            <p class="el-icon-school">就读学校：黄渡理工大学</p><br/>
            <p class="el-icon-wind-power">目标学校：同济大学</p>
          </div>
        </a-col>

        <a-col :md="24" :lg="8">
          <p>正在学习</p>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="width:100%"
      :bordered="false"
      :tabList="tabListNoTitle"
      :activeTabKey="noTitleKey"
      @tabChange="key => handleTabChange(key, 'noTitleKey')"
    >
      <article-page v-if="noTitleKey === 'article'"></article-page>
      <app-page v-else-if="noTitleKey === 'app'"></app-page>
      <project-page v-else-if="noTitleKey === 'project'"></project-page>
    </a-card>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { AppPage, ArticlePage, ProjectPage } from './page'

import { mapGetters } from 'vuex'

export default {
  components: {
    RouteView,
    PageView,
    AppPage,
    ArticlePage,
    ProjectPage
  },
  data () {
    return {
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],

      tagInputVisible: false,
      tagInputValue: '',

      teams: [],
      teamSpinning: true,

      tabListNoTitle: [
        {
          key: 'article',
          tab: '代办'
        },
        {
          key: 'app',
          tab: '数据'
        },
        {
          key: 'project',
          tab: '项目(8)'
        }
      ],
      noTitleKey: 'app'
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  mounted () {
    this.getTeams()
  },
  methods: {
    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
        this.teamSpinning = false
      })
    },

    handleTabChange (key, type) {
      this[type] = key
    },

    handleTagClose (removeTag) {
      const tags = this.tags.filter(tag => tag !== removeTag)
      this.tags = tags
    },

    showTagInput () {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },

    handleInputChange (e) {
      this.tagInputValue = e.target.value
    },

    handleTagInputConfirm () {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }

      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
  margin-bottom: 30px;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 18px;
      line-height: 28px;
      font-weight: 300;
      padding-left: 5px;
    }
  }

  .account-center-detail {
    p {
      font-size: 16px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
