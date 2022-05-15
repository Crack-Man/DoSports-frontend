<template>
    <div class="restore-pass">
        <span class="restore-pass-button" @click="popupVisible = true">Забыли пароль?</span>

        <v-dialog
            v-model="popupVisible"
            persistent
            max-width="500px"
            dark
        >
            <v-card>
                <v-btn
                    icon
                    dark
                    class="close"
                    @click="closePopup"
                >
                    <img
                        :src="require('../assets/img/png/close.png')"
                    />
                </v-btn>
                <v-card-text v-if="this.restoreStep === 1">
                    <div class="popup-title">Восстановление пароля</div>

                    <v-form class="form-restore" ref="form1">
                        <v-text-field
                            label="Почта"
                            class="input"
                            v-model="user.email"
                            :rules="rules.email"
                            hide-details="auto"
                            outlined
                            dark
                            required
                        ></v-text-field>
                        <v-card-actions>
                            <v-btn
                                class="button"
                                @click="checkEmail"
                                :loading="this.restoreProgress"
                            >Получить код</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>

                <v-card-text v-if="this.restoreStep === 2">
                    <div class="popup-title">Восстановление пароля</div>
                    <v-form class="form-restore code" ref="form2">
                        <label class="code">Введите код, который пришел вам на почту <span class="email">{{ this.user.email }}</span></label>
                        <v-text-field
                            class="input code"
                            v-model="user.code"
                            :rules="rules.code"
                            type="number"
                            v-mask="'#####'"
                            hide-details="auto"
                            outlined
                            dark
                            required
                        ></v-text-field>
                        <v-card-actions>
                            <v-btn
                                class="button"
                                @click="resendCode"
                                :disabled="this.nonActiveButton"
                            >Получить код</v-btn>
                        </v-card-actions>
                        <div class="text-restore" v-show="this.nonActiveButton">Получить код повторно можно через 00:{{ this.time }}</div>
                    </v-form>
                </v-card-text>

                <v-card-text v-if="this.restoreStep === 3">
                    <div class="popup-title">Восстановление пароля</div>

                    <v-form class="form-restore" ref="form3">
                        <v-text-field
                            label="Новый пароль"
                            class="input"
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text' : 'password'"
                            @click:append="showPass = !showPass"
                            :rules="rules.password"
                            v-model="user.password"
                            hide-details="auto"
                            outlined
                            dark
                            required
                        ></v-text-field>

                        <v-text-field
                            label="Повторите новый пароль"
                            class="input restore"
                            :append-icon="showPassRepeat ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassRepeat ? 'text' : 'password'"
                            @click:append="showPassRepeat = !showPassRepeat"
                            :rules="rules.rePassword"
                            v-model="passwordRepeat"
                            hide-details="auto"
                            outlined
                            dark
                            required
                        ></v-text-field>

                        <v-card-actions>
                            <v-btn
                                class="button"
                                @click="changePass"
                                :loading="this.restoreProgress"
                            >Сохранить</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>

                <v-card-text v-if="this.restoreStep === 4">
                    <div class="popup-title end">Ваш пароль успешно восстановлен</div>

                    <v-card-actions>
                        <v-btn
                            class="button entry"
                            @click="closePopup"
                        >Войти</v-btn>
                    </v-card-actions>
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
            this.checkPasswordRepeat();
        },
    },

    methods: {
        ...mapActions(['sendRestoreCode', 'resendRestoreCode', 'closePopupRestore', 'changeRestoreDataName', 'compareCode', 'setRestoreProgress', 'changePassword', 'startTimer', "changeButtonStatus"]),

        checkPasswordRepeat() {
            if (this.passwordRepeat !== this.user.password) {
                this.rules.rePassword = [
                    () => 'Пароли должны совпадать'
                ];
                return false;
            } else {
                this.rules.rePassword = []
                return true;
            }
        },

        checkEmail() {
            if (this.$refs.form1.validate()) {
                this.sendRestoreCode(this.user);
            }
        },

        resendCode() {
            this.resendRestoreCode(this.user);
            this.changeButtonStatus(true);
            this.startTimer(60);
        },

        checkCode() {
            this.compareCode(this.user);
        },

        changePass() {
            if (this.$refs.form3.validate() && this.checkPasswordRepeat()) {
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
@import "../assets/scss/fonts.css";
@import "../assets/scss/forms";
@import "../assets/scss/popups";

#app {
    .restore-pass {
        margin-top: 13px;

        .restore-pass-button {
            cursor: pointer;
            text-decoration: underline;
            line-height: 180%;
            font-family: 'Inter-Regular', sans-serif;
            font-size: 16px;
        }
    }

    .v-dialog {
        width: 473px;
    }

    .v-card__text {
        padding: 0;

        .popup-title.end {
            text-align: center;
        }


        .form-restore {
            .input {
                width: 100%;
            }

            label.code {
                font-family: 'Inter-Regular', sans-serif;
                font-size: 16px;
                line-height: 135%;
                display: block;
                width: 293px;
            }

            .input:first-child {
                margin-top: 50px;
            }

            .input.code {
                margin-top: 23px;
            }

            .input.restore {
                margin-top: 20px;
            }

            .text-restore {
                margin: 10px auto 0 auto;
                text-align: center;
                font-family: 'Inter-Regular', sans-serif;
                font-size: 14px;
                line-height: 135%;
            }
        }

        .form-restore.code {
            margin-top: 25px;
        }

        .v-card__actions {
            margin-top: -2px;
            padding: 0;

            .button {
                width: 100%;
                height: 50px;
                margin: 0;
            }

            .button.entry {
                margin-top: 20px !important;
            }
        }
    }
}

#app.dark {
    .v-card__text {
        .form-restore {
            span.email {
                color: #9196FF;
            }

            label.code {
                color: white;
            }
        }
    }
}
</style>