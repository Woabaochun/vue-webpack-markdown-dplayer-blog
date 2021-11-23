<template>
  <div style="width: 100%;height: 100%;position: absolute;text-align: center;">
    <div class="errors">
      <el-empty :image-size="200" description="您访问的页面它不存在。">
      	<el-button type="text" icon="iconfont icon-shouzhi-copy" @click="$router.push('/')">返回首页</el-button>
      </el-empty>
    </div>
  </div>
</template>
<script>
	
</script>
<style>
.errors {
  width: 30%;
  height: auto;
  min-height: 100px;
  margin: auto;
  margin-top: calc(10%);
}

</style>
