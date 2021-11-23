<template>
  <div :style="styleObject">
    <div class="homevideoleft">
    </div>
    <div class="homevideoright">
    </div>
    <div :class="homevideocontent">
      <van-nav-bar v-if="!IS_PC" :title="viewData.article_title" left-text="返回" left-arrow @click-left="onRouter">
        <template #right>
          <el-button type="text" icon="icon-fenxiang" @click="showShare = true" class="top-buttonfenxiang"></el-button>
        </template>
      </van-nav-bar>
      <div class="contentvideo">
        <markdown-preview :initialValue="viewData.article_content" />
        <div class="buttonblog">
          <div class="blogdate">
            <span>發布時間&nbsp;{{dateFormat(viewData.update_date)}}</span>
          </div>
          <div class="blogzan" v-if="viewData.type != '1'">
            <span style="display: block;">
              {{numericalzan(viewData.preview_statistics)}}
              <i class="iconfont icon-chakanyanjingshishifenxi"></i>
            </span>
          </div>
        </div>
        <div class="blogfenxiang" v-if="IS_PC">
          <el-popover placement="top-start" title="拷貝二維碼發送到群裏" ref="fenxiang" width="200" trigger="hover">
            <div style="width:100%;height:100%;margin:auto;">
              <div class="qrcode" ref="qrCodeUrl" style="margin:auto;text-align: center;
    display: table;">
              </div>
              <el-button class="" slot="reference" type="text" style="margin-top: 10px;padding: 0;font-family: iconfont !important;font-size: 15px;line-height: 35px;color: #e35885;" icon="" @click="copyLink()">點擊拷贝分享链接</el-button>
            </div>
            <el-button class="bottom-buttonfenxiang" slot="reference" type="text" icon="icon-fenxiang" style="margin-top: 10px;padding: 0;font-family: iconfont !important;font-size: 40px;"></el-button>
          </el-popover>
        </div>
      </div>
    </div>
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
    <div id="down" ref="qrCodeUrl" v-show="false" v-if="!IS_PC">
      <el-image id="QRcode" style="width: 100px; height: 100px" :src="imageUrl" :preview-src-list="[imageUrl]">
      </el-image>
      <!-- <el-image-viewer :key="codeImg" id="codeImg" v-show="showBig" :on-close="closeImgViewerCode" :url-list="[imageUrl]"/> -->
    </div>
    <!-- <not-data v-if="blogdata.length == 0" :tip="nullTip"></not-data> -->
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { NavBar } from 'vant';
import QRCode from 'qrcodejs2';
// import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
import avatar from '@/assets/logo.png';
export default {
  // name: 'details',
  computed: {
    ...mapState([
      'viewData',
      'IS_PC'
    ]),
  },
  data() {
    return {
      showBig: false,
      imgLogo: avatar,
      qrcode: null,
      imageUrl: '',
      imageUrlText: '',
      imageWidth: 150,
      showShare: false,
      options: [
        { name: '复制链接', icon: 'link' },
        { name: '二维码', icon: 'qrcode' },
      ],
      homevideocontent: 'homevideocontent',
      styleObject: {
        width: "100%",
        height: "auto",
        maxHeight: "100%",
        minHeight: "100%",
        textAlign: "center",
        margin: "0px",
        backgroundColor: "#e1e1e1",
        position: "absolute",
        display: "block",
        zIndex: "1000",
        top: "0px",
      },

    }

  },
  created() {
    this.$store.commit('setListShow', false);
    if (!this._isMobile()) {
      this.styleObject = {
        width: "100%",
        height: "auto",
        maxHeight: "100%",
        minHeight: "calc(100vh - 42px)",
        textAlign: "center",
        margin: "0px",
        backgroundColor: "#e1e1e1",
        position: "absolute",
        display: "block",
        top: "42px"
      };
      this.homevideocontent = 'homevideocontent';
    } else {
      this.imageWidth = 200;
      this.styleObject = {
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        minHeight: "100%",
        textAlign: "center",
        margin: "0px",
        backgroundColor: "#e1e1e1",
        position: "absolute",
        display: "block",
        zIndex: "1000",
        top: "0px",
      };
      this.homevideocontent = 'homevideocontent2';
    }

    document.querySelector('meta[name="keywords"]').setAttribute('content', this.$store.state.articleTitle);
    document.querySelector('meta[name="description"]').setAttribute('content', this.$store.state.articleTitle);
  },
  mounted() {
    this.$store.commit('setEditorRou', true);
    if (!this._isMobile()) {
      var refs = this.$refs['fenxiang'];
      refs.$refs.popper.style.textAlign = "center";
      refs.$refs.popper.style.background = 'rgba(255,255,255, 0.5)';
      refs.$refs.popper.style.border = '0';
      refs.$refs.popper.children[0].style.color = '#e35885';
      this.creatQrCode(false);
    } else {
      this.creatQrCode(true);
    }
  },
  components: {
    NavBar,
    // ElImageViewer:ElImageViewer
  },
  destroyed: function() {
    if (this.qrcode != null) {
      this.qrcode.clear();
    }
    this.$store.commit('setListShow', true);
    document.documentElement.scrollTop = this.$store.state.scrollTop;
  },
  methods: {
    onRouter(){
      var path = this.$route.matched[0].path;
      if(path == ""){
        path = '/'
      }
      this.$router.push(path);
       
      this.$store.commit('setListShow', true);
    },
    // closeImgViewerCode(){
    //   this.showBig = false;
    // },
    getUrl() {
      var url = window.location.host;
      var getdata = this.$store.state.viewData;
      var data = {
        type: getdata.type,
        id: getdata.id
      }
      data = this.crypto.encryption(data);
      return 'http://' + url + getdata.path + '?data=' + data
    },
    copyLink() {
      var url = window.location.host;
      var getdata = this.$store.state.viewData;
      var data = {
        type: getdata.type,
        id: getdata.id
      }
      data = this.crypto.encryption(data);
      var imgUrl = 'http://' + url + getdata.path + '?data=' + data
      //生成二维码  this.extensInfo.extensionUrl为链接地址
      const inputTag = document.createElement('input');
      document.body.appendChild(inputTag);
      inputTag.setAttribute('value', imgUrl);
      inputTag.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        this.$message({
          type: 'success',
          message: 'URL已复制到剪切板',
        });
        this.showShare = false;
      }
      document.body.removeChild(inputTag);
    },
    onSelect(option) {
      if (option.icon == 'qrcode') {
        // this.showBig = false;
        document.getElementById('QRcode').click();
        this.showShare = false;
      } else {
        this.copyLink();
      }
    },
    creatQrCode(bool) {
      var url = window.location.host;
      var getdata = this.$store.state.viewData;
      var data = {
        type: getdata.type,
        id: getdata.id
      }
      data = this.crypto.encryption(data);

      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: 'http://' + url + getdata.path + '?data=' + data, // 需要转换为二维码的内容
        width: this.imageWidth,
        height: this.imageWidth,
        src: avatar,
        image: avatar,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })


      if (bool) {
        var $this = this;
        var settime = setTimeout(() => {
          try {
            $this.imageUrl = document.getElementById('down').children[2].src;
            if ($this.imageUrl != '') {
              clearInterval(settime);
            }
          } catch (e) {
            console.log(e);
          }
        }, 20)
      }
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
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/g);
      return flag;
    },
  }
}

