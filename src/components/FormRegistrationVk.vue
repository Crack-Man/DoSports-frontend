<template>
    <div class="">
        <div class="progress-main" v-if="this.progress">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <div v-else>
            <v-container v-if="this.userVkData">
                <title-page name="Введите дополнительные данные"/>
                <v-form ref="form" class="form-reg" lazy-validation>
                    <v-menu
                        ref="menu"
                        attach=".input.date .v-input__slot"
                        v-model="menu"
                        :close-on-content-click="false"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateFormatted"
                                label="Дата рождения"
                                class="input date"
                                :rules="rules.birthday"
                                :append-icon="'mdi-chevron-down'"
                                @click:append="openPickerDate"
                                persistent-hint
                                v-bind="attrs"
                                placeholder="ДД.ММ.ГГГГ"
                                @blur="newUser.birthday = parseDate(dateFormatted)"
                                return-masked-value
                                v-mask="'##.##.####'"
                                v-on="on"
                                dark
                                outlined
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="newUser.birthday"
                            no-title
                            @input="menu = false"
                            locale="ru-ru"
                            dark
                        ></v-date-picker>
                    </v-menu>
                    <v-select
                        v-model="newUser.id_region"
                        class="input"
                        :menu-props="{ bottom: true, offsetY: true }"
                        :items="this.regionList"
                        :item-text="getRegionText"
                        :item-value="'id'"
                        label="Регион проживания"
                        required
                        dark
                        outlined
                    ></v-select>
                    <v-text-field
                        label="Почта"
                        class="input"
                        :rules="rules.email"
                        v-model="newUser.email"
                        hide-details="auto"
                        required
                        dark
                        outlined
                    ></v-text-field>
                    <v-text-field
                        label="Логин"
                        :counter="20"
                        class="input"
                        :rules="rules.login"
                        v-model="newUser.login"
                        hide-details="auto"
                        required
                        dark
                        outlined
                    ></v-text-field>
                    <v-checkbox
                        label='Нажимая кнопку “Зарегистрироваться”, Вы даете согласие на обработку персональных данных'
                        class="personal"
                        off-icon=""
                        on-icon="mdi-check"
                        :rules="rules.checkbox"
                        dark
                        required
                    ></v-checkbox>
                    <v-checkbox
                        :rules="rules.checkbox"
                        label="Я прочитал и согласен с условиями пользовательского соглашения"
                        off-icon=""
                        on-icon="mdi-check"
                        dark
                        required
                    ></v-checkbox>
                    <v-btn
                        class="button"
                        color="primary"
                        @click="addUser"
                        :loading="this.regProgress"
                    >
                        Зарегистрироваться
                    </v-btn>
                </v-form>
            </v-container>
            <error-405 v-else></error-405>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Error405 from "./Error405";
import Title from "@/components/Title";

export default {
    name: "FormRegistrationVk",

    components: {
        "error-405": Error405,
        "title-page": Title
    },

    data: () => ({
        newUser: {
            fullname: "",
            gender: "m",
            birthday: null,
            id_region: 1,
            id_vk: 0,
            email: "",
            login: "",
        },

        placeholderInput: "ДД.ММ.ГГГГ",

        progress: true,
        actions: {
            auth: false,
            vkToken: false
        },
        menu: false,
        dateFormatted: "",

        rules: {
            birthday:
                [
                    v => !!v || 'Введите дату рождения',
                ],

            email: [],

            login: [],

            checkbox: [
                v => !!v
            ]
        }
    }),

    watch: {
        'newUser.birthday'() {
            this.dateFormatted = this.formatDate(this.newUser.birthday);
        },

        "actions.auth"() {
            this.checkActions();
        },

        "actions.vkToken"() {
            this.checkActions();
        },

        userVkData() {
            if (this.userVkData) {
                this.checkUserVkInDb(this.userVkData.id);
                this.updateUserData();
            } else {
                this.actions.vkToken = true;
            }
        },

        vkMatch() {
            this.actions.vkToken = !this.vkMatch;
        },

        userIsAuthorized() {
            if (this.userIsAuthorized) {
                this.redirect();
            } else {
                this.actions.auth = true;
            }
        },

        authStatus() {
            if (this.authStatus === "Success") {
                this.redirect();
            } else {
                this.actions.auth = true;
            }
        }
    },

    computed: {
        ...mapGetters(['userIsAuthorized', 'regionList', 'loginList', 'emailList', 'userVkData', 'regProgress', 'authStatus', 'vkMatch']),
    },

    methods: {
        ...mapActions(['showRegionList', 'showLoginList', 'showEmailList', 'checkUserVk', 'createUserVk', 'checkAuth', 'checkUserVkInDb']),

        checkActions() {
            if (Object.values(this.actions).every(Boolean)) {
                this.progress = false;


                setInterval(() => {
                    let dateInput = document.querySelector(".input.date input");
                    if (dateInput) {
                        if (!dateInput.placeholder) dateInput.placeholder = this.placeholderInput
                    }
                }, 1);
            }
        },

        redirect() {
            this.$router.push("/sport-program").then(() => {
                this.$router.go(0);
            });
        },

        openPickerDate() {
            document.querySelector('.input.date input').click();
        },

        updateUserData() {
            this.newUser.fullname = this.userVkData.displayName
            this.newUser.login = this.userVkData.username;
            this.newUser.gender = this.userVkData.gender;
            this.newUser.id_vk = this.userVkData.id;
            this.newUser.email = this.userVkData.email ?? "";
        },

        updateRules() {
            this.rules.birthday = [
                v => !!v || 'Введите дату рождения',
                v => v.length === 10 || 'Некорректная дета',
                v => (!isNaN(Date.parse(this.parseDate(v)))) || 'Некорректная дета',
                v => (Date.parse(this.parseDate(v)) !== "Invalid Date") || 'Некорректная дета',
                v => (Date.parse(this.parseDate(v)) <= new Date()) || 'Некорректная дета',
            ];
            this.rules.email = [
                v => !!v || 'Введите email',
                v => /.+@.+/.test(v) || 'Некорректный email',
                v => !this.emailList.find(obj => obj.email === v) || 'Данный email уже существует'
            ];
            this.rules.login = [
                v => !!v || 'Введите логин',
                v => /^[_.\w]+$/.test(v) || 'Некорректный логин',
                v => v.length <= 20 || 'Логин должен состоять не более чем из 20 символов',
                v => !this.loginList.find(obj => obj.login === v) || 'Данный логин уже существует'
            ];
        },

        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${day}.${month}.${year}`;
        },

        parseDate(date) {
            if (!date) return null;

            const [day, month, year] = date.split('.');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },

        getRegionText(item) {
            return `${item.name} (UTC +${item.time})`;
        },

        addUser() {
            if (this.$refs.form.validate()) {
                this.createUserVk(this.newUser);
            }
        }
    },

    mounted() {
        this.showRegionList();
        this.showLoginList();
        this.showEmailList();
        this.checkUserVk();
        this.updateRules();
        if (this.userIsAuthorized) {
            this.redirect();
        } else if (this.authStatus === "Unauthorized") {
            this.actions.auth = true;
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/fonts.css";
@import "../assets/scss/forms";
</style>