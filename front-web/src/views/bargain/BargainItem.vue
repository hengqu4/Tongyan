<template>
<div class="page-header-index-wide grid-content">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false" style="min-height:800px;">
          <div class="owner-info">
            <a-avatar size="large" :src="data.avatar"/>
            <span class="username"> {{ data.owner}}</span>
            <div style="padding:10px 0;color:#7f8c8d">更新于 {{ (data.updateAt||' ').split(' ')[0]}}</div>
            <a-divider/>
            <div class="label-tag" >
              <span>
                <a-tag>专业课</a-tag>
                <a-tag>计算机</a-tag>
                <a-tag>408</a-tag>
              </span>
            </div>
          </div>
          <div class="buy-info">
            <span class="price-info">￥{{ data.price}}</span>
            <el-button type="danger" plain style="float:right">购买</el-button>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width:100%;min-height:800px"
          :bordered="false"
        >
          <div class="desc-info">
            {{ data.desc }}
            <div class="img-info"><img :src="data.img" ></div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <back-top/>
  </div>
</template>

<script>
import {BackTop} from '@/components'

const dataSource={
  owner:"王晓丽",
  desc: '“2022基础备考_微观经济学备考_核心考点(7)”相关内容，希望对大家有所帮助，预祝大家能考上理想的院校。更多经济学考研信息尽在中公考研经济学频道！',
  img: "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
  // cover: ["https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png"],
  label:["专业课","计算机","408"],
  owner: '王小军',
  price:5,
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  updateAt: '2020-03-18 23:59:44',
  commentList:[
    {
      user:'李俊',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
      comment:'',
      createAt:""
    },
    {
      user:'努力的小花',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
      comment:'',
      createAt:""
    }
  ]
}
export default{
  components: {
    BackTop
  },
  data () {
    return{
      bargainId:"",
      data:"",
    }
  },

  created(){
    this.bargainId = this.$route.params.bargainId
  },

  mounted(){
    this.data=dataSource
    console.log("bargainId:",this.bargainId)
    console.log("data:",this.data)
  }
}
</script>

<style lang="less" scoped>

.grid-content{
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .owner-info {
    text-align: center;
    margin-bottom: 24px;
    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }
  .buy-info {
    margin: 10px 0;
    text-align: center;
    width: 60%;
    margin-left:20%;
    .price-info{
      float:left;
      font-size: 22px;
      color: rgb(224, 98, 13);
    }
  }

  .desc-info{
    font-size: 14px;
    line-height: 30px;
    .img-info {
      text-align: center;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
