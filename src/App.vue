<template>
    <v-app>
        <v-main>
            <v-container>
                <router-link to="/">Home</router-link>
                |
                <router-link to="/about">About</router-link>
                |
                <router-link v-if="!this.userIsAuthorized" to="/reg">Registation</router-link>
                <span v-if="!this.userIsAuthorized">|</span>
                <a style="text-decoration: underline" v-if="this.userIsAuthorized" @click="this.logout">Logout</a>
                <router-link v-else to="/auth">Login</router-link>
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
