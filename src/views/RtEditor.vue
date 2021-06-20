<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>富文本编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips">
        tinymce：开源富文本编辑器。
        访问地址：
        <a 
          href="http://tinymce.ax-z.cn/"
          target="_blank">
          tinymce
        </a>
      </div>
      <tinymce-editor ref="editor" v-model="context"></tinymce-editor>
      <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import TinymceEditor from '../components/TinymceEditor.vue'

export default {
  name: "RTeditor",
  components: {
    TinymceEditor
  },
  data() {
    return {
      context: ''
    }
  },
  methods: {
    submit() {}
  }
}
</script>

<style scoped>
.container .el-button--primary {
  margin-top: 20px;
}
</style>