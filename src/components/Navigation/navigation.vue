<template>
  <el-container>
    <el-header class="headertop">
      <el-row type="type" v-if="IS_PC === true" style="min-width: 1200px;">
        <el-col :span="4" style="text-align: -webkit-right; padding-right:10px;">
          <div id="logoo" style="width: 126px;height: 100%;" @click="onHome">
            <img src="@/assets/logohome.png" />
          </div>
        </el-col>
        <el-col v-show="topbor == false" :span="16" style="overflow:hidden;overflow-x: auto;padding:0px 0px 0px 20px;min-width:700px;">
          <el-breadcrumb separator-class="el-icon-arrow-right" v-show="!editorRou" style="height: 42px;line-height:42px;font-size:20px;">
            <el-breadcrumb-item>创作中心</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button type="text" style="padding: 0;background:rgba(0, 0, 0, 0);position: relative;display: block;float: left;font-size: 24px;font-weight: bold;" class="el-icon-d-arrow-left" v-show="editorRou" @click="onRouter"></el-button>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-show="editorRou" style="height: 42px;line-height:42px;font-size:20px;">
            <el-breadcrumb-item class="arrow-right">{{articleTitle}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col v-show="topbor" :span="search == true ? 10 : 15" id="box" style="overflow:hidden;overflow-x: auto;padding:0px px;">
          <nav v-bind:class="ACTIVE" v-on:click.prevent>
            <li href="#" class="home" v-on:click="makeActive('home')">
              <div class="headerActionIco" style="padding-top: 8.4px;">
                <i class="iconfont icon-index"></i>
              </div>
              熱門
            </li>
            <li href="#" class="seed" v-on:click="makeActive('seed')">
              <div class="headerActionIco">
                <i class="iconfont icon-biaoqian1"></i>
              </div>
              BT種子
            </li>
            <li href="#" class="video" v-on:click="makeActive('video')">
              <div class="headerActionIco">
                <i class="iconfont icon-hezuowoshouyouyihexiehepinggongyingmianxing"></i>
              </div>
              H視頻
              <!-- <el-button type="text" v-show="videoSelect" icon="el-icon-caret-bottom" style="background: rgba(0, 0, 0, 0);color: #fff;padding: 0px;height: auto;font-size: 20px;position: absolute;top: 10px;" @click="drawer = true"></el-button>
              <el-drawer :visible.sync="drawer" :direction="direction" :modal="false" :with-header="false" :before-close="handleClose">
                <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                  <el-menu-item index="全部">
                    <span slot="title">全部<i class="el-menu-item-buttom" /></span>
                  </el-menu-item>
                  <el-menu-item index="日韓">
                    <span slot="title">日韓<i class="el-menu-item-buttom" /></span>
                  </el-menu-item>
                  <el-menu-item index="欧美">
                    <span slot="title">欧美<i class="el-menu-item-buttom" /></span>
                  </el-menu-item>
                  <el-menu-item index="亞洲">
                    <span slot="title">亞洲<i class="el-menu-item-buttom" /></span>
                  </el-menu-item>
                </el-menu>
              </el-drawer> -->
            </li>
            <li href="#" class="contact" v-on:click="makeActive('contact')">
              <div class="headerActionIco">
                <i class="iconfont icon-gonggao"></i>
              </div>
              公告
            </li>
          </nav>
        </el-col>
        <el-col :span="5" v-show="topbor && search" style="padding-left:10px;">
          <div class="se-input">
            <el-input placeholder="請輸入內容" v-model="input5" class="input-with-select" style="padding: 0 0 0 15px;" @change="onSearch">
              <el-button slot="append" type="primary" icon="el-icon-search select" @click="onSearch"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="5" style="right: 0;position: absolute;">
          <el-row type="type">
            <el-col v-show="topbor" :span="12" style="text-align: -webkit-right;padding-right:20px;">
              <el-button type="info" plain class="iconfont edit icon-yumaobi" @click="showEditor"></el-button>
            </el-col>
            <el-col :span="12" style="text-align: left;max-height: 42px;right: 0;position: absolute;">
              <el-button type="info" plain class="btnlogin" v-if="TOKEN == null" @click="showLogin">登錄/註冊</el-button>
              <el-button type="info" id="onShowPopup" plain class="user" v-show="TOKEN != null" @click="showPopup" style="padding:0px;">
                <div class="demo-type">
                  <el-image :size="40" id="imageUrl" :key="TOKEN ? TOKEN.avatarimgUrl : ''" :src="TOKEN ? TOKEN.avatarimgUrl : ''" @error="errorHandler" lazy>
                    <div slot="error" class="image-slot">
                      <img src="../../assets/userimg.png" />
                    </div>
                  </el-image>
                  <!-- <el-avatar :size="40" :src="TOKEN.avatarimgUrl" @error="errorHandler">
                    <img src="@/assets/userimg.png" />
                  </el-avatar> -->
                </div>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="type" id="movn" align="center" v-else-if="IS_PC === false" v-show="listShow">
        <el-col :span="width <= 1023 ? 24 : 14" style="margin: 0 auto;float: none;">
          <div class="se-input ispo" style="border:3px solid rgba(1,1,1,0);display: inline-table;">
            <img alt="Vue logo" src="@/assets/logohomeip.png" />
            <el-input prefix-icon="iconfont icon-79abe48e4ef7b2aa0f6c04d3a6d48251" placeholder="請輸入搜索內容" v-model="input5" @change="onSearch" :disabled="!search">
              <el-button id="sousuo" slot="append" type="primary" icon="select" @click="onSearch" style="min-width:50px;max-height:35px;border:0;" :disabled="!search">搜索</el-button>
            </el-input>
          </div>
        </el-col>
        <van-tabbar v-model="ACTIVE" @change="makeActive" active-color="#e35885" inactive-color="#7d7e80" fixed>
          <van-tabbar-item name="home" icon="wap-home">熱門
          </van-tabbar-item>
          <van-tabbar-item name="seed" icon="fire">BT種子
          </van-tabbar-item>
          <van-tabbar-item name="video">
            <div class="tabar-logo">
              <div class="tabbar-logo-hd" v-proportion="1">
                <svg-icon icon-class="00" />
              </div>
              <svg-icon icon-class="webBarL" style="width: 124px;height: 20px;position: absolute;margin-top: -67px;left: -27px;" />
            </div>
            <span style="width: 70px;z-index: 2;display: block;position: absolute;text-align: center;margin-top: -30px;">H視頻</span>
          </van-tabbar-item>
          <van-tabbar-item name="contact" icon="volume">公告
          </van-tabbar-item>
          <div style="width:20%;height:100%;text-align: center;">
            <el-button type="info" plain class="btnlogin" v-if="TOKEN == null" style="padding:0px;margin-top: 4px !important;margin-left:0 !important;" @click="showLogin">登錄</el-button>
            <el-button type="info" id="onShowPopup" plain class="user" v-show="TOKEN != null" @click="showPopup" style="padding:0px;margin-left:0 !important;margin-top: 4px !important;">
              <div class="demo-type">
                <el-image :size="40" id="imageUrl" :key="TOKEN ? TOKEN.avatarimgUrl : ''" :src="TOKEN ? TOKEN.avatarimgUrl : ''" @error="errorHandler" lazy>
                  <div slot="error" class="image-slot">
                    <img src="../../assets/userimg.png" />
                  </div>
                </el-image>
              </div>
            </el-button>
          </div>
        </van-tabbar>
      </el-row>
    </el-header>
  </el-container>
</template>
<script>
import { mapState } from 'vuex';
// import { Dialog } from 'vant';
export default {
  name: 'navigation',
  props: {
    msg: String
  },
  computed: {
    ...mapState([
      'articleTitle',
      'navigation',
      'TOKEN',
      'IS_PC',
      'POPUP',
      'editor',
      'editorRou',
      'topbor',
      'listShow',
      'videoSelect',
      'search',
    ]),
    ACTIVE: {
      get() {
        return this.$store.state.ACTIVE;
      },
      set(val) {
        this.$store.commit('setActive', val);
      }
    }
  },
  data() {
    return {
      drawer: false,
      direction: '',
      defaultActive: '全部',
      activeModel: this.$store.state.ACTIVE,
      lists: [],
      input5: '',
      width: `${document.documentElement.clientWidth}`,
    }
  },
  created() {
    // this.analysisRank();
    // this.$store.commit('hideLoging');
    // if (this._isMobile()) {
    //   this.$store.commit('moveheader');
    // } else {
    //   this.$store.commit('pcheader');
    // }

  },
  mounted() {

  },
  methods: {
    onRouter(){
      if(this.$route.matched.length > 1){
        var path = this.$route.matched[0].path;
        if(path == ""){
          path = '/'
        }
        this.$router.push(path);
      }else{
        this.$router.go(-1);
      }
      this.$store.commit('setListShow', true);
    },
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     
      //   })
      //   .catch(_ => {});
    },
    onHome() {
      this.$store.commit('setActiveOptions', 'home');
      this.$router.push('/');
    },
    onSearch() {
      // this.$store.commit('showLoading');
      this.$store.commit('setSselectActiveName', this.input5);
      this.$store.state.selectChange.loadTop();
    },
    showEditor() {
      if (this.$store.state.TOKEN == null) {

        this.$Dialog.confirm({
            message: '您需要登錄後才能繼續,點擊確認將前往登錄.',
            confirmButtonColor: "#e35885"
          })
          .then(() => {
            this.showLogin();

          })
          .catch(() => {
            return;
          });

      } else {
        // this.$store.commit('showEditor');
        this.$router.push('/userEdit/homePage');
        this.$store.commit('setActiveOptions', '');
      }
    },
    errorHandler() {
      return true
    },
    showPopup() {
      let popup = this.$store.state.POPUP;
      if (popup) {
        this.$store.commit('hidePOPUP');
      } else {
        this.$store.commit('showPOPUP');
      }
    },
    handleSelect(key, keyPath) {
      this.defaultActive = key;
      this.drawer = false;
      // this.$store.commit('showLoading');
      this.$store.commit('setDefaultActive', key);
      this.$store.state.selectChange.loadTop();
    },
    makeActive(item) {
      // 模型改变，视图会自动更新
      // this.active = item;
      this.$store.commit('setActiveOptions', item);
      this.input5 = '';
      this.$store.commit('setSselectActiveName', '');

      if (item == 'home') {
        this.$router.push('/');
      } else {
        this.$router.push('/' + item);
      }

    },
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/g);
      return flag;
    },
    showLogin() {
      this.$store.commit('showLogin');
      this.$store.commit('setListShow', false);
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#logoo {
  cursor: pointer;
}

