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
import Articles from "@/views/Articles";
import ArticleSmoke from "@/views/ArticleSmoke";
import ArticleBeer from "@/views/ArticleBeer";
import ProfileBase from "@/views/ProfileBase";
import ProfileSettings from "@/views/ProfileSettings";
import ProfilePremium from "@/views/ProfilePremium";

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
        name: 'Вход',
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
        path: '/articles',
        name: 'Статьи',
        component: Articles
    },

    {
        path: '/articles/why-do-i-want-sweets',
        name: 'Почему мне хочется сладкого?',
        component: ArticleSweets
    },

    {
        path: '/articles/does-smoking-impair-memory',
        name: 'Ухудшает ли курение память?',
        component: ArticleSmoke
    },

    {
        path: '/articles/does-beer-break-down-muscles',
        name: 'Разрушает ли пиво мышцы?',
        component: ArticleBeer
    },

    {
        path: '/profile/base',
        name: 'Основная информация',
        component: ProfileBase
    },

    {
        path: '/profile/premium',
        name: 'Подписка',
        component: ProfilePremium
    },

    {
        path: '/profile/settings',
        name: 'Настройки',
        component: ProfileSettings
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
