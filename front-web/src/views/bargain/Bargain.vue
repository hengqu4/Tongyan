<template>
  <div>
    <a-card class="cardList">
    <el-row>
      <el-col :xs="{span:12}" :sm="{span:12}" :md="{span:7}" :lg="{span:6}"
        v-for="(item, i) in data" :key="item.bargainId" 
      >
      <div @click="getBargainDetail(item.bargainId)">
        <el-card :body-style="{ padding: '0px' }" style="margin:20px" shadow="hover">
          <img :src="item.cover" class="cover">
          <div style="padding: 14px;">
            <ellipsis :length="50">{{ item.desc }}</ellipsis>
            <div class="priceInfo">
              ￥5
            </div>
            <div class="label-tag" >
              <span>
                <a-tag>专业课</a-tag>
                <a-tag>计算机</a-tag>
                <a-tag>408</a-tag>
              </span>
            </div>
            <div class="cardItemContent">
              <span>{{item.owner}}</span>
              <div class="timeInfo">
                {{ item.updatedAt | fromNow }}
              </div>
            </div>
          </div>
        </el-card>
      </div>
      </el-col>
    </el-row>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { Ellipsis} from '@/components'

const dataSource = []
for (let i = 0; i < 8; i++) {
  dataSource.push({
    bargainId:i+100,
    desc: '“2022基础备考_微观经济学备考_核心考点(7)”相关内容，希望对大家有所帮助，预祝大家能考上理想的院校。更多经济学考研信息尽在中公考研经济学频道！',
    cover: "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
    // cover: ["https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png"],
    label:["专业课","计算机","408"],
    owner: '王小军',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    updateAt: '2020-03-18 23:59:44',
  })
}

export default {
  components: {
    Ellipsis
  },
  data () {
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: true
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getBargainDetail(id){
      console.log(id)
      this.$router.push({
        name: 'bargain_item',
        params: {
          bargainId: id
        }
      })
    },
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.data = dataSource
      console.log('bargainList', this.data)
      this.loading = false
    //   this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
    //     console.log('res', res)
    //     this.data = res.result
    //     this.loading = false
    //   })
    }
  }
}
</script>

<style lang="less" scoped>

.cardList {
  margin-top: 24px;
  .priceInfo{
    margin: 5px 0;
    font-size: 18px;
    color: rgb(224, 98, 13);
  }
  .cover {
    width: 100%;
    display: block;
  }
  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 5px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }

  }
}
</style>
