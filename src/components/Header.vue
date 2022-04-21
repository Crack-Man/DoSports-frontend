<template>
    <div class="header">
        <v-container class="header-container">
            <div class="link-main">
                <router-link to="/" class="logo">
                    <img
                         :src="require('../assets/img/png/logo.png')"
                    />
                </router-link>
                <router-link to="/" class="text">
                    <img
                        :src="require('../assets/img/png/DO_SPORTS-small.png')"
                    />
                </router-link>
            </div>
            <ul class="menu">
                <li v-for="(page, index) in menu_pages" :key="index">
                    <router-link class="link" :to="page.url">{{ page.name }}</router-link>
                </li>
            </ul>
            <div class="userLinks" v-if="userIsAuthorized">
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
            </div>
            <div class="auth" v-else>
                <router-link to="/auth" class="icon">
                    <img
                        :src="require('@/assets/img/png/user.png')"
                    />
                </router-link>
                <router-link to="/auth" class="entry">
                    Войти
                </router-link>
            </div>
            <v-navigation-drawer
                app
                right
                absolute
                temporary
                dark
                v-model="drawer"
            >
                <v-list>
                    <v-list-item-group
                        active-class="grey--text text--accent-4"
                    >
                        <v-list-item
                            v-for="(page, index) in menu_pages"
                            :key="index"
                        >
                            <v-list-item-title>
                                <router-link class="link" :to="page.url">{{ page.name }}</router-link>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar-nav-icon class="menu-burger" color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-container>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Header",

    data: () => ({
        drawer: false,

        userLinks: [
            { title: 'Выйти' },
        ]
    }),

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
    },
}
</script>

<style lang="scss">
@import "../assets/main.css";

#app {
    .header {
        height: 48px;

        @media(min-width: 961px) {
            height: 80px;
        }
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;

        .link-main {
            display: flex;
            align-items: center;

            .text {
                font-family: "Roboto-BoldItalic", sans-serif;
                font-size: 16px;
                margin-left: 20px;

                @media(min-width: 961px) {
                    font-size: 28px;
                }
            }

            .logo {
                @media(max-width: 961px) {
                    width: 37px;
                }

                img {
                    display: block;
                    max-width: 100%;
                }
            }

            .text {
                img {
                    display: block;
                    max-width: 100%;
                }
            }
        }

        .menu {
            display: none;
            font-family: "Inter-Regular", sans-serif;
            padding-left: 0 !important;

            @media(min-width: 961px) {
                font-size: 16px;
                display: flex;
            }

            @media(min-width: 1264px) {
                font-size: 18px;
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
            @media(min-width: 961px) {
                display: none;
            }
        }

        .auth {
            display: none;

            @media(min-width: 961px) {
                display: flex;
                align-items: flex-end;

                font-family: "Inter-Medium", sans-serif;
                font-size: 20px;
            }
            .icon {
                img {
                    display: block;
                    position: relative;
                    bottom: 7px;
                }
            }

            .entry {
                margin-left: 20px;
            }
        }

        .userLinks {
            display: none;


            @media(min-width: 961px) {
                display: flex;
                align-items: center;
                margin: 0 -6px;
            }

            .login {
                font-family: "Inter-Bold", sans-serif;
                margin: 0 6px;
            }

            img {
                display: block;
                cursor: pointer;
                margin: 0 6px;
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
}

#app.dark {
    .header {
        background-color: #1A1A27;
    }

    .header-container {
        .menu {
            li {
                a:hover {
                    color: #9196FF !important;
                }
            }
        }

        .entry:hover {
            color: #9196FF !important;
        }
    }
}
</style>