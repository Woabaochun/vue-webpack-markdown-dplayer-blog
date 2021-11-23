import hljs from '../assets/js/hightlight';
import marked from '../assets/js/marked';
import vueMarked from 'marked'
import Vue from 'vue';
import opendplayer from '@/components/video/openDPlayer.vue';
import parser from './parser';
const uuid = require('uuid');
hljs.initHighlightingOnLoad();

const renderer = new marked.Renderer();


export default marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
})

let DEMO_UID = 0


renderer.html = function(code, language) {
  // 提取language标识为 demo 的代码块重写
  if (language === 'video') {
    const demoCodes = code.match(code)
    const id = 'demo-sandbox-template-' + (++DEMO_UID);
    const id2 = 'demo-sandbox-template2-' + (++DEMO_UID);
    const template = `<div id="${id2}"><div id="${id}"/></div>`
    const Comp = Vue.extend(opendplayer)
    var videoType = "none"
    var reg = RegExp(/m3u8/);
    if (code.endsWith('.m3u8') || code.match(reg)) {
      videoType = "customHls";

      // 视频加密播放隐藏播放源
      // window.URL = window.URL || window.webkitURL;
      // var xhr = new XMLHttpRequest();
      // // debugger
      // xhr.open("GET", code, false);
      // // xhr.setRequestHeader("If-Modified-Since","0"); 
      // // xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
      // // xhr.setRequestHeader('Content-type', 'application/ecmascript');
      // // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      // // xhr.setRequestHeader("Cache-Control","no-cache");
      // xhr.responseType = "blob";
      // xhr.onload = function() {
      //   if (this.status === 200) {
      //     var blob = this.response;
      //     code = window.URL.createObjectURL(blob);
      //   }
      // }
      // xhr.send();
    }

    let vm = new Comp({
      propsData: { fileUrl: code, videoType: videoType } // 从服务端获取到的数据：data
    })
    var doucomt = null;
    var settime = setTimeout(() => {
      try {
        if (document.getElementById(id)) {
          vm.$mount('#' + id)
          clearInterval(settime);
        }
      } catch (e) {
        console.log(e);
      }
    }, 20)

    // 返回新的HTML
    return template;
  }
  // return code;
  // 其他标识的代码块依然使用代码高亮显示
  return `<span><pre rel="${language}"><code class="hljs ${language}">${hljs.highlightAuto(code).value}</code></pre><span>`
}
