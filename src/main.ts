import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import pinia from './store/index'
import './style.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App).use(router).use(pinia)
app.use(ElementPlus)
app.mount('#app')
