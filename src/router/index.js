import Vue from 'vue'
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Registration from "../views/Registration.vue";
import Authorization from "../views/Authorization.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/reg',
        name: 'Registration',
        component: Registration
    },
    {
        path: '/auth',
        name: 'Authorization',
        component: Authorization
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
