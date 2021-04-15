<template>
  <div class="page-header-index-wide grid-content">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false" style="min-height:800px">
          <div class="countdown-center">
            <p>正在学习：</p>
            <div style="border: 1px #74b9ff solid; padding:20px 0;font-size:20px">
            <p>数学一</p>
            <a-statistic-countdown
              title="倒计时"
              :value="deadline"
              valueStyle="font-size:25px"
              @finish="onFinish"
            />
            </div>
            <el-button type="primary" plain style="margin-top:10px">结束</el-button>
          </div>
          <a-divider/>
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="avatar">
            </div>
            <div class="username">{{ nickname }}</div>
            <!-- <a-avatar :src="avatar" size="large" />
            <div class="username">{{ nickname }}</div> -->
            <div style="padding-top:10px">海纳百川，有容乃大</div>
          </div>
          <div class="account-center-detail">
            <p class="el-icon-school">就读学校：黄渡理工大学</p>
            <p class="el-icon-wind-power">目标学校：同济大学</p>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width:100%;min-height:800px"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <mission-page v-if="noTitleKey === 'mission'"></mission-page>
          <room-page v-else-if="noTitleKey === 'room'"></room-page>
          <statistic-page v-else-if="noTitleKey === 'statistic'"></statistic-page>
        </a-card>
      </a-col>
    </a-row>
    <back-top/>
  </div>
</template>

<script>
import {BackTop} from '@/components'
import { PageView, RouteView } from '@/layouts'
import { RoomPage, MissionPage, StatisticPage } from './page'

import { mapGetters } from 'vuex'

export default {
  components: {
    BackTop,
    RouteView,
    PageView,
    RoomPage,
    MissionPage,
    StatisticPage
  },
  data () {
    return {
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
      
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],

      tagInputVisible: false,
      tagInputValue: '',

      teams: [],
      teamSpinning: true,

      tabListNoTitle: [
        {
          key: 'mission',
          tab: '代办'
        },
        {
          key: 'statistic',
          tab: '统计'
        },
        {
          key: 'room',
          tab: '自习室'
        }
      ],
      noTitleKey: 'statistic'
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  mounted () {
    this.getTeams()
  },
  methods: {
    onFinish(){

    },
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
.grid-content{
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

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
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      font-size:16px;
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .countdown-center {
    text-align: center;
    min-height: 200px;
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
