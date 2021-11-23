<template id="tmp1">
  <div class="top">
    <el-row class="console_home_data">
      <el-col :span="24">
        <el-menu :default-active="type" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">
            <span slot="title">全部<i class="el-menu-item-buttom" /></span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">回收站<i class="el-menu-item-buttom" /></span>
          </el-menu-item>
        </el-menu>
        <div class="fiadSelect">
          <el-row>
            <el-col :span="8">
              <el-date-picker v-model="findData" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" @clear="deleteDate()">
              </el-date-picker>
              <!-- <el-date-picker v-model="findData" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" @clear="deleteDate()">
                </el-date-picker> -->
            </el-col>
            <el-col :span="14">
              <el-input placeholder="請輸入內容" v-model="realName" class="input-with-select" style="padding: 0 0 0 15px;" @change="loadTop">
                <el-button slot="append" type="primary" icon="el-icon-search select" @click="loadTop"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 40px;">
      <el-col :span="24">
        <div class="grid-content bg-content">
          <div class="grid-content bg-purple-light" style="color:#B1B1B3" v-show="vanemptyCont == false">
            <el-row class="row-bg blog" :key="blog.id" v-for="blog in blogdata">
              <el-col :span="18" class="blogTitle">
                <p class="border-width">{{dateFormat(blog.update_date)}}</p>
                <p class="border-width">{{blog.article_title}}</p>
              </el-col>
              <el-col :span="6" class="blogEdit">
                <p class="border-width" style="text-align: right;">{{blog.update_date}}</p>
                <p style="font-size: smaller;text-align: right;" v-if="type != '2'">
                  <el-button type="text" @click="editRow(blog.id)">編輯</el-button>
                  <!-- <el-button type="text">預覽</el-button> -->
                  <el-button type="text" @click="delRow(blog.id,blog.article_title)">删除</el-button>
                </p>
              </el-col>
              <!-- <el-col :span="5" class="blogFabulous">
                <p class="border-width">{{blog.fabulous}}</p>
                <p>点赞数</p>
              </el-col>
              <el-col :span="5" class="blogFabulous">
                <p class="border-width">{{blog.preview_statistics}}</p>
                <p>预览数</p>
              </el-col>
              <el-col :span="5" class="blogFabulous">
                <p class="border-width">{{blog.focus_statistics}}</p>
                <p>评论数</p>
              </el-col> -->
            </el-row>
            <div class="block" v-show="blogdata != [] && pageTotal > 10">
              <el-pagination @size-change="pageChange" @current-change="pageChange" :current-page="pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
              </el-pagination>
            </div>
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      blogdata: [],
      realName: '',
      findData: '',
      type: '1',
      pageTotal: 0,
      pageNumber: 1,
      pageSize: 10,
      vanemptyCont: false,
    };
  },

  created() {
    this.$store.commit('setActive', '3-1');
    this.loadTop();
  },
  components: {

  },
  methods: {
    deleteDate() {
      this.findData = ''
    },
    dateFormat(date) {
      var time = new Date(date);
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    },
    postFormat(date) {
      var time = new Date(date);
      var d = (time.getMonth() + 1).toString().padStart(2, '0');
      return time.getFullYear() + '-' + d + '-' + time.getDate().toString().padStart(2, '0');
    },
    loadTop() {
      // 加载数据
      this.pageNumber = 1;

      var date = this.postFormat(this.findData);

      if (this.findData == '' || this.findData == null) {
        date = '';
      }
      var params = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        realName: this.realName,
        type: this.type,
        findData: date
      }
      this.ios.selectUserSeedPageNumber(params).then(res => {
        if (res.data.ret == 0) {
          var arr = res.data.data;
          this.vanemptyCont = false;
          this.pageTotal = arr.totalRow;
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
    pageChange(event) {
      // 加载数据
      var date = this.postFormat(this.findData);

      if (this.findData == '' || this.findData == null) {
        date = '';
      }
      this.pageNumber = event;
      var params = {
        pageNumber: event,
        pageSize: this.pageSize,
        realName: this.realName,
        type: this.type,
        findData: date
      }
      this.ios.selectUserSeedPageNumber(params).then(res => {
        if (res.data.ret == 0) {
          var arr = res.data.data;
          this.vanemptyCont = false;
          this.pageTotal = arr.totalRow;
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
    delRow(i, t) {
      this.$Dialog.confirm({
          message: '文章\n[' + t + ']\n您确定删除吗?',
          confirmButtonColor: "#e35885"
        })
        .then(() => {
          var params = {
            id: i,
            type: '1'
          }
          this.ios.dropArticle(params).then(res => {
            if (res.data.ret == 0) {
              var arr = res.data.data;
              this.loadTop();
              this.$message({
                icon: 'fail',
                message: arr.msg
              });
            } else {
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
          });
        })
        .catch(() => {
          return;
        });
    },
    editRow(e) {
      var level = this.$store.state.TOKEN.level;
      if (level < 2) {
        this.$message({
          icon: 'fail',
          message: '您未獲得權限，此功能暫未開放！'
        });
        return;
      }
      var row = { id: e, type: '1' };
      var date = this.crypto.encryption(row);
      this.$store.commit('setArticleTitle', '更新文章');
      this.$router.push({ path: '/Editinit', query: { data: date } });
    },
    handleSelect(e, r) {
      this.findData = '';
      this.realName = '';
      this.type = e;
      this.loadTop();
    }
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
  border-radius: 2px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

>>>.bg-content {
  min-height: 274px;
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

.row-bg.blog {
  margin: 10px;
  color: #555666;
  font-weight: ;
  border-bottom: 1px dotted #ddd;
}

.row-bg.blog p {
  text-align: left;
  line-height: 25px;
  margin: 0;
}

.fiadSelect {
  text-align: left;
  margin: 10px 10px 5px 10px;
}

.fiadSelect>>>.el-input-group__append {
  background: #e35885;
  border-color: #e35885;
}

.fiadSelect>>>.el-button {
  background: #e35885;
}

.fiadSelect>>>.el-input__inner {
  border: 1px solid hsla(0,0%,100%,.4) !important;
  /*background-color: rgba(999, 999, 999, 0.4);*/
}

.fiadSelect>>>.el-input__inner:hover {
  border-color: #000 !important;
}

.fiadSelect>>>.el-input__inner:focus {
  border-color: #000 !important;
}

.border-width {
  font-weight: bold;
}

.blogFabulous {
  border-left: 1px dashed;
  border-color: #555666;
}

.circle-step {
  display: inline-block;
  width: 3px;
  height: 3px;
  margin: 0 5px 0 5px;
  background: #555666;
  vertical-align: middle;
  border-radius: 50%;
}

.blogEdit {
  height: 100%;
  position: absolute;
  right: 0;
}

.blogEdit>>>.el-button {
  padding: 0;
}

.block {
  margin-bottom: 10px;
}

.block>>>.el-input__inner {
  background-color: rgba(0, 0, 0, 0);
  border: 0;
}

.block>>>.el-input__inner:hover {
  background-color: rgba(0, 0, 0, 0);
  border: 0 !important;
}

.block>>>button {
  background-color: rgba(0, 0, 0, 0) !important;
}

>>>.el-pager li {
  background-color: rgba(0, 0, 0, 0) !important;
}

>>>.el-pager li.active{
  color: #e35885;
}

>>>.el-pager li:hover{
  color: #e35885;
}

>>>.el-select-dropdown__item.selected {
  color: #e35885 !important;
}

>>>.el-menu-item.is-active {
  color: #e35885;
  border-bottom: 0 !important;
  text-align: center;
  background-color: rgba(0, 0, 0, 0) !important;
}

>>>.el-select .el-input .el-select__caret {
  color: #606266 !important;
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
  width: 80px;
  height: 40px !important;
  line-height: 40px !important;
  border-bottom: 0 !important;
}

</style>