#logoo img {
  width: auto;
  max-height: 42px;
  max-width: 100%;
  margin: 0px;
  padding: 0px;
  border: 0px;
  display: flex;
}

#imageUrl {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.image-slot img {
  width: 40px;
  height: 40px;
  /*border-radius: 50%;*/
}

.el-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.btntop {
  width: auto;
}

.btntop>>>.el-button {
  position: fixed;
}

.btnreight {
  width: auto;
  float: right;
}

.btnreight>>>.el-button {
  height: 36px !important;
  width: 35px !important;
  padding: 0;
  margin-left: 0 !important;
}

.btnlogin {
  border: 0px !important;
  margin: 0px;
  padding: 0px 10px;
  max-height: 42px !important;
  font-size: px;
  background: rgba(1, 1, 1, 0) !important;
}

.btnlogin:hover {
  background-color: rgba(1, 1, 1, 0) !important;
  border-color: rgba(1, 1, 1, 0) !important;
  color: #e35885 !important;
  outline: 0;
}

.user {
  border: 1px solid #666666 !important;
  margin: 0px;
  margin-left: 20px !important;
  max-height: 42px !important;
  max-width: 42px !important;
  border-radius: 21px !important;
  font-size: 20px;
  background: rgba(1, 1, 1, 0) !important;
  background-image: url('../../assets/userimg.png') !important;
  background-size: cover !important;
}

