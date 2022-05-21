<template>
    <v-form class="form-change-password" ref="form" lazy-validation>
        <title-page class="password" name="Пароль"/>
        <v-text-field
            label="Новый пароль"
            class="input password"
            :append-icon="showPass ? 'mdi-eye dark' : 'mdi-eye-off dark'"
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
            :rules="rules.password"
            v-model="user.password"
            hide-details="auto"
            dark
            outlined
            required
        ></v-text-field>
        <v-text-field
            label="Повторите новый пароль"
            class="input"
            :append-icon="showPassRepeat ? 'mdi-eye dark' : 'mdi-eye-off dark'"
            :type="showPassRepeat ? 'text' : 'password'"
            @click:append="showPassRepeat = !showPassRepeat"
            :rules="rules.rePassword"
            v-model="passwordRepeat"
            hide-details="auto"
            dark
            outlined
            required
        ></v-text-field>
        <v-btn
            class="button"
            color="primary"
            :loading="progress"
            @click="changePassword"
        >
            Сохранить
        </v-btn>
    </v-form>
</template>

<script>
import Title from "@/components/Title";
import axios from "axios";
import url from "@/services/url";
import {mapGetters} from "vuex";

export default {
    name: "FormChangePassword",

    components: {
        "title-page": Title,
    },

    data: () => ({
        progress: false,

        user: {
            id: 0,
            password: ""
        },

        showPass: false,
        showPassRepeat: false,
        passwordRepeat: "",

        rules: {
            password: [
                v => /^[^'"`]+$/.test(v) || 'Некорректный пароль',
                v => v.length >= 7 || 'Пароль должен состоять как минимум из 7 символов',
            ],

            rePassword: [],
        },
    }),

    computed: {
        ...mapGetters(['userData']),
    },

    methods: {
        updateRules() {
            this.rules.rePassword = [
                v => this.user.password === v || 'Пароли должны совпадать'
            ];
        },

        loadUserData() {
            this.user.id = this.userData.id;
        },

        async changePassword() {
            if (this.$refs.form.validate()) {
                this.progress = true;
                await axios.post(`${url}/api/users/change-password`, this.user).then((res) => {
                    this.progress = false;
                    if (res.data.name === "Success") {
                        this.$router.go();
                    }
                });
            }
        },
    },

    mounted() {
        this.loadUserData();
        this.updateRules();
    }
}
</script>

<style lang="scss">
#app {
    .form-change-password {
        .title-page.password {
            margin-top: 45px;
            font-family: 'Inter-SemiBold', sans-serif;
            font-size: 32px;
            line-height: 122%;
        }

        .input {
            width: 540px;
        }

        .input.password {
            margin-top: 50px;
        }

        .button {
            margin-top: 10px;
            width: 255px;
            height: 50px;
        }
    }
}
</style>