import Vue from 'vue'
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Registration from "../views/Registration.vue";
import RegistrationVk from "../views/RegistrationVk.vue";
import Authorization from "../views/Authorization.vue";
import StartProgram from "../views/StartProgram";
import SportProgram from "../views/SportProgram";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Главная',
        component: Home
    },

    {
        path: '/about',
        name: 'О нас',
        component: About
    },

    {
        path: '/reg',
        name: 'Регистрация',
        component: Registration
    },

    {
        path: '/vk-reg',
        name: 'Введите дополнительные данные',
        component: RegistrationVk
    },

    {
        path: '/auth',
        name: 'Авторизация',
        component: Authorization
    },

    {
        path: '/start-program',
        name: 'Начало программы',
        component: StartProgram
    },

    {
        path: '/sport-program',
        name: 'Спортивная программа',
        component: SportProgram
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
