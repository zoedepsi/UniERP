<template>
  <div class="page-wrapper">
    <el-row>
      <el-col :span="10">
        <div class="page-title" id="vip-title">员工管理</div>
      </el-col>
      <el-col :span="14">
        <el-button type="primary" style="float:right;margin-right:10px" @click="createEm">添加员工</el-button>
      </el-col>
    </el-row>
    <div class="bills-wrapper">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="员工姓名" prop="name"></el-table-column>
        <el-table-column label="员工电话" prop="tel"></el-table-column>
        <el-table-column label="所属门店" prop="shopname"></el-table-column>
        <el-table-column label="员工角色" prop="rolename"></el-table-column>
        <el-table-column label="登陆用户名" prop="username"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editemployee(scope.row.id)">编辑</el-button>
            <el-button type="success" size="small" @click="resetPass(scope.row.id)">重置登陆密码</el-button>
            <el-button type="danger" size="small" @click="delemployee(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加员工" :visible.sync="dialogVisible">
      <el-form :model="createForm" :rules="rules" ref="createForm" label-width="80px">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="createForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属门店" prop="shop">
          <el-select v-model="createForm.shop" placeholder="请选择门店">
            <el-option v-for="item in shops" :key="item.id" :label="item.shopname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工角色" prop="role">
          <el-select v-model="createForm.role" placeholder="请选择角色">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登陆用户名" prop="username">
          <el-input v-model="createForm.username"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreate">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="员工编辑" :visible.sync="dialogVisible2">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="80px">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属门店" prop="shop">
          <el-select v-model="editForm.shop" placeholder="请选择门店">
            <el-option v-for="item in shops" :key="item.id" :label="item.shopname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工角色" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择角色">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登陆用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
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
      shops: [],
      roles: [],
      createForm: {
        name: "",
        tel: "",
        shop: "",
        role: "",
        username: ""
      },
      editForm: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入员工姓名",
            trigger: "blur"
          }
        ],
        role: [
          {
            required: true,
            message: "请选择员工角色",
            trigger: "blur",
            type: "number"
          }
        ],
        shop: [
          {
            required: true,
            message: "请输入选择所属门店",
            trigger: "blur",
            type: "number"
          }
        ],
        username: [
          {
            required: true,
            message: "请设置登陆用户名",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.refreshData();
    this.getShops();
    this.getRoles();
  },
  created() {
    if (!window.sessionStorage.getItem("userId")) {
      this.$router.push({
        path: "/login"
      });
    }
  },
  methods: {
    getShops() {
      var that = this;
      that
        .axios({
          method: "get",
          url: rootPath + "/salesys/shops"
        })
        .then(res => {
          that.shops = res.data.data;
        });
    },
    getRoles() {
      var that = this;
      that
        .axios({
          method: "get",
          url: rootPath + "/salesys/roles"
        })
        .then(res => {
          that.roles = res.data.data;
        });
    },
    resetPass(id) {
      var that = this;

      that
        .$confirm("此操作将重置该员工的登陆密码为123456, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that
            .axios({
              method: "post",
              url: rootPath + "/salesys/resetpass",
              data: {
                id: id
              }
            })
            .then(res => {
              that.$message({
                type: "success",
                message: res.data.msg
              });
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    createEm() {
      var that = this;
      that.createForm = {
        name: "",
        tel: "",
        shop: "",
        role: "",
        username: ""
      };
      this.dialogVisible = true;
    },
    editemployee(id) {
      var that = this;
      that
        .axios({
          method: "post",
          url: rootPath + "/salesys/employeebyid",
          data: {
            id: id
          }
        })
        .then(res => {
          that.editForm = res.data.data[0];
        });
      this.dialogVisible2 = true;
    },

    delemployee(id) {
      var that = this;
      that
        .$confirm("此操作将删除该员工, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that
            .axios({
              method: "post",
              url: rootPath + "/salesys/delemployee",
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
    },
    submitCreate() {
      var that = this;
      that.$refs["createForm"].validate(valid => {
        if (valid) {
          that
            .axios({
              method: "post",
              url: rootPath + "/salesys/editemployee",
              data: {
                name: that.createForm.name,
                shop: that.createForm.shop,
                username: that.createForm.username,
                role: that.createForm.role
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
                  name: "",
                  shop: "",
                  role: "",
                  username: ""
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
              url: rootPath + "/salesys/editgood",
              data: {
                id: that.editForm.id,
                name: that.editForm.name,
                shop: that.editForm.shop,
                username: that.editForm.username,
                role: that.editForm.role
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
          url: rootPath + "/salesys/employee"
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
