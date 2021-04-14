<template>
  <div>
    <a-card class="cardList" :title="bargainId">
      
    </a-card>
  </div>
</template>

<script>
const dataSource={
  owner:"王晓丽",
  desc: '“2022基础备考_微观经济学备考_核心考点(7)”相关内容，希望对大家有所帮助，预祝大家能考上理想的院校。更多经济学考研信息尽在中公考研经济学频道！',
  cover: "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
  // cover: ["https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png"],
  label:["专业课","计算机","408"],
  owner: '王小军',
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
  data(){
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