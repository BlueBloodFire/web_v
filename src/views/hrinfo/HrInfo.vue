<template>
  <div v-if="hr">
      <el-card class="box-card" style="width: 400px">
          <div slot="header" class="clearfix">
              <span>{{hr.name}}</span>
          </div>
          <div>
              <div style="display: flex; justify-content: center">
                  <el-upload
                      :show-file-list="false"
                      :on-success="onSuccess"
                      :data="hr"
                      action="/hr/userface">
                      <img title="点击修改头像" :src="hr.userface" style="width: 100px; height: 100px; border-radius: 50px" alt="">
                  </el-upload>
              </div>
              <div>
                  电话号码:
                  <el-tag>{{hr.telephone}}</el-tag>
              </div>
              <div>
                  手机号码:
                  <el-tag>{{hr.phone}}</el-tag>
              </div>
              <div>
                  居住地址:
                  <el-tag>{{hr.address}}</el-tag>
              </div>
              <div>
                  用户标签:
                  <el-tag type="success" style="margin-right: 5px" v-for="(r,index) in hr.roles" :key="index">{{r.nameZh}}</el-tag>
              </div>
              <div style="display: flex; justify-content: space-around; margin-top: 10px">
                  <el-button type="primary" @click="showUpdateHrInfoView">修改信息</el-button>
                  <el-button type="danger" @click="showUpdatePasswdView">修改密码</el-button>
              </div>
          </div>
      </el-card>
      <el-dialog
          title="修改用户信息"
          :visible.sync="dialogVisible"
          width="30%">
          <div>
              <table>
                  <tr>
                      <td>
                          <el-tag>用户昵称:</el-tag>
                      </td>
                      <td>
                          <el-input v-model="hr2.name"></el-input>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <el-tag>电话号码:</el-tag>
                      </td>
                      <td>
                          <el-input v-model="hr2.telephone"></el-input>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <el-tag>手机号码:</el-tag>
                      </td>
                      <td>
                          <el-input v-model="hr2.phone"></el-input>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <el-tag>居住地址:</el-tag>
                      </td>
                      <td>
                          <el-input v-model="hr2.address"></el-input>
                      </td>
                  </tr>
              </table>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="updateHrInfo">取消</el-button>
          </span>
      </el-dialog>
      <el-dialog
          title="修改密码"
          :visible.sync="passwdDialogVisible"
          width="30%">
          <div>
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="d-ruleForm">
                  <el-form-item label="请输入旧密码" prop="oldpassword">
                      <el-input type="password" v-model="ruleForm.oldpassword" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="请输入新密码" prop="newpassword">
                      <el-input type="password" v-model="ruleForm.newpassword" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="请确认密码" prop="checkpassword">
                      <el-input type="password" v-model="ruleForm.checkpassword" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
              </el-form>
          </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
    name: "HrInfo",
    data() {

    }
}
</script>

<style scoped>

</style>