</script>
<style scoped>
input:focus {
  border: 1px solid #000000 !important;
  border-color: #000000 !important;
}

.homevideo {
  width: 100%;
  height: auto;
  max-height: 100%;
  min-height: calc(100vh - 42px);
  text-align: center;
  margin: 0px;
  background-color: #e1e1e1;
  position: absolute;
  display: block;
  z-index: 998;
  top: 42px;
}

.homevideoleft {
  height: auto;
  min-height: 20px;
  width: calc(50% - 335px);
  float: left;
}

.homevideoright {
  height: auto;
  min-height: 20px;
  width: calc(50% - 335px);
  float: right;
}

.homevideocontent {
  width: 650px;
  height: auto;
  min-height: 100%;
  margin: auto;
  display: flex;
  padding-bottom: 100px;
}

.buttonblog {
  height: auto;
  min-height: 18px;
  width: 100%;
  float: left;
  margin-top: 10px;
  background-color: #e1e1e1;
  border-bottom: 1px solid;
  border-bottom-style: dashed;
}

.blogdate {
  float: left;
  position: absolute;
  text-align: left;
  font-size: 12px;
}

.blogzan {
  height: 18px;
  width: auto;
  float: right;
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
}

.blogfenxiang {
  height: auto;
  width: auto;
  float: right;
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
}

