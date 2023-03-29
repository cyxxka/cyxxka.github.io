import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import { registerStore } from './store'
// import dataV from '@jiaminghi/data-view';
// 引入全局css
import './assets/scss/style.scss';
// import './assets/scss/flex.scss';  //_variables.scss有配置
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
import './assets/icon/iconfont.css'
import 'element-plus/dist/index.css'
// 引入 全局注册组件
import PublicComponent from '@/components/componentInstall';
import ElementPlus from  'element-plus'

import vue3SeamlessScroll from "vue3-seamless-scroll";

const app = createApp(App)
app.use(PublicComponent)
app.use(vue3SeamlessScroll)
// app.use(ElSelect)
app.use(ElementPlus)
// app.use(dataV)
app.use(createPinia())
registerStore()
app.use(router)
app.mount('#app')
