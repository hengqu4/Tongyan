<template>
  <div class="app-list">
    <el-card style="width:90%; margin:0 auto; margin-bottom:30px" >
      <div slot="header" class="clearfix">
        <span>禁止熬夜自习室</span>
        <el-button style="float: right; padding: 3px 0" type="text">退出</el-button>
      </div>
      <div class="text-item">
        本自习室要热爱学习！禁止摸鱼
      </div>
    </el-card>

    <a-list
      :grid="{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }"
      :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <el-card shadow="never" style="width:90%; margin:0 auto">
          <el-row :gutter="12">
            <el-col :span="4">1</el-col>
            <el-col :span="8">username</el-col>
            <el-col :span="6">学习中...</el-col>
            <el-col :span="6">56min</el-col>
          </el-row>
        </el-card>
        <!-- <a-card :hoverable="true">
          <a-card-meta>
            <div style="margin-bottom: 3px" slot="title">{{ item.title }}</div>
            <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="small"/>
            <div class="meta-cardInfo" slot="description">
              <div>
                <p>活跃用户</p>
                <p>
                  <span>{{ item.activeUser }}<span>万</span></span>
                </p>
              </div>
              <div>
                <p>新增用户</p>
                <p>{{ item.newUser | NumberFormat }}</p>
              </div>
            </div>
          </a-card-meta>
        </a-card> -->
      </a-list-item>
    </a-list>

  </div>
</template>

<script>
const dataSource = []
for (let i = 0; i < 11; i++) {
  dataSource.push({
    title: 'Alipay',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    activeUser: 17,
    newUser: 1700
  })
}

export default {
  name: 'Article',
  components: {},
  data () {
    return {
      dataSource
    }
  }
}
</script>

<style lang="less" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>