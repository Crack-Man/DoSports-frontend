<template>
    <v-app>
        <v-main>
            <v-container>
                <router-link to="/">Главная</router-link>
                |
                <router-link to="/about">О нас</router-link>
                |
                <router-link v-if="!this.userIsAuthorized" to="/reg">Регистрация</router-link>
                <span v-if="!this.userIsAuthorized">|</span>
                <a style="text-decoration: underline" v-if="this.userIsAuthorized" @click="this.logout">Выйти</a>
                <router-link v-else to="/auth">Войти</router-link>
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
