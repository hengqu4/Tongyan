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
        <a-list-item-meta>
          <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
        </a-list-item-meta>
        <article-list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :href="item.href" :updateAt="item.updatedAt" />
      </a-list-item>
      <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
        <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
      </div>
    </a-list>
  </a-card>
</template>

<script>
export default {
  props:['answer'],
  data(){
    return{
      data:this.answer
    }
  },
  create(){
    
  }
}
</script>
