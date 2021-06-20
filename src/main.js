import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import installElementPlus from './plugins/element'
import installmd from './plugins/md'

import './assets/css/icon.css'

// createApp(App).use(router).mount('#app')
const app = createApp(App)

installElementPlus(app)
installmd(app)

app
  .use(store)
  .use(router)
  .mount('#app')

// console.log(app.config)
