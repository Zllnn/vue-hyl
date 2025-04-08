
import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


const app = createApp(App)


app.use(ElementPlus, {
  locale: zhCn, // 设置全局语言为中文
})
app.use(pinia)
app.use(router)

app.mount('#app')
