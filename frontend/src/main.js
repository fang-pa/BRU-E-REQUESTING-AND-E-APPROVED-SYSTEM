import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
// import VCalendar from 'v-calendar';

import './axios'
// .use(VCalendar, {})
createApp(App).use(router).mount('#app')
