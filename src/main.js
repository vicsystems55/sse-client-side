import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"
import axios from 'axios'
import VueAxios from 'vue-axios'



createApp(App).use(store).use(router).use(VueAxios, axios).use(Toast).mount('#app')
