<template>
  <div>
      <div class="PerInputShow">
          <el-input placeholder="请输入角色英文名" v-model="role.name" class="nameInput">
              <template slot="prepend">ROLE_</template>
          </el-input>
          <el-input placeholder="请输入角色中文名" v-model="role.nameZh" class="nameZhInput"></el-input>
          <el-button icon="el-icon-plus" size="small" type="primary" @click="addRole" class="addShow">添加角色</el-button>
      </div>
      <div>
          <el-collapse
              accordion
              style="width: 60%; margin-top: 20px"
              @change="change"
              v-model="activeName">
              <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                  <el-card class="box-card">
                      <div slot="header" class="clearfix">
                          <span>可访问的资源</span>
                          <el-button style="float: right; padding: 3px 0;color: #ff0000;" icon="el-icon-delete"
                                     type="text" @click="handleDeleteRole(r)"></el-button>
                      </div>
                      <el-tree
                          show-checkbox
                          :data="allMenus"
                          node-key="id"
                          ref="tree"
                          :default-checked-keys="selectedMenus"
                          :props="defaultProps">
                      </el-tree>
                      <div style="display: flex;justify-content: flex-end" class="changeView">
                          <el-button @click="cancelUpdate" size="small">取消修改</el-button>
                          <el-button type="primary" @click="doUpdate(r.id,index)" size="small">确认修改</el-button>
                      </div>
                  </el-card>
              </el-collapse-item>
          </el-collapse>
      </div>
  </div>
</template>

<script>

export default {
    name: "PermissionMana",
    data() {
        return {
            role: {
                name: '',
                nameZh: '',
            },
            roles: [],
            allMenus: [],
            selectedMenus: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            activeName: -1
        }
    },
    mounted() {
        this.initRoles();
        this.initMenus();
    },
    methods: {
        cancelUpdate() {
            this.activeName = -1;
        },
        doUpdate(rid, index) {
            let tree = this.$refs.tree[index];
            let selectedKeys = tree.getCheckedKeys(true);
            let url = '/system/basic/permiss/?rid=' + rid;
            selectedKeys.forEach(key => {
                url += '&mids=' + key;
            })
            this.putRequest(url).then(res => {
                if (res) {
                    this.activeName = -1;
                }
            })
        },
        change(rid) {
            if (rid) {
                this.initMenus();
                this.initSelectedMenus(rid);
            }
        },
        initSelectedMenus(rid) {
          this.getRequest("/system/basic/permiss/mids/" + rid).then(res => {
              if (res) {
                  this.selectedMenus = res;
              }
          })
        },
        handleDeleteRole(role) {
            this.$confirm('此操作将永久删除【' + role.nameZh + '】角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteRequest("/system/basic/permiss/role/" + role.id).then(resp => {
                    if (resp) {
                        this.initRoles();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addRole() {
            if (this.role.name && this.role.nameZh) {
                this.postRequest("/system/basic/permiss/role", this.role).then( res => {
                    if (res) {
                        this.role.name = '';
                        this.role.nameZh = '';
                        this.initRoles();
                    }
                })
            } else {
                this.$message.error("填写不可以为空！");
            }
        },
        initRoles() {
            this.getRequest("/system/basic/permiss/").then( res => {
                if (res) {
                    this.roles = res;
                }
            })
        },
        initMenus() {
            this.getRequest("/system/basic/permiss/menus").then( res => {
                if (res) {
                    this.allMenus = res;
                }
            })
        }
    }
}
</script>

<style scoped>
.PerInputShow {
    display: flex;
    justify-content: flex-start;
}
.nameInput {
    width: 300px;
    margin-right: 10px;
}
.nameZhInput {
    width: 300px;
    margin-right: 10px;
}
.addShow {
    margin-right: 10px;
}
.changeView {
    margin-top: 15px;
}
</style>
