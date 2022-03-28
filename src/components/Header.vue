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
                <li>Калькуляторы</li>
                <li>Атлас тела</li>
                <li>Статьи</li>
            </ul>
            <div class="userLinks" v-if="userIsAuthorized">
                <router-link class="login" to="/sport-program">{{ userData.login }}</router-link>
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
                        :src="require('../assets/img/png/user.png')"
                    />
                </router-link>
                <router-link to="/auth" class="entry">
                    Войти
                </router-link>
            </div>
        </v-container>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Header",

    data: () => ({
        userLinks: [
            { title: 'Выйти' },
        ]
    }),

    computed: {
        ...mapGetters(['userIsAuthorized', "userData", "userIsAdmin"]),
    },

    methods: {

        ...mapActions(['unauthorized']),

        logout() {
            this.unauthorized().then(() => {
                this.$router.push("/");
            });
        }
    }
}
</script>

<style lang="scss">
@import "../assets/main.css";

#app {
    .header {
        height: 90px;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;

        .link-main {
            display: flex;
            align-items: center;
            margin: 0 -10px;

            .text {
                font-family: "Roboto-BoldItalic", serif;
                font-size: 28px;
                margin: 0 10px;
            }

            .logo {
                margin: 0 10px;

                img {
                    display: block;
                }
            }
        }

        .menu {
            display: flex;
            margin: 0 -25px;

            font-family: "Inter-Regular", serif;
            font-size: 18px;

            li {
                margin: 0 25px;
                list-style-type: none;
            }
        }

        .auth {
            display: flex;
            align-items: flex-end;
            margin: 0 -10px;

            font-family: "Inter-SemiBold", serif;
            font-size: 20px;

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
            display: flex;
            align-items: center;
            margin: 0 -6px;

            .login {
                font-family: "Inter-Bold", serif;
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
                font-family: "Inter-Bold", serif;
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