<template>
  <div>
      <div class="engShow">
          <div>
              <el-input
                      clearable
                      placeholder="请输入员工名"
                      class="empInput"
                      size="small"
                      @clear="initEmpData"
                      prefix-icon="el-icon-search"
                      @keydown.enter.native="initEmpData">
              </el-input>
              <el-button
                      icon="el-icon-search"
                      type="primary"
                      size="small">
                  搜索
              </el-button>
              <el-button
                      icon="el-icon-d-arrow-right"
                      type="primary"
                      size="small">
                  高级搜索
              </el-button>
          </div>
          <div>
              <el-upload
                  :show-file-list="false"
                  :before-upload="beforeUpload"
                  :on-success="onSuccess"
                  :on-error="onError"
                  :disabled="importDataDisabled"
                  style="display: inline-flex;margin-right: 8px"
                  action="/employee/basic/import">
                  <el-button :disabled="importDataDisabled" type="success" :icon="importDataBtnIcon" size="small">
                      {{importDataBtnText}}
                  </el-button>
              </el-upload>
              <el-button
                  type="success"
                  size="small"
                  icon="el-icon-download"
                  @click="exportData">
                  导出数据
              </el-button>
              <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-plus"
                  @click="showAddEmpView">
                  添加用户
              </el-button>
          </div>

      </div>
      <div>
          <el-table
              :data="empData"
              border
              stripe
              v-loading="loading"
              element-loading-text="正在加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              style="width: 100%"
              class="empShow">
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column
                  fixed
                  prop="name"
                  label="姓名"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="gender"
                  label="性别"
                  width="50">
              </el-table-column>
              <el-table-column
                  prop="birthday"
                  label="出生日期"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="idCard"
                  label="身份证号码"
                  width="200">
              </el-table-column>
              <el-table-column
                  prop="wedlock"
                  label="婚姻状况"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="nation.name"
                  label="民族"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="nativePlace"
                  label="籍贯"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="politicsstatus.name"
                  label="政治面貌"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="email"
                  label="邮箱"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="phone"
                  label="电话号码"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="address"
                  label="地址"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="department.name"
                  label="所属部门"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="jobLevel.name"
                  label="职称"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="position.name"
                  label="职位"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="engageForm"
                  label="聘用形式"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="tiptopDegree"
                  label="最高学历"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="specialty"
                  label="所属专业"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="school"
                  label="毕业院校"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="beginDate"
                  label="入职日期"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="workState"
                  label="工作状态"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="workID"
                  label="工号"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="conversionTime"
                  label="转正日期"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="beginContract"
                  label="合同起始日期"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="endContract"
                  label="合同结束日期"
                  width="120">
              </el-table-column>
              <el-table-column
                  label="合同期限"
                  width="120">
                  <template slot-scope="scope">
                      <span>{{scope.row.contractTerm}}</span>
                      年
                  </template>
              </el-table-column>
              <el-table-column
                  label="操作"
                  fixed="right"
                  width="300"
                  class="scopeShow">
                  <template slot-scope="scope">
                      <el-button size="mini" @click="showEditEmpView(scope.row)">编辑</el-button>
                      <el-button size="mini" type="primary">查看高级资料</el-button>
                      <el-button size="mini" @click="deleteEmp(scope.row)" type="danger">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="pageShow">
              <el-pagination
                  background
                  @current-change="currentChange"
                  @size-change="sizeChange"
                  layout="sizes, prev, pager, next, jumper, ->, total, slot"
                  :total="total">
              </el-pagination>
          </div>
      </div>
      <el-dialog
          title="title"
          :visible.sync="dialogVisible"
          width="80%">
          <div>
              <el-form :model="emp" :rules="rules" ref="empForm">
                  <el-row>
                      <el-form-item label="姓名:" prop="name">
                          <el-input size="small" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.name" placeholder="请输入员工姓名"></el-input>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="性别:" prop="gender">
                          <el-radio-group v-model="emp.gender">
                              <el-radio label="男">男</el-radio>
                              <el-radio label="女">女</el-radio>
                          </el-radio-group>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="出生日期:" prop="birthday">
                          <el-date-picker
                              v-model="emp.birthday"
                              size="small"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="出生日期"
                              style="width: 150px"
                          >
                          </el-date-picker>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="政治面貌:" prop="politicId">
                          <el-select v-model="emp.politicId" placeholder="政治面貌" size="small" style="width: 150px">
                              <el-option
                                  v-for="item in politicsstatus"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                              </el-option>
                          </el-select>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="民族:" prop="nationId">
                          <el-select v-model="emp.nationId" placeholder="民族" size="small" style="width: 150px">
                              <el-option
                                  v-for="item in nations"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                              </el-option>
                          </el-select>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="籍贯:" prop="nativePlace">
                          <el-input size="small" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.nativePlace" placeholder="请输入籍贯"></el-input>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="电子邮箱:" prop="email">
                          <el-input size="small" style="width: 150px" prefix-icon="el-icon-message" v-model="emp.email" placeholder="请输入电子邮箱"></el-input>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="联系地址:" prop="address">
                          <el-input size="small" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.address" placeholder="请输入联系地址"></el-input>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="职位:" prop="posId">
                          <el-select v-model="emp.posId" placeholder="职位" size="small" style="width: 150px">
                              <el-option
                                  v-for="item in positions"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                              </el-option>
                          </el-select>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="职称:" prop="jobLevelId">
                          <el-select v-model="emp.jobLevelId" placeholder="职称" size="small" style="width: 150px">
                              <el-option
                                  v-for="item in joblevels"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                              </el-option>
                          </el-select>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="所属部门:" prop="departmentId">
                          <el-popover
                              placement="right"
                              title="请选择部门"
                              width="200"
                              trigger="manual"
                              v-model="popVisible">
                              <el-tree
                                  default-expand-all
                                  :data="allDeps"
                                  :props="defaultProps"
                                  :expand-on-click-node="false"
                                  @node-click="handleNodeClick">
                              </el-tree>
                              <div slot="reference"
                                   @click="showDepView"
                                   class="DepShow">
                                  {{inputDepName}}
                              </div>
                          </el-popover>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="电话号码:" prop="phone">
                          <el-input size="small" style="width: 150px" prefix-icon="el-icon-phone" v-model="emp.phone" placeholder="电话号码"></el-input>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="工号:" prop="workID">
                          <el-input size="small" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.workID" placeholder="工号" disabled></el-input>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="学历:" prop="tiptopDegree">
                          <el-select v-model="emp.tiptopDegree" placeholder="学历" size="small" style="width: 150px">
                              <el-option
                                  v-for="item in tiptopDegrees"
                                  :key="item"
                                  :label="item"
                                  :value="item">
                              </el-option>
                          </el-select>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="毕业院校:" prop="school">
                          <el-input size="small" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.school" placeholder="请输入毕业院校"></el-input>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="专业名称:" prop="specialty">
                          <el-input size="small" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.specialty" placeholder="请输入专业名称"></el-input>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="入职日期:" prop="beginDate">
                          <el-date-picker
                              v-model="emp.beginDate"
                              size="mini"
                              type="date"
                              value-format="yyyy-MM-dd"
                              style="width: 130px;"
                              placeholder="入职日期">
                          </el-date-picker>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="转正日期:" prop="conversionTime">
                          <el-date-picker
                              v-model="emp.conversionTime"
                              size="mini"
                              type="date"
                              value-format="yyyy-MM-dd"
                              style="width: 130px;"
                              placeholder="转正日期">
                          </el-date-picker>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="合同起始日期:" prop="beginContract">
                          <el-date-picker
                              v-model="emp.beginContract"
                              size="mini"
                              type="date"
                              value-format="yyyy-MM-dd"
                              style="width: 130px;"
                              placeholder="合同起始日期">
                          </el-date-picker>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="合同终止日期:" prop="endContract">
                          <el-date-picker
                              v-model="emp.endContract"
                              size="mini"
                              type="date"
                              value-format="yyyy-MM-dd"
                              style="width: 150px;"
                              placeholder="合同终止日期">
                          </el-date-picker>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="身份证号码:" prop="idCard">
                          <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                                    v-model="emp.idCard" placeholder="请输入身份证号码"></el-input>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="聘用形式:" prop="engageForm">
                          <el-radio-group v-model="emp.engageForm">
                              <el-radio label="劳动合同">劳动合同</el-radio>
                              <el-radio label="劳务合同">劳务合同</el-radio>
                          </el-radio-group>
                      </el-form-item>
                  </el-row>
                  <el-row>
                      <el-form-item label="婚姻状况:" prop="wedlock">
                          <el-radio-group v-model="emp.wedlock">
                              <el-radio label="已婚">已婚</el-radio>
                              <el-radio label="未婚">未婚</el-radio>
                              <el-radio label="离异">离异</el-radio>
                          </el-radio-group>
                      </el-form-item>
                  </el-row>
              </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddEmp">确 定</el-button>
  </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
    name: "EmpBasic",
    data() {
        return {
            importDataBtnText: '导入数据',
            importDataDisabled: false,
            importDataBtnIcon: 'el-icon-upload2',
            inputDepName: '',
            popVisible: false,
            empData: [],
            total: 0,
            page: 1,
            size: 10,
            loading: false,
            title: '',
            dialogVisible: false,
            emp: {
                name: "javaboy",
                gender: "男",
                birthday: "1989-12-31",
                idCard: "610122199001011256",
                wedlock: "已婚",
                nationId: 1,
                nativePlace: "陕西",
                politicId: 13,
                email: "laowang@qq.com",
                phone: "18565558897",
                address: "深圳市南山区",
                departmentId: null,
                jobLevelId: 9,
                posId: 29,
                engageForm: "劳务合同",
                tiptopDegree: "本科",
                specialty: "信息管理与信息系统",
                school: "深圳大学",
                beginDate: "2017-12-31",
                workState: "在职",
                workID: "00000057",
                contractTerm: 2,
                conversionTime: "2018-03-31",
                notworkDate: null,
                beginContract: "2017-12-31",
                endContract: "2019-12-31",
                workAge: null
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            allDeps: [],
            tiptopDegrees: ['博士','硕士','本科','大专','高中','初中','小学','其它'],
            joblevels: [],
            positions: [],
            nations: [],
            politicsstatus: [],
            value: '',
            rules: {
                name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
                birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
                idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
                    pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                    message: '身份证号码格式不正确',
                    trigger: 'blur'
                }],
                wedlock: [{required: true, message: '请选择婚姻状况', trigger: 'blur'}],
                nationId: [{required: true, message: '请选择民族', trigger: 'blur'}],
                nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
                politicId: [{required: true, message: '请选择政治面貌', trigger: 'blur'}],
                email: [{required: true, message: '请输入邮箱', trigger: 'blur'}, {
                    type: 'email',
                    message: '邮箱格式不正确',
                    trigger: 'blur'
                }],
                phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
                address: [{required: true, message: '请输入联系地址', trigger: 'blur'}],
                departmentId: [{required: true, message: '请选择部门', trigger: 'blur'}],
                jobLevelId: [{required: true, message: '请选择职位', trigger: 'blur'}],
                posId: [{required: true, message: '请选择职称', trigger: 'blur'}],
                engageForm: [{required: true, message: '请选择聘用形式', trigger: 'blur'}],
                tiptopDegree: [{required: true, message: '请选择学历', trigger: 'blur'}],
                specialty: [{required: true, message: '请输入专业名称', trigger: 'blur'}],
                school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
                beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
                conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
                beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
                endContract: [{required: true, message: '请输入合同终止日期', trigger: 'blur'}],
            }
        }
    },
    mounted() {
        this.initEmpData();
        this.initData();
    },
    methods: {
        onError() {
            this.importDataBtnText = '导入数据 ';
            this.importDataBtnIcon = 'el-icon-upload2'
            this.importDataDisabled = false;
        },
        onSuccess() {
            this.importDataBtnText = '导入数据';
            this.importDataBtnIcon = 'el-icon-upload2'
            this.importDataDisabled = false;
            this.initEmpData();
        },
        beforeUpload() {
            this.importDataBtnText = '导入中';
            this.importDataBtnIcon = 'el-icon-loading'
            this.importDataDisabled = true;
        },
        exportData() {
            window.open('/emp/basic/export',"_parent")
        },
        emptyEmp() {
            this.emp = {
                name: "",
                gender: "",
                birthday: "",
                idCard: "",
                wedlock: "",
                nationId: 1,
                nativePlace: "",
                politicId: 13,
                email: "",
                phone: "",
                address: "",
                departmentId: null,
                jobLevelId: 9,
                posId: 29,
                engageForm: "",
                tiptopDegree: "",
                specialty: "",
                school: "",
                beginDate: "",
                workID: "",
                contractTerm: 2,
                conversionTime: "",
                notworkDate: null,
                beginContract: "",
                endContract: "",
                workAge: null
            }
            this.inputDepName = '';
        },
        showEditEmpView(data) {
            this.initPositions();
            this.title = "编辑员工信息";
            this.emp = data;
            this.inputDepName = data.department.name;
            this.dialogVisible = true;
        },
        deleteEmp(data) {
            this.$confirm('此操作将永久删除【' + data.name + '】, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteRequest("/emp/basic/" + data.id).then(res => {
                    if (res) {
                        this.initEmpData();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        doAddEmp() {
            if (this.emp.id) {
                this.$refs['empForm'].validate((valid) => {
                    if (valid) {
                        this.putRequest("/emp/basic/", this.emp).then(res => {
                            if (res) {
                                this.dialogVisible = false;
                                this.initEmpData();
                            }
                        })
                    }
                });
            } else {
                this.$refs['empForm'].validate((valid) => {
                    if (valid) {
                        this.postRequest("/emp/basic/", this.emp).then(res => {
                            if (res) {
                                this.dialogVisible = false;
                                this.initEmpData();
                            }
                        })
                    }
                });
            }
        },
        handleNodeClick(data) {
            this.inputDepName = data.name;
            this.emp.departmentId = data.id;
            this.popVisible = !this.popVisible;
        },
        showDepView() {
            this.popVisible = !this.popVisible
        },
        initPositions() {
            this.getRequest("/emp/basic/positions").then(res => {
                if (res) {
                    this.positions = res;
                }
            })
        },
        getMaxWorkID() {
            this.getRequest("/emp/basic/maxWorkID").then( res => {
                if (res) {
                    this.emp.workID = res.obj;
                }
            })
        },
        initData() {
            if (!window.sessionStorage.getItem("nations")) {
                this.getRequest('/emp/basic/nations').then(res => {
                    if (res) {
                        this.nations = res;
                        window.sessionStorage.setItem("nations", JSON.stringify(res))
                    }
                })
            } else {
                this.nations = JSON.parse(window.sessionStorage.getItem("nations"))
            }

            if (!window.sessionStorage.getItem("joblevels")) {
                this.getRequest('/emp/basic/joblevels').then(res => {
                    if (res) {
                        this.joblevels = res;
                        window.sessionStorage.setItem("joblevels", JSON.stringify(res))
                    }
                })
            } else {
                this.joblevels = JSON.parse(window.sessionStorage.getItem("joblevels"))
            }

            if (!window.sessionStorage.getItem("politicsstatus")) {
                this.getRequest('/emp/basic/politicsstatus').then(res => {
                    if (res) {
                        this.politicsstatus = res;
                        window.sessionStorage.setItem("politicsstatus", JSON.stringify(res))
                    }
                })
            } else {
                this.politicsstatus = JSON.parse(window.sessionStorage.getItem("politicsstatus"))
            }

            if (!window.sessionStorage.getItem("deps")) {
                this.getRequest('/emp/basic/deps').then(res => {
                    if (res) {
                        this.allDeps = res;
                        window.sessionStorage.setItem("deps", JSON.stringify(res))
                    }
                })
            } else {
                this.allDeps = JSON.parse(window.sessionStorage.getItem("deps"))
            }
        },
        sizeChange(sizePage) {
            this.size = sizePage;
            this.initEmpData()
        },
        currentChange(currentPage) {
            this.page = currentPage;
            this.initEmpData()
        },
        showAddEmpView() {
            this.emptyEmp();
            this.title = "添加员工";
            this.initPositions();
            this.getMaxWorkID();
            this.dialogVisible = true;
        },
        initEmpData() {
            this.loading = true
            this.getRequest("/emp/basic/?page=" + this.page + "&size=" + this.size).then( res => {
                this.loading = false
                if (res && res.data) {
                    this.empData = res.data;
                    this.total = res.total;
                }
            })
        }
    },
}
</script>

<style scoped>
.scopeShow {
    display: flex;
    justify-content: flex-end;
}
.DepShow {
    width: 150px;
    display: inline-flex;
    font-size: 13px;
    border: 1px solid #dedede;
    height: 26px;
    border-radius: 5px;
    cursor: pointer;
    align-items: center;
    padding-left: 8px;
    box-sizing: border-box
}
.pageShow {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
.empShow {
    margin-top: 20px;
}
.engShow {
    display: flex;
    justify-content: space-between;
}
.empInput {
    width: 300px;
    margin-right: 10px;
}
</style>
