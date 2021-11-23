<template lang="html">
  <div :class="`markdown ${fullscreen ? 'fullscreen' : ''} ${bordered ? 'border' : ''}`" ref="markdown" :style="{ width: width + 'px', height: height + 'px' }">
    <!-- 头部工具栏 -->
    <ul class="markdown-toolbars" v-show="!preview">
      <li>
        <slot name="title" />
      </li>
      <li v-if="tools.save" @click="handleSave">
        <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
          <span class="iconfont icon-save"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.undo">
        <el-tooltip class="item" effect="dark" content="撤销" placement="bottom">
          <span class="iconfont icon-undo" @click="editor.undo()"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.redo" @click="redo">
        <el-tooltip class="item" effect="dark" content="重做" placement="bottom">
          <span class="iconfont icon-redo"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.strong">
        <el-tooltip class="item" effect="dark" content="粗体" placement="bottom">
          <span @click="insertStrong" class="iconfont icon-bold"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.italic">
        <el-tooltip class="item" effect="dark" content="斜体" placement="bottom">
          <span @click="insertItalic" class="iconfont icon-italic"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.overline">
        <el-tooltip class="item" effect="dark" content="删除线" placement="bottom">
          <span @click="insertOverline" class="iconfont icon-overline"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.overline">
        <el-tooltip class="item" effect="dark" content="下划线" placement="bottom">
          <span @click="insertUnderline" class="iconfont icon-under-line"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.h1">
        <el-tooltip class="item" effect="dark" content="标题1" placement="bottom">
          <span style="font-size: 16px;" @click="insertTitle(1)">h1</span>
        </el-tooltip>
      </li>
      <li v-if="tools.h2">
        <el-tooltip class="item" effect="dark" content="标题2" placement="bottom">
          <span style="font-size: 16px;" @click="insertTitle(2)">h2</span>
        </el-tooltip>
      </li>
      <li v-if="tools.h3">
        <el-tooltip class="item" effect="dark" content="标题3" placement="bottom">
          <span style="font-size: 16px;" @click="insertTitle(3)">h3</span>
        </el-tooltip>
      </li>
      <li v-if="tools.h4">
        <el-tooltip class="item" effect="dark" content="标题4" placement="bottom">
          <span style="font-size: 16px;" @click="insertTitle(4)">h4</span>
        </el-tooltip>
      </li>
      <li v-if="tools.h5">
        <el-tooltip class="item" effect="dark" content="标题5" placement="bottom">
          <span style="font-size: 16px;" @click="insertTitle(5)">h5</span>
        </el-tooltip>
      </li>
      <li v-if="tools.h6">
        <el-tooltip class="item" effect="dark" content="标题6" placement="bottom">
          <span style="font-size: 16px;" @click="insertTitle(6)">h6</span>
        </el-tooltip>
      </li>
      <li v-if="tools.hr">
        <el-tooltip class="item" effect="dark" content="分割线" placement="bottom">
          <span @click="insertLine" class="iconfont icon-horizontal"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.quote">
        <el-tooltip class="item" effect="dark" content="引用" placement="bottom">
          <span style="font-size: 16px;" @click="insertQuote" class="iconfont icon-quote"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.ul">
        <el-tooltip class="item" effect="dark" content="无序列表" placement="bottom">
          <span @click="insertUl" class="iconfont icon-ul"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.ol">
        <el-tooltip class="item" effect="dark" content="有序列表" placement="bottom">
          <span @click="insertOl" class="iconfont icon-ol"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.code">
        <el-tooltip class="item" effect="dark" content="代码块" placement="bottom">
          <span @click="insertCode" class="iconfont icon-code"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.notChecked">
        <el-tooltip class="item" effect="dark" content="未完成列表" placement="bottom">
          <span @click="insertNotFinished" class="iconfont icon-checked-false"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.checked">
        <el-tooltip class="item" effect="dark" content="已完成列表" placement="bottom">
          <span @click="insertFinished" class="iconfont icon-checked"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.link">
        <el-tooltip class="item" effect="dark" content="链接" placement="bottom">
          <span @click="insertLink" class="iconfont icon-link"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.image">
        <!-- @click="insertImage" class="iconfont icon-img" -->
        <span>
          <upLogImg :install-html="insertImage" /></span>
      </li>
      <li v-if="tools.uploadImage" name="本地图片">
        <span @click="chooseImage" class="iconfont icon-upload-img"></span>
      </li>
      <li v-if="tools.video">
        <span>
          <upLogVideo :install-html="insertVideo" />
        </span>
        <!-- <span @click="insertVideo" class="iconfont icon-img"></span> -->
      </li>
      <li v-if="tools.table">
        <el-tooltip class="item" effect="dark" content="表格" placement="bottom">
          <span @click="insertTable" class="iconfont icon-table"></span>
        </el-tooltip>
      </li>
      <li class="empty"></li>
      <li v-if="tools.theme" class="shift-theme">
        <div>
          <el-tooltip class="item" effect="dark" content="代码块主题" placement="bottom">
            <span class="iconfont icon-theme" @click="themeSlideDown = !themeSlideDown"></span>
          </el-tooltip>
          <ul :class="{ active: themeSlideDown }" @mouseleave="themeSlideDown = false">
            <li @click="setThemes('light')">Light</li>
            <li @click="setThemes('dark')">VS Code</li>
            <li @click="setThemes('oneDark')">Atom OneDark</li>
            <li @click="setThemes('gitHub')">GitHub</li>
          </ul>
        </div>
      </li>
      <el-tooltip class="item" effect="dark" content="导入文件" placement="bottom">
        <li class="import-file" v-show="tools.importmd">
          <span class="iconfont icon-daoru" @click="importFile"></span>
          <input type="file" @change="importFile($event)" accept="text/markdown" />
        </li>
      </el-tooltip>
      <li v-show="tools.exportmd">
        <el-tooltip class="item" effect="dark" content="保存到本地" placement="bottom">
          <span class="iconfont icon-download" @click="exportFile"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.split && split">
        <el-tooltip class="item" effect="dark" content="全屏编辑" placement="bottom">
          <span @click="split = false" class="iconfont icon-md"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.split && !split">
        <el-tooltip class="item" effect="dark" content="分屏显示" placement="bottom">
          <span @click="split = true" class="iconfont icon-group"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.preview">
        <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
          <span @click="preview = true" class="iconfont icon-preview"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.clear" @click="value = ''">
        <el-tooltip class="item" effect="dark" content="清空" placement="bottom">
          <span class="iconfont icon-clear"></span>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip class="item" effect="dark" :content="scrolling ? '同步滚动:开' : '同步滚动:关'" placement="bottom">
          <span @click="scrolling = !scrolling" v-show="scrolling" class="iconfont icon-on"></span>
          <span @click="scrolling = !scrolling" v-show="!scrolling" class="iconfont icon-off"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.fullscreen && !fullscreen">
        <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
          <span @click="fullscreen = !fullscreen" class="iconfont icon-fullscreen"></span>
        </el-tooltip>
      </li>
      <li v-if="tools.fullscreen && fullscreen">
        <el-tooltip class="item" effect="dark" content="退出全屏" placement="bottom">
          <span @click="fullscreen = !fullscreen" class="iconfont icon-quite"></span>
        </el-tooltip>
      </li>
    </ul>
    <!-- 关闭预览按钮 -->
    <div class="close-preview" v-show="preview && !isPreview" @click="preview = false">
      <span class="iconfont icon-close"></span>
    </div>
    <!-- 编辑器 -->
    <div class="markdown-content" :style="{ background: preview ? '#fff' : '' }">
      <div class="codemirror" ref="codemirror" v-show="!preview" @mouseenter="mousescrollSide('left')" style="text-align: left;"></div>
      <div v-show="preview ? preview : split" :class="`markdown-preview ${'markdown-theme-' + themeName}`" ref="preview" @scroll="previewScroll" @mouseenter="mousescrollSide('right')">
        <previews :initialValue="html" style="padding:0 !important;" ref="previewInner"></previews>
        <!-- <markdown-preview :initialValue="html"/> -->
      </div>
    </div>
    <!--    预览图片-->
    <el-image-viewer v-show="previewImgModal" :on-close="closeImgViewer" style="z-index:4000;" :url-list="[previewImgSrc]"/>
    <!-- <div :class="['preview-img', previewImgModal ? 'active' : '']">
      <span class="close icon-close iconfont" @click="previewImgModal = false"></span>
      <img :src="previewImgSrc" :class="[previewImgMode]" alt="" />
    </div> -->
  </div>
</template>
<script>
// import Vue from 'vue';
import markdown from './pro';


export default markdown;

</script>
<style scoped lang="less">
@import "../../assets/font/iconfont.css";
@import "../../assets/css/theme";
@import "../../assets/css/light";
@import "../../assets/css/dark";
@import "../../assets/css/one-dark";
@import "../../assets/css/github";
@import "../../assets/css/index";
</style>
