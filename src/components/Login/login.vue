<template>
  <div id="login">
    <div class="login">
      <div class="navigation">
        <div class="top-header" v-show="showLogingTag == 'login'">
          <el-button type="info" plain class="edit" @click="hideLoginForm">返回</el-button>
        </div>
      </div>
      <div class="logcenter">
        <el-tabs v-model="showLogingTag">
          <el-tab-pane label="0" name="login">
            <el-main>
              <div class="notice">
              </div>
              <div class="loginfrom">
                <el-form :model="userForm" :rules="ruleUserForm" ref="ruleUserForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" placeholder="請輸入用戶名" @clear="userclearable" v-model="userForm.username" clearable></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-password" placeholder="請輸入密碼" show-password type="password" v-model="userForm.password"></el-input>
                  </el-form-item>
                  <el-form-item id="nopass">
                    <el-button type="text" @click="tabsTag('register')" style="float:left;">註冊賬號</el-button>
                    <el-button type="text" @click="tabsTag('password')">忘記密碼</el-button>
                  </el-form-item>
                  <el-form-item id="postlogin">
                    <el-button type="info" @click="submitLoginForm()">登 錄</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-main>
          </el-tab-pane>
          <el-tab-pane label="忘記密碼" name="password">
            <div class="per-header">
              <el-button type="info" plain class="iconfont icon-fanhui edit" @click="tabsTag('login')">返回</el-button>
            </div>
            <el-main style="text-align: center;display: flex;">
              <div class="passwordfrom">
                <el-form :model="passForm" :rules="rulePassForm" ref="rulePassForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" placeholder="請輸入用戶名" v-model="passForm.username" clearable></el-input>
                  </el-form-item>
                </el-form>
                <el-form :model="passForm" :rules="ruleCodeForm" ref="ruleCodeForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item prop="code">
                    <el-input prefix-icon="iconfont icon-yanzhengma" placeholder="請輸入驗證碼" v-model="passForm.code" clearable>
                      <el-button slot="append" @click="sendMsg" style="width:auto;padding:10px;min-width:40px;">{{buttonName}}</el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item id="postpwdkey">
                    <el-button type="info" @click="submitPassForm()">提 交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-main>
          </el-tab-pane>
          <el-tab-pane label="設置新密碼" name="setpassword">
            <div class="per-header">
              <el-button type="info" plain class="iconfont icon-fanhui edit" @click="tabsTag('login')">返回</el-button>
            </div>
            <el-main style="text-align: center;display: flex;">
              <div class="passwordfrom">
                <el-form :model="pwdForm" :rules="rulePwdForm" ref="rulePwdForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item prop="pass">
                    <el-input prefix-icon="iconfont icon-password" placeholder="請輸入新密碼" show-password type="password" v-model="pwdForm.pass" clearable></el-input>
                  </el-form-item>
                  <el-form-item prop="checkPass">
                    <el-input prefix-icon="iconfont icon-password" placeholder="再次輸入密碼" show-password type="password" v-model="pwdForm.checkPass" clearable></el-input>
                  </el-form-item>
                  <el-form-item id="postpwd">
                    <el-button type="info" @click="submitPwdForm()">提 交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-main>
          </el-tab-pane>
          <el-tab-pane label="用戶註冊" name="register">
            <div class="per-header">
              <el-button type="info" plain class="iconfont icon-fanhui edit" @click="tabsTag('login')">返回</el-button>
            </div>
            <el-main style="text-align: center;display: flex;padding-button:50px;">
              <div class="passwordfrom">
                <el-form :model="registerForm" :rules="ruleRegisterEmailForm" ref="ruleRegisterEmailForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item prop="emalil">
                    <el-input prefix-icon="iconfont icon-youxiang" placeholder="請輸入郵箱" v-model="registerForm.emalil" clearable></el-input>
                  </el-form-item>
                </el-form>
                <el-form :model="registerForm" :rules="ruleRegisterForm" ref="ruleRegisterForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" placeholder="請輸入用戶名" v-model="registerForm.username" clearable></el-input>
                  </el-form-item>
                  <el-form-item prop="pass">
                    <el-input prefix-icon="iconfont icon-password" placeholder="請輸入新密碼" show-password type="password" v-model="registerForm.pass" ></el-input>
                  </el-form-item>
                  <el-form-item prop="checkPass">
                    <el-input prefix-icon="iconfont icon-password" placeholder="再次輸入密碼" show-password type="password" v-model="registerForm.checkPass" ></el-input>
                  </el-form-item>
                  <el-form-item prop="Invitation">
                    <el-input prefix-icon="iconfont icon-yaoqing" placeholder="這裏輸入邀請碼" v-model="registerForm.Invitation" clearable></el-input>
                    <div class="el-form-item__error" style="color:#66CD00">
                      邀請碼非必填
                    </div>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input prefix-icon="iconfont icon-yanzhengma" placeholder="請輸入驗證碼" v-model="registerForm.code" clearable>
                      <el-button slot="append" @click="sendEmailMsg" style="width:auto;padding:10px;min-width:40px;">{{buttonName}}</el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item id="postpwd">
                    <el-button type="info" @click="submitRegisterForm()">註 冊</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-main>
          </el-tab-pane>
          <el-tab-pane label="驗證器" name="verification">
            <el-main style="text-align: center;display: flex;">
              <div class="passwordfrom">
                <van-notice-bar wrapable :scrollable="false" style="background-color: #FFF;">
                  {{topMssage}}
                </van-notice-bar>
                <el-form :model="userForm" :rules="ruleCuserForm" ref="ruleCuserForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item prop="code">
                    <el-input prefix-icon="iconfont icon-yanzhengma" placeholder="請輸入驗證碼" v-model="userForm.code" clearable></el-input>
                  </el-form-item>
                  <el-form-item id="postlogin">
                    <el-button type="info" @click="submitCloginForm()">確 定</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-main>
          </el-tab-pane>
        </el-tabs>
        <div id="buttonm">
          <el-divider></el-divider>
          <div>
            e35885
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'Login',
  computed: {
    showLogingTag: {
      get() {
        return this.$store.state.LOADINGTAG
      },
      set(val) {}
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請再次輸入密碼'));
      } else if (value !== this.pwdForm.pass) {
        callback(new Error('兩次輸入密碼不壹致!'));
      } else {
        callback();
      }
    };
    var validatePassReg = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請再次輸入密碼'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('兩次輸入密碼不壹致!'));
      } else {
        callback();
      }
    };
    return {
      topMssage: '',
      buttonName: "發送驗證碼",
      time: 0,
      passwordToken: null,
      userForm: {
        username: '',
        password: '',
        code: ''
      },
      ruleUserForm: {
        username: [{
          required: true,
          message: '請輸入用戶名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '請輸入密碼',
          trigger: 'blur'
        }],
      },
      ruleCuserForm: {
        code: [{
          required: true,
          message: '請輸入驗證碼',
          trigger: 'blur'
        }],
      },
      passForm: {
        username: '',
        code: ''
      },
      rulePassForm: {
        username: [{
          required: true,
          message: '請輸入用戶名',
          trigger: 'blur'
        }],
      },
      ruleCodeForm: {
        code: [{
          required: true,
          message: '驗證碼不能為空',
          trigger: 'blur'
        }],
      },
      pwdForm: {
        pass: '',
        checkPass: ''
      },
      rulePwdForm: {
        pass: [{
          required: true,
          message: '密碼不能為空',
          trigger: 'blur'
        }, {
          pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
          message: '密碼為數字-字母組合,長度為8-16位'
        }],
        checkPass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
      },
      registerForm: {
        emalil: '',
        username: '',
        pass: '',
        checkPass: '',
        Invitation: '',
        code: ''
      },
      ruleRegisterEmailForm: {
        emalil: [{
          required: true,
          message: '郵箱不能為空',
          trigger: 'blur'
        }, {
          pattern: /^[\w\.\-]+@([\w\-]+\.)+[\w\-]+/,
          message: '郵箱格式不正確'
        }],
      },
      ruleRegisterForm: {
        username: [{
          required: true,
          message: '用戶名不能為空',
          trigger: 'blur'
        }, {
          pattern: /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){6,20}$/,
          message: '用戶名支持英文、數字、下劃線和減號 6-20位'
        }],
        pass: [{
          required: true,
          message: '密碼不能為空',
          trigger: 'blur'
        }, {
          pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
          message: '密碼為數字-字母組合,長度為8-16位'
        }],
        checkPass: [{
          validator: validatePassReg,
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '驗證碼不能為空',
          trigger: 'blur'
        }],
      }
    }
  },
  components: {

  },
  methods: {
    hideLoginForm() {
      this.$store.commit('hideLogin');
      this.$store.commit('setListShow', true);
    },
    //登录注册切换
    tabsTag(massage) {
      if (massage == "register") {
        this.registerForm = {
          emalil: '',
          username: '',
          pass: '',
          checkPass: '',
          Invitation: '',
          code: ''
        }
      } else if (massage == "password") {
        this.passwordToken = null;
        this.passForm = {
          username: '',
          code: ''
        }
      } else if (massage == "setpassword") {
        this.pwdForm = {
          pass: '',
          checkPass: ''
        }
      } else if (massage == "verification") {
        this.userForm.code = '';
      }
      this.$store.commit('showLogingTag', massage);
    },
    //清除账号顺便清除密码
    userclearable() {
      this.userForm.password = '';
    },
    submitLoginForm() {
      this.$refs['ruleUserForm'].validate((valid) => {
        if (valid) {
          var data = {
            username: this.userForm.username,
            password: this.crypto.encryption(this.userForm.password),
            code: ''
          }
          this.ios.login(data).then(res => {
            // debugger
            let list = res.data.data;
            let token = list;
            token.update = new Date();
            this.$store.commit('showLoging', token);
            this.$store.state.avatarimgUrl = token.avatarimgUrl;
            this.$store.state.userMessage = token.userMessage;
            if (token.userMessage == 'null') {
              this.$store.state.userMessage = null;
            }
            this.$store.commit('setListShow', true);
            // 创建缓存
            this.$cookies.set('HD', this.crypto.encryption(list), { expires: 1 });
          }).catch(e => {
            if (e.data) {
              if (e.data.ret == 66666) {
                this.tabsTag("verification");
                this.topMssage = e.data.msg;
              } else {
                this.$message({
                  icon: 'fail',
                  message: e.data.msg
                });
              }
            }
          });
        }
      });
    },
    submitCloginForm() {
      this.$refs['ruleCuserForm'].validate((valid) => {
        if (valid) {
          var data = {
            username: this.userForm.username,
            password: this.crypto.encryption(this.userForm.password),
            code: this.userForm.code,
          }
          this.ios.login(data).then(res => {
            // debugger
            let list = res.data.data;
            let token = list;
            token.update = new Date();
            this.$store.commit('showLoging', token);
            this.$store.state.avatarimgUrl = token.avatarimgUrl;
            this.$store.state.userMessage = token.userMessage;
            if (token.userMessage == 'null') {
              this.$store.state.userMessage = null;
            }
            this.$store.commit('setListShow', true);
            // 创建缓存
            
            this.$cookies.set('HD', this.crypto.encryption(list), { expires: 1 });
            this.tabsTag("login");
          }).catch(e => {
            if (e.data) {
              if (e.data.ret == 66666) {
                this.topMssage = e.data.msg;
              } else {
                this.$message({
                  icon: 'fail',
                  message: e.data.msg
                });
              }
            }
          });
        }
      });
    },
    submitPassForm() {
      this.$refs['rulePassForm'].validate((valid) => {
        if (valid) {
          this.$refs['ruleCodeForm'].validate((valid2) => {
            if (valid2) {
              var data = {
                username: this.passForm.username,
                code: this.passForm.code
              }
              this.ios.getPassModifyToken(data).then(res => {
                if (res.data.ret == 0) {
                  this.passwordToken = res.data.data.pass_token;
                  this.tabsTag("setpassword");
                } else {
                  this.$message({
                    icon: 'fail',
                    message: res.data.msg
                  });
                }
              }).catch(e => {
                if (e.data) {
                  this.$message({
                    icon: 'fail',
                    message: e.data.msg
                  });
                }
              });
            }
          });
        }
      });
    },
    submitPwdForm() {
      this.$refs['rulePwdForm'].validate((valid) => {
        if (valid) {
          var data = {
            password: this.crypto.encryption(this.pwdForm.pass),
            pass_token: this.passwordToken
          }
          this.ios.setPassword(data).then(res => {
            if (res.data.ret == 0) {
              this.tabsTag("login");
              this.$message({
                icon: 'success',
                message: "成功密碼找回!\n您現在可以繼續登錄(✿◠‿◠)"
              });
            } else {
              this.$message({
                icon: 'fail',
                message: res.data.msg
              });
            }
          }).catch(e => {
            if (e.data) {
              this.$message({
                icon: 'fail',
                message: e.data.msg
              });
            }
          });
        }
      });
    },
    submitRegisterForm() {
      this.$refs['ruleRegisterEmailForm'].validate((valid) => {
        if (valid) {
          this.$refs['ruleRegisterForm'].validate((valid) => {
            if (valid) {
              var data = {
                emalil: this.registerForm.emalil,
                username: this.registerForm.username,
                password: this.crypto.encryption(this.registerForm.pass),
                Invitation: this.registerForm.Invitation,
                code: this.registerForm.code,
              }
              this.ios.userRegister(data).then(res => {
                if (res.data.ret == 0) {
                  this.tabsTag("login");
                  this.$message({
                    icon: 'success',
                    message: "註冊成功!\n您現在可以登錄(✿◠‿◠)"
                  });
                } else {
                  this.$message({
                    icon: 'fail',
                    message: res.data.msg
                  });
                }
              }).catch(e => {
                if (e.data) {
                  this.$message({
                    icon: 'fail',
                    message: e.data.msg
                  });
                }
              });
            }
          });
        }
      });
    },
    sendMsg() {
      this.$refs['rulePassForm'].validate((valid) => {
        if (valid) {
          let me = this;
          if (me.time < 1) {
            this.ios.passNameCode({ username: this.passForm.username }).then(res => {
              // me.isDisabled = true;
              if (res.data.ret == 0) {
                me.time = 120;
                let interval = window.setInterval(function() {
                  me.buttonName = '（' + me.time + '秒）';
                  --me.time;
                  if (me.time < 0) {
                    me.buttonName = "重新發送";
                    window.clearInterval(interval);
                  }
                }, 1000);
                this.$message({
                  icon: 'success',
                  message: "驗證碼已發送至郵箱(✿◠‿◠)\n請註意查收!"
                });
              } else {
                this.$message({
                  icon: 'fail',
                  message: e.data.msg
                });
              }
            }).catch(e => {
              if (e.data) {
                this.$message({
                  icon: 'fail',
                  message: e.data.msg
                });
              }
            });
          } else {
            this.$message({
              icon: 'fail',
              message: me.time + "秒後重新獲取"
            });
          }
        }
      });
    },
    sendEmailMsg() {
      this.$refs['ruleRegisterEmailForm'].validate((valid) => {
        if (valid) {
          let me = this;
          if (me.time < 1) {
            this.ios.getRegisterEmailCode({ username: this.registerForm.emalil }).then(res => {
              // me.isDisabled = true;
              if (res.data.ret == 0) {
                me.time = 120;
                let interval = window.setInterval(function() {
                  me.buttonName = '（' + me.time + '秒）';
                  --me.time;
                  if (me.time < 0) {
                    me.buttonName = "重新發送";
                    window.clearInterval(interval);
                  }
                }, 1000);
                this.$message({
                  icon: 'success',
                  message: "驗證碼已發送至郵箱(✿◠‿◠)\n請註意查收!"
                });
              } else {
                this.$message({
                  icon: 'fail',
                  message: e.data.msg
                });
              }
            }).catch(e => {
              if (e.data) {
                this.$message({
                  icon: 'fail',
                  message: e.data.msg
                });
              }
            });
          } else {
            this.$message({
              icon: 'fail',
              message: me.time + "秒後重新獲取"
            });
          }
        }
      });
    }
  }
}

