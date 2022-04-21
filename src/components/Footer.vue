<template>
    <div class="footer">
        <v-container>
            <div class="site-name">
                <div class="logo">
                    <router-link to="/">
                        <img
                            :src="require('@/assets/img/png/logo-large.png')"
                        >
                    </router-link>
                </div>
                <div class="text">
                    <router-link to="/">
                        <img
                            :src="require('@/assets/img/png/DO_SPORTS.png')"
                        >
                    </router-link>
                </div>
            </div>
            <div class="content">
                <div class="left">
                    <div class="email">
                        <p class="summary">Почта:</p>
                        <a href="mailto:support@dosports.ru" class="text">support@dosports.ru</a>
                    </div>
                    <div class="copyright">
                        © 2022 DO SPORTS (Версия сайта: 1.0.0)
                    </div>
                </div>
                <div class="center">
                    <ul class="menu">
                        <li v-for="(page, index) in menu_pages" :key="index">
                            <router-link class="link" :to="page.url">{{ page.name }}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <router-link class="google-play" to="/">
                        <img
                            :src="require('@/assets/img/png/download-google-play.png')"
                        >
                    </router-link>
                    <router-link class="app-store" to="/">
                        <img
                            :src="require('@/assets/img/png/download-app-store.png')"
                        >
                    </router-link>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "Footer",

    data: () => ({
    }),

    computed: {
        ...mapGetters(['userIsAuthorized', "userData", "userIsAdmin"]),

        menu_pages() {
            let menu_pages = [
                {
                    name: 'Калькулятор ИМТ',
                    url: '/'
                },
                {
                    name: 'Калькулятор БЖУ',
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
            } else {
                menu_pages.push({
                    name: 'Личный кабинет',
                    url: 'auth'
                })
            }
            return menu_pages;
        }
    },

    methods: {
        positionFooter() {
            let footer = document.querySelector(".footer");
            footer.style.display = "none";
            let contentSize = document.querySelector('.content-main').scrollHeight;
            let difference = contentSize - document.documentElement.clientHeight;
            footer.style.marginTop = difference < -200 ? `${difference * (-1)}px` : `${200}px`;
            footer.style.display = "block";
        },
    },

    mounted() {
        this.positionFooter();
        window.onresize = () => {
            this.positionFooter();
        }

    }
}
</script>

<style lang="scss">

#app {
    .footer {
        display: none;
        background: #1A1A27;
        width: 100%;
        margin-top: 200px;
        padding: 55px 0;

        .site-name {
            display: flex;
            align-items: center;

            .logo {
                margin-right: 30px;
            }
        }

        .content {
            display: flex;
            margin-top: 40px;

            .left {
                .email {
                    .summary {
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 16px;
                        line-height: 119%;
                        margin-bottom: 15px;
                    }

                    .text {
                        font-family: 'Inter-Medium', sans-serif;
                        font-size: 18px;
                        line-height: 121%;
                    }
                }

                .copyright {
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 16px;
                    line-height: 150%;
                    margin-top: 30px;
                }
            }

            .center {
                margin-left: 195px;
                flex: 1 1 auto;

                .menu {
                    font-family: "Inter-Medium", sans-serif;
                    font-size: 18px;
                    line-height: 150%;

                    li {
                        list-style-type: none;
                        margin-top: 10px;
                    }

                    li:first-child {
                        margin: 0;
                    }
                }
            }

            .right {
                flex: 0 0 auto;
                a {
                    display: block;
                    line-height: 0;
                }

                a.app-store {
                    margin-top: 15px;
                }
            }
        }
    }
}

#app.dark {
    .footer {
        .content {
            .left {
                .email {
                    .text:hover {
                        color: #9196FF !important;
                    }
                }
            }

            .center {
                .menu {
                    li {
                        a:hover {
                            color: #9196FF !important;
                        }
                    }
                }
            }
        }
    }
}

</style>