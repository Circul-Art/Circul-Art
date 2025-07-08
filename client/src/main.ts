import { createApp } from 'vue';
import './style.css';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import router from './routes/index.ts';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { vFlipVertical } from './directives/v-flip-vertical.ts';
import InlineSvg from 'vue-inline-svg';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(Toast);

app.directive('flip-vertical', vFlipVertical);

app.component('InlineSvg', InlineSvg);

VueQueryPlugin.install(app, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                gcTime: 1000 * 60 * 1,
                refetchOnReconnect: 'always',
                refetchOnWindowFocus: false,
                retry: 0
            }
        }
    }
});

app.mount('#app');
