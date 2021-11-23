<template>
  <div id="app" @click.stop="onClosePopup" ref="sortMenu">
    <Login v-show="LOGINSHOW && TOKEN == null" />
    <!-- <div class="dplayer" id="player" style="z-index: 100001;"></div> -->
    <!--   &&  TOKEN != null && Editor-->
    <van-loading type="spinner" size="80px" class="loding" color="#303133" v-show="LOADING" />
    <van-popup id="personal" v-model="route" position="left" :style="IS_PC ? popupstyle : isPhonePopupstyle" get-container="#app" :overlay="false" @click-overlay="closePopup">
      <Personal />
    </van-popup>
    <Navigation />
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
// header("Access-Control-Allow-Origin: *");
export default {
  data() {
    return {
      popupstyle: { height: 'calc(100% - 42px)', width: '25%', margin: "21px 0px 0px 0px" },
      isPhonePopupstyle: { height: '100%', width: '100%', margin: '0px' }
    }
  },
  computed: {

    ...mapState([
      'LOADING',
      'LOGINSHOW',
      'TOKEN',
      'IS_PC',
      'USERNAME',
      'Editor'
    ]),

    route: {
      get() {
        return this.$store.state.POPUP && this.$store.state.TOKEN != null
      },
      set(val) {}
    }
  },
  name: 'APP',
  methods: {
    // isPhone(style){
    //   style.width = '100% !important;';
    //   style.height = '100% !important;';
    //   style.padding = '0 !important;';
    //   return style;
    // },
    closePopup() {
      this.$store.commit('hidePOPUP');
    },
    onClosePopup(e) {
      if (this.$store.state.POPUP == true) {
        if (this.$store.state.IS_PC) {
          var box = document.getElementById("personal");
          var boxButton = document.getElementById("onShowPopup");
          var fiveBox = document.getElementById("app");
          if (!box.contains(e.target) && !boxButton.contains(e.target)) {
            //点击非当前元素，需要执行的代码
            this.$store.commit('hidePOPUP');
          }
        }
      }
    }
  },
  created() {
    
    this.$store.commit('setListShow', true);
  },
  mounted() {

    // const container_selector = document.getElementById("app");
    // debugger
    // container_selector.children().filter("video").each(function(){
    //     this.pause();
    //     delete(this);
    //     this.remove();
    // });
    // container_selector.empty();
  },
  activated() {
    // this.$store.commit('setVideoOptions', this.options);
  },
  watch: {
    $route(to, from) {
      this.$store.commit('setNavigationOptions', to.meta.navigation);
      this.$store.commit('setTopbor', to.meta.topbor);
      if (this.$route.path == '/video') {
        this.$store.commit('setVideoSelect', true);
      } else {
        this.$store.commit('setVideoSelect', false);
      }


      if (this.$route.path == '/contact') {
        this.$store.commit('setOnSearch', false);
      }else{
        this.$store.commit('setOnSearch', true);
      }
    }
  }
}

</script>
<style>
body {
  background-color: #e1e1e1;
  font-size: 100%;
}

button,
input,
textarea {
  font: revert;
}

// for Chrome & Safari
&::-webkit-scrollbar {
  display: none;
}

html {
  background: #e1e1e1;
}

body {
  background: #e1e1e1;
  -ms-overflow-style: none;
  /* IE 10+ */
  scrollbar-width: none;
  /* Firefox */
}

/* chrome 浏览器中滚动条消失 */
body::-webkit-scrollbar {
  display: none;
}

#app::-webkit-scrollbar {
  display: none;
}

#app {
  font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background: #e1e1e1;
  display: flex;
  overflow: hidden;
  /* Non-prefixed version, currently
      not supported by any browser */
}

#app button {
  color: #666666;
}

#app button:hover {
  color: #000000 !important;
}

#app button:focus {
  color: #666666;
}

#app button:active {
  color: #666666;
}

#personal {
  z-index: 3000 !important;
}

.van-toast {
  width: auto;
}

.van-overlay {
  background-color: rgba(0, 0, 0, 0)
}

.loding {
  display: table;
  z-index: 9999;
  width: 100%;
  height: 100%;
  text-align: center;
  position: fixed !important;
  padding-top: calc(50vh - 100px);
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #909399;
  font-size: 14px;
}

.el-input__prefix {
  left: 8px;
}

@media (max-width: 1201px) {
  #personal {
    min-width: 300px;
  }
}

</style>
