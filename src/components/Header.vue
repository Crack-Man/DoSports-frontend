<template>
    <div class="header">
        <v-container class="header-container">
            <div class="link-main">
                <router-link to="/" class="logo">
                    <img
                         :src="require('../assets/img/png/logo.png')"
                    />
                </router-link>
                <router-link to="/">
                    <div class="text">DO SPORTS</div>
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

        menu_pages: [
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
        ],

        userLinks: [
            { title: 'Выйти' },
        ]
    }),

    computed: {
        ...mapGetters(['userIsAuthorized', "userData", "userIsAdmin"]),
    },

    watch: {
        userIsAuthorized() {
            this.checkAuthUser();
        }
    },

    methods: {

        ...mapActions(['unauthorized']),

        logout() {
            this.unauthorized().then(() => {
                this.$router.push("/");
            });
        },

        checkAuthUser() {
            if (this.userIsAuthorized) {
                this.menu_pages.push({
                    name: 'Спортивная программа',
                    url: 'sport-program'
                })
            } else {
                this.menu_pages = [
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
            }
        }
    },

    mounted() {
        this.checkAuthUser();
    }
}
</script>

<style lang="scss">
@import "../assets/main.css";

#app {
    .header {
        height: 46px;

        @media(min-width: 960px) {
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
            margin: 0 -7px;

            @media(min-width: 960px) {
                margin: 0 -10px;
            }

            .text {
                font-family: "Roboto-BoldItalic", sans-serif;
                font-size: 16px;
                margin: 0 7px;

                @media(min-width: 960px) {
                    font-size: 28px;
                    margin: 0 10px;
                }
            }

            .logo {
                margin: 0 10px;

                @media(max-width: 960px) {
                    width: 37px;
                    margin: 0 7px;
                }

                img {
                    display: block;
                    max-width: 100%;
                }
            }
        }

        .menu {
            display: none;
            font-family: "Inter-Regular", sans-serif;

            @media(min-width: 960px) {
                font-size: 16px;
                display: flex;
                margin: 0 -18px;
            }

            @media(min-width: 1264px) {
                font-size: 18px;
            }

            li {
                margin: 0 18px;
                list-style-type: none;
            }
        }

        .menu-burger {
            @media(min-width: 960px) {
                display: none;
            }
        }

        .auth {
            display: none;

            @media(min-width: 960px) {
                display: flex;
                align-items: flex-end;
                margin: 0 -10px;

                font-family: "Inter-SemiBold", sans-serif;
                font-size: 20px;
            }

            a {
                margin: 0 10px;
            }

            .icon {
                img {
                    display: block;
                    position: relative;
                    bottom: 7px;
                }
            }
        }

        .userLinks {
            display: none;


            @media(min-width: 960px) {
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
}
</style>