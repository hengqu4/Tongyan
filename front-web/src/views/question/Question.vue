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
import IconText from './components/IconText'
const TagSelectOption = TagSelect.Option

export default {
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ArticleListContent,
    IconText
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
