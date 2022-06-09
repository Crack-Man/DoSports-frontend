<template>
    <div class="footer">
        <v-container class="container-footer">
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
                            class="pc"
                            :src="require('@/assets/img/png/DO_SPORTS.png')"
                        >
                        <img
                            class="mobile"
                            :src="require('@/assets/img/svg/DO_SPORTS-small.svg')"
                        >
                    </router-link>
                </div>
            </div>
            <div class="content">
                <div class="left">
                    <div class="email">
                        <span class="summary">Почта:</span>
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
        size: document.querySelector('.content-main').scrollHeight
    }),

    computed: {
        ...mapGetters(['userIsAuthorized', "userData", "userIsAdmin"]),

        menu_pages() {
            let menu_pages = [
                {
                    name: 'Калькулятор ИМТ',
                    url: '/calc-bmi'
                },
                {
                    name: 'Калькулятор БЖУ',
                    url: '/calc-pfc'
                },
                {
                    name: 'Статьи',
                    url: '/articles'
                },
            ]
            if (this.userIsAuthorized) {
                menu_pages.unshift({
                    name: 'Спортивная программа',
                    url: '/sport-program'
                })
            } else {
                menu_pages.push({
                    name: 'Личный кабинет',
                    url: '/auth'
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
            if (document.documentElement.clientWidth >= 960) {
                footer.style.marginTop = difference < -200 ? `${difference * (-1)}px` : `${200}px`;
            } else if (document.documentElement.clientWidth >= 700) {
                footer.style.marginTop = difference < -120 ? `${difference * (-1)}px` : `${120}px`;
            } else {
                footer.style.marginTop = difference < -100 ? `${difference * (-1)}px` : `${100}px`;
            }
            footer.style.display = "block";
        },
    },

    watch: {
        size() {
            this.positionFooter();
        }
    },

    mounted() {
        setTimeout(() => {this.positionFooter();}, 500);
        setInterval(() => {
            this.size = document.querySelector('.content-main').scrollHeight;
        }, 100)

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


        .container-footer {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }

        @media (max-width: 800px) {
            padding: 30px 0;
        }

        .site-name {
            display: flex;
            align-items: center;

            .logo {
                width: 58px;

                @media (max-width: 800px) {
                    width: 36px;
                }

                @media (max-width: 550px) {
                    width: 41px;
                }

                img {
                    display: block;
                    width: 100%;
                }
            }

            .text {
                height: 28px;
                margin-left: 30px;

                @media (max-width: 800px) {
                    height: 20px;
                    margin-left: 15px;
                }

                @media (max-width: 550px) {
                    height: 20px;
                    margin-left: 20px;
                }

                a {
                    display: block;
                    height: 100%;
                }

                .pc {
                    @media (max-width: 800px) {
                        display: none;
                    }

                    img {
                        display: block;
                        width: 100%;
                    }
                }

                .mobile {
                    display: none;
                    width: 120px;

                    @media (max-width: 800px) {
                        display: block;
                    }

                    img {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }

        .content {
            display: flex;
            margin-top: 40px;
            justify-content: space-between;

            .left {
                .email {
                    .summary {
                        display: block;
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 16px;
                        line-height: 119%;

                        @media (max-width: 1263px) {
                            font-size: 14px;
                        }

                        @media (max-width: 800px) {
                            font-size: 12px;
                        }

                        @media (max-width: 550px) {
                            line-height: 121%;
                            font-size: 12px;
                        }
                    }

                    .text {
                        display: block;
                        font-family: 'Inter-Medium', sans-serif;
                        font-size: 18px;
                        line-height: 121%;
                        margin-top: 15px;

                        @media (max-width: 1263px) {
                            font-size: 16px;
                            margin-top: 5px;
                        }

                        @media (max-width: 800px) {
                            font-size: 14px;
                            margin-top: 0;
                        }

                        @media (max-width: 550px) {
                            margin-top: 5px;
                        }
                    }
                }

                .copyright {
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 16px;
                    line-height: 150%;
                    margin-top: 30px;

                    @media (max-width: 1263px) {
                        font-size: 14px;
                        margin-top: 20px;
                    }

                    @media (max-width: 850px) {
                        width: 150px;
                    }

                    @media (max-width: 550px) {
                        margin-top: 25px;
                    }

                    @media (max-width: 350px) {
                        margin-top: 20px;
                        font-size: 13px;
                    }
                }
            }

            .center {
                flex: 0 1 auto;
                margin-right: 25px;

                @media (max-width: 550px) {
                    display: none;
                }

                .menu {
                    font-family: "Inter-Medium", sans-serif;
                    font-size: 18px;
                    line-height: 150%;

                    @media (max-width: 1263px) {
                        font-size: 16px;
                    }

                    @media (max-width: 800px) {
                        font-size: 14px;
                    }

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
                    width: 196px;

                    @media (max-width: 960px) {
                        width: 160px;
                    }

                    @media (max-width: 800px) {
                        width: 150px;
                    }

                    @media (max-width: 350px) {
                        width: 130px;
                    }

                    img {
                        display: block;
                        width: 100%;
                    }
                }

                a.app-store {
                    margin-top: 15px;

                    @media (max-width: 960px) {
                        margin-top: 10px;
                    }

                    @media (max-width: 550px) {
                        margin-top: 15px;
                    }
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