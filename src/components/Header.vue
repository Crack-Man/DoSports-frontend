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
                    <li v-for="(page, index) in menu_pages" :key="index">
                        <router-link class="link" :to="page.url">{{ page.name }}</router-link>
                    </li>
                </ul>
                <div class="user-links" v-if="userIsAuthorized">
                    <div
                        class="login"

                    >
                        {{ userData.login }}
                    </div>
                    <v-menu
                        bottom
                        left
                        offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <img
                                :src="require('../assets/img/png/menu-button.png')"
                                v-bind="attrs"
                                v-on="on"
                            />
                            <span
                                class="login"
                                v-bind="attrs"
                                v-on="on"
                            >
                                {{ userData.login }}
                            </span>
                        </template>
                        <v-list
                            dark
                            class="action-list"
                        >
                            <v-list-item class="action" v-if="userIsAdmin">
                                <v-list-item-title>Админ-панель</v-list-item-title>
                            </v-list-item>
                            <v-list-item class="action">
                                <v-list-item-title>Профиль</v-list-item-title>
                            </v-list-item>
                            <v-list-item class="action">
                                <v-list-item-title @click="this.logout">Выйти</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
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
                        v-for="(page, index) in menu_pages"
                        :key="index"
                    >
                        <router-link class="link" :to="page.url">{{ page.name }}</router-link>
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
        userLinks: [
            { title: 'Выйти' },
        ],
    }),

    props: ['screen'],

    computed: {
        ...mapGetters(['userIsAuthorized', "userData", "userIsAdmin"]),

        menu_pages() {
            let menu_pages = [
                {
                    name: 'Калькуляторы',
                    url: '/'
                },
                {
                    name: 'Атлас тела',
                    url: '/'
                },
                {
                    name: 'Статьи',
                    url: '/'
                },
            ]
            if (this.userIsAuthorized) {
                menu_pages.unshift({
                    name: 'Спортивная программа',
                    url: 'sport-program'
                })
            }
            return menu_pages;
        }
    },

    methods: {
        ...mapActions(['unauthorized']),

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
@import "../assets/main.css";

body.lock {
    position: fixed;
    overflow: hidden;
    width: 100vw;
}

#app {
    .header {
        height: 80px;
        width: 100vw;
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
                margin-left: 35px;
                list-style-type: none;
            }

            li:first-child {
                margin-left: 0;
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
            display: flex;
            align-items: center;
            margin: 0 -6px;

            .login {
                font-family: "Inter-Bold", sans-serif;
                margin: 0 6px;
            }


            div.login {
                @media (max-width: 960px) {
                    display: none;
                }
            }

            span.login {
                display: none;
                margin-right: 25px;

                //@media (max-width: 960px) {
                //    display: block;
                //}

                @media (max-width: 450px) {
                    margin-right: 15px;
                    font-size: 14px;
                }
            }

            img {
                display: block;
                cursor: pointer;
                margin: 0 6px;

                @media (max-width: 960px) {
                    display: none;
                }
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