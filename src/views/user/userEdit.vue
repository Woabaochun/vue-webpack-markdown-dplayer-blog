<template>
  <div id="home">
    <el-container>
      <el-aside class="homeleft">
        <el-button id="release" type="info" @click="routerEdit()">發布文章</el-button>
        <el-menu :default-active="active" :router="true" :default-openeds="defaultOpeneds" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-menu-item :route="'/userEdit/homePage'" index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首頁</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">管理</span>
            </template>
            <el-menu-item :route="'/userEdit/articlePage'" index="2-1">文章管理</el-menu-item>
            <el-menu-item index="2-4-2" disabled>評論管理</el-menu-item>
            <el-menu-item index="2-4-3" disabled>留言管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3" v-if="TOKEN.level > 1">
            <template slot="title">
              <i class="el-icon-s-grid"></i>
              <span slot="title">超級管理</span>
            </template>
            <el-menu-item v-if="TOKEN.level >= 2" :route="'/userEdit/seedPage'" index="3-1">熱門管理</el-menu-item>
            <el-menu-item v-if="TOKEN.level >= 3" :route="'/userEdit/videoPage'" index="3-2">視頻管理</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main class="homecontent">
        <router-view></router-view>
      </el-main>
      <div class="homeright">
        <!-- <el-tabs v-model="'first'" ref="tabs" type="card" tab-position="left" @tab-click="handleClick">
          <el-tab-pane label="近期文章" name="first">近期文章</el-tab-pane>
        </el-tabs> -->
      </div>
    </el-container>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex';
export default {
  name: '',
  computed: {
    ...mapState([
      'active',
      'TOKEN'
    ])
  },
  data() {
    return {
      defaultOpeneds: ['2','3'],
      isCollapse: false,
      nullTip: '空空如也~',
      square: 'square',
      uplodUrl: 'http://service.shadiaotv.com/box_game/noLogin/readImageFile?url=',
      pageNumber: 1,
      pagesize: 10,
      selectParam: this.$store.state.SELECTACTIVENAME,
      totalRow: 0,
      totalPage: 1,
      firstPage: true,
      lastPage: true,
      removeRowoffsetTop: 220,
      valuedata: new Date(),
      blogdata: [],
      loading: false,
      finished: false,
      isLoading: false,
      loadingerr: false,
      isDownLoading: false, // 下拉刷新
      upFinished: false, // 上拉加载完毕
      styleMinHeight: { 'min-height': `${document.documentElement.clientHeight-42}` + 'px' },
    }

  },
  created() {
    document.documentElement.scrollTop = 0;
    this.$store.state.editorRou = false;
    // this.$store.state.selectChange = this;
  },
  components: {

  },
  methods: {
    handleClick(tab, event) {},
    routerEdit() {
      this.$router.push('/Editinit');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    blogLabel(json) {
      // var list = ;
      // if(list.length > 2){
      //   list.splice(2,list.length - 2);
      // }
      return JSON.parse(json);
    },
    errorHandler() {
      return true;
    },
    
    numericalzan(v) {
      if (v >= 100000000) {
        var num = v * 0.00000001;
        return parseFloat(num).toFixed(2) + ' B';
      } else if (v >= 1000000) {
        var num = v * 0.0001;
        return parseFloat(num).toFixed(2) + ' M';
      } else if (v >= 1000) {
        var num = v * 0.001;
        return parseFloat(num).toFixed(2) + ' K';
      }
      return v;
    },
  }
}

</script>
<style scoped>
input:focus {
  border: 1px solid #000000 !important;
  border-color: #000000 !important;
}

#home {
  width: 100%;
  min-width: 1400px;
  height: auto;
  min-height: 100%;
  text-align: center;
  padding-top: 42px;
  margin: 0px;
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

.homeleft {
  height: auto;
  min-height: 100%;
  width: auto;
  min-width: 300px;
  float: left;
  text-align: center;
}

.homeright {
  height: auto;
  min-height: 100%;
  width: auto;
  min-width: 300px;
  float: right;
}

.homecontent {
  width: calc(100% - 620px);
  min-width: 800px;
  min-height: 100%;
  margin: auto;
  background: rgba(0, 0, 0, 0);
  display: contents;
}

.el-container {
    height: auto;
    min-height: 100%;
    }

.el-menu-vertical-demo {
  max-width: 200px;
  margin: auto;
}

.el-menu-vertical-demo li {
  margin-top: 16px;
  /*height: 40px;*/
  line-height: 40px;
  font-size: 18px;
  text-align: left;
}

#release {
  width: 150px;
  color: #FFF !important;
  background-color: #e35885;
  border: 0;
  margin: 30px 0px 14px 0px;
}

>>>.el-menu-vertical-demo .el-submenu .el-submenu__title {
  height: 100%;
  line-height: 40px;
  font-size: 18px;
  text-align: left;
}

>>>.el-menu-item, .el-submenu__title{
  height: 40px; 
  line-height: 56px;
  position: relative;
  -webkit-box-sizing: border-box;
  white-space: nowrap;
  list-style: none;
}

>>>.el-submenu .el-menu-item {
  font-size: 14px;
  padding: 0 55px !important;
  height: 32px;
  line-height: 32px;
  margin-top: 8px !important;
}

>>>.el-submenu__icon-arrow {
  top: 53%;
}

>>>.el-menu {
  border-right: 0;
  background-color: rgba(0, 0, 0, 0);
}

>>>.el-menu-item.is-active {
  color: #e35885;
  background-color: rgba(0, 0, 0, 0.1);
}

>>>.el-menu-vertical-demo .el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

>>>.el-menu-vertical-demo .el-submenu:hover {
  background-color: rgba(0, 0, 0, 0);
}

>>>.el-menu-vertical-demo .el-submenu__title:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

</style>
