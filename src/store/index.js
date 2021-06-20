import {createStore} from 'vuex'

export default createStore({
  state: {
    tagsList: [],
    collapse: false
  },
  mutations: {
    // 侧栏折叠
    handleCollapse(state, data) {
      state.collapse = data
    },
    // 设置标签
    setTagsItem(state,data) {
      state.tagsList.push(data)
    },
    // 关闭单个标签
    delTagsItem(state, data) {
      state.tagsList.splice(data.index, 1)
    },
    // 关闭其他标签
    closeTagsOther(state, data) {
      state.tagsList = data
    },
    // 关闭所有标签
    clearTags(state) {
      state.tagsList = []
    }
  },
  actions: {},
  modules: {}
})