import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import VCalendar from 'v-calendar';
import './axios'

createApp(App).use(router).use(VCalendar, {}).mount('#app')
