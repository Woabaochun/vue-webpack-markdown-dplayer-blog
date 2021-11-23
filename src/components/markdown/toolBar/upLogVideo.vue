<template>
  <div class="upLogVideo">
    <el-tooltip class="item" effect="dark" content="视频" placement="bottom">
      <i class="iconfont icon-shipin1" @click="onClick"></i>
    </el-tooltip>
    <el-dialog title="输入视频地址" :visible.sync="show" width="40%">
      <el-row>
        <el-col :span="24" style="padding: 0px 50px;">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="输入视频链接" v-model="videoHref" clearable>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <div class="upVideo" v-show="show">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="输入视频链接" v-model="videoHref" clearable>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "upLogVideo",
  props: {
    installHtml: {
      required: true,
    },
  },
  data() {
    return {
      //自动注入
      show: false,
      parent: null,
      // imgmassage: '',
      videoHref: '',
    }
  },
  methods: {
    onClick() {
      if (this.show) {
        this.videoHref = '';
        this.show = false;
      } else {
        this.videoHref = '';
        this.show = true;
      }
    },
    handleClose() {
      //在当前编辑器的选择位置插入文本
      this.installHtml('\nH{video}(' + this.videoHref + ')');
      // this.installHtml('\n```video\n<upLogVideo id="markdown-it" style="width: 100%;" :file-url="'+this.videoHref+'"/>\n```');
      // this.parent.insertContent('\n![video](vdoUrl)');
      this.show = false;
    }
  },
}

</script>
<style scoped>
.upLogVideo i {
  width: 18px;
  height: 18px;
}

.el-dialog__headerbtn {
  display: none;
}


.upVideo {
  width: 300px;
  min-height: 100px;
  margin-left: -140px;
  background: rgba(251, 251, 251, 0.2);
  background: #FFF;
  display: flex;
  z-index: 200;
  position: fixed;
  border-radius: 3px;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.3);
  text-align: center;
}

</style>
