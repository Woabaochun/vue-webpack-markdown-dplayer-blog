<template>
  <div id="home">
    <div class="homeleft">
    </div>
    <div class="homeright">
    </div>
    <div class="homecontent">
      <van-pull-refresh v-model="isDownLoading" :disabled="disabled" @refresh="loadTop" :style="styleMinHeight" v-show="listShow">
        <van-list v-model="loading" :finished="finished" :finished-text="blogdata.length > 0 ? '沒有更多了' : ''" @load="onLoad">
          <div class="grid-content bg-purple-light" style="color:#B1B1B3" v-show="vanemptyCont == false">
            <el-row type="flex" :key="blog.id" class="row-bg blog" justify="center" v-for="blog in blogdata">
              <van-skeleton title avatar :row="3" :loading="blog.useravatarimgUrl == ''" animate :avatar-shape="square" avatar-size="40px">
                <div class="demo-type" @click="seeArticle(blog.id)">
                  <i class="iconfont icon-recommend istuijian" v-if="blog.set_recommend"></i>
                  <div style="width: 100%;height: 50px;">
                    <!-- <div class="usernickname">
                      <el-avatar :size="40" :shape="square" :src="blog.useravatarimgUrl" @error="errorHandler">
                        <img src="@/assets/userimg.png" />
                      </el-avatar>
                      <span class="namespan">{{blog.usernickname}}</span>
                    </div> -->
                    <div class="title">
                      <i class="iconfont icon-top01" v-if="blog.set_top"></i>
                      <span class="titlespan">{{blog.article_title}}</span>
                    </div>
                  </div>
                  <div class="contentblogimg">
                    <!-- <div class="demo-image__lazy" v-if="blog.article_url">
                      <el-image :key="blog.article_url" :src="blog.article_url" lazy></el-image>
                    </div> -->
                    <p>
                      {{blog.article_tabloid}}
                    </p>
                  </div>
                  <!-- <div class="contentblog">

                  </div> -->
                  <!-- <div class="buttonblog">
                    <div class="blogdate">
                      <span>{{blog.update_date}}</span>
                    </div>
                    <div class="blogzan">
                      <span style="display: block;">
                        {{numericalzan(blog.fabulous)}}
                        <i class="iconfont icon-dianzan"></i>
                      </span>
                    </div>
                  </div> -->
                </div>
              </van-skeleton>
            </el-row>
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
  computed: {

    ...mapState([
      'empty',
      'listShow'
    ]),
  },
  data() {
    return {
      thisVideoId: null,
      disabled: false,
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
      blogdata: [],
      loading: false,
      finished: false,
      isLoading: false,
      loadingerr: false,
      isDownLoading: false, // 下拉刷新
      upFinished: false, // 上拉加载完毕
      vanemptyCont: false, //空数据显示
      styleMinHeight: { 'min-height': `${document.documentElement.clientHeight-42}` + 'px' },
    }

  },
  created() {
    document.documentElement.scrollTop = 0;
    this.$store.state.selectChange = this;
    this.$store.commit('setActiveOptions', 'seed');
    this.$store.commit('setListShow', true);
    if (!this.$store.state.articleTitle) {
      if (this.$route.matched.length > 1) {
        if (this.$route.matched[0].path) {
          this.$router.push(this.$route.matched[0].path);
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.data) {
      var query = this.crypto.jsonDecrypt(this.$route.query.data);
      this.thisVideoId = query.id;
    }
  },
  components: {

  },
  methods: {
    blogLabel(json) {
      // var list = ;
      // if(list.length > 2){
      //   list.splice(2,list.length - 2);
      // }
      return JSON.parse(json);
      // return null;
    },
    errorHandler() {
      return true;
    },
    loadTop() {
      this.pageNumber = 1;
      this.loading = true; // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.finished = true;
      // 加载数据
      var params = {
        pageNumber: this.pageNumber,
        pageSize: this.pagesize,
        realName: this.$store.state.SELECTACTIVENAME,
      }
      this.$store.commit('showLoading');
      this.disabled = true;
      this.ios.selectSeedPageNumber(params).then(res => {
        if (res.data.ret == 0) {
          var arr = res.data.data;
          this.vanemptyCont = false;
          //处理返回值都为空时，records会有一个对象
          if (arr.list.length > 0) {
            // arr.list.forEach(e => {
            //   e = this.crypto.jsonDecrypt(e);
            // });
            this.pageNumber++;
            this.blogdata = arr.list;
            this.totalRow = arr.totalRow;
            if (this.blogdata.length == this.totalRow) {
              this.finished = true;
            } else {
              this.finished = false;
            }
          }
        } else {
          this.vanemptyCont = true;
          this.$message({
            icon: 'fail',
            message: res.msg
          });
        }
        if (this.blogdata.length < 1) {
          this.finished = true;
          this.upFinished = true;
        }
        this.$store.commit('hideLoading');
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
      this.loading = true;
      var params = {
        pageNumber: this.pageNumber,
        pageSize: this.pagesize,
        realName: this.$store.state.SELECTACTIVENAME,
      }
      this.disabled = true;
      this.ios.selectSeedPageNumber(params).then(res => {

        if (res.data.ret == 0) {
          var arr = res.data.data;
          this.vanemptyCont = false;
          //处理返回值都为空时，records会有一个对象
          if (arr.list.length > 0) {
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
            if (this.blogdata.length == this.totalRow) {
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
        type: '1'
      }
      this.ios.blogSeeArticle(params).then(res => {
        if (res.data.ret == 0) {
          var arr = res.data.data;
          var viewData = {
            id: arr.data.id,
            type: '1',
            article_title: arr.data.article_title,
            article_content: arr.data.article_content,
            article_tags: [],
            article_url: '',
            article_tabloid: arr.data.article_tabloid,
            update_date: arr.data.publish_date,
            preview_statistics: false,
            path: this.$route.path
          }
          this.$store.state.scrollTop = document.documentElement.scrollTop;
          this.thisVideoId = null;
          this.$store.commit('setArticleTitle', viewData.article_title);
          this.$store.commit('setViewData', viewData);
          this.$store.commit('setListShow', false);
          this.$router.push('/seed/details');
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
  height: auto;
  min-height: 100%;
  text-align: center;
  padding-top: 42px;
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
  min-height: 100%;
  margin: auto;
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
  margin: 20px 0 20px 0;
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
  width: auto;
  height: max-content;
  max-width: 140px;
  min-width: 20%;
  float: left;
  margin-right: 10px;
}

.contentblogimg .demo-image__lazy .el-image {
  border-radius: 5px;
  border: 1px solid;
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
  max-width: 100%;
  min-width: 50%;
  min-height: 100px;
  width: auto;
  margin-top: 15px;
  padding: 10px;
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
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  width: 100%;
  max-width: calc(100%) !important;
}

>>>.el-main {
  display: contents;
}

.title span {
  font-weight: bold;
  display: inline-block;
  vertical-align: middle;
  max-width: calc(100% - 40px) !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 25px;
}

.title i {
  color: #e35885;
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  line-height: 25px;
}

.istuijian {
  position: relative;
  float: left;
  color: #e35885;
  font-size: 35px;
  z-index: 20;
  margin-left: -0.35em;
  margin-top: -0.32em;
}



.blogzan {
  height: 18px;
  width: auto;
  float: right;
  display: inline-block;
  vertical-align: middle;
}

.blogzan span {
  background-color: #e1e1e1;
  color: #000;
  padding: 0 2px 0 2px;
  margin-top: 0.5px;
  height: 1.2 em;
  border-radius: 2px;
  line-height: 1.2em;
  font-size: 15px;
}

.blogdate {
  width: 50%;
  float: left;
  text-align: left;
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

>>>.van-pull-refresh__track {
  min-height: calc(100vh - 57px);
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

  .homecontent {
    width: 550px;
    min-height: 100%;
    margin: auto;
  }
}

@media (max-width: 1023px) {
  .homeleft {
    height: auto;
    min-height: 20px;
    width: calc(50% - 335px);
    float: left;
    display: none;
  }

  .namespan {
    display: none;
  }

  .title {
    color: #666666;
    float: right;
    text-align: left;
    padding-top: 8px;
    font-size: 15px;
    min-width: calc(100% - 60px) !important;
    max-width: calc(100% - 60px) !important;
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
}

</style>
