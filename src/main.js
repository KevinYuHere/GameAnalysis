import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';
import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from './components/HomePage';
import ErrorView from './components/ErrorPage';
import IntroView from "./components/IntroPage";
import MedicalView from "./components/MedicalPage";
import HistoryView from "./components/HistoryPage";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/intro',
            name: 'intro',
            component: IntroView
        },
        {
            path: '/medical',
            name: 'medical',
            component: MedicalView
        },
        {
            path: '/history',
            name: 'history',
            component: HistoryView
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