.blogzan i {
  font-size: 12px;
}


.blogzan span {
  background-color: #e1e1e1;
  color: #000;
  padding: 0 2px 0 2px;
  height: 100%;
  border-radius: 2px;
  line-height: 18px;

}

.van-nav-bar {
  background: rgba(0, 0, 0, 0);
  width: 100%;
  position: fixed;
  z-index: 10000;
  top: 0;
}

>>>.van-nav-bar__text {
  color: #e35885;
}

>>>.van-nav-bar .van-icon {
  color: #e35885;
}

.van-hairline--bottom::after {
  border-bottom-width: 0px;
}

.contentvideo {
  width: 100%;
  margin: auto;
  margin-top: 46px;
  height: auto;
  min-height: calc(100% - 46px);
}

.homevideocontent2 {
  width: 100%;
  /*padding: 0px 5px 0px 5px;*/
  min-height: calc(100% - 146px);
  margin: auto;
  padding-bottom: 100px;
}

.homevideocontent2 .contentvideo{
  max-width: 1000px;
}

.top-buttonfenxiang {
  width: 40px;
  padding: 0;
  font-family: iconfont !important;
  font-size: 30px;
}

>>>.top-buttonfenxiang i {
  display: block;
  width: 40px;
}

>>>.top-buttonfenxiang i:before {
  width: 40px;
  display: block;
}

.bottom-buttonfenxiang {
  width: 50px;
  padding: 0;
  font-family: iconfont !important;
  font-size: 30px;
}

>>>.bottom-buttonfenxiang i {
  display: block;
  width: 50px;
}

>>>.bottom-buttonfenxiang i:before {
  width: 50px;
  display: block;
}

>>>.el-popover {
  text-align: center !important;
}

.qrcode {
  display: inline - block;


}

>>>.el-image-viewer__img {
  border: 10px solid #fff !important;
}

>>>.qrcode img {
  background-color: #fff !important;
  padding: 6px !important;
  box-sizing: border-box !important;
}

>>>.preview-img.active {}

>>>.preview-img img.vertical {
  height: auto !important;
  max-width: 100% !important;
}

@media (max-width: 1201px) {
  .buttonblog {
    height: auto;
    min-height: 18px;
    width: calc(100% - 10px);
    float: left;
    background-color: #e1e1e1;
    border-bottom: 1px solid;
    border-bottom-style: dashed;
    margin: 10px 5px 0 5px;
  }

  .contentvideo {
    width: 100%;

    margin-top: 46px;
    height: auto;
    /*position: absolute;*/
  }

  .homevideoleft {
    height: auto;
    min-height: 20px;
    width: calc(50% - 335px);
    float: left;
  }

  .homevideoright {
    height: auto;
    min-height: 20px;
    width: calc(50% - 335px);
    float: right;
  }


}

@media (max-width: 1023px) {
  .homevideoleft {
    height: auto;
    min-height: 20px;
    width: calc(50% - 335px);
    float: left;
    display: none;
  }

  .homevideoright {
    height: auto;
    min-height: 20px;
    width: calc(50% - 335px);
    float: right;
    display: none;
  }


}

</style>
