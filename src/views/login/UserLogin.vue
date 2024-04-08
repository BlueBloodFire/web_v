<template>
  <div>
      <el-form :rules="rules" :model="loginForm" class="LoginContainer">
          <h3 class="LoginTitle">登录</h3>
          <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-checkbox v-model="checked" class="loginRemember"></el-checkbox>
          <el-button type="primary" style="width: 100%">登录</el-button>
      </el-form>

  </div>

</template>

<script>
export default {
    name: "UserLogin",
    data() {
        return {
            loginForm: {
              username: 'admin',
              password: '123'
            },
            checked: true,
            rules : {
                username: [
                    { required:true, message:'请输入用户名', trigger:'blur' }
                ],
                password: [
                    { required:true, message:'请输入密码', trigger:'blur' }
                ]
            }
        }
    }
}
</script>

<style scoped>
.LoginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.LoginTitle {
    margin: 10px auto 10px auto;
    text-align: center;
    color: #562314;
}
.loginRemember {
    text-align: left;
    margin: 0 0 35px 0;
}
</style>