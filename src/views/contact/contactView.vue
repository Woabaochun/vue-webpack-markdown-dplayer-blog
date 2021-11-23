<template>
  <div id="home">
    <div class="homeleft">
    </div>
    <div class="homeright">
    </div>
    <div class="homecontent">
    	<div class="grid-content" style="color:#B1B1B3">
    		<H1>新網站測試公告</H1>
    		<p style="text-align: -webkit-left;text-indent:2em;">因為個人精力和能力有限，在經過了長達一年的網站程序和功能調整，以及兩個月的內測（在線）。目前網站構架基本完成，因此，我們決定開始更大範圍的公測。公測的數據將會被保留並成為正式上線網站內容的一部分。如果大家對網站界面或功能有什麽意見，可以郵件反饋。因為我們的開發能力有限，我們不會保證每個意見都會被采納，但會根據自身情況做出合適調整。感謝大家幫助我們完善這個平臺。本站目前屬於測試階段，評論彈幕等功能後續會陸續開放。</p>
    		<p>聲明:本站內容永久免費預覽</p>
    		<p>如有意向合作可以通過下方郵件聯系</p>
    		<p>dylanemill433346@gmail.com</p>
    	</div>
    	<div class="grid-content" style="color:#000000;margin-top: 100px;">
    		<p>本站永久域名:hdvideo.cc</p>
    	</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {

  name: 'contact',
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
      
    }

  },
  created() {
    this.$store.commit('setActiveOptions', 'contact');
  },
  activated() {

  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style>
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
