import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('../views/Login.vue');
const Error404 = () => import('../views/404.vue');
const Home = () => import('../components/home/Home');
const Fruta = () => import('../components/fruta/FrutasManager');
const Cliente = () => import('../components/cliente/ClienteManager');
const Venda = () => import('../components/venda/VendasManager');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        meta: {
            auth: false
        },
        component: Login
    },
    {
        path: "/home",
        name: 'home',
        component: Home,
        meta: {
            auth: true,
            title: "Página inicial",
            description: "Bem-vindo ao sistema",
        }
    },
    {
        path: "/fruta",
        component: Fruta,
        meta: {
            auth: true,
            title: "Frutas",
            description: "Gerencie o estoque de frutas do sistema",
        }
    },
    {
        path: "/cliente",
        component: Cliente,
        meta: {
            auth: true,
            title: "Clientes",
            description: "Gerencie os clientes do sistema",
        }
    },
    {
        path: "/venda",
        component: Venda,
        meta: {
            auth: true,
            title: "Vendas",
            description: "Acompanhe suas vendas",
        }
    },
    {
        path: '/404',
        name: '404',
        component: Error404
    },
    {
        path: '*',
        redirect: '/404'
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