</script>
<style>
#login {
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  z-index: 2002;
  display: flex;
  position: fixed;
  background-color: #ffffff;
  text-align: center;
  overflow-y: scroll;
}

.per-header {
  height: 50px;
  width: 100%;
  text-align: left;
}

.el-tabs__content {
  min-height: 390px;
}

#login .edit {
  background: rgba(1, 1, 1, 0) !important;
  border: 0;
  height: 50px;
  font-size: 30px;
  line-height: 0px;
}

.el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 15px;
  display: none;
}

#nopass {
  margin: 0px;
}

#postlogin {
  margin: 0px;
}

#postlogin button {
  color: #FFF !important;
}

#postpwdkey {
  margin: 0px;
}

#postpwdkey button {
  color: #FFF !important;
}

#postpwd {
  margin: 0px;
}

#postpwd button {
  color: #FFF !important;
}

#nopass button {
  width: auto;
}

#nopass .el-form-item__content {
  text-align: right !important;
}

#nopass .el-button--text {
  color: #606266;
}

.login {
  width: 100%;
  min-height: 60%;
  text-align: center;
}

.login .el-divider {
  height: 2px;
  background-color: #000000;
}

.navigation {
  padding-top: 8%;
  margin: auto;
  width: 1080px;
  text-align: center;
}

