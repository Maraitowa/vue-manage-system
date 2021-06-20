<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 处理框 -->
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection" size="small">批量删除</el-button>
        <el-select v-model="address" placeholder="地址" class="handle-select mr10"  size="small">
          <el-option
            v-for="item in addr"
            :key="item.index"
            :value="item">
          </el-option>
        </el-select>
        <el-input v-model="name" placeholder="用户名" class="handle-input mr10"  size="small"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"  size="small">搜索</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="showTable" border class="table" size="small"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="55"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column label="账户余额">
          <template #default="scope">￥{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image 
              class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
              >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : '' " size="small">{{ scope.row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="注册时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text" size="small"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button 
              type="text" size="small"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <div class="pagination">
        <el-pagination 
          background
          layout="total, prev, pager, next"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="pageTotal"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button  type="primary" @click="saveEdit">确 认</el-button>
          <el-button  @click="editVisible = false">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  data() {
    return {
      name: '',
      address: '',
      addr: ['广东省', '湖南省', '福建省'],
      idx: -1,
      form: {},
      editVisible: false,
      tableData: [
        {
          id: 1,
          name: "张三",
          money: 111,
          thumb: 'https://lin-xin.gitee.io/images/post/wms.png',
          address: "广东省东莞市长安镇",
          state: '成功',
          date: "2020-1-15"
        },
        {
          id: 2,
          name: "李四",
          money: 222,
          thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
          address: "广东省广州市白云区",
          state: '成功',
          date: "2020-2-15"
        },
        {
          id: 3,
          name: "王五",
          money: 434,
          thumb: 'https://lin-xin.gitee.io/images/post/parcel.png',
          address: "湖南省长沙市",
          state: '失败',
          date: "2020-3-15"
        },
        {
          id: 4,
          name: "赵六",
          money: 346,
          thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
          address: "福建省厦门市鼓浪屿",
          state: '成功',
          date: "2020-4-15"
        },
        {
          id: 5,
          name: "赵六",
          money: 346,
          thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
          address: "福建省厦门市鼓浪屿",
          state: '成功',
          date: "2020-4-15"
        },
        {
          id: 6,
          name: "赵六",
          money: 346,
          thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
          address: "福建省厦门市鼓浪屿",
          state: '成功',
          date: "2020-4-15"
        }
      ],
      pageIndex: 1,
      pageSize: 5,
      pageTotal: 10,
      filterDataShow: [],
      delList: [],
      multipleSelection: [],
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.handleSearch()
  },
  computed: {
    showTable() {
      return this.filterDataShow.slice((this.pageIndex-1)*this.pageSize, this.pageIndex*this.pageSize)
    }
  },
  methods: {
    // 获取数据
    getData() {},
    // 批量删除
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " "
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 搜索
    handleSearch() {
      this.pageIndex = 1
      if (this.name || this.address) {
        let list = this.tableData.filter(item => {
          // console.log(item["name"]);
          if (String(item["name"]).includes(this.name)) {
            return item
          }
        })
        if(this.address) {
          list = list.filter(item => {
            if (String(item["address"]).includes(this.address)) {
              return item
            }
          })
        }
        return this.filterDataShow = list
      }
      return this.filterDataShow = this.tableData
    },
    // 编辑
    handleEdit(index, row) {
      console.log('111');
      this.idx = index,
      this.form = row,
      this.editVisible = true
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
      this.$set(this.tableData, this.idx, this.form)
    },
    // 删除
    handleDelete(index) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.$message.success("删除成功")
        this.tableData.splice(index, 1)
      }).catch(() => {})
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
    }
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  /* display: inline-block; */
}

.mr10 {
  margin-right: 10px;
}

.table {
  widows: 100%;
  font-size: 14px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

.red {
  color: #ff0000;
}
</style>