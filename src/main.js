import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';
import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from './components/HomePage';
import ErrorView from './components/ErrorPage';
import CalculateGenshinView from "./components/CalculateGenshinPage";
import CalculateHonkaiView from "./components/CalculateHonkaiPage";
import EmulateGenshinView from "./components/EmulateGenshinPage";
import EmulateHonkaiView from "./components/EmulateHonkaiPage";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/calculate/genshin',
            name: 'calculate-genshin',
            component: CalculateGenshinView
        },
        {
            path: '/calculate/honkai',
            name: 'calculate-honkai',
            component: CalculateHonkaiView
        },
        {
            path: '/emulate/genshin',
            name: 'emulate-genshin',
            component: EmulateGenshinView
        },
        {
            path: '/emulate/honkai',
            name: 'emulate-honkai',
            component: EmulateHonkaiView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'error',
            component: ErrorView
        }
    ]
});

const app = createApp(App);

app.use(router).use(Antd).mount('#app');