<template>
  <div>
      <div>
          <el-input
                  prefix-icon="el-icon-search"
                  placeholder="请输入部门名称"
                  v-model="filterText">
          </el-input>
          <el-tree
                  :data="depData"
                  :props="defaultProps"
                  :filter-node-method="filterNode"
                  :expand-on-click-node="false"
                  class="DepTreeShow"
                  ref="tree">
              <span class="custom-tree-node" slot-scope="{ data }">
        <span>{{ data.name }}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  class="custom-tree-button"
                  style="color: #409eff"
                  @click="() => showAddDepView(data)">添加部门
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  class="custom-tree-button"
                  style="color: red"
                  @click="() => deleteDep(data)">删除部门
          </el-button>
        </span>
      </span>
          </el-tree>
          <el-dialog
                 title="添加部门"
                 :visible.sync="dialogVisible"
                 width="30%">
              <div>
                  <table>
                      <tr>
                          <td>
                              <el-tag>上级部门</el-tag>
                          </td>
                          <td>{{ Pname }}</td>
                      </tr>
                      <tr>
                          <td>
                              <el-tag>部门名称</el-tag>
                          </td>
                          <td>
                              <el-input v-model="dep.name" placeholder="请输入部门名称"></el-input>
                          </td>
                      </tr>
                  </table>
              </div>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="doAddDep">确定</el-button>
              </span>
          </el-dialog>
      </div>
  </div>

</template>

<script>
export default {
    name: "DepMana",
    data() {
        return {
            filterText: '',
            depData: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            dep: {
                name: '',
                parentId: -1
            },
            dialogVisible: false,
            Pname: '',
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    mounted() {
        this.initDep();
    },
    methods: {
        initDeps() {
            this.dep = {
                name: '',
                parentId: -1
            }
            this.Pname = ''
        },
        addDepToDeps(depData, dep) {
            for (let i = 0; i < depData.length; i++) {
                let d = depData[i]
                if (d.id === dep.parentId) {
                    d.children = d.children.concat(dep)
                    if (d.children.length > 0) {
                        d.parent = true;
                    }
                    return;
                } else {
                    this.addDepToDeps(d.children, dep)
                }
            }
        },
        doAddDep() {
            this.postRequest("/system/basic/department/", this.dep).then(res => {
                if (res) {
                    this.addDepToDeps(this.depData, res.obj);
                    this.dialogVisible = false;
                    this.initDeps();
                }
            })
        },
        removeDepFromDeps(p, depData, id) {
            for (let i = 0; i < depData.length; i++) {
                let d = depData[i]
                if(d.id === id) {
                    depData.splice(i, 1)
                    if(depData.length === 0) {
                        p.parent = false;
                    }
                    return;
                } else {
                    this.removeDepFromDeps(d, d.children, id);
                }
            }
        },
        deleteDep(data) {
            if (data.parent) {
                this.$message.error("删除父部门失败！");
            } else {
                this.$confirm('此操作将永久删除【' + data.name + '】部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/department/" + data.id).then(resp => {
                        if (resp) {
                            this.removeDepFromDeps(null, this.depData, data.id);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        showAddDepView(data) {
            this.dialogVisible = true;
            this.Pname = data.name;
            this.dep.parentId = data.id;
        },
        initDep() {
            this.getRequest("/system/basic/department/").then(res => {
                if (res) {
                    this.depData = res;
                }
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        }
    },
}
</script>

<style scoped>
.DepTreeShow {
    margin-top: 15px;
}
.custom-tree-button {
    padding: 5px;
}
.custom-tree-node {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>
