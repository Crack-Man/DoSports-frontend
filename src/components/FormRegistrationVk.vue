<template>
    <div class="">
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
        <h1 v-else>Ошибка. Повторите попытку</h1>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "FormRegistrationVk",

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
        userVkData() {
            this.checkUserVkInDb(this.userVkData.id);
            this.updateUserData();
        },

        userIsAuthorized() {
            if (this.userIsAuthorized) {
                this.redirect();
            }
        },

        authStatus() {
            if (this.authStatus === "Success") {
                this.redirect();
            }
        }
    },

    computed: {
        ...mapGetters(['userIsAuthorized', 'regionList', 'loginList', 'emailList', 'userVkData', 'regProgress', 'authStatus']),
    },

    methods: {
        ...mapActions(['showRegionList', 'showLoginList', 'showEmailList', 'checkUserVk', 'createUserVk', 'checkAuth', 'checkUserVkInDb']),

        redirect() {
            this.$router.push("/").then(() => {
                this.checkAuth();
            });
        },

        updateUserData() {
            if (this.userVkData) {
                this.newUser.fullname = this.userVkData.displayName
                this.newUser.login = this.userVkData.username;
                this.newUser.gender = this.userVkData.gender;
                this.newUser.id_vk = this.userVkData.id;
                this.newUser.email = this.userVkData.emails ? this.userVkData.emails[0].value : "";
            }
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
    }
}
</script>

<style scoped>

</style>