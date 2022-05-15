<template>
    <div id="main-header-container">
        <div class="header">
            <v-container class="header-container">
                <div class="link-main">
                    <router-link to="/" class="logo">
                        <img
                            class="mobile main-page"
                            :src="require('../assets/img/svg/logo-white.svg')"
                        />
                        <img
                            class="mobile active"
                            :src="require('../assets/img/png/logo.png')"
                        />
                        <img
                            class="pc"
                            :src="require('../assets/img/svg/logo.svg')"
                        />
                    </router-link>
                    <router-link to="/" class="text">
                        <img
                            :src="require('../assets/img/svg/DO_SPORTS-small.svg')"
                        />
                    </router-link>
                </div>
                <ul class="menu">
                    <li v-for="(page, index) in menuPages" :key="index">
                        <router-link class="link" v-if="!page.submenuPages" :to="page.url">{{ page.name }}</router-link>
                        <a class="link unhovered" v-else>{{ page.name }}</a>
                        <div v-if="page.submenuPages" class="sub-menu">
                            <router-link
                                v-for="(subPage, subIndex) in page.submenuPages"
                                :key="subIndex"
                                :to="subPage.url"
                            >
                                {{ subPage.name }}
                            </router-link>
                        </div>
                    </li>
                </ul>
                <div class="user-links" v-if="userIsAuthorized">
                    <div
                        class="login"

                    >
                        {{ userData.login }}
                    </div>
                    <div class="menu-button">
                        <img
                            @click="menuButton"
                            :src="require('../assets/img/png/menu-button.png')"
                        />
                    </div>
                    <div class="profile-menu">
                        <router-link v-if="userIsAdmin" to="/">Админ-панель</router-link>
                        <router-link to="/">Профиль</router-link>
                        <span @click="this.logout">Выйти</span>
                    </div>
                    <div class="menu-burger" @click="activeMenu()">
                        <span class="top"></span>
                        <span class="center"></span>
                        <span class="bottom"></span>
                    </div>
                </div>
                <div class="right-panel" v-else>
                    <router-link class="auth" to="/auth">
                        <div class="icon">
                            <img
                                :src="require('@/assets/img/svg/user-white.svg')"
                            />
                            <img
                                class="active"
                                :src="require('@/assets/img/svg/user-violet.svg')"
                            />
                        </div>
                        <div class="entry">
                            Войти
                        </div>
                    </router-link>
                    <div class="menu-burger" @click="activeMenu()">
                        <span class="top"></span>
                        <span class="center"></span>
                        <span class="bottom"></span>
                    </div>
                </div>
            </v-container>
        </div>
        <div class="drawer">
            <v-container>
                <div class="links">
                    <div
                        class="item"
                        v-for="(page, index) in menuPages"
                        :key="index"
                    >
                        <router-link v-if="!page.submenuPages" class="link" :to="page.url">{{ page.name }}</router-link>
                        <a class="link" v-else @click="subMenuMobile">{{ page.name }}</a>
                        <img class="arrow-submenu" @click="subMenuMobile" v-if="page.submenuPages" :src="require('@/assets/img/png/arrow-submenu.png')">
                        <div v-if="page.submenuPages" class="sub-menu">
                            <router-link
                                v-for="(subPage, subIndex) in page.submenuPages"
                                :key="subIndex"
                                :to="subPage.url"
                            >
                                {{ subPage.name }}
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="mail">
                    <div class="title">Почта:</div>
                    <div class="value">support@dosports.ru</div>
                </div>
            </v-container>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Header",

    data: () => ({
        showProfileMenu: false,
    }),

    props: ['screen'],

    computed: {
        ...mapGetters(['userIsAuthorized', "userData", "userIsAdmin"]),

        menuPages() {
            let menuPages = [
                {
                    name: 'Калькуляторы',
                    submenuPages: [
                        {
                            name: 'Калькулятор ИМТ',
                            url: '/calc-bmi'
                        },
                        {
                            name: 'Калькулятор БЖУ',
                            url: '/calc-pfc'
                        },
                    ]
                },
                {
                    name: 'Атлас тела',
                    url: '/'
                },
                {
                    name: 'Статьи',
                    url: '/articles'
                },
            ]
            if (this.userIsAuthorized) {
                menuPages.unshift({
                    name: 'Спортивная программа',
                    url: '/sport-program'
                })
            }
            return menuPages;
        }
    },

    methods: {
        ...mapActions(['unauthorized']),

        menuButton() {
            this.showProfileMenu = !this.showProfileMenu
        },

        subMenuMobile(event) {
            if (event.target.classList.contains("link")) {
                event.target.nextElementSibling.classList.toggle("active");
            } else {
                event.target.classList.toggle("active");
            }
        },

        logout() {
            this.unauthorized().then(() => {
                this.$router.push("/");
            });
        },

        activeMenu() {
            let menuBurger = this.screen === "mobile" ? document.querySelector('.welcome-slider .menu-burger') : document.querySelector('.menu-burger');
            menuBurger.classList.toggle("active");

            let drawer = this.screen === "mobile" ? document.querySelector('.welcome-slider .drawer') : document.querySelector('.drawer');
            drawer.classList.toggle("active");

            document.body.classList.toggle("lock");

            let header = this.screen === "mobile" ? document.querySelector('.welcome-slider .header') : document.querySelector('.header');
            header.classList.toggle("active");
        },
    },
}
</script>

