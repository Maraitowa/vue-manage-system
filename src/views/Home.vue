<template>
  <div class="home">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{'content-collapse': isCollapse}">
      <v-tags />
      <div class="content">
        <router-view v-slot="{Component}">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from "../components/Header"
import vSidebar from "../components/Sidebar"
import vTags from "../components/Tags.vue"

export default {
  name: "Home",
  components: {
    vHeader,
    vSidebar,
    vTags
  },
  computed: {
    isCollapse() {
      return this.$store.state.collapse
    },
    tagsList() {
      return this.$store.state.tagsList.map(item => item.name)
    }
  }
}
</script>

<style scoped>
</style>