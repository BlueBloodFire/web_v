<template>
  <div>
      <el-container>
          <el-header class="homeHeader">
              <div class="title">人事管理</div>
              <div>
                  <el-button icon="el-icon-bell" type="text" style="margin-right: 8px; color: #000000;" size="normal" @click="goChat"></el-button>
                  <el-dropdown class="userInfo" @command="commandHandler">
                      <span class="el-dropdown-link">
                          {{user.name}}<i><img :src="user.userface" alt="" ></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                          <el-dropdown-item command="setting">设置</el-dropdown-item>
                          <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </div>
          </el-header>
          <el-container>
              <el-aside width="200px">
                  <el-menu router unique-opened>
                      <el-submenu :index="index + ''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                          <template slot="title">
                              <i style="color: #409eff; margin-right: 5px" :class="item.iconCls"></i>
                              <span>{{item.name}}</span>
                          </template>
                          <el-menu-item :index="child.path" v-for="(child, indexj) in item.children" :key="indexj">
                              {{child.name}}
                          </el-menu-item>
                      </el-submenu>
                  </el-menu>
              </el-aside>
              <el-main>
                  <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
                      <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
                      <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                  </el-breadcrumb>
                  <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
                      欢迎来到人事管理系统!
                  </div>
                  <router-view class="homeRouterView" />
              </el-main>
          </el-container>
      </el-container>
  </div>

</template>

<script>
export default {
    name: "Home",
    data() {
        return {

        }
    },

    computed: {
        routes() {
            return this.$store.state.routes;
        },
        user() {
            return this.$store.state.currentHr;
        }
    },

    methods: {
        goChat() {
            this.$router.push("/chat");
        },
        commandHandler(cmd) {
            if (cmd === 'logout') {
                this.$confirm('是否确认退出登录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.getRequest("/logout");
                    window.sessionStorage.removeItem("user")
                    this.$store.commit('initRoutes', []);
                    this.$router.replace("/");
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出操作'
                    });
                });
            } else if (cmd === 'userinfo') {
                this.$router.push('/hrinfo');
            } else {
                this.$router.push('/settings');
            }
        }
    }
}
</script>

<style scoped>

</style>