.logcenter {
  margin: auto;
  width: 1080px;
  min-height: 60%;
  text-align: center;
}

.el-input__inner:hover {
  border: 1px solid #000000 !important;
  border-color: #000000 !important;
}

.loginfrom {
  margin-left: 50px;
  padding: 50px 60px 50px 60px;
  border-radius: 5px;
  width: 250px;
  height: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  float: left;
}

.passwordfrom {
  margin-left: 50px;
  margin: auto;
  padding: 50px 60px 50px 60px;
  border-radius: 5px;
  width: 250px;
  height: auto;
  float: left;
}


.loginfrom .el-button--info {
  color: #FFF;
  background-color: #e35885;
  border-color: #e35885;
}

.loginfrom .el-button--info:focus {
  color: #FFF;
  background-color: #e35885;
  border-color: #e35885;
}

.loginfrom .el-button--info:hover {
  background: #ea749a !important;
  border-color: #ea749a !important;
  color: #FFF !important;
}

.loginfrom .el-button--info:active {
  color: #FFF;
  background-color: #e35885 !important;
  border-color: #e35885 !important;
}

.notice {
  padding: 50px 60px 50px 60px;
  border-radius: 5px;
  width: 500px;
  min-height: 250px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  float: left;
}

.login .demo-ruleForm {
  margin: auto;
  width: 250px;
}

