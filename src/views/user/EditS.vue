<template>
  <div class="bodyWrapper">
    <el-row class="title">
      <el-col class="titlecol" :span="20">
        <el-form ref="formData" :model="formData">
          <el-form-item>
            <el-input class="titleInput" id="titleInput" type="text" placeholder="請輸入標題" v-model="formData.articleTitle" maxlength="100" show-word-limit>
            </el-input>
            <!-- <el-autocomplete popper-class="my-autocomplete" v-model="formData.title" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" maxlength="10"
  show-word-limit>
              <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick">
              </i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.address }}</span>
              </template>
            </el-autocomplete> -->
          </el-form-item>
        </el-form>
        <markdown-edit id="contentInput" style="margin: auto;height: auto;max-width: 100%;" />
      </el-col>
      <van-tabbar z-index="6" active-color="#e35885" inactive-color="#7d7e80" fixed>
        <el-col class="titlecol-button" :span="20">
          <el-button id="install" type="info" icon="el-icon-thumb" @click="postFrom()">{{buttonValue}}</el-button>
        </el-col>
      </van-tabbar>
    </el-row>
    <el-row class="contentblog">
      <el-col class="titlecol" :span="20">
        <el-form ref="formData" :model="formData" :rules="rules" id="formData">
          <el-form-item label="發布板塊" v-if="TOKEN.userPower && !editId && TOKEN.level >= 2">
            <el-radio-group v-model="formData.type" @change="radioType">
              <el-radio :label="'0'">首頁</el-radio>
              <el-radio :label="'1'" v-if="TOKEN.level >= 2">熱門</el-radio>
              <el-radio :label="'2'" v-if="TOKEN.level >= 3">視頻</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="formData.type != '1'" label="封面展示" class="image_url" :prop="propArticleUrl" ref="articleUrl">
            <el-input class="formInput" placeholder="請輸入封面URL" onkeyup="this.value=this.value.replace('\{','').replace('\}','')" v-model="formData.articleUrl">
              <template slot="prepend">URL://</template>
            </el-input>
          </el-form-item>
          <div class="contentblogimg" v-show="formData.articleUrl">
            <div class="demo-image__lazy">
              <el-image id="insImageUrl" :key="formData.articleUrl" :src="formData.articleUrl" @error="imageError" @load="imageLoad" lazy>
                <div slot="placeholder" class="image-slot">
                  加载中<span class="el-icon-loading"></span>
                </div>
              </el-image>
            </div>
          </div>
          <el-form-item label="文章小報" class="image_url" :prop="propArticleTabloid" ref="articleTabloid">
            <el-input type="textarea" :rows="4" maxlength="300" show-word-limit v-model="formData.articleTabloid"></el-input>
          </el-form-item>
          <el-form-item label="文章標簽" v-show="formData.type != '1'" :prop="PropArticleTags" ref="articleTags">
            <el-tag :type="tag.type" :key="tag.text" v-for="tag in formData.articleTags" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag.text}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加標簽</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
