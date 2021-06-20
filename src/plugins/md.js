// markdown 编辑器
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs 核心代码
import hljs from 'highlight.js/lib/core'
// 按需引入语言包
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import php from 'highlight.js/lib/languages/php'

hljs.registerLanguage(('json', json), ('bash', bash), ('css', css), ('javascript', javascript), ('php', php));

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
});

export default (app) => {
  app.use(VueMarkdownEditor)
}
