<template>
  <div>
      <el-container>
          <el-header class="homeHeader">
              <div class="title">人事管理</div>
              <div>
                  <el-button icon="el-icon-bell" type="text" style="margin-right: 8px; color: #ffffff" size="normal"></el-button>
                  <el-dropdown class="userInfo" @command="commandHandler">
                      <span class="el-dropdown-link">
                          {{user.name}}<i><img :src="user.userface" alt=""></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                          <el-dropdown-item command="setting">设置</el-dropdown-item>
                          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </div>
          </el-header>
          <el-container>
              <el-aside width="200px">
                  <el-menu router unique-opened>
                      <el-submenu :index="index + ''" v-for="(item, index) in filterRoutes" :key="index">
                          <template slot="title">
                              <i :class="item.iconCls" style="margin-right: 8px; color: #409eff"></i>
                              <span>{{ item.name }}</span>
                          </template>
                          <el-menu-item :index="child.path" v-for="(child, indexj) in item.children" :key="indexj">
                              {{ child.name }}</el-menu-item>
                      </el-submenu>
                  </el-menu>
              </el-aside>
              <el-container>
                  <el-main>
                      <el-breadcrumb separator="/" v-if="this.$router.currentRoute.path != '/home'">
                          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                          <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
                      </el-breadcrumb>
                      <router-view/>
                  </el-main>
                  <el-footer></el-footer>
              </el-container>
          </el-container>
      </el-container>
  </div>

</template>

<script>
export default {
    name: "NewHome",
    data() {
        return {
            user: JSON.parse(window.sessionStorage.getItem("user") || '{}')
        }
    },
    computed: {
      routes() {
          return this.$store.state.routes;
      },
      filterRoutes() {
          return this.routes.filter(route => !route.hidden);
      },
    },

    methods: {
        // goChat() {
        //     this.$router.push("/chat");
        // },
        commandHandler(cmd) {
            if (cmd === 'logout') {
                this.$confirm('是否确认退出登录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.getRequest("/logout");
                    window.sessionStorage.removeItem("user")
                    // this.$store.commit('initRoutes', []);
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
.homeHeader {
    background-color: #409eff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;

    .title {
        font-size: 30px;
        font-family: "Microsoft YaHei";
        color: #ffffff;
    }

    .userInfo {
        cursor: pointer;
    }
}

.el-aside {
    overflow: hidden;
}

.homeWelcome {
    text-align: center;
    font-size: 30px;
    font-family: "Microsoft YaHei";
    color: #409eff;
    padding-top: 50px;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
    color: #ffffff;

    img {
        width: 36px;
        height: 36px;
        border-radius: 24px;
        margin-left: 8px;
    }
}

</style>
