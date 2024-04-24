<template>
  <div>
      <div>
          <el-input
                  size="small"
                  v-model="jL.name"
                  style="width: 300px"
                  prefix-icon="el-icon-plus"
                  placeholder="请添加职称"
                  class="JobInput"
                  clearable>
          </el-input>
          <el-select
                  v-model="jL.titleLevel"
                  size="small"
                  placeholder="请选择等级"
                  class="LevelInput"
                  clearable>
              <el-option
                      v-for="item in titleLevels"
                      :key="item"
                      :label="item"
                      :value="item">
              </el-option>
          </el-select>
          <el-button icon="el-icon-plus" size="small" type="primary" @click="addJobLevel">添加</el-button>
      </div>
      <div class="JobLevelShow">
          <el-table
              :data="jobLevels"
              size="small"
              stripe
              style="width: 70%">
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column
                  prop="id"
                  label="编号"
                  width="55">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="职位名称"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="titleLevel"
                  label="职位级别"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="createDate"
                  width="150"
                  label="创建时间">
              </el-table-column>
              <el-table-column label="操作" style="width: 300px">
                  <template slot-scope="scope">
                      <el-button
                          size="mini"
                          type="primary"
                          @click="showEditView(scope.row)">编辑
                      </el-button>
                      <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除
                      </el-button>
                  </template>
              </el-table-column>
          </el-table>
      </div>
      <el-dialog
          title="职称修改"
          :visible.sync="dialogVisible"
          width="30%">
          <div>
              <table>
                  <tr>
                      <td><el-tag class="tagView">职位名称</el-tag></td>
                      <td><el-input v-model="updateJl.name" class="inputView"></el-input></td>
                  </tr>
                  <tr>
                      <td><el-tag class="tagView">职位级别</el-tag></td>
                      <td><el-select
                          v-model="updateJl.titleLevel"
                          placeholder="请选择等级"
                          clearable
                          class="inputView">
                          <el-option
                              v-for="item in titleLevels"
                              :key="item"
                              :label="item"
                              :value="item">
                          </el-option>
                      </el-select></td>
                  </tr>
              </table>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate">确 定</el-button>
  </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
    name: "JobLevelMana",
    data() {
        return {
            jL: {
                name: '',
                titleLevel: '',
            },
            updateJl: {
                name: '',
                titleLevel: '',
            },
            titleLevels: [
                '正高级',
                '副高级',
                '中级',
                '初级',
                '员级'
            ],
            value: '',
            jobLevels: [],
            dialogVisible: false
        }
    },
    mounted() {
        this.initJobLevels();
    },
    methods: {
        doUpdate() {
          this.putRequest("/system/basic/joblevel/", this.updateJl).then (res => {
              if (res) {
                  this.initJobLevels();
                  this.dialogVisible = false;
              }
          })
        },
        showEditView(data) {
            Object.assign(this.updateJl, data)
            this.dialogVisible = true;
        },
        handleDelete(index, data) {
            this.$confirm('此操作将永久删除【' + data.name + '】职位, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteRequest("/system/basic/joblevel/" + data.id).then(resp => {
                    if (resp) {
                        this.initJobLevels();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addJobLevel() {
            if (this.jL.name && this.jL.titleLevel) {
                this.postRequest("/system/basic/joblevel/", this.jL).then(resp => {
                    if (resp) {
                        this.initJobLevels();
                        this.jL.name = '';
                    }
                })
            } else {
                this.$message.error('必填信息不可以为空');
            }
        },
        initJobLevels() {
            this.getRequest("/system/basic/joblevel/").then( res => {
                if (res) {
                    this.jobLevels = res;
                    this.jL = {
                        name: '',
                        titleLevel: ''
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
.inputView {
    margin-top: 20px;
    margin-bottom: 10px;
}
.tagView {
    margin-right: 10px;
    margin-top: 10px;
}
.JobInput {
    margin-right: 10px;
}
.LevelInput {
    margin-right: 10px;
}
.JobLevelShow {
    margin-top: 10px;
}
</style>
