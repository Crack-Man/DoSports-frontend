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
            <div v-if="this.userVkData">
                <h1>Введите дополнительные данные</h1>
                <v-form ref="form" lazy-validation>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateFormatted"
                                label="Дата рождения"
                                :rules="rules.birthday"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="newUser.birthday = parseDate(dateFormatted)"
                                return-masked-value
                                placeholder="ДД.ММ.ГГГГ"
                                v-mask="'##.##.####'"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="newUser.birthday"
                            no-title
                            @input="menu = false"
                            locale="ru-ru"
                        ></v-date-picker>
                    </v-menu>
                    <v-select
                        v-model="newUser.id_region"
                        :items="this.regionList"
                        :item-text="getRegionText"
                        :item-value="'id'"
                        label="Регион проживания"
                        required
                    ></v-select>
                    <v-text-field
                        label="Почта"
                        :rules="rules.email"
                        v-model="newUser.email"
                        hide-details="auto"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Логин"
                        :counter="20"
                        :rules="rules.login"
                        v-model="newUser.login"
                        hide-details="auto"
                        required
                    ></v-text-field>
                    <v-checkbox
                        label='Нажимая кнопку “Зарегистрироваться”, вы даете согласие на обработку персональных данных'
                        :rules="rules.checkbox"
                        required
                    ></v-checkbox>
                    <v-btn
                        class="button"
                        color="primary"
                        @click="addUser"
                        :loading="this.regProgress"
                        required
                    >
                        Зарегистрироваться
                    </v-btn>
                </v-form>
            </div>
            <error-405 v-else></error-405>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Error405 from "./Error405";

export default {
    name: "FormRegistrationVk",

    components: {
        "error-405": Error405
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
            }
        },

        redirect() {
            this.$router.push("/").then(() => {
                this.checkAuth();
            });
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

<style scoped>

</style>