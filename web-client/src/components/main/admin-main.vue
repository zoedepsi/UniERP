<template>
  <div class="content">
    <div class="header-wrapper">
      <div class="merinfo">
        <img src="../../assets/avatar.jpg" width="40" height="40" alt>
        <p>uhome</p>
      </div>
      <div class="close">
        <router-link to="/login">退出</router-link>
      </div>
      <div class="userinfo">{{userData.trueName}}</div>
    </div>

    <div class="content-wrapper">
      <div class="menu-wrapper">
        <el-col :span="24">
          <el-menu
            default-active="v-index"
            class
            theme="dark"
            @select="changeTab"
            style="margin-bottom: 100px;"
          >
            <!-- <el-menu-item v-for="item in menuItems" :index="'v-'+item.permissionid" :key="item.permissionid" >{{ item.permissionname }}</el-menu-item> -->
            <el-menu-item index="v-index">我的首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title">门店管理</template>
              <el-menu-item index="v-shopManage">门店信息</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">商品管理</template>
              <el-menu-item index="v-classManage">商品分类</el-menu-item>
              <el-menu-item index="v-goodManage">商品维护</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">员工管理</template>
              <el-menu-item index="v-employee">员工信息</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">销售管理</template>
              <el-menu-item index="v-employee">销售录入</el-menu-item>
              <el-menu-item index="v-employee">业绩统计</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </div>
      <div class="detail-wrapper">
        <component v-bind:is="currentView" v-on:changeCurrentView="changeView"></component>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import index from "../index/admin-index.vue";
import { rootPath } from "../../config/apiConfig";
import shopManage from "../shopManage/shopManage.vue";
import reportQuery from "../reportQuery/reportQuery.vue";
import classManage from "../classManage/classManage.vue";
import goodManage from "../goodManage/goodManage.vue";
import employee from "../employee/employee.vue";
export default {
  data() {
    return {
      userData: {},
      menuItems: [],
      currentView: "v-index"
    };
  },
  methods: {
    changeTab: function(key, keyPath) {
      this.currentView = key;
    },
    changeView(key) {
      this.currentView = key;
    },
    getUserMenu() {
      var roleId = window.sessionStorage.getItem("role");
    }
  },
  created() {
    if (!window.sessionStorage.getItem("userId")) {
      this.$router.push({ path: "/login" });
    }
    this.userData.trueName = window.sessionStorage.getItem("trueName");
  },
  components: {
    "v-index": index,
    "v-shopManage": shopManage,
    "v-reportQuery": reportQuery,
    "v-classManage": classManage,
    "v-goodManage": goodManage,
    "v-employee": employee
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content {
  width: 100%;
  height: 100%;
  position: relative;
  font-family: 'Microsoft YaHei';
  min-width: 1000px;

  .header-wrapper {
    width: 100%;
    height: 60px;
    background-color: #444;
    position: fixed;
    z-index: 10;
    top: 0;

    .logo {
      width: 200px;
      height: 60px;
      float: left;
      // background: url('../../assets/inner-logo.png') no-repeat;
    }

    .merinfo {
      height: 100%;
      width: 400px;
      float: left;
      line-height: 60px;

      img {
        display: block;
        float: left;
        margin: 10px 20px 0 30px;
        border-radius: 50%;
      }

      p {
        color: #fff;
      }
    }

    .userinfo, .close {
      float: right;
      height: 100%;
      line-height: 60px;
      margin-right: 20px;
      color: #fff;
    }

    .close {
      width: 50px;

      a {
        color: #fff;
      }
    }

    .userinfo {
      width: 100px;
    }
  }

  .content-wrapper {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    width: 100%;
  }

  .menu-wrapper {
    width: 200px;
    height: 100%;
    background-color: #181D20;
    padding-right: 0px;
    padding-top: 20px;
    padding-bottom: 0px;
    padding-left: 0px;
    font-weight: lighter;
    float: left;
    position: fixed;
    overflow-y: scroll;
    z-index: 1001;

    .el-menu-item {
      background: #181D20;
      height: 50px;
    }
  }

  /* color #cccccc */
  .menu-wrapper::-webkit-scrollbar {
    width: 0px;
  }

  .detail-wrapper {
    flex: 1;
    position: absolute;
    top: 0;
    left: 200px;
    right: 0;
    bottom: 0;
    padding: 20px;
    overflow: auto;
    min-width: 600px;
  }

  .el-menu-item-group__title {
    padding-top: 0;
  }

  .el-submenu__title {
    height: 50px;
    background: #181D20;
  }
}

.detail-wrapper::-webkit-scrollbar {
  /* width: 0px; */
}
</style>
