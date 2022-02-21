<template>
    <div class="">
        <span class="restore-pass-button" @click="popupVisible = true">Забыли пароль?</span>

        <v-dialog
            v-model="popupVisible"
            persistent
            max-width="500px"
        >
            <v-card>
                <v-btn
                    icon
                    dark
                    @click="closePopup"
                >
                    <v-icon color="black">mdi-close</v-icon>
                </v-btn>

                <v-card-title>
                    <span>Восстановление пароля</span>
                    <v-spacer></v-spacer>
                </v-card-title>

                <v-card-text v-if="this.restoreStep === 1">
                    <v-form ref="form1">
                        <v-text-field
                            label="E-mail"
                            v-model="user.email"
                            :rules="rules.email"
                            hide-details="auto"
                            required
                        ></v-text-field>
                        <v-card-actions>
                            <v-btn
                                color="primary"
                                @click="checkEmail"
                                :loading="this.restoreProgress"
                            >Получить код</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>

                <v-card-text v-if="this.restoreStep === 2">

                    {{ restoreMessage }}

                    <v-text-field
                        label="Код"
                        v-model="user.code"
                        :rules="rules.code"
                        type="number"
                        v-mask="'#####'"
                        hide-details="auto"
                        required
                    ></v-text-field>
                    <v-progress-circular
                        v-show="this.restoreProgress"
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            @click="resendCode"
                            :disabled="this.nonActiveButton"
                        >Получить код</v-btn>
                    </v-card-actions>
                    <p v-show="this.nonActiveButton">Получить код повторно можно через {{ this.time }} секунд</p>
                </v-card-text>

                <v-card-text v-if="this.restoreStep === 3">

                    <v-form ref="form3">
                        <v-text-field
                            label="Новый пароль"
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text' : 'password'"
                            @click:append="showPass = !showPass"
                            :rules="rules.password"
                            v-model="user.password"
                            hide-details="auto"
                            required
                        ></v-text-field>

                        <v-text-field
                            label="Повторите новый пароль"
                            :append-icon="showPassRepeat ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassRepeat ? 'text' : 'password'"
                            @click:append="showPassRepeat = !showPassRepeat"
                            :rules="rules.rePassword"
                            v-model="passwordRepeat"
                            hide-details="auto"
                            required
                        ></v-text-field>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                @click="changePass"
                                :loading="this.restoreProgress"
                            >Сохранить</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>

                <v-card-text v-if="this.restoreStep === 4">
                    Ваш пароль успешно восстановлен
                </v-card-text>

            </v-card>

        </v-dialog>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    name: "RestorePassword",
    data: () => ({
        popupVisible: false,

        user: {
            email: "",
            code: "",
            password: "",
        },

        passwordRepeat: "",

        message: "",

        rules: {
            email: [
                v => !!v || 'Введите e-mail'
            ],

            code: [],

            password: [
                v => /^[^'"`]+$/.test(v) || 'Некорректный пароль',
                v => v.length >= 7 || 'Пароль должен состоять как минимум из 7 символов',
            ],

            rePassword: [],
        },

        showPass: false,
        showPassRepeat: false,
    }),

    computed: {
        ...mapGetters(['restoreData', 'restoreStep', 'restoreProgress', "restoreMessage", "time", "nonActiveButton"]),
    },

    watch: {
        restoreData() {
            this.changes();
        },

        'user.email'() {
            this.changes();
        },

        'user.code'() {
            if (this.user.code.length === 5) {
                this.checkCode();
            }
            this.changes()
        },

        passwordRepeat() {
            if (this.passwordRepeat !== this.user.password) {
                this.rules.rePassword = [
                    () => 'Пароли должны совпадать'
                ];
            } else {
                this.rules.rePassword = []
            }
        }
    },

    methods: {
        ...mapActions(['sendRestoreCode', 'resendRestoreCode', 'closePopupRestore', 'changeRestoreDataName', 'compareCode', 'setRestoreProgress', 'changePassword', 'startTimer', "changeButtonStatus"]),

        checkEmail() {
            if (this.$refs.form1.validate()) {
                this.setRestoreProgress(true);
                this.sendRestoreCode(this.user);
            }
        },

        resendCode() {
            this.resendRestoreCode(this.user);
            this.changeButtonStatus(true);
            this.startTimer(60);
        },

        checkCode() {
            this.setRestoreProgress(true);
            this.compareCode(this.user);
        },

        changePass() {
            if (this.$refs.form3.validate()) {
                this.setRestoreProgress(true);
                this.changePassword(this.user);
            }
        },

        closePopup() {
            this.user.email = "";
            this.user.code = "";
            this.user.password = "";
            this.passwordRepeat = "";
            this.popupVisible = false;
            this.closePopupRestore()
        },

        changes() {
            if (this.restoreStep === 1) {
                if (this.restoreData.name === "Error") {
                    this.rules.email = [
                        v => !!v || 'Введите e-mail',
                        () => this.restoreData.text
                    ];
                    this.changeRestoreDataName("");
                } else {
                    this.rules.email = [
                        v => !!v || 'Введите e-mail'
                    ];
                }
            } else if (this.restoreStep === 2) {
                if (this.restoreData.name === "Success") {
                    if (!this.restoreData.match) {
                        this.rules.code = [
                            () => this.restoreData.text
                        ];
                        this.changeRestoreDataName("");
                    } else {
                        this.rules.code = [];
                    }
                } else {
                    this.rules.code = [];
                }
            }
        },
    }
}
</script>

<style lang="scss">
.restore-pass-button {
    cursor: pointer;
    text-decoration: underline;
}
</style>