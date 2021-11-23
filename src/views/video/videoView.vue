<template>
  <div id="videohome">
    <div class="homeleft">
    </div>
    <div class="homeright">
    </div>
    <div class="homecontent">
      <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-show="listShow">
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
      <van-pull-refresh v-model="isDownLoading" :disabled="disabled" @refresh="loadTop" :style="styleMinHeight" v-show="listShow">
        <van-list v-model="loading" :finished="finished" :finished-text="blogdata.length > 0 ? '沒有更多了' : ''" @load="onLoad">
          <div class="grid-content bg-purple-light" style="color:#B1B1B3;display: inline-block;width: 100%;" v-show="vanemptyCont == false">
            <div id="myblog0" ref="myblog0" data-height="0" class="myblog" :style="IS_PC ? 'width: 25%;' : 'width: 50%;'">
              <div type="flex" :key="blog.id" class="row-bg blog" v-for="blog in blogdata0" @click="seeArticle(blog.id)">
                <van-skeleton title avatar :row="3" :loading="blog.useravatarimgUrl == ''" animate :avatar-shape="square" avatar-size="40px">
                  <div class="demo-type">
                    <div style="width: 100%;">
                      <div class="title">
                        <i class="iconfont icon-top01" v-if="blog.set_top"></i>
                        <span class="titlespan">{{blog.article_title}}</span>
                      </div>
                    </div>
                    <div class="contentblogimg">
                      <div class="demo-image__lazy" v-proportion="blog.article_type" v-if="blog.article_url">
                        <span class="iconfont icon-recommend1 istuijian" v-if="isHdShow(blog.article_tags)"></span>
                        <el-image :key="blog.article_url" :src="blog.article_url" @error="errorHandler" lazy>
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="el-icon-loading"></span>
                          </div>
                        </el-image>
                      </div>
                      <p v-if="blog.article_tabloid">
                        {{blog.article_tabloid}}
                      </p>
                    </div>
                    <div class="buttonblog">
                      <div class="blogdate">
                        <span>{{dateFormat(blog.update_date)}}</span>
                      </div>
                      <div class="blogzan">
                        <span style="display: block;">
                          {{numericalzan(blog.preview_statistics)}}
                          <i class="iconfont icon-chakanyanjingshishifenxi"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </van-skeleton>
              </div>
            </div>
            <div id="myblog1" ref="myblog1" data-height="0" class="myblog" :style="IS_PC ? 'width: 25%;' : 'width: 50%;'">
              <div type="flex" :key="blog.id" class="row-bg blog" v-for="blog in blogdata1" @click="seeArticle(blog.id)">
                <van-skeleton title avatar :row="3" :loading="blog.useravatarimgUrl == ''" animate :avatar-shape="square" avatar-size="40px">
                  <div class="demo-type">
                    <div style="width: 100%;">
                      <div class="title">
                        <i class="iconfont icon-top01" v-if="blog.set_top"></i>
                        <span class="titlespan">{{blog.article_title}}</span>
                      </div>
                    </div>
                    <div class="contentblogimg">
                      <div class="demo-image__lazy" v-proportion="blog.article_type" v-if="blog.article_url">
                        <span class="iconfont icon-recommend1 istuijian" v-if="isHdShow(blog.article_tags)"></span>
                        <el-image :key="blog.article_url" :src="blog.article_url" @error="errorHandler" lazy>
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="el-icon-loading"></span>
                          </div>
                        </el-image>
                      </div>
                      <p v-if="blog.article_tabloid">
                        {{blog.article_tabloid}}
                      </p>
                    </div>
                    <div class="buttonblog">
                      <div class="blogdate">
                        <span>{{dateFormat(blog.update_date)}}</span>
                      </div>
                      <div class="blogzan">
                        <span style="display: block;">
                          {{numericalzan(blog.preview_statistics)}}
                          <i class="iconfont icon-chakanyanjingshishifenxi"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </van-skeleton>
              </div>
            </div>
            <div id="myblog2" ref="myblog2" data-height="0" class="myblog" :style="IS_PC ? 'width: 25%;' : 'width: 50%;'">
              <div type="flex" :key="blog.id" class="row-bg blog" v-for="blog in blogdata2" @click="seeArticle(blog.id)">
                <van-skeleton title avatar :row="3" :loading="blog.useravatarimgUrl == ''" animate :avatar-shape="square" avatar-size="40px">
                  <div class="demo-type">
                    <div style="width: 100%;">
                      <div class="title">
                        <i class="iconfont icon-top01" v-if="blog.set_top"></i>
                        <span class="titlespan">{{blog.article_title}}</span>
                      </div>
                    </div>
                    <div class="contentblogimg">
                      <div class="demo-image__lazy" v-proportion="blog.article_type" v-if="blog.article_url">
                        <span class="iconfont icon-recommend1 istuijian" v-if="isHdShow(blog.article_tags)"></span>
                        <el-image :key="blog.article_url" :src="blog.article_url" @error="errorHandler" lazy>
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="el-icon-loading"></span>
                          </div>
                        </el-image>
                      </div>
                      <p v-if="blog.article_tabloid">
                        {{blog.article_tabloid}}
                      </p>
                    </div>
                    <div class="buttonblog">
                      <div class="blogdate">
                        <span>{{dateFormat(blog.update_date)}}</span>
                      </div>
                      <div class="blogzan">
                        <span style="display: block;">
                          {{numericalzan(blog.preview_statistics)}}
                          <i class="iconfont icon-chakanyanjingshishifenxi"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </van-skeleton>
              </div>
            </div>
            <div id="myblog3" ref="myblog3" data-height="0" class="myblog" :style="IS_PC ? 'width: 25%;' : 'width: 50%;'">
              <div type="flex" :key="blog.id" class="row-bg blog" v-for="blog in blogdata3" @click="seeArticle(blog.id)">
                <van-skeleton title avatar :row="3" :loading="blog.useravatarimgUrl == ''" animate :avatar-shape="square" avatar-size="40px">
                  <div class="demo-type">
                    <div style="width: 100%;">
                      <div class="title">
                        <i class="iconfont icon-top01" v-if="blog.set_top"></i>
                        <span class="titlespan">{{blog.article_title}}</span>
                      </div>
                    </div>
                    <div class="contentblogimg">
                      <div class="demo-image__lazy" v-proportion="blog.article_type" v-if="blog.article_url">
                        <span class="iconfont icon-recommend1 istuijian" v-if="isHdShow(blog.article_tags)"></span>
                        <el-image :key="blog.article_url" :src="blog.article_url" @error="errorHandler" lazy>
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="el-icon-loading"></span>
                          </div>
                        </el-image>
                      </div>
                      <p v-if="blog.article_tabloid">
                        {{blog.article_tabloid}}
                      </p>
                    </div>
                    <div class="buttonblog">
                      <div class="blogdate">
                        <span>{{dateFormat(blog.update_date)}}</span>
                      </div>
                      <div class="blogzan">
                        <span style="display: block;">
                          {{numericalzan(blog.preview_statistics)}}
                          <i class="iconfont icon-chakanyanjingshishifenxi"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </van-skeleton>
              </div>
            </div>
          </div>
          <div class="grid-content bg-purple-light1" style="color:#B1B1B3" v-show="vanemptyCont">
            <van-empty :image="empty" :description="empty == 'search' ? '空空如也,刷新試試' : '網絡鏈接異常'" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <el-main>
      <router-view></router-view>
    </el-main>
    <!-- <not-data v-if="blogdata.length == 0" :tip="nullTip"></not-data> -->
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {

  name: 'home',
  components: {},
  computed: {

    ...mapState([
      'empty',
      'IS_PC',
      'listShow',
      'topbor'
    ]),
  },
  data() {
    return {
      thisVideoId: null,
      defaultActive: '全部',
      disabled: false, //下啦刷新是否禁用
      nullTip: '空空如也~',
      square: 'square',
      uplodUrl: '',
      pageNumber: 1,
      pagesize: 10,
      selectParam: this.$store.state.SELECTACTIVENAME,
      totalRow: 0,
      totalPage: 1,
      firstPage: true,
      lastPage: true,
      removeRowoffsetTop: 220,
      valuedata: new Date(),
      blogBody: {
        blogHeight0: 0,
        blogHeight1: 0,
        blogHeight2: 0,
        blogHeight3: 0,
      },
      blogdata: [],
      blogdata0: [],
      blogdata1: [],
      blogdata2: [],
      blogdata3: [],
      loading: false,
      finished: false,
      isLoading: false,
      loadingerr: false,
      isDownLoading: false, // 下拉刷新
      upFinished: false, // 上拉加载完毕
      vanemptyCont: false, //空数据显示
      styleMinHeight: { 'min-height': `${document.documentElement.clientHeight-300}` + 'px', width: '100%' },
    }

  },
  created() {
    document.documentElement.scrollTop = 0;
    this.$store.state.selectChange = this;
    this.$store.commit('setActiveOptions', 'video');
    this.$store.commit('setListShow', true);
    if (!this.$store.state.articleTitle) {
      if (this.$route.matched.length > 1) {
        if (this.$route.matched[0].path) {
          this.$router.push(this.$route.matched[0].path);
        }
      }
    }
  },
  activated() {
    this.$store.commit('setListShow', true);
  },
  mounted() {
    document.getElementById('myblog0').dataHeight = 0;
    document.getElementById('myblog1').dataHeight = 0;
    document.getElementById('myblog2').dataHeight = 0;
    document.getElementById('myblog3').dataHeight = 0;
    if (this.$route.query.data) {
      var query = this.crypto.jsonDecrypt(this.$route.query.data);
      this.thisVideoId = query.id;
    }
  },
  methods: {
    isHdShow(event) {
      var reg = RegExp(/無碼/);
      var reg2 = RegExp(/无码/);
      if (event.match(reg) || event.match(reg2)) {
        return true;
      }
      return false;
    },
    errorHandler() {
      return true;
    },
    blogLabel(json) {
      // var list = ;
      // if(list.length > 2){
      //   list.splice(2,list.length - 2);
      // }
      return JSON.parse(json);
      // return null;
    },
    loadTop() {

      var $this = this;
      document.getElementById('myblog0').dataHeight = 0;
      document.getElementById('myblog1').dataHeight = 0;
      document.getElementById('myblog2').dataHeight = 0;
      document.getElementById('myblog3').dataHeight = 0;
      this.pageNumber = 1;
      this.loading = true; // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.finished = true;
      // 加载数据
      this.$store.commit('showLoading');
      var params = {
        pageNumber: this.pageNumber,
        pageSize: this.pagesize,
        realName: this.$store.state.SELECTACTIVENAME,
        type: $this.defaultActive
      }
      // this.disabled = true;
      this.ios.selectVideoPageNumber(params).then(res => {
        this.$store.commit('hideLoading');
        if (res.data.ret == 0) {
          var arr = res.data.data;
          this.vanemptyCont = false;

          //处理返回值都为空时，records会有一个对象
          if (arr.list.length > 0) {
            // debugger
            this.blogdata = arr.list;
            this.blogdata0 = [];
            this.blogdata1 = [];
            this.blogdata2 = [];
            this.blogdata3 = [];
            var mindom = null;
            var ispc = this.$store.state.IS_PC;
            var dataLength = 0;
            if (ispc) {
              for (var i = 0; i < arr.list.length; i++) {
                mindom = this.$refs['myblog0'];
                for (var s = 0; s < 3; s++) {
                  var iddom = this.$refs['myblog' + (s + 1)];
                  // debugger
                  if (iddom.dataHeight < mindom.dataHeight) {
                    mindom = iddom;
                  }
                }
                switch (mindom.id) {
                  case 'myblog0':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata0.push(arr.list[i]);
                    break;
                  case 'myblog1':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata1.push(arr.list[i]);
                    break;
                  case 'myblog2':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata2.push(arr.list[i]);
                    break;
                  case 'myblog3':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata3.push(arr.list[i]);
                    break;
                }
              }
            } else {
              for (var i = 0; i < arr.list.length; i++) {
                mindom = this.$refs['myblog0'];
                // debugger
                for (var s = 0; s < 1; s++) {
                  var iddom = this.$refs['myblog' + (s + 1)];
                  if (iddom.dataHeight < mindom.dataHeight) {
                    mindom = iddom;
                  }
                }
                switch (mindom.id) {
                  case 'myblog0':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata0.push(arr.list[i]);
                    break;
                  case 'myblog1':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata1.push(arr.list[i]);
                    break;
                }
              }
            }
            this.pageNumber++;
            this.totalRow = arr.totalRow;
            if (this.blogdata.length == this.totalRow) {
              this.finished = true;
            } else {
              this.finished = false;
            }

          } else {
            this.vanemptyCont = true;
            this.finished = true;
            this.upFinished = true;
          }

        } else {
          this.vanemptyCont = true;
          this.$message({
            icon: 'fail',
            message: res.msg
          });
        }

        this.disabled = false;
        this.isDownLoading = false;
        this.loading = false;
      }).catch(e => {
        this.$store.commit('hideLoading');
        this.disabled = false;
        this.vanemptyCont = true;
        this.finished = true;
        this.isDownLoading = false;
        if (e.data) {
          this.$message({
            icon: 'fail',
            message: e.data.msg
          });
        }
      });
    },
    onLoad() {
      var $this = this;
      this.loading = true;
      this.disabled = true;

      var params = {
        pageNumber: this.pageNumber,
        pageSize: this.pagesize,
        realName: this.$store.state.SELECTACTIVENAME,
        type: $this.defaultActive
      }
      this.ios.selectVideoPageNumber(params).then(res => {
        if (res.data.ret == 0) {
          var arr = res.data.data;
          this.vanemptyCont = false;
          //处理返回值都为空时，records会有一个对象
          if (arr.list.length > 0) {

            var mindom = null;


            var ispc = this.$store.state.IS_PC;
            var dataLength = 0;
            if (ispc) {
              for (var i = 0; i < arr.list.length; i++) {
                mindom = this.$refs['myblog0'];
                for (var s = 0; s < 3; s++) {
                  var iddom = this.$refs['myblog' + (s + 1)];
                  // debugger
                  if (iddom.dataHeight < mindom.dataHeight) {
                    mindom = iddom;
                  }
                }
                switch (mindom.id) {
                  case 'myblog0':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata0.push(arr.list[i]);
                    break;
                  case 'myblog1':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata1.push(arr.list[i]);
                    break;
                  case 'myblog2':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata2.push(arr.list[i]);
                    break;
                  case 'myblog3':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata3.push(arr.list[i]);
                    break;
                }
              }
            } else {
              for (var i = 0; i < arr.list.length; i++) {
                mindom = this.$refs['myblog0'];
                // debugger
                for (var s = 0; s < 1; s++) {
                  var iddom = this.$refs['myblog' + (s + 1)];
                  if (iddom.dataHeight < mindom.dataHeight) {
                    mindom = iddom;
                  }
                }
                switch (mindom.id) {
                  case 'myblog0':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata0.push(arr.list[i]);
                    break;
                  case 'myblog1':
                    mindom.dataHeight += parseFloat(arr.list[i].article_type).toFixed(2) * 100;
                    $this.blogdata1.push(arr.list[i]);
                    break;
                }
              }
            }

            if (this.blogdata.length > 0) {
              for (var i = 0; i < arr.list.length; i++) {
                this.blogdata.push(arr.list[i]);
              }
            } else {
              this.blogdata = arr.list;
            }
            if (this.totalRow != arr.totalRow) {
              this.totalRow = arr.totalRow;
            }
            this.pageNumber++;
            if (this.blogdata.length >= this.totalRow) {
              this.finished = true;
            } else {
              this.finished = false;
            }
          } else {
            if (this.pageNumber == 1) {
              this.vanemptyCont = true;
            }
          }
        } else {
          this.$message({
            icon: 'fail',
            message: res.msg
          });
          this.finished = true;
          this.upFinished = true;
        }
        if (this.thisVideoId != null) {
          this.seeArticle(this.thisVideoId);
        }
        this.disabled = false;
        this.isDownLoading = false;
        this.loading = false;
      }).catch(e => {
        if (this.pageNumber == 1) {
          this.vanemptyCont = true;
        }
        this.disabled = false;
        this.isDownLoading = false;
        this.finished = true;
        this.loading = false;
        if (e.data)
          this.$message({
            icon: 'fail',
            message: e.data.msg
          });
      });
    },
    dateFormat(date) {
      var time = new Date(date);
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
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
    seeArticle(id) {
      var params = {
        id: id,
        type: '2'
      }
      this.ios.blogSeeArticle(params).then(res => {
        if (res.data.ret == 0) {
          var arr = res.data.data;
          var viewData = {
            id: arr.data.id,
            type: '2',
            article_title: arr.data.article_title,
            article_content: arr.data.article_content,
            article_tags: [],
            article_url: arr.data.article_url,
            article_tabloid: arr.data.article_tabloid,
            update_date: arr.data.publish_date,
            preview_statistics: arr.data.preview_statistics,
            path: this.$route.path
          }
          if (arr.data.article_tags) {
            viewData.article_tags = JSON.parse(arr.data.article_tags);
          }
          this.$store.state.scrollTop = document.documentElement.scrollTop;
          this.thisVideoId = null;
          this.$store.commit('setArticleTitle', viewData.article_title);
          this.$store.commit('setViewData', viewData);
          this.$store.commit('setListShow', false);
          this.$router.push('/video/details');
        } else {
          this.thisVideoId = null;
          this.$message({
            icon: 'fail',
            message: res.msg
          });
        }

      }).catch(e => {
        this.thisVideoId = null;
        if (e.data) {
          this.$message({
            icon: 'fail',
            message: e.data.msg
          });
        }
      });
    },
    handleSelect(key, keyPath) {
      this.defaultActive = key;
      this.$store.commit('setDefaultActive', key);
      this.loadTop();
    },
  }
}

</script>
<style scoped>
input:focus {
  border: 1px solid #000000 !important;
  border-color: #000000 !important;
}

#videohome {
  width: 100%;
  height: auto;
  min-height: 100%;
  text-align: center;
  margin: 0px;
}

