<template>
  <div id="Personal">
    <div class="center">
      <div class="per-header">
        <el-button type="info" plain class="iconfont icon-fanhui edit" @click="showPopup"></el-button>
      </div>
      <div class="per-center-con">
        <van-skeleton :avatar="true" :title="false" :loading="userinfo.avatarimgUrl == ''" animate :avatar-shape="square" avatar-size="70px">
          <div class="demo-type" style="max-height: 70px;">
            <!-- <el-avatar :size="70" :src="userinfo.avatarimgUrl" @error="errorHandler" @load="imageLoad">
              <img src="../../assets/userimg.png" />
            </el-avatar> -->
            <el-image :size="70" id="imageUrl" :key="userinfo.avatarimgUrl" :src="userinfo.avatarimgUrl" @error="errorHandler" @load="imageLoad" lazy>
              <div slot="error" class="image-slot">
                <img src="../../assets/userimg.png" />
              </div>
            </el-image>
          </div>
        </van-skeleton>
        <el-button v-show="showUserinfoTag == 'userinfo'" style="padding: 0;float: right;right: 30px;margin-top: -15px;position: absolute;" type="text" plain class="el-icon-edit-outline" @click="showUserEdit">编辑</el-button>
      </div>
      <div class="per-center-con">
        <div class="userinfo">
          <el-tabs v-model="showUserinfoTag">
            <el-tab-pane label="個人中心" name="userinfo">
              <div class="userinfofrom">
                <span>
                  {{userinfo.nickname}}
                </span>
                <div style="margin-top:10px;">
                  <div style="width:125px;float:left;height:22px;">
                    <el-tooltip class="item" effect="dark" content="關註" placement="top">
                      <i class="iconfont icon-guanzhu1">&nbsp;{{this.numerical(userinfo.attention)}}</i>
                    </el-tooltip>
                  </div>
                  <div style="width:125px;float:left;height:22px;">
                    <el-tooltip class="item" effect="dark" content="留言" placement="top">
                      <el-badge :value="numericalMax(this.$store.state.userMessage)" class="item">
                        <el-button type="info" plain class="iconfont icon-liuyan edit2" style="padding:0px 5px;"></el-button>
                      </el-badge>
                    </el-tooltip>
                  </div>
                </div>
                <el-divider style="matgin:10px 0px;">
                </el-divider>
                <!-- <el-form :model="userForm" :rules="ruleUserForm" ref="ruleUserForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item prop="username">
                      <el-input prefix-icon="iconfont icon-user" placeholder="请输入用户名" @clear="userclearable" v-model="userForm.username" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input prefix-icon="iconfont icon-password" placeholder="请输入密码" show-password type="password" v-model="userForm.password"></el-input>
                    </el-form-item>
                    <el-form-item id="nopass">
                      <el-button type="text" @click="tabsTag('password')">忘记密码</el-button>
                    </el-form-item>
                    <el-form-item id="postlogin">
                      <el-button type="info" @click="submitLoginForm()">登 录</el-button>
                    </el-form-item>
                    <el-form-item id="nopass">
                      <el-button type="text" @click="tabsTag('register')">注册账号</el-button>
                    </el-form-item>
                  </el-form> -->
                <el-button id="release" type="info" @click="cancellation()">退出登陸</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="編輯信息" name="infoedit" style="margin-top: 50px;">
              <el-form ref="userinfo" :model="userinfo" :rules="userRules" id="userinfo">
                <el-form-item prop="avatarimgUrl" ref="avatarimgUrlImput">
                  <el-input class="formInput" placeholder="請輸入頭像URL" v-model="userinfo.avatarimgUrl">
                    <template slot="prepend">URL://</template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="updataname" ref="updatanameImput">
                  <el-input class="formInput" placeholder="請輸昵稱" v-model="userinfo.updataname">
                  </el-input>
                </el-form-item>
              </el-form>
              <el-button type="text" plain class="iconfont icon-quxiao" @click="hideUserEdit">取消</el-button>
              <el-button type="text" plain class="iconfont icon-bg-save" @click="updataEdit">保存</el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Personal',
  data() {
    var validatePass = (rule, value, callback) => {
      if (!this.isUrl && this.userinfo.avatarimgUrl != '') {
        callback(new Error('URL無效'));
      } else {
        callback();
      }
    };
    return {
      popupVal: this.$store.state.POPUP,
      isUrl: false,
      showUserinfoTag: 'userinfo',
      square: 'square',
      userinfo: {
        avatarimgUrl: '',
        personalBrief: '',
        level: 0,
        nickname: '',
        attention: 0,
        reality: '',
        updataname: ''
      },
      nickname: '',
      userRules: {
        avatarimgUrl: [
          { required: true, message: '請輸入頭像URL', trigger: ['blur', 'change'] },
          { validator: validatePass, trigger: 'blur' }
        ],
        updataname: [
          { required: true, message: '昵稱不能為空', trigger: 'blur' },
          { min: 3, max: 10, message: '昵稱只能在3到10個字符', trigger: 'blur' }
        ]
      },
    }
  },
  components: {


  },
  watch: {},
  created() {
    const data = this.$store.state.TOKEN;
    this.$store.state.popupVal = this;
    this.userinfo = {
      avatarimgUrl: data.avatarimgUrl,
      personalBrief: data.personalBrief,
      level: data.level,
      nickname: data.nickname,
      attention: data.attention,
      reality: data.reality,
      updataname: data.nickname
    };
  },
  methods: {
    showUserEdit() {
      this.userinfo.updataname = this.userinfo.nickname;
      this.$refs['avatarimgUrlImput'].clearValidate();
      this.$refs['updatanameImput'].clearValidate();
      this.showUserinfoTag = 'infoedit';

    },
    hideUserEdit() {
      this.showUserinfoTag = 'userinfo';
      this.userinfo.avatarimgUrl = this.$store.state.TOKEN.avatarimgUrl;
    },
    cancellation() {
      var params = {
        nickname: this.userinfo.nickname
      }

      this.ios.cancellationLogin(params).then(res => {
        if (res.data.ret == 0) {
          this.$cookies.remove('HD');
          this.$store.state.TOKEN = null;
          this.$store.state.avatarimgUrl = '';
        }
        this.$store.commit('hidePOPUP');
        var navigation = this.$route.meta.navigation;
        if (!navigation) {
          this.$router.push('/');
        }
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
    },
    imageLoad(e) {
      this.isUrl = true;
    },
    errorHandler() {
      if (this.userinfo.avatarimgUrl != '') {
        this.isUrl = false;
      }
      return false
    },
    updataEdit() {
      this.$refs['userinfo'].validate((valid) => {
        if (valid) {
          var params = {
            avatarimgUrl: this.userinfo.avatarimgUrl,
            nickname: this.userinfo.updataname
          }
          this.ios.updataUser(params).then(res => {

            if (res.data.ret == 0) {
              let token = res.data.data;
              token.update = new Date();
              this.$store.state.avatarimgUrl = token.avatarimgUrl;
              this.$store.state.userMessage = token.userMessage;
              if (token.userMessage == 'null') {
                this.$store.state.userMessage = null;
              }
              this.$store.state.TOKEN = token;
              this.$cookies.remove('HD');
              this.$cookies.set('HD', this.crypto.encryption(token), { expires: 1 });
              this.$message({
                type: 'success',
                message: '更新成功。',
              });
            } else {
              this.$message({
                icon: 'fail',
                message: res.data.msg
              });
            }
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
    showPopup() {
      this.$store.commit('hidePOPUP');
    },
    numerical(v) {
      if (v >= 100000000) {
        var num = v * 0.00000001;
        return parseFloat(num).toFixed(2) + ' B';
      } else if (v >= 1000000) {
        var num = v * 0.0001;
        return parseFloat(num).toFixed(2) + ' M';
      }
      return v;
    },
    numericalMax(v) {
      if (v > 0) {
        return 0;
      }
      return v;
    },
  },

}

</script>
<style scoped>
#Personal {
  width: calc(100% - 24px);
  height: calc(100% - 24px);
  padding: 12px;
}

#Personal .center {
  width: 100%;
  height: 100%;
  /*background-color: #e35885;*/
}

#imageUrl {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #666666;
}

.image-slot img {
  width: 70px;
  height: 70px;
  /*border-radius: 50%;*/
}

.el-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #666666;
}

#release {
  width: 80%;
  position: absolute;
  margin: auto;
  bottom: 0;
  left: 10%;
}

.per-header {
  height: 50px;
  width: 100%;
  text-align: right;
}

.per-center-con {
  width: 100%;
  height: auto;
  text-align: center;
}

.userinfo {
  min-width: 200px;
  max-width: 250px;
  min-height: 20px;
  margin: auto;
  text-align: center;
}

.userinfofrom {
  padding-top: 10px;
  width: 100%;
  min-height: 100%;
  float: left;
  text-align: center;
}

.van-skeleton__avatar {
  margin: auto;
}

.van-skeleton__content {
  width: auto;
}

.van-skeleton {
  text-align: center;
}

.el-divider--horizontal {
  margin: 35px 0;
}

.el-badge__content {
  background-color: #F56C6C;
  border-radius: 5px;
  color: #F56C6C;
  display: inline-block;
  font-size: 0px;
  height: 6px;
  width: 6px;
  line-height: 10px;
  padding: 0px 0px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #F56C6C;
}

>>>.el-button+.el-button {
  margin-left: 40px;
}

@media (max-width: 1201px) {
  .per-header {
    height: 50px !important;
    width: 100% !important;
    text-align: left !important;
  }
}

>>>.el-input-group__prepend {
  padding: 0 5px !important;
}

>>>.el-button.is-plain {
  border: 0;
}

#Personal .edit {
  background: rgba(1, 1, 1, 0) !important;
  border: 0;
  height: 50px;
  font-size: 50px;
  line-height: 0px;
}

#Personal .edit2 {
  background: rgba(1, 1, 1, 0) !important;
  border: 0;
  font-size: 20px;
  line-height: 20px;
}

</style>
