import Vue from 'vue'
import VueRouter from "vue-router"
import Home from "@/views/Home.vue"
import CalculatorPFC from "@/views/CalculatorPFC";
import Registration from "@/views/Registration.vue";
import RegistrationVk from "@/views/RegistrationVk.vue";
import Authorization from "@/views/Authorization.vue";
import StartProgram from "@/views/StartProgram";
import SportProgram from "@/views/SportProgram";
import CalculatorBMI from "@/views/CalculatorBMI";
import ArticleSweets from "@/views/ArticleSweets";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Главная',
        component: Home
    },

    {
        path: '/calc-bmi',
        name: 'Калькулятор ИМТ',
        component: CalculatorBMI
    },

    {
        path: '/calc-pfc',
        name: 'Калькулятор БЖУ',
        component: CalculatorPFC
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

    {
        path: '/articles/why-do-i-want-sweets',
        name: 'Почему мне хочется сладкого?',
        component: ArticleSweets
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})

export default router