.user:hover {
  border: 1px solid #e35885 !important;
  background-collor: rgba(1, 1, 1, 0) !important;
  color: #e35885 !important;
  outline: 0;
}

.el-avatar {
  display: list-item;
}

.el-avatar--circle {
  background: rgba(1, 1, 1, 0) !important;
}

section,
footer,
aside,
nav {
  display: block;

}

.headertop {
  padding: 0;
  z-index: 999;
  position: fixed !important;
  width: 100%;
  height: auto !important;
  background: rgba(1, 1, 1, 0.2);

  /* Non-prefixed version, currently
      not supported by any browser */
}


.se-input {
  margin: 0;
  padding: 0;
  float: left;
  border: 0;
  height: 100%;
  display: flex;
}

#movn {
  min-height: 42px;
}

#movn>>>.btntop {
  float: left;
  padding: 3px;
}

#movn>>>.btntop .el-button {
  height: 36px !important;
  width: 35px !important;
  padding: 0;
  margin-left: 0 !important;
}

#movn>>>.el-input__inner {
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  border: 1px solid #FFF;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: 20px;
  max-height: 36px;
  min-height: 36px;
  line-height: 36px;
  outline: 0;
  -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
}

#movn>>>#sousuo {
  border-radius: 0px 6px 6px 0px;
  height: 36px !important;
  width: 35px;
  background: #e35885;
  padding: 0px;
  color: #FFF;
}

