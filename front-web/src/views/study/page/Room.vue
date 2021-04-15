<template>
  <div class="app-list">
    <el-card style="width:90%; margin:0 auto; margin-bottom:30px" >
      <div slot="header" class="clearfix">
        <span>{{data.roomName}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">退出</el-button>
      </div>
      <div class="text-item">
        {{data.roomDesc}}
      </div>
    </el-card>

    <a-list
      :grid="{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }"
      :dataSource="data.stuData">
      <a-list-item slot="renderItem" slot-scope="item">
        <el-card shadow="never" style="width:90%; margin:0 auto">
          <el-row :gutter="12">
            <el-col :span="4">{{item.rank}}</el-col>
            <el-col :span="8">
              <a-avatar :src="item.avatar" size="small"/>{{item.name}}
            </el-col>
            <el-col :span="6">{{item.status?"学习中...":"休息中..."}}</el-col>
            <el-col :span="6">{{changeHourMinutestr(item.duration)}}</el-col>
          </el-row>
        </el-card>
      </a-list-item>
    </a-list>

  </div>
</template>

<script>
const stuSource = []
for (let i = 0; i < 11; i++) {
  stuSource.push({
    rank: i+1,
    userId:1000+i,
    name:"user_"+parseInt(857423/(i+1))+27*i,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    status:i%3==0?1:0,
    duration:503-i*47
  })
}
const dataSource={
  roomId: 2131,
  roomName:"禁止熬夜自习室",
  roomDesc:"本自习室要热爱学习！禁止摸鱼，日常保持学习节奏，不许熬夜再学！",
  stuData:stuSource
}

export default {
  name: 'Article',
  components: {},
  data () {
    return {
      data:""
    }
  },
  created(){
    this.data = dataSource
    console.log('dataData', this.data)
  },
  methods:{
    changeHourMinutestr(str) {
      console.log(str)
      if (str !== "0" && str !== "" && str !== null && str>59) {
        return ((Math.floor(str / 60)).toString().length < 2 ? (Math.floor(str / 60)).toString() : 
        (Math.floor(str / 60)).toString()) + "小时" + ((str % 60).toString().length < 2 ? " " + (str % 60).toString() : (str % 60).toString()) +"分钟";
        }
      else if(str<=0){
        return "今日未学习";
      }
      else{
        return "    "+str+"分钟"
      }
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