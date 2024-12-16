import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const notyf = new Notyf();
const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$notyf = notyf;
app.use(pinia)
app.use(router)
app.mount('#app')
