<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>markdown编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips">
        v-md-editor：基于 Vue 开发的 markdown 编辑器组件。
        访问地址：
        <a
          href="https://ckang1229.gitee.io/vue-markdown-editor/zh/"
          target="_blank"
        >vue-schart</a>
      </div>
      <v-md-editor v-model="content" height="400px"></v-md-editor>
      <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "MdEditor",
  data() {
    return {
      content: ''
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