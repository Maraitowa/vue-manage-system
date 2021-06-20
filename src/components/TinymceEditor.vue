<template>
  <div class="tinymce-container">
    <editor id="tinymce" v-model="myValue" :init="init"></editor>
  </div>
</template>

<script>
// 初始化
import tinymce from 'tinymce'
import Editor from "@tinymce/tinymce-vue"
import "tinymce/themes/silver/theme"
import "tinymce/icons/default/icons"
// 引入插件
import "tinymce/plugins/lists"
import "tinymce/plugins/link"
import "tinymce/plugins/fullscreen"
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/print'
import 'tinymce/plugins/preview'

export default {
  name: "TinymceEditor",
  props: {
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo | cut copy paste | forecolor backcolor bold italic underline strikethrough link | alignleft aligncenter alignright alignjustify outdent indent | \
                styleselect formatselect fontselect fontsizeselect lineheight | bullist numlist | blockquote subscript superscript removeformat | \
                table image media hr pagebreak print preview fullscreen'
    }
  },
  components: {
    Editor
  },
  data() {
    return {
      myValue: this.value,
      init: {
        selector: "#tinymce", /* tinymce的id */
        language_url: "/tinymce/langs/zh_CN.js",  /* 基于vue3，vue2应改为'/static/tinymce/langs/zh_CN.js' */
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        statusbar: false,
        menubar: false,
        plugins: 'lists link image media table hr pagebreak print preview fullscreen',
        toolbar: this.toolbar,
        toolbar_mode: 'sliding',
        width: '100%',
        height: '400px'
      }
    }
  },
  mounted() {
    tinymce.init({})
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit("input", newValue)
    }
  }
}
</script>

<style scoped>
.tinymce {
  height: 500px;
}
</style>