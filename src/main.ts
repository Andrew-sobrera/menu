import { createApp } from 'vue'
import { VueQueryPlugin, vueQueryPluginOptions } from '@/plugins/vue-query'
import App from './App.vue'
import router from './router'
import '@/assets/styles/main.css'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app')
