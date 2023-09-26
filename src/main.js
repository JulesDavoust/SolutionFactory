import { createApp } from 'vue'
import '@/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import App from '@/App.vue';
import router from '@/plugins/router';


createApp(App).use(router).mount('#app');