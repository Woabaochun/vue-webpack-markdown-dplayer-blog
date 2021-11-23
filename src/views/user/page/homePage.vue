<template id="tmp1">
  <div class="top">
    <el-row class="console_home_data">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <a data-report-click="{&quot;spm&quot;:&quot;1011.2124.3001.6200&quot;}" style="display: block;">
            <p class="title">總閱讀量</p>
            <p class="today_data">0</p>
            <span class="yesterday_data">昨日無變化</span>
          </a>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <a data-report-click="{&quot;spm&quot;:&quot;1011.2124.3001.6200&quot;}" style="display: block;">
            <p class="title">粉絲數</p>
            <p class="today_data">0</p>
            <span class="yesterday_data">昨日無變化</span>
          </a>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <a data-report-click="{&quot;spm&quot;:&quot;1011.2124.3001.6200&quot;}" style="display: block;">
            <p class="title">收藏數</p>
            <p class="today_data">0</p>
            <span class="yesterday_data">昨日無變化</span>
          </a>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-content">
          <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
              <span slot="title">近期文章<i class="el-menu-item-buttom" /></span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">其他文章<i class="el-menu-item-buttom" /></span>
            </el-menu-item>
          </el-menu>
          <div class="grid-content bg-purple-light" style="color:#B1B1B3" v-show="vanemptyCont == false">
            <el-row class="row-bg blog" :key="blog.id" v-for="blog in blogdata">
              <el-col :span="9" class="blogTitle border-width">
                {{blog.article_title}}
              </el-col>
              <el-col :span="5" class="blogFabulous">
                <p class="border-width">{{blog.fabulous}}</p>
                <p style="font-size: smaller;">點贊數</p>
              </el-col>
              <el-col :span="5" class="blogFabulous">
                <p class="border-width">{{blog.preview_statistics}}</p>
                <p style="font-size: smaller;">預覽數</p>
              </el-col>
              <el-col :span="5" class="blogFabulous">
                <p class="border-width">{{blog.focus_statistics}}</p>
                <p style="font-size: smaller;">評論數</p>
              </el-col>
            </el-row>
          </div>
          <div class="grid-content bg-purple-light1" style="color:#B1B1B3" v-show="vanemptyCont">
            <van-empty :image="empty" :description="empty == 'search' ? '空空如也' : '網絡鏈接異常'" />
          </div>
          <!-- <el-tabs v-model="activeName" ref="tabs" type="card" tab-position="left" @tab-click="handleClick">
            <el-tab-pane label="近期文章" name="first">近期文章</el-tab-pane>
          </el-tabs> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
export default {
  name: 'homePage',
  computed: {
    ...mapState([
      'empty'
    ]),
  },
  data() {
    return {
      blogdata: [],
      activeName: 'first',
      pageNumber: 1,
      pageSize: 5,
      vanemptyCont: false,
    };
  },
  created() {
    this.loadTop();
    this.$store.commit('setActive', '1');
  },
  components: {

  },
  methods: {
    handleClick(tab, event) {},
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    loadTop() {
      // 加载数据
      var params = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        realName: '',
        type: '1',
        findData: ''
      }
      this.ios.selectUserBlogPageNumber(params).then(res => {
        if (res.data.ret == 0) {
          var arr = res.data.data;
          this.vanemptyCont = false;
          if (arr.list.length > 0) {
            this.blogdata = arr.list;
          } else {
            this.vanemptyCont = true;
          }
        } else {
          this.vanemptyCont = true;
          this.$message({
            icon: 'fail',
            message: res.msg
          });
        }
      }).catch(e => {
        if (e.data) {
          this.$message({
            icon: 'fail',
            message: e.data.msg
          });
        }
        this.vanemptyCont = true;
      });
    },
  },
  mounted() {

  }
};

</script>
<style scoped>
.top {
  width: 100%;
  height: auto;
  background: rgba(0, 0, 0, 0);
  margin-top: 30px;
}

.top .grid-content {
  width: 100%;
  height: auto;
  display: inline-block;
}

.console_home_data {
  height: auto;
  display: flex;
}

>>>.bg-content {
  min-height: 314px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
}

.today_data {
  height: 35px;
  font-size: 24px;
  font-weight: 600;
  color: #222226;
  line-height: 35px;
  margin: 12px 0;
}

.yesterday_data {
  padding: 0 12px;
  height: 24px;
  font-size: 12px;
  font-weight: 400;
  color: #555666;
  line-height: 24px;
  margin-bottom: 16px;
  display: inline-block;
}

.title {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #555666;
  line-height: 20px;
  margin-top: 16px;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

>>>.el-menu-item.is-active {
  color: #e35885;
  border-bottom: 0 !important;
  text-align: center;
  background-color: rgba(0, 0, 0, 0) !important;
}

>>>.el-menu {
  border-right: 0;
  background-color: rgba(0, 0, 0, 0);
}

>>>.el-menu-demo .el-menu-item.is-active:hover {
  color: #e35885;
  background-color: rgba(0, 0, 0, 0.1) !important;
}

>>>.el-menu-demo .el-menu-item.is-active:focus {
  color: #e35885;
  background-color: rgba(0, 0, 0, 0) !important;
}

>>>.el-menu.el-menu--horizontal {
  border-bottom: 0 !important;
}

>>>.el-menu-demo .el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

>>>.el-menu-demo .el-submenu:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

>>>.el-menu-demo .el-submenu__title:hover {
  background-color: rgba(0, 0, 0, 0.1);
}



>>>.el-menu-item {
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

.blogTitle {
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 25px;
  word-wrap: break-word;
  white-space: inherit;
  text-align: left;
  padding: 0px 25px 0px 25px;
}

.row-bg.blog {
  margin:10px;
  color: #555666;
  font-weight: ;
  border-bottom: 1px dashed;
  border-color: #555666;
}

.row-bg.blog p {
  line-height: 25px;
  margin: 0;
}

.border-width {
  font-weight: bold;
}


</style>
