<template>
  <!-- <div class="calendar">
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{date, data}">
        <div style="position: relative">
          {{ data.day.split("-").slice(2)[0] }}
        <div v-for="(item,i) in calData" :key="item.id">
        <div v-if="data.day.split('-').slice(1)[0] == item.months">
          <div v-if="item.days.indexOf(data.day.split('-').slice(2).join('-')) != -1 && item.type != -1"
            :class="'li-0' + item.type"
            class="calendar-for"
          >
            有标记{{item.days}}-{{item.type}}
          </div>
        </div>
        <div v-else></div>
        </div>
        </div>
      </template>
    </el-calendar>
  </div> -->
  <div class="calendar">
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{date, data}">
        <div style="position: relative">
          {{ data.day.split("-").slice(2)[0] }}
        <div v-for="(item,i) in calData" :key="item.id">
        <div v-if="data.day.split('-').slice(1)[0] == item.month">
          <div v-if="item.day==data.day.split('-').slice(2).join('-') && item.type != -1"
            :style="{'--opa': getOpacity(item.duration)}" class="day-bg"
            style="background:#055e14 !important;width:100%;min-height:40px"
            
          >
            <!-- <img style="background:#055e14 !important;width:100%;min-height:30px"/> -->
          <!-- :class="'li-0' + item.type"
            class="calendar-for" -->
            <!-- 有标记{{item.day}}-{{item.type}} -->
          </div>
        </div>
        <div v-else></div>
        </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
// const calendarData=[
//   { id: 1, months: ["04"], days: ["4"], type: 2 },
//   { id: 2, months: ["04"], days: ["11"], type: 0 },
//   { id: 3, months: ["04"], days: ["12"], type: 3 },
//   { id: 4, months: ["04"], days: ["14"], type: 0 },
//   { id: 5, months: ["04"], days: ["23"], type: 2 }
// ]
const calendarData=[
  { month: "04", day: "02", duration: 200 },
  { month: "04", day: "03", duration: 30 },
  { month: "04", day: "05", duration: 95 },
  { month: "04", day: "07", duration: 125 },
  { month: "04", day: "08", duration: 213 },
  { month: "04", day: "10", duration: 303 },
  { month: "04", day: "12", duration: 413 },
  { month: "04", day: "14", duration: 200 },
]
export default {
  data() {
    return {
      value: new Date(),
      calData:""
    }
  },
  created(){
    this.calData = calendarData
    console.log("calData:",this.calData)
  },
  mounted(){
    // this.$nextTick(() => {
    //   // 点击前一个月
    //   let prevBtn = document.querySelector('.el-calendar__button-group');
    //   prevBtn.addEventListener('click',() => {
    //     console.log("获取的是时间戳")
    //   })
    // });
  },
  methods:{
    getOpacity(value) {
      console.log(value)
      if(value<=0){
        return 0
      }
      else if(value>=480){
        return 1
      }
      else{
        return (Math.ceil(value/48))/10
      }
    }
  }
}
</script>

<style>
.day-bg{
  opacity:var(--opa);
  background: #055e14
}

</style>