.demo-ruleForm button {
  width: 250px;
}

.el-form-item__content {
  margin: 0px !important;
}

.login .el-main {
  margin: 0px;
  min-height: 60%;
  text-align: center;
}

.login .el-main .el-row {
  height: 100%;
}

.login .el-main .el-col {
  height: 80%;
}

.top-header .edit {
  background: rgba(1, 1, 1, 0) !important;
  border: 0;
  height: 50px;
  font-size: 1rem !important;
  line-height: 0px;
}

.top-header {
  height: 50px;
  width: 100%;
  text-align: right;
}


@media (max-width: 1201px) {
  .notice {
    display: none;
  }

  .navigation {
    padding-top: 8%;
    margin: auto;
    width: 100%;
    max-width: 400px;
    /*min-width: 350px;*/
    text-align: center;
  }


  .logcenter {
    margin: auto;
    width: 100%;
    height: auto;
    /*min-width: 350px;*/
    min-height: 60%;
    text-align: center;
  }

  #buttonm {
    display: none;
  }

  .loginfrom {
    padding: 50px 0px 50px 0px;
    margin: auto;
    border-radius: 5px;
    width: 100%;
    max-width: 370px;
    height: auto;
    max-height: 250px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    float: inherit;
  }

  .passwordfrom {
    margin: 0;
    padding: 0px calc(50% - 125px) calc(50% - 125px) calc(50% - 125px);
    border-radius: 5px;
    width: 250px;
    height: auto;
    float: left;
  }
}

</style>
