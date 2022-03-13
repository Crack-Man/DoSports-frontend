<template>
    <v-app>
        <v-main>
            <div class="progress-main" v-if="this.progress">
            </div>
            <v-container v-else>
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

    data: () => ({
        progress: true
    }),

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
            this.progress = false
        });
    }
};
</script>

<style lang="scss">
.progress-main {
    left: 0;
    top: 0;
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: #fff;

    .icon {
        position: absolute;
        left: calc(50% - 50px / 2);
        bottom: calc(50% - 50px / 2);
    }
}
</style>