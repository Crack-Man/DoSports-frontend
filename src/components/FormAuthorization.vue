<template>
    <div  v-if="!userIsAuthorized">
        <title-page name="Авторизация"></title-page>
        <v-form class="form-auth" ref="form">
            <v-text-field
                label="Почта/Логин"
                class="input"
                name="login"
                v-model="user.login"
                :rules="rules.login"
                hide-details="auto"
                outlined
                required
                dark
            ></v-text-field>
            <v-text-field
                label="Пароль"
                class="input password"
                name="password"
                :append-icon="showPass ? 'mdi-eye dark' : 'mdi-eye-off dark'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                v-model="user.password"
                :rules="rules.password"
                hide-details="auto"
                outlined
                required
                dark
            ></v-text-field>

            <div class="error-auth">
                {{ text }}
            </div>

            <restore-password></restore-password>

            <div class="registration-link">
                Еще нет аккаунта?
                <router-link class="reg" to="/reg">Зарегистрироваться</router-link>
            </div>

            <div class="button-group">
                <v-btn
                    class="button"
                    :loading="this.restoreProgress"
                    @click="auth"
                >
                    Войти
                </v-btn>

                <a href="/api/vk-auth" class="entry-vk">
                    <img
                        :src="require('../assets/img/png/entry-vk.png')"
                    />
                </a>
            </div>
        </v-form>
    </div>
    <error-405 v-else></error-405>
</template>

<script>
import RestorePassword from "./RestorePassword";
import {mapGetters, mapActions} from 'vuex';
import Error405 from "./Error405";
import Title from "@/components/Title";

export default {
    name: "FormAuthorization",

    components: {
        'restore-password': RestorePassword,
        "error-405": Error405,
        'title-page': Title,
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
                v => !!v || "Введите пароль",
            ]
        },

        text: "",

        resetText: true,
        showPass: false,
    }),

    computed: {
        ...mapGetters(['authStatus', 'message', 'restoreProgress', "time", "nonActiveButton", 'userIsAuthorized']),
    },

    watch: {
        'user.login' () {
            this.text = "";
        },

        'user.password' () {
            if (this.resetText) this.text = "";
            this.resetText = true;
        }
    },

    methods: {
        ...mapActions(['authRequest', 'checkAuth']),
        auth() {
            this.text = "";
            if (this.$refs.form.validate()) {
                this.authRequest(this.user).then(() => {
                    if (this.authStatus === "Success") {
                        this.$router.push("/").then(() => {
                            // this.checkAuth();
                            this.$router.go(0);
                        });
                    } else {
                        if (this.message) {
                            this.resetText = false;
                            this.user.password = "";
                            this.$refs.form.resetValidation();
                            this.text = "Проверьте правильность логина или пароля";
                        }
                    }
                });
            }
        },
    }
}
</script>

<style lang="scss">
@import "../assets/main.css";
@import "../assets/forms.scss";

#app {
    .form-auth {
        .registration-link {
            font-family: 'Inter-Regular', sans-serif;
            font-size: 16px;
            line-height: 180%;
            margin-top: 5px;

            .reg {
                font-family: 'Inter-Regular', sans-serif !important;
                margin: 0 0 0 20px;
                text-decoration-line: underline !important;
            }
        }

        .error-auth {
            line-height: 135%;
            font-size: 14px;
            font-family: "Inter-Regular", sans-serif;
            position: relative;
            bottom: 9px;
        }

        .button-group {
            display: flex;
            align-items: center;
            margin-top: 30px;

            .entry-vk {
                position: relative;
                margin-left: 25px;
                width: 215px;
                height: 50px;

                img {
                    display: block;
                    max-width: 100%;
                }
            }

            .entry-vk::before {
                background-color: currentColor;
                border-radius: inherit;
                bottom: 0;
                color: inherit;
                content: "";
                left: 0;
                opacity: 0;
                pointer-events: none;
                position: absolute;
                right: 0;
                top: 0;
                transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
            }

            .entry-vk:hover::before {
                opacity: 0.08;
            }

            .button {
                margin-top: 0;
            }
        }
    }

}

#app.dark {
    .error-auth {
        color: #FF5B5B;
    }
}

</style>