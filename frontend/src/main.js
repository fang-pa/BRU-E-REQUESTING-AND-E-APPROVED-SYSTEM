import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'

import './axios'


createApp(App).use(router).mount('#app')