const uuid = require('uuid');
export default {
  name: '',
  computed: {
    ...mapState([
      'TOKEN'
    ])
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!this.isUrl && this.formData.articleUrl != '') {
        callback(new Error('URL無效'));
      } else {
        callback();
      }
    };

    return {
      buttonValue: '發布文章',
      editId: '',
      inputVisible: false,
      inputValue: '',
      formData: {
        type: '0',
        articleContent: this.$store.state.articleContent,
        articleUrl: '',
        articleTitle: '',
        articleTabloid: '',
        articleTags: this.$store.state.articleTags,
      },
      rules: {
        articleUrl: [
          { required: false, message: '請輸入封面URL', trigger: ['blur', 'change'] },
          { validator: validatePass, trigger: 'blur' }
        ],
        articleTags: [
          { type: 'array', required: true, message: '請至少添加一個標簽', trigger: 'blur' }
        ],
        articleTabloid: [
          { required: true, message: '文章小報不能為空', trigger: 'blur' },
          { min: 10, max: 300, message: '文本長度在 10 到 300 個字符', trigger: 'blur' }
        ]
      },
      propArticleUrl: 'articleUrl',
      propArticleTabloid: 'articleTabloid',
      PropArticleTags: 'articleTags',
      formRules: {

      },
      restaurants: [],
      isUrl: false,

    }
  },
  created() {
    this.$store.commit('setEditorRou', true);

    this.$store.commit('setArticleContent', '');

    let query = this.$route.query.data;
    if (query) {
      query = this.crypto.jsonDecrypt(query);

      let id = query.id; // 编辑数据id
      let type = query.type;
      if (id) {
        this.$store.commit('setArticleTitle', '更新文章');
        this.buttonValue = '更新文章';
        this.editId = id;
        this.formData.type = type;
        this.loadUpData();
      }
    } else {
      this.$store.commit('setArticleTitle', '寫文章');
    }
  },
  activated() {

  },
  mounted() {
    this.radioType(this.formData.type);
    this.$store.state.editor.setOption('value', '');

  },
  methods: {
    loadUpData() {
      var params = {
        id: this.editId,
        type: this.formData.type
      }
      this.ios.seeArticle(params).then(res => {
        if (res.data.ret == 0) {
          var arr = res.data.data;
          this.$store.state.editor.setOption('value', arr.data.article_content);
          // this.$store.state.articleContent = ;
          this.formData.articleContent = arr.data.article_content;
          this.formData.articleUrl = arr.data.article_url;
          this.formData.articleTitle = arr.data.article_title;
          this.formData.articleTabloid = arr.data.article_tabloid;
          if (arr.data.article_tags) {
            this.formData.articleTags = JSON.parse(arr.data.article_tags);
          }
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
    },
    postFrom() {
      var $this = this;
      if (this.formData.articleTitle == '') {
        this.$message({
          message: '文章標題不能為空！',
          type: 'warning'
        });
        document.querySelector('#titleInput').scrollIntoView({
          behavior: "smooth", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
          block: "center", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
          inline: "nearest" // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
        })
        return;
      }
      if (this.formData.articleTitle.length < 10 || this.formData.articleTitle.length > 100) {
        this.$message({
          message: '標題長度在 10 到 100 個字符！',
          type: 'warning'
        });
        document.querySelector('#titleInput').scrollIntoView({
          behavior: "smooth", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
          block: "center", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
          inline: "nearest" // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
        })
        return;
      }
      this.formData.articleContent = this.$store.state.articleContent;
      if (this.formData.articleContent == '') {
        this.$message({
          message: '文章內容不能為空!',
          type: 'warning'
        });
        document.querySelector('#contentInput').scrollIntoView({
          behavior: "smooth", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
          block: "center", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
          inline: "nearest" // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
        })
        return;
      }
      if (this.formData.articleContent.length > 5000) {
        this.$message({
          message: '文章內容不能超過5000！',
          type: 'warning'
        });
        document.querySelector('#contentInput').scrollIntoView({
          behavior: "smooth", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
          block: "center", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
          inline: "nearest" // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
        })
        return;
      }
      this.$refs['formData'].validate((valid) => {
        if (valid) {

          var img = document.getElementById("insImageUrl");
          var realVal = 0;
          if (img) {
            realVal = parseFloat(img.clientHeight / img.clientWidth).toFixed(2);
            this.formData.articleType = realVal.toString();
          }
          if (this.editId != '') {
            this.formData.id = this.editId;
            this.ios.updataArticle(this.formData).then(res => {

              $this.$store.state.selectChange.dropCont();
              $this.formData = {
                type: '0',
                articleContent: '',
                articleUrl: '',
                articleTitle: '',
                articleTabloid: '',
                articleTags: [],
              }
              $this.$message({
                icon: 'fail',
                message: res.data.data.msg
              });
              $this.$router.go(-1);
            }).catch(e => {

              if (e.data) {
                $this.$message({
                  icon: 'fail',
                  message: e.data.msg
                });
                if (e.data.msg == '文章標題已被使用！') {
                  document.querySelector('#titleInput').scrollIntoView({
                    behavior: "smooth", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
                    block: "center", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
                    inline: "nearest" // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
                  })
                }
              }
            });
          } else {
            this.formData.articleType = realVal;

            this.ios.addArticle(this.formData).then(res => {
              $this.$store.state.selectChange.dropCont();
              $this.$store.commit('setArticleTags',$this.formData.articleTags);
              $this.formData = {
                type: '0',
                articleContent: '',
                articleUrl: '',
                articleTitle: '',
                articleTabloid: '',
                articleTags: [],
              }
              $this.$message({
                icon: 'fail',
                message: res.data.data.msg
              });
              $this.$router.go(-1);
            }).catch(e => {
              if (e.data) {
                this.$message({
                  icon: 'fail',
                  message: e.data.msg
                });
                if (e.data.msg == '文章標題已被使用！') {
                  document.querySelector('#titleInput').scrollIntoView({
                    behavior: "smooth", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
                    block: "center", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
                    inline: "nearest" // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
                  })
                }
              }
            });
          }

        } else {
          document.querySelector('#formData').scrollIntoView({
            behavior: "smooth", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
            block: "center", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
            inline: "nearest" // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
          })
        }
      });
    },
    radioType(e) {
      if (e === '2') {
        this.rules.articleTabloid[0].required = false;
        this.rules.articleUrl[0].required = true;
        this.$refs['articleUrl'].clearValidate();
        this.$refs['articleTags'].clearValidate();
        this.$refs['articleTabloid'].clearValidate();
        this.propArticleUrl = 'articleUrl';
        this.PropArticleTags = 'articleTags';
      } else if (e === '1') {
        this.rules.articleTabloid[0].required = true;
        this.$refs['articleTabloid'].clearValidate();
        this.formData.articleUrl = '';
        this.PropArticleTags = '';
        this.propArticleUrl = null;
        this.formData.articleTags = [];
      } else {
        this.rules.articleTabloid[0].required = true;
        this.$refs['articleUrl'].clearValidate();
        this.$refs['articleTags'].clearValidate();
        this.$refs['articleTabloid'].clearValidate();
        this.rules.articleUrl[0].required = false;
        this.propArticleUrl = 'articleUrl';
        this.PropArticleTags = 'articleTags';
      }
    },
    imageLoad(e) {
      this.isUrl = true;
    },
    imageError(e) {
      if (this.formData.articleUrl != '') {
        this.isUrl = false;
      }
    },
    handleClose(tag) {
      this.formData.articleTags.splice(this.formData.articleTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let $this = this;
      let inputValue = this.inputValue;
      if (inputValue) {
        var modes = {
          text: inputValue,
          type: 'info'
        }
        var isInitTag = true;
        for (var i = 0; i < this.formData.articleTags.length; i++) {
          if (this.formData.articleTags[i].text == inputValue) {
            this.formData.articleTags[i].type = 'warning';
            setTimeout(function() {
              $this.formData.articleTags[i].type = 'info';
            }, 500);
            return;
          }
        }
        if (isInitTag) {
          this.formData.articleTags.push(modes);
          this.inputVisible = false;
          this.inputValue = '';
        }
      } else {
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    }
  }
}

</script>
<style scoped>
.bodyWrapper {
  width: 100%;
  padding-bottom: 200px;
}

#install {
  width: 130px;
  margin: auto;
  float: right;
  color: #FFF !important;
  background-color: #e35885;
  border: 0;
}

.title {
  margin-top: 42px;
  padding-top: 120px;
  width: 100%;
  min-width: 1200px;
  text-align: center;
  display: flex;
}

.titlecol {
  margin: auto;
  max-width: 1200px;
}

.contentblog {
  width: 100%;
  min-width: 1200px;
  text-align: center;
  display: flex;
}

.titlecol-button {
  margin: auto;
  max-width: 1100px;
}

.el-form-item {
  width: 100%;
}

.contentblogimg {
  color: #666666;
  width: 100%;
  text-align: left;
  min-height: 100px;
  max-height: 100px;
  height: auto;
  display: inline-flex;
  margin-bottom: 20px;
}

.contentblogimg .demo-image__lazy {
  margin: auto;
  margin-left: 80px;
  height: 100px;
}

.contentblogimg .el-image {
  height: 100px;
  width: auto;
}

>>>.contentblogimg .el-image .el-image__inner {
  width: auto !important;
}

.contentblogimg>>>.el-image__error {
  background-color: rgba(0, 0, 0, 0);
}

.titleInput>>>.el-input__inner {
  padding-right: 130px;
  border: 0;
  border-radius: 0;
  background: rgba(0, 0, 0, 0);
  border-bottom: 2px dashed !important;
  border-color: #000 !important;
  font-size: 30px;
  height: 70px;
}

.titleInput>>>.el-input__count-inner {
  background: rgba(0, 0, 0, 0);
  font-size: 30px;
}

.titleInput>>>.el-input__inner:focus {
  border-bottom: 2px dashed !important;
  border-color: #e35885 !important;
  outline: 0;
}

.titleInput>>>.el-input__inner:hover {
  border: 0 !important;
  border-bottom: 2px dashed !important;
  border-color: #e35885 !important;
}

.formInput>>>.el-input__inner:focus {
  border-color: #000 !important;
  outline: 0;
}

.formInput>>>.el-input__inner:hover {
  border-color: #000 !important;
}

.contentblog>>>.el-textarea__inner:focus {
  border-color: #000 !important;
  outline: 0;
}

.contentblog>>>.el-textarea__inner:hover {
  border-color: #000 !important;
}

>>>.el-form-item__content {
  text-align: left;
}

.el-textarea>>>span {
  line-height: 16px;
  border-radius: 4px;
}

.el-textarea>>>.el-textarea__inner {
  padding: 5px;
}

.contentblog>>>.el-form {

  padding: 20px;
  background-color: rgba(999, 999, 999, 0.3);
  border-radius: 4px;
  margin: auto;
  margin-top: 50px;
}

/*.image_url>>>.el-input {
  width: calc(100% - 80px);
}*/

.image_url>>>.el-form-item__content {
  width: calc(100% - 80px);
  display: flex;
}


.contentblog>>>.el-radio__input.is-checked+.el-radio__label {
  color: #e35885;
}

.contentblog>>>.el-radio__input.is-checked .el-radio__inner {
  border-color: #e35885;
  background: #e35885;
}

.contentblog>>>.el-radio__inner:hover {
  border-color: #e35885;
}

.contentblog>>>.el-form-item__label {
  width: 77px;
}

.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

</style>
