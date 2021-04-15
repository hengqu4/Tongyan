<template>
  <div class="template-manage">
    <el-button type="primary" plain 
      icon="el-icon-circle-plus-outline"
      style="width:100%"
      @click="addTemp"
    >
      新增待办事项
    </el-button>
    <div class="temp-list">
      <el-table
        stripe
        class="template-list"
        :data="tempList"
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
      >
        <el-table-column label="名称" align="center"  width="200px">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.name }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.name" placeholder="请填写模板名称"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="时长" align="center"  width="120px">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.duration }}min</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.duration" placeholder="请填写计划时长"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="今日完成" align="center" width="120px">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.num }}次</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.num" :disabled="true" placeholder="0" >
              </el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"  align="center" >
          <template slot-scope="scope">
            <div class="operate-groups">
              <el-button
                type="primary"
                size="mini"
                v-if="!scope.row.editing"
                icon="el-icon-s-unfold"
                >开始
              </el-button>
              <el-button
                size="mini"
                v-if="!scope.row.editing"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                v-if="scope.row.editing"
                icon="el-icon-check"
                @click="handleSave(scope.$index, scope.row)">保存
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="!scope.row.editing"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
              <el-button
                size="mini"
                type="warning"
                v-if="scope.row.editing"
                icon="el-icon-close"
                @click="handleCancel(scope.$index, scope.row)">取消
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
const tableData = [
  {
    name: '数学一',
    duration: 40,
    num:2
  }, 
  {
    name: '英语一',
    duration: 40,
    num:0
  }, 
  {
    name: '专业课',
    duration: 40,
    num:1
  },
]
export default {
  data () {
    return {
      tempList: [],
    }
  },
  created () {
    this.tempList = tableData
    // this.tempList = JSON.parse(localStorage.getItem('tempList'))
  },
  methods: {
    // 编辑
    handleEdit ($index, row) {
      this.$set(this.tempList[$index], 'editing', true)
    },
    // 保存
    handleSave ($index, row) {
      this.$set(this.tempList[$index], 'editing', false)
      localStorage.setItem('tempList', JSON.stringify(this.tempList))
    },
    // 取消
    handleCancel ($index, row) {
      this.$set(this.tempList[$index], 'editing', false)
    },
    // 新增一条模板数据
    addTemp () {
      // debugger
      this.tempList = this.tempList || []
      this.tempList.push({
        name: '',
        duration: 0,
        num: 0,
        editing: true
      })
    },
    // 删除
    handleDelete ($index, row) {
      this.$confirm('是否删除该事项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tempList.splice($index, 1)
        localStorage.setItem('tempList', JSON.stringify(this.tempList))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.template-manage {
  width: 100%;
  margin: 0 auto;
  .temp-title {
    display: flex;
    justify-content: space-between;
    height: 30px;
    margin-top: 20px;
  }
  .el-table {
    background-color: #f7f7f7;
    margin-top: 20px;
    th>.cell {
      text-align: center !important; 
  }
  }
}
</style>