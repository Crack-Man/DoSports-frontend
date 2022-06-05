<template>
    <v-app v-bind:class="theme">
        <v-main>
            <div class="content-main">
                <div class="progress-main" v-if="this.progress">
                    <v-progress-circular
                        v-if="timerCount === 0"
                        size="50"
                        class="icon"
                        indeterminate
                        color="#004BD7"
                    ></v-progress-circular>
                </div>
                <div v-else>
                    <router-view/>
                </div>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'App',

    components: {
    },

    data: () => ({
        progress: true,
        timerCount: 3,
    }),

    computed: {
        ...mapGetters(['userIsAuthorized', "userData", "userIsAdmin", "userIsPro"]),

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
        ...mapActions(['checkAuth', 'unauthorized', 'checkAdmin', 'checkPro']),

        async initUser() {
            await this.checkAuth().then(async () => {
                if (this.userIsAuthorized) {
                    await this.checkPro(this.userData.id).then(() => {
                        this.progress = false
                    })
                } else {
                    this.progress = false
                }
            });
        }
    },

    mounted() {
        setInterval(() => {
            if (this.timerCount > 0) this.timerCount--;
        }, 1000);
        this.initUser();
    }
};
</script>

<style lang="scss">
@import "assets/scss/fonts.css";

#app {
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-family: "Inter-Regular", sans-serif;

    a, a:active, a:visited, a:hover {
        text-decoration: none !important;
    }

    .container {
        padding: 0 15px;

        @media (min-width: 450px) {
            padding: 0 30px;
        }

        @media (min-width: 960px) {
            padding: 0;
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

    span.selected-text {
        font-style: italic;
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

    span.selected-text {
        color: #9196FF;
    }
}
</style>