<template>
    <v-app v-bind:class="theme">
        <v-main>
            <div class="progress-main" v-if="this.progress">
            </div>
            <div v-else>
                <header-main/>
                <router-view/>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Header from "./components/Header";

export default {
    name: 'App',

    components: {
        "header-main": Header,
    },

    data: () => ({
        progress: true,
    }),

    computed: {
        ...mapGetters(['userIsAuthorized', "userData", "userIsAdmin"]),

        theme() {
            let value = localStorage.getItem("theme") || "";
            if (!value) {
                localStorage.setItem("theme", "dark");
                value = "dark";
            }
            return value;
        }
    },

    methods: {
        ...mapActions(['checkAuth', 'unauthorized', 'checkAdmin']),
    },

    mounted() {
        this.checkAuth().then(() => {
            this.progress = false
        });
    }
};
</script>

<style lang="scss">
@import "./assets/main.css";

#app {
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-family: "Inter-Regular", serif;

    a, a:active, a:visited, a:hover {
        text-decoration: none !important;
    }

    .container {
        padding: 24px;

        @media (min-width: 960px) {
            padding: 0px;
        }

        @media (min-width: 1264px) {
            max-width: 1110px;
        }

        @media (min-width: 1904px) {
            max-width: 1110px;
        }
    }

    .progress-main {
        left: 0;
        top: 0;
        position: absolute;
        height: 100vh;
        width: 100vw;
        background-color: white;

        .icon {
            position: absolute;
            left: calc(50% - 50px / 2);
            bottom: calc(50% - 50px / 2);
        }
    }
}

#app.dark {
    background-color: #090914;
    color: white;

    a, a:active, a:visited, a:hover {
        color: white !important;
    }

    .progress-main {
        background-color: #090914;
    }
}
</style>