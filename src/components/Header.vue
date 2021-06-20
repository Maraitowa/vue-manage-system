<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChange">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <!-- 全屏 -->
      <div class="btn-fullscreen">
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <!-- 消息中心 -->
      <div class="btn-bell">
        <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
          <router-link to="/tabs">
            <i class="el-icon-bell"></i>
          </router-link>
        </el-tooltip>
        <span class="btn-bell-badge" v-if="message"></span>
      </div>
      <!-- 用户头像 -->
      <div class="user-avator">
        <img src="../assets/img/img.jpg" />
      </div>
      <!-- 用户下拉菜单 -->
      <el-dropdown trigger="click" style="margin-left: 10px" @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// import { reactive, computed } from 'vue'

export default {
  data() {
    return {
      name: "linxin",
      message: 2,
    }
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username")
      return username ? username : this.name
    },
    collapse() {
      return this.$store.state.collapse
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChange()
    }
  },
  methods: {
    // 用户下拉菜单选择事件
    handleCommand(command) {
      if(command == "loginout") {
        localStorage.removeItem("ms_username")
        this.$router.push("/login")
      }
    },
    // 侧边栏折叠
    collapseChange() {
      this.$store.commit("handleCollapse", !this.collapse)
      // console.log(this.collapse);
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 20px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell, .btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pinter;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-name {
  /* 不知道为啥加载不出来，放在下面也可，但是感觉不太好，最终直接用style行内样式了 */
  margin-left: 10px;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
/* .el-dropdown-menu__item {
  text-align: center;
} */
</style>