.homeleft {
  height: auto;
  min-height: 20px;
  width: calc(50% - 335px);
  float: left;
}

.homeright {
  height: auto;
  min-height: 20px;
  width: calc(50% - 335px);
  float: right;
}

.homecontent {
  width: 650px;
  /*min-height: calc(100% - 82px);*/

  margin: auto;
  padding-top: 85px;
}

.el-main {
  padding: 0;
}

.demo-type {
  width: 100%;
}

.contentblogimg {
  color: #666666;
  width: 100%;
  height: auto;
  /*min-height: 100px;*/
  display: flow-root;
  text-align: center;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  /*display: -webkit-box;*/
  -webkit-line-clamp: 10;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  white-space: nowrap;
  word-wrap: break-word;
  white-space: inherit;
  text-align: left;
}

.contentblogimg .demo-image__lazy {
  width: 100%;
  height: auto;
}

.contentblogimg .demo-image__lazy .el-image {
  width: 100%;
  height: 100%;
  min-height: 50px;
  border-radius: 5px;

}


>>>.el-image__error,
>>>.el-image__placeholder {
  background-color: rgba(0, 0, 0, 0);
}

.contentblogimg>>>.el-image__error {
  background-color: rgba(0, 0, 0, 0);
}

.contentblog {
  color: #666666;
  width: 100%;
  height: auto;
  display: inline-flex;
  font-size: 15px;
}

