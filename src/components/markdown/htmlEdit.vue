<template>
  <div id="editormd">
    <el-row>
      <el-col :span="24">
        <markdown-pro ref="editor" :toolBars="toolBars" v-model="content" :config="config">
        </markdown-pro>
        <div class="foot">
          <span>字数：{{content.length}}/5000&nbsp;&nbsp;&nbsp;&nbsp;行数：{{content.split("\n").length}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Vue from 'vue'
import MarkdownPro from '@/components/markdown/pro'
import { mapState } from 'vuex';

var md = require('markdown-it')();
var result = md.render('# markdown-it rulezz!');

export default {
  name: "Editor",
  computed: {

  },
  components: {
    MarkdownPro
  },
  watch: {
    content: function(val, oldVal) {
      this.$store.commit('setArticleContent', val);
    },
  },
  data() {
    return {
      content: this.$store.state.articleContent,
      config: {
        // 配置多个表情
        emojis: {
          more: [{ name: '表情', datas: ['表情1', '表情2'] }],
          //是否覆盖默认的
          isCover: true
        },
        // 配置图片上传
        picture: {
          // 需要传回去上传后的路径
          uploadCallback: this.upload,
          resolving: true
        },
        audio: {
          // 需要传回去上传后的路径
          uploadCallback: this.upload
        }
      },
      toolBars: [
        'undo',
        'repeat',
        'separator',
        'trash',
        'separator',
        'bold',
        'italic',
        'header',
        'underline',
        'separator',
        'strikethrough',
        'thumb-tack',
        'superscript',
        'subscript',
        'separator',
        'align-left',
        'align-center',
        'align-right',
        'separator',
        'quote-left',
        'list-ol',
        'list-ul',
        'separator',
        'link',
        'table',
        'emoji',
        'upLogImg',
        'upLogVideo',
        'separator',
      ]
    }
  },
  mounted() {
    var editor = this.$refs.editor;
    this.parent = editor;
    this.$store.state.selectChange = this;
  },
  methods: {
    dropCont(){
      this.content = '';
    },
    upload(file, from) {
      console.log('upload', file);
      let data = new FormData();
      data.append('file', file);
      //请自行解决跨域问题
      //此处仅限测试使用(1小时自动删除文件，请勿非测试使用)
      // return new Promise((resolve,reject) => {
      //   http.requestPost({
      //     api: "http://file.bload.cn:8099/api/upload",
      //     param: data
      //   }).then(response=>{
      //     if (response.code === 1){
      //       resolve({url: "http://file.bload.cn:8099/"+response.url,name: response.filename});
      //     }else{
      //       alert('上传失败');
      //       reject(response.data);
      //     }
      //   })
      // })
    }
  }
}

</script>
<style scoped>
#editormd {
  width: 100%;
  height: 100%;
  /*position: fixed;
  display: contents;*/
}

.mark-down-editor {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.markdown-body {
  font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif !important;
}

.mark-down-editor .container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: calc(100% - 60px);
  ;
}

>>>.mark-down-editor .foot {
  z-index: 2;
  border: 0;
}

>>>.markdown .markdown-toolbars>li {
  width: auto;
  height: 100%;
  margin: 5px;
}

>>>.markdown-theme-light .hljs {
  text-align: left;
}

>>>.markdown .markdown-toolbars li>span {
  width: 40px !important;
  font-size: 30px !important;
  height: 100%;
  padding: 20px 0 20px 0;
}

>>>.markdown .markdown-toolbars li>span:hover {
  background: rgba(0, 0, 0, 0.11) !important;
  color: #e35885 !important;
}

>>>.markdown .markdown-toolbars .import-file:hover span {
  background: rgba(0, 0, 0, 0.11) !important;
  color: #e35885 !important;
}

/*>>>.markdown .markdown-toolbars li:hover {
  background: rgba(0, 0, 0, 0.2) !important;
  color: #e35885 !important;
}*/

>>>.markdown .markdown-toolbars .iconfont {
  font-size: 30px !important;
}

/*
>>>.markdown .markdown-toolbars .el-dialog span{
  font-size: 12px !important;
}

>>>.markdown .markdown-toolbars .el-dialog > i{
  font-size: 12px !important;
}*/

>>>.markdown .markdown-toolbars {
  width: 100% !important;
  min-width: 1200px;
  z-index: 2999 !important;
  position: fixed !important;
  top: 42px !important;
  height: 70px !important;
  padding-left: 8.3333% !important;
  padding-right: 8.3333% !important;
}

>>>.markdown {
  height: 100%;
}

.mark-down-editor .container .box {
  z-index: 1;
}

>>>.markdown .markdown-toolbars,
.markdown.border {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

>>>.markdown.border {
  border: 0 !important;
}

>>>.markdown-toolbars {
  border-bottom: 0 !important;
}

>>>.markdown-preview>div {
  background-color: rgba(0, 0, 0, 0) !important;
}

>>>p {
  margin: 0;
  text-indent: 2em;
  /*overflow: hidden;*/
  text-overflow: ellipsis;
  /*display: -webkit-box;*/
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  white-space: nowrap;
  line-height: 21px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: inherit;
  text-align: left;
}

.mark-down-editor .tool-bar {

  z-index: 1;
  border: 0;
  line-height: 35px;
  height: 40px;
  font-size: 20px;
  letter-spacing: 5px;
  vertical-align: middle;
}

.mark-down-editor .container .box .box-padding {
  padding: 10px;
  height: 90%;
}

.mark-down-editor .tool-bar .separator {
  color: #e1e1e1;
  line-height: 33px;
}

.mark-down-editor .tool-bar .iconfont {
  vertical-align: middle;
  display: block;
  line-height: 2.2em;
}

#editormd .el-row {
  width: 100%;
  height: 100%;
}

#editormd .el-row .el-col {
  height: 100%;
}

</style>