<style lang="scss">
@import "../assets/scss/fonts.css";

body.lock {
    position: fixed;
    overflow: hidden;
    width: 100vw;
}

#app {
    .header {
        height: 80px;
        width: 100%;
        position: relative;
        z-index: 2;

        @media(max-width: 960px) {
            height: auto;
        }
    }

    .header.active {
        .link-main {
            .logo {
                img.pc {
                    display: none;
                }

                img.mobile {
                    display: none;
                }

                img.mobile.active {
                    display: block;
                }
            }
        }
    }

    #main-header-container {
        position: relative;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;

        @media(max-width: 960px) {
            padding-top: 20px !important;
            padding-bottom: 20px !important;
        }

        .link-main {
            display: flex;
            align-items: flex-end;

            .logo {
                width: 38px;

                @media(max-width: 960px) {
                    width: 36px;
                }

                img {
                    display: block;
                    width: 100%;

                    @media (max-width: 700px) {
                        display: none;
                    }
                }

                img.mobile {
                    display: none;

                    @media (max-width: 700px) {
                        display: block;
                    }
                }

                img.mobile.main-page {
                    display: none;
                }
            }

            .text {
                margin-left: 20px;

                @media(max-width: 960px) {
                    width: 120px;
                    margin-left: 15px;
                }

                img {
                    display: block;
                    width: 100%;

                    @media(max-width: 960px) {
                        height: 19px;
                    }
                }
            }
        }

        .menu {
            display: flex;
            font-family: "Inter-Regular", sans-serif;
            padding-left: 0 !important;
            font-size: 18px;

            @media(max-width: 960px) {
                display: none;
            }

            @media(max-width: 1265px) {
                font-size: 16px;
            }

            li {
                position: relative;
                display: block;
                margin-left: 35px;
                list-style-type: none;

                a {
                    display: block;
                    height: 100%;
                }
            }

            li:first-child {
                margin-left: 0;
            }

            .sub-menu {
                display: none;
                width: 200px;
                position: absolute;
                left: -15px;
                padding: 40px 20px 20px 20px;
                border-radius: 0 0 5px 5px;
                z-index: 0;

                @media (max-width: 1265px) {
                    width: 180px;
                }

                a {
                    display: block;
                    clear:both;
                    float:left;
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 18px;
                    line-height: 122%;

                    @media (max-width: 1265px) {
                        font-size: 16px;
                    }
                }

                a:not(:last-child):not(:only-child) {
                    margin-bottom: 15px;
                }
            }

            a:hover + .sub-menu {
                display: block;
            }

            .sub-menu:hover {
                display: block;
            }
        }

        .menu-burger {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 20px;
            cursor: pointer;
            z-index: 2;

            @media(min-width: 961px) {
                display: none;
            }

            span {
                height: 3px;
                transition: all 0.3s ease 0s;
            }
        }

        .menu-burger.active {

            span {
                position: absolute;
                width: 100%;
            }

            .top {
                top: 8.5px;
                transform: rotate(45deg);
            }

            .center {
                top: 10px;
                transform: scale(0);
            }

            .bottom {
                transform: rotate(-45deg);
                top: auto;
                bottom: 8.5px;
            }
        }

        .right-panel {
            display: flex;
            align-items: center;
        }

        .auth {
            display: flex;
            align-items: center;

            .icon {
                @media (max-width: 960px) {
                    width: 18px;
                    margin-right: 25px;
                }

                img {
                    display: block;
                    position: relative;
                    bottom: 2px;
                    width: 100%;

                    @media (max-width: 960px) {
                        bottom: 0;
                    }
                }

                img.active {
                    display: none;
                }
            }

            .entry {
                margin-left: 15px;

                @media (max-width: 960px) {
                    display: none;
                }
            }
        }

        .user-links {
            position: relative;
            display: flex;
            align-items: center;
            cursor: pointer;

            .login {
                font-family: "Inter-Bold", sans-serif;
            }


            .login {
                @media (max-width: 450px) {
                    margin-right: 15px;
                    font-size: 14px;
                }
            }

            .profile-menu {
                display: none;
                position: absolute;
                left: -15px;
                margin-top: 150px;
                width: 172px;
                padding: 40px 20px 20px 20px;
                border-radius: 0 0 5px 5px;

                @media (max-width: 1265px) {
                    width: 150px;
                }

                a {
                    display: block;
                    clear:both;
                    float:left;

                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 18px;
                    line-height: 122%;
                    margin-bottom: 15px;

                    @media (max-width: 1265px) {
                        font-size: 16px;
                    }
                }

                span {
                    display: block;
                    clear:both;
                    float:left;
                    cursor: pointer;

                    @media (max-width: 1265px) {
                        font-size: 16px;
                    }
                }

                span:not(:last-child):not(:only-child) {
                    margin-bottom: 15px;
                }
            }

            .menu-button {
                margin-left: 15px;

                img {
                    display: block;
                    width: 100%;
                }
            }
        }

        .user-links:hover {
            .profile-menu {
                display: block;
            }
        }
    }

    .v-menu__content {
        margin: 7px 0;

        .action-list {

            .action {
                cursor: pointer;
                font-family: "Inter-Bold", sans-serif;
                font-size: 20px;
            }
        }
    }

    .drawer {
        top: -100vh;
        left: 0;
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100vh;
        padding-top: 67px;
        transition: all 0.3s ease 0s;
        z-index: 1;

        .item:first-child {
            margin-top: 0;
        }

        .item {
            margin-top: 15px;

            a {
                font-family: 'Inter-Medium', sans-serif;
                font-size: 18px;
                line-height: 115%;
            }
        }

        .arrow-submenu {
            cursor: pointer;
            margin-left: 15px;
            width: 11px;
            height: auto;
        }

        .arrow-submenu.active {
            transform: rotate(90deg);
        }

        .arrow-submenu.active + .sub-menu {
            display: block;
        }

        .sub-menu {
            display: none;
            cursor: pointer;

            margin-top: 15px;
            padding-bottom: 7px;

            a {
                display: block;
                font-family: 'Inter-Regular', sans-serif;
                font-size: 14px;
                line-height: 115%;
                margin-left: 10px;
            }

            a:not(:last-child):not(:only-child) {
                margin-bottom: 10px;
            }
        }

        .mail {
            margin-top: 45px;

            .title {
                font-family: 'Inter-Regular', sans-serif !important;
                font-size: 12px !important;
                line-height: 125% !important;
            }

            .value {
                margin-top: 4px;
                font-family: 'Inter-Medium', sans-serif !important;
                font-size: 14px !important;
                line-height: 121% !important;
            }
        }
    }

    .drawer.active {
        top: 0;
    }
}

#app.dark {
    .header {
        background-color: #1A1A27;
    }

    .header.active {
        background-color: #090914;
    }

    .header-container {
        .menu {
            li {
                a:hover {
                    color: #9196FF !important;
                }

                a.unhovered:hover {
                    color: white !important;
                }
            }

            .sub-menu {
                background: #1A1A27;
            }
        }

        .menu-burger {
            span {
                background: url("../assets/img/png/burger-line.png");
            }
        }

        .auth:hover {
            .icon {
                img {
                    @media (min-width: 961px) {
                        display: none;
                    }
                }

                img.active {
                    @media (min-width: 961px) {
                        display: block;
                    }
                }
            }

            .entry {
                @media (min-width: 961px) {
                    color: #9196FF !important;
                }
            }
        }
    }

    .profile-menu {
        background: #1A1A27;

        a:hover, span:hover {
            color: #9196FF !important;
        }
    }

    .drawer {
        background: #090914;

        .item {
            a {
                color: #FFFFFF;
            }

            a:hover {
                color: #9196FF !important;
            }
        }
    }
}
</style>