.contentblog,
.contentblogimg p {
  margin: 0;
  margin-top: 10px;
  text-indent: 2em;
  /*overflow: hidden;*/
  text-overflow: ellipsis;
  /*display: -webkit-box;*/
  -webkit-line-clamp: 8;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  white-space: nowrap;
  line-height: 21px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: inherit;
  text-align: left;
  font-size: 12px;
}

.buttonblog {
  height: auto;
  min-height: 18px;
  width: 100%;
  float: left;
  margin-top: 10px;
}

.blog {
  background: rgba(251, 251, 251, 0.2);
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  float: left;
  height: auto;
  width: calc(100% - 20px);
  margin-bottom: 15px;
  padding: 0px 5px 0px 5px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}

.usernickname {
  width: auto;
  height: auto;
  position: absolute;
}

.namespan {
  font-size: 13px;
  margin-top: 23px;
  margin-left: 5px;
  float: right;
  max-width: 5.7em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.title {
  color: #666666;
  text-align: left;
  padding-top: 8px;
  /*padding-left: 10px;*/
  /*padding-right: 10px;*/
  padding-bottom: 8px;
  font-size: 15px;
  width: 100%;
  max-width: calc(100%) !important;
}

.title span {
  font-weight: bold;
  vertical-align: middle;
  display: -webkit-box;
  max-width: calc(100%) !important;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  white-space: inherit;
  text-overflow: ellipsis;
  line-height: 17px;

}

>>>.el-main {
  display: contents;
}

.title i {
  color: #e35885;
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  line-height: 25px;
}


.blogLabels {
  width: auto;
  height: 19px;
  max-width: 70%;
  overflow: hidden;
  float: left;
}

.blogLabel {
  height: 19px;
  width: auto;
  float: left;
  margin-right: 10px;
}

.blogLabel a {
  display: flex;
}

.blogLabel span {
  background-color: #e1e1e1;
  color: #000;
  padding: 0 2px 0 2px;
  margin-top: 0.5px;
  height: 1.35em;
  border: 0.1em solid #000;
  z-index: 1;
  border-radius: 2px;
  line-height: 1.4em;
  font-size: 12px;
}

.blogLabel i {
  -o-transform: rotate(180deg);
  /* Opera浏览器 */
  -webkit-transform: rotate(180deg);
  /* Webkit内核浏览器 */
  -moz-transform: rotate(180deg);
  /* Firefox浏览器 */
  color: #000;
  z-index: 0;
  margin-bottom: 0.1em;
  margin-left: -19px;
  line-height: 15px;
  font-size: 2em;
  display: inline-block;
  vertical-align: middle;
}

.blogzan {
  height: 18px;
  width: auto;
  float: right;
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
}

.blogzan i {
  font-size: 12px;
}


.blogzan span {
  background-color: #e1e1e1;
  color: #000;
  padding: 0 2px 0 2px;
  height: 1.2em;
  border-radius: 2px;
  line-height: 1.2em;

}

.blogdate {
  float: left;
  position: absolute;
  text-align: left;
  font-size: 12px;
}



.roadWrapper {
  .road {
    padding: 20px;

    .allcontent {
      padding: 15px 10px;
      border: 1px solid $color-border-2;
      border-radius: 8px;

      .roadContent {
        padding-top: 10px;
        padding-bottom: 25px;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;
        justify-content: space-between;

        .dataText {
          color: $color-text-3;
          font-size: 14px;
        }
      }

      .timeWrapper {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $color-border-1;
        padding: 15px 0;

        .titleText {
          font-weight: bolder;
        }
      }
    }
  }
}

.myblog {
  height: auto;
  float: left;
}

.istuijian {
  position: absolute;
  float: left;
  color: #e35885;
  font-size: 2.5em;
  z-index: 20;
}

>>>.van-pull-refresh__track {
  min-height: calc(100vh - 82px);
}

>>>.grid-content.bg-purple-light1 {
  min-height: calc(100vh - 42px);
  display: flex;
  justfy-content: center;
  align-items: center;
  text-align: center;
}

.van-empty {
  margin: auto;
  top: -60px;
  position: relative;
}

>>>.el-menu-item.is-active {
  color: #e35885 !important;
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
  width: 650px;
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
  width: 25%;
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



@media (max-width: 1201px) {


  .homeleft {
    height: auto;
    min-height: 20px;
    width: calc(50% - 285px);
    float: left;
  }

  .homeright {
    height: auto;
    min-height: 20px;
    width: calc(50% - 285px);
    float: right;
  }

  /*.homecontent {
    width: 550px;
    min-height: 100%;
    margin: auto;
  }*/
}

@media (max-width: 1023px) {
  .homeleft {
    height: auto;
    min-height: 20px;
    width: calc(50% - 335px);
    float: left;
    display: none;
  }

  .blog {
    background: rgba(251, 251, 251, 0.2);
    border-radius: 3px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
    height: auto;
    float: left;
    width: calc(100% - 20px);
    margin-bottom: 15px;
    padding: 0px 5px 0px 5px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .namespan {
    display: none;
  }

  .title {
    color: #666666;
    float: right;
    text-align: left;
    padding-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    width: calc(100% - 20px);
  }

  .homeright {
    height: auto;
    min-height: 20px;
    width: calc(50% - 335px);
    float: right;
    display: none;
  }

  .homecontent {
    width: 95%;
    min-height: 100%;
    margin: auto;
  }

  >>>.el-menu--horizontal.el-menu {
    width: 95% !important;
    text-align: center;
    border-bottom: 0 !important;
    z-index: 999;
    position: fixed;
    top: 42px;
  }
}

</style>
