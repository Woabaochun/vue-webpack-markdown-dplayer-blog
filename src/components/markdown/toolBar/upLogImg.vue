<template>
  <div class="upLogImg">
    <el-tooltip class="item" effect="dark" content="图片" placement="bottom">
      <i class="iconfont icon-tupian" @click="onClick"></i>
    </el-tooltip>
    <el-dialog title="输入图片地址" :visible.sync="show" width="30%">
      <el-row>
        <el-col :span="24" style="padding: 0px 20px;">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="输入图片描述" v-model="imgmassage" clearable>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <div style="width:100%;height:20px;" />
      <el-row>
        <el-col :span="24" style="padding: 0px 20px;">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="输入图片链接" v-model="imghref" clearable>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "upLogImg",
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
      imgmassage: '',
      imghref: '',
    }
  },
  methods: {
    onClick() {
      if (this.show) {
        this.imghref = '';
        this.show = false;
      } else {
        this.imghref = '';
        this.show = true;
      }
      //在当前编辑器的选择位置插入文本
      //this.parent.insertContent('~~', 'example1', '~~');
    },
    handleClose() {
      //在当前编辑器的选择位置插入文本
      this.installHtml('\n![' + this.imgmassage + '](' + this.imghref + ')');
      // this.parent.insertContent('\n![video](vdoUrl)');
      this.show = false;
    }
  },
}

</script>
<style scoped>
.upLogImg i {
  width: 18px;
  height: 18px;
}

.upImg {
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