#movn>>>.el-input-group__append {
  border-radius: 0px 6px 6px 0px;
  border: 0px !important;
  height: 36px !important;
  width: 35px;

  background: #e35885;
  padding: 0px;
}

.headertop>>>.el-input__inner {
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  border: 1px solid #FFF;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: 20px;
  max-height: 42px;
  min-height: 42px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;

  -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
}

.headertop>>>.el-input-group__append {
  background-color: rgba(1, 1, 1, 0);
  border: 0;
  padding: 0;
  max-height: 36px;
}

.headertop>>>.el-button {
  border-radius: 0px 6px 6px 0px;
  height: 42px;
  margin: 0px;
  background: #e35885;
  color: #FFF;
}

.headertop>>>.edit {
  max-width: 42px !important;
  max-height: 42px !important;
  padding: 0px !important;
  font-size: 40px;
  color: #FFF !important;
  border-radius: 21px;
  background: rgba(1, 1, 1, 0);
  border: 0px;
}

.headerActionIco {
  float: left;
  padding-top: 8.5px;
  line-height: 0;
}

.headerActionIco i {
  font-size: 22px;
}

.el-button--info.is-plain:focus {
  background: rgba(1, 1, 1, 0);
  border-color: rgba(1, 1, 1, 0);
  color: #FFF;
  outline: 0;
}

.el-button--info.is-plain:hover {
  background: rgba(1, 1, 1, 0);
  border-color: rgba(1, 1, 1, 0);
  color: #000 !important;
  outline: 0;
}

.el-button--info.is-plain:container {
  background: rgba(1, 1, 1, 0);
  border-color: rgba(1, 1, 1, 0);
  color: #FFF;
  outline: 0;
}

#box::-webkit-scrollbar {
  display: none;
}

#box {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Chrome/Safari/Opera */
  -khtml-user-select: none;
  /* Konqueror */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
}

.arrow-right {
  max-width: 650px;
  min-width: 20px;
  text-align: center;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  white-space: nowrap;
  word-wrap: break-word;
  white-space: inherit;
}

.arrow-right .el-breadcrumb__inner {
  line-height: 20px;
  height: auto;
}

.tabar-logo {
  width: 70px !important;
  height: 70px !important;
  border-radius: 45%;
  background: #fff;
  position: relative;
  top: -10px;
  z-index: 1;
}

.tabbar-logo-hd {
  width: 70px !important;
  height: 70px !important;
  border-radius: 45%;
  background: #fff;
  position: relative;
  transform: rotate(45deg);
  z-index: 1;
}

.tabbar-logo-hd svg {
  width: 85% !important;
  transform: rotate(-45deg);
  top: -7px;
  left: -7px;
  position: relative;
}


.tabbar-logo-hd .box-left {
  width: 10px;
  height: 20px;
  border: 0;
  border-radius: 50% 0em 0em 50%;
  border-left: 5px solid;
  border-left-color: #fff;
  transform: rotate(200deg);
  position: fixed;
  margin-top: -37.5px;
  left: -11px;
  background: rgba(1, 1, 1, 0);
}

.tabbar-logo-hd .box-right {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 50% 0em 0em 50%;
  border-left: 5px solid;
  border-left-color: #fff;
  transform: rotate(47deg);
  position: relative;
  display: flex;
  margin-top: 61px;
  right: 34px;
  background: rgba(1, 1, 1, 0);
}

.van-tabbar-item__icon>>>.iconfont {
  font-size: 25px;
}


nav {
  width: auto;
  display: inline-block;
  /*margin: 60px auto 45px;*/
  background-color: rgba(1, 1, 1, 0);
  /*margin-left:calc(-19%);*/
  white-space: nowrap;
  float: left;
}

div {
  padding: 0;
  margin: 0;
}

nav li {
  max-height: 16px;
  display: inline-block;
  padding: 13px 30px;
  color: #fff !important;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none !important;
  line-height: 1;
  background-color: transparent;
  -webkit-transition: background-color 0.25s;
  -moz-transition: background-color 0.25s;
  transition: background-color 0.25s;
}

nav li:first-child {
  border-radius: 2px 0 0 2px;
}

nav li:last-child {
  border-radius: 0 2px 2px 0;
}

nav li:hover{
  cursor:pointer; 
}

nav.home .home,
nav.seed .seed,
nav.video .video,
nav.contact .contact {
  background: #e35885;
}

