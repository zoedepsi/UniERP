<template>
  <div class="page-wrapper">
    <el-row>
      <el-col :span="10">
        <div class="page-title" id="vip-title">分类管理</div>
      </el-col>
      <el-col :span="14">
        <el-button type="primary" style="float:right;margin-right:10px" @click="createclass">添加分类</el-button>
      </el-col>
    </el-row>
    <div class="bills-wrapper">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editclass(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="delclass(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="分类创建" :visible.sync="dialogVisible">
      <el-form :model="createForm" :rules="rules" ref="createForm" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="createForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreate">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分类编辑" :visible.sync="dialogVisible2">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="80px">
        <el-form-item label="分类" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type='text/ecmascript-6'>
import { rootPath } from "../../config/apiConfig";

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogVisible2: false,
      createForm: {
        name: ""
      },
      editForm: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.refreshData();
  },
  created() {
    if (!window.sessionStorage.getItem("userId")) {
      this.$router.push({
        path: "/login"
      });
    }
  },
  methods: {
    createclass() {
      var that = this;
      that.createForm = {
        shopname: "",
        shopaddress: "",
        shoptel: ""
      };
      this.dialogVisible = true;
    },
    editclass(id) {
      var that = this;
      that
        .axios({
          method: "post",
          url: rootPath + "/salesys/classbyid",
          data: {
            id: id
          }
        })
        .then(res => {
          that.editForm = res.data.data[0];
        });
      this.dialogVisible2 = true;
    },

    delclass(id) {
      var that = this;
      that
        .axios({
          method: "post",
          url: rootPath + "/salesys/checkgoodclass",
          data: {
            id: id
          }
        })
        .then(response => {
          if (response.data.data.length == 0) {
            that
              .$confirm("此操作将删除该分类, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                that
                  .axios({
                    method: "post",
                    url: rootPath + "/salesys/delclass",
                    data: {
                      id: id
                    }
                  })
                  .then(response => {
                    that.$message({
                      type: "success",
                      message: response.data.msg
                    });
                    that.refreshData();
                  });
              })
              .catch(() => {
                that.$message({
                  type: "info",
                  message: "已取消删除"
                });
              });
          } else {
            that.$message({
              type: "error",
              message: "该分类还有商品，不能删除"
            });
          }
        });
    },
    submitCreate() {
      var that = this;
      that.$refs["createForm"].validate(valid => {
        if (valid) {
          that
            .axios({
              method: "post",
              url: rootPath + "/salesys/editclass",
              data: {
                name: that.createForm.name,
              }
            })
            .then(res => {
              if (res.data.code == "00000") {
                that.$message({
                  type: "success",
                  message: "提交成功"
                });
                that.dialogVisible = false;
                that.createForm = {
                name:""
                };
                that.refreshData();
              }
            });
        } else {
          return false;
        }
      });
    },
    submitEdit() {
      var that = this;
      that.$refs["editForm"].validate(valid => {
        if (valid) {
          that
            .axios({
              method: "post",
              url: rootPath + "/salesys/editclass",
              data: {
                id: that.editForm.id,
                name:that.editForm.name
              }
            })
            .then(res => {
              if (res.data.code == "00000") {
                that.$message({
                  type: "success",
                  message: "提交成功"
                });
                that.dialogVisible2 = false;
                that.refreshData();
              }
            });
        } else {
          return false;
        }
      });
    },
    refreshData() {
      var that = this;
      that
        .axios({
          method: "get",
          url: rootPath + "/salesys/classes"
        })
        .then(response => {
          that.tableData = response.data.data;
        });
    }
  }
};
</script>
<style scoped>
.page-title {
  border-left: 3px solid #699fff;
  text-indent: 8px;
  font-family: "Microsoft YaHei";
  font-size: 18px;
}

#page-title {
  margin-bottom: 0;
}

.bills-wrapper {
  float: left;
  width: 99%;
  padding-top: 20px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  min-height: 30px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.dkdia .el-dialog--small {
  width: 40%;
}

.dateContainer {
  height: 60px;
  border: 1px solid black;
}

.repTitle {
  font-size: 16px;
  color: #ccc;
  font-weight: bold;
  margin: 10px 0;
}

.report {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0;
}

.report span {
  display: block;
  width: 30px;
  font-size: 16px;
  text-align: center;
  margin: 0 5px;
}

.reportInput {
  width: 70%;
}

.reportSel {
  width: 80px;
  margin: 0 10px;
}
.discussList p {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #ccc;
  margin: 5px 0;
}
.discussList .item {
  margin: 5px;
  padding: 5px;
  border-bottom: 1px solid #eee;
}
</style>
