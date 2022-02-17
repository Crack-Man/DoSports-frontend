<template>
    <v-form>
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
            hide-details="auto"
            required
        ></v-text-field>
        <v-btn
            class="button"
            color="primary"
            @click="auth"
        >
            Войти
        </v-btn>
        {{ message }}
    </v-form>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    name: "FormAuthorization",
    data() {
        return {
            user: {
                login: "",
                password: ""
            },

            rules : {
                login: [
                    v => !!v || "Введите логин",
                    v => /^[_.\-@\w]+$/.test(v) || 'Некорректный логин',
                ]
            },

            showPass: false,
        }
    },

    computed: {
        ...mapGetters(['authStatus', 'message']),
    },

    methods: {
        ...mapActions(['authRequest', 'checkAuth']),
        auth() {
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
</script>

<style scoped>

</style>