.ispo>>>img {
  float: left;
  position: fixed;
  z-index: 2;
  width: 4rem;
  margin-top: -0.17rem;
}

.ispo {
  margin: 0;
  padding: 0;
  float: left;
  border: 0;
  height: 100%;
  width: calc(100% - 6px);
}

.ispo>>>.el-input__prefix {
  padding-top: 0.55rem;
}

.ispo>>>.icon-79abe48e4ef7b2aa0f6c04d3a6d48251 {
  font-size: 3.7rem;
  margin-left: -0.33rem;
  margin-top: -0.5rem;
}

>>>.van-tabbar-item {
  width: 20%;
}

.ispo>>>.el-input__inner {
  padding-left: 4rem;
}

.ispo>>>.el-input-group__append {
  border: 0;
  min-width: 50px;
  max-height: 36px;
}

>>>.el-menu-item.is-active {
  color: #e35885;
  border-bottom: 0 !important;
  text-align: center;
  background-color: rgba(0, 0, 0, 0) !important;
}

>>>.el-menu {
  background: #e1e1e1;
  border-right: 0;
  border-radius: 5px;
  /*border: 1px solid rgba(0, 0, 0, 0.2) !important;*/
  /*background-color: rgba(0, 0, 0, 0.5);*/
}

>>>.el-menu-demo .el-menu-item.is-active:hover {
  color: #e35885;
  background-color: rgba(0, 0, 0, 0) !important;
}

>>>.el-menu-demo .el-menu-item.is-active:focus {
  color: #e35885;
  background-color: rgba(0, 0, 0, 0) !important;
}

>>>.el-menu--horizontal.el-menu {
  /*width: 650px;*/
  text-align: center;
  border-bottom: 0 !important;
  z-index: 99;
  position: fixed;
  top: 42px;
}

>>>.el-menu-demo .el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0) !important;
}

>>>.el-menu-demo .el-submenu:hover {
  background-color: rgba(0, 0, 0, 0);
}

>>>.el-menu-demo .el-submenu__title:hover {
  background-color: rgba(0, 0, 0, 0);
}



>>>.el-menu-item {
  padding: 0;
  margin: 0 auto;
  width: 100px;
  height: 40px !important;
  line-height: 40px !important;
  border-bottom: 0 !important;
}

>>>.el-menu-item.is-active .el-menu-item-buttom {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom-style: solid;
  border-bottom-color: #e35885;
  border-bottom-width: 2px;
  display: block;
  margin: auto;
  margin-top: -3px;
  width: 30px;
}

>>>.el-menu-item-buttom {
  display: none !important;
}

>>>.el-drawer {
  width: auto;
  height: 82px !important;
  background: center;
  text-align: center;
  background: rgba(0, 0, 0, 0);
  display: inline-table;
  position: relative;
  -webkit-box-shadow: 0 8px 10px -5px rgb(0 0 0 / 0%), 0 16px 24px 2px rgb(0 0 0 / 0%), 0 6px 30px 5px rgb(0 0 0 / 0%);
  box-shadow: 0 8px 10px -5px rgb(0 0 0 / 0%), 0 16px 24px 2px rgb(0 0 0 / 0%), 0 6px 30px 5px rgb(0 0 0 / 0%);
}

>>>.el-drawer__body {
  width: 400px;
  height: 82px;
  margin: auto;
}

>>>.el-drawer__wrapper {
  z-index: 990 !important;
}


>>>.van-tabbar-item i::before {
  font-weight: bold;
}


>>>.van-tabbar-item .van-tabbar-item__text {
  font-weight: bold;
}


@media (max-width: 1024px) {
  .ispo {
    margin: 0;
    padding: 0;
    float: left;
    border: 0;
    height: 100%;
    width: calc(100% - 6px);
  }

  .ispo>>>.el-input__prefix {
    padding-top: 0.55rem;
  }

  .ispo>>>.icon-79abe48e4ef7b2aa0f6c04d3a6d48251 {
    font-size: 3.7rem;
    margin-left: -0.33rem;
    margin-top: -0.5rem;
  }

  .ispo>>>img {
    float: left;
    position: fixed;
    z-index: 2;
    width: 4rem;
    margin-top: -0.17rem;
  }

  .ispo>>>.el-input__inner {
    padding-left: 4rem;
  }

  .ispo>>>.el-input-group__append {
    border: 0;
    min-width: 50px;
    max-height: 36px;
  }
}

</style>
