<template>
  <div>
    <page-header-wrapper>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <div class="ant-pro-page-header-search">
        <a-input-search size="large" style="max-width: 522px;">
          <template v-slot:enterButton>
            搜索
          </template>
        </a-input-search>
        <standard-form-row  block style="padding-bottom: 11px;">
          <a-form-item>
            <tag-select>
              <tag-select-option value="Category1">类别一</tag-select-option>
              <tag-select-option value="Category2">类别二</tag-select-option>
              <tag-select-option value="Category3">类别三</tag-select-option>
              <tag-select-option value="Category4">类别四</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>
      </div>
      </a-form>
    </a-card>
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
          <!-- <template slot="actions">
            <span>{{item.owner}}</span>
            <span>{{item.updatedAt}}</span>
            <span class='el-icon-coin' style="color:#d35400">{{ item.star }}</span>
          </template> -->
          <template slot="extra">
            <div class="extra-content">
              <div class="stat-item">
                <a-statistic title="回答数" :value="item.star" style="font-size: 10px  !important;;"/>
              </div>
              <div class="stat-item">
                <a-statistic title="浏览数" :value="item.star" />
              </div>
            </div>
          </template>

          <a-list-item-meta>
            <template slot="description">
              <span>
                <a-tag>Ant Design</a-tag>
                <a-tag>设计语言</a-tag>
                <a-tag>蚂蚁金服</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <ellipsis-text :longText="item.description" />
          <div class="extra">
            <a :href="href">{{ item.owner }}</a>
            <em>{{ item.updateAt | moment }}</em>
            <span class='el-icon-coin' style="color:#d35400;padding-left:10px">{{ item.star }}</span>
          </div>
        </a-list-item>

        <!-- <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <icon-text type="star-o" :text="item.star" />
            <icon-text type="like-o" :text="item.like" />
            <icon-text type="message" :text="item.message" />
          </template>
          <a-list-item-meta>
            <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
            <template slot="description">
              <span>
                <a-tag>Ant Design</a-tag>
                <a-tag>设计语言</a-tag>
                <a-tag>蚂蚁金服</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <list-content 
            :owner="item.owner" 
            :avatar="item.avatar" 
            :updateAt="item.updatedAt"
            :description="item.description" 
          />
        </a-list-item> -->
        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
// import EllipsisText from '@/components/EllipsisText'
import { TagSelect, StandardFormRow, EllipsisText } from '@/components'
import IconText from './components/IconText'
const TagSelectOption = TagSelect.Option

export default {
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    IconText,
    EllipsisText
  },
  data () {
    return {
      loading: true,
      loadingMore: false,
      data: [],
      form: this.$form.createForm(this)
    }
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
@import '~ant-design-vue/es/style/themes/default.less';

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

.extra-content {
  font-size: 16px;
  padding-top: 20px;

  .stat-item {
    position: relative;
    display: inline-block;
    padding: 0 32px;
    
    &::after {
      position: absolute;
      top: 8px;
      right: 0;
      width: 1px;
      height: 40px;
      background-color: @border-color-split;
      content: '';
    }
  }
}
</style>
