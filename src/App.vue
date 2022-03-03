<template>
    <v-app>
        <v-main>
            <v-container>
                <router-link to="/">Главная</router-link>
                |
                <router-link to="/about">О нас</router-link>
                |
                <span v-if="this.userIsAuthorized">
                    <router-link to="/start-program">Начать программу</router-link>
                    |
                    <a style="text-decoration: underline" @click="this.logout">Выйти</a>
                </span>
                <span v-else>
                    <router-link to="/reg">Регистрация</router-link>
                    |
                    <router-link to="/auth">Войти</router-link>
                </span>
                <p>{{ userIsAdmin ? "Вы админ" : "" }}</p>
                <p>{{ userData }}</p>
                <v-spacer></v-spacer>
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'App',

    data: () => ({}),

    computed: {
        ...mapGetters(['userIsAuthorized', "userData", "userIsAdmin"]),
    },

    methods: {
        ...mapActions(['checkAuth', 'unauthorized', 'checkAdmin']),

        logout() {
            this.unauthorized().then(() => {
                this.$router.push("/");
            });
        }
    },

    mounted() {
        this.checkAuth().then(() => {
        });
    }
};
</script>
