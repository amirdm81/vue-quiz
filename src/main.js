import { createApp } from 'vue'
import api from './api';
import App from './App.vue';

const app = createApp(App)

app.config.globalProperties.$api = api;

app.mount('#app');