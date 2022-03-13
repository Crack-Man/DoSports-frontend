<template>
    <v-form v-if="!userIsAuthorized" ref="form">
        <v-text-field
            label="Адрес электронной почты или логин"
            v-model="user.login"
            :rules="rules.login"
            hide-details="auto"
            required
        ></v-text-field>
        <v-text-field
            label="Пароль"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
            v-model="user.password"
            :rules="rules.password"
            hide-details="auto"
            required
        ></v-text-field>
        Еще нет аккаунта? <router-link to="/reg">Зарегистрироваться</router-link>

        <restore-password></restore-password>

        <v-btn
            class="button"
            :loading="this.restoreProgress"
            color="primary"
            @click="auth"
        >
            Войти
        </v-btn>
        <a href="/api/vk-auth">Войти через VK</a>
        {{ message }}
    </v-form>
    <error-405 v-else></error-405>
</template>

<script>
import RestorePassword from "./RestorePassword";
import {mapGetters, mapActions} from 'vuex';
import Error405 from "./Error405";

export default {
    name: "FormAuthorization",

    components: {
        'restore-password': RestorePassword,
        "error-405": Error405
    },

    data: () => ({
        user: {
            login: "",
            password: ""
        },

        rules: {
            login: [
                v => !!v || "Введите логин",
                v => /^[_.\-@\w]+$/.test(v) || 'Некорректный логин',
            ],

            password: [
                v => !!v || "Введите пароль"
            ]
        },

        showPass: false,
    }),

    computed: {
        ...mapGetters(['authStatus', 'message', 'restoreProgress', "time", "nonActiveButton", 'userIsAuthorized']),
    },

    methods: {
        ...mapActions(['authRequest', 'checkAuth']),
        auth() {
            if (this.$refs.form.validate()) {
                this.authRequest(this.user).then(() => {
                    if (this.authStatus === "Success") {
                        this.$router.push("/").then(() => {
                            this.checkAuth()
                        });
                    }
                });
            }
        }
    }
}
</script>

<style scoped>

</style>