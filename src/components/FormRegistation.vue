<template>
    <v-form ref="form" lazy-validation>
        <v-text-field
            label="ФИО"
            :counter="50"
            :rules="rules.fullname"
            v-model="newUser.fullname"
            hide-details="auto"
            required
        ></v-text-field>
        <label>Пол</label>
        <v-radio-group
            v-model="newUser.gender"
            row
        >
            <v-radio
                label="Мужской"
                value="m"
            ></v-radio>
            <v-radio
                label="Женский"
                value="f"
            ></v-radio>
        </v-radio-group>
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
        <v-text-field
            label="Пароль"
            :counter="7"
            :rules="rules.password"
            :type="'password'"
            v-model="newUser.password"
            hide-details="auto"
            required
        ></v-text-field>
        <v-text-field
            label="Повторите пароль"
            :counter="7"
            :rules="rules.rePassword"
            :type="'password'"
            v-model="passwordRepeat"
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
            text
            elevation="0"
            @click="addUser"
        >
            Зарегистрироваться
        </v-btn>
        <v-progress-circular
            v-show="progressReg"
            indeterminate
            color="primary"
        ></v-progress-circular>
        <p>{{ msgAfterReg }}</p>
    </v-form>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    name: "FormRegistration",
    data() {
        return {
            newUser: {
                fullname: "",
                gender: "m",
                birthday: null,
                id_region: 1,
                email: "",
                login: "",
                password: "",
            },
            passwordRepeat: "",
            rules: {
                fullname: [
                    v => !!v || 'Введите ФИО',
                    v => v.split(" ").length >= 2 || 'Введите ФИО',
                    v => v.length <= 50 || 'ФИО должно состоять не более чем из 50 символов'
                ],
                birthday: [
                    v => !!v || 'Введите дату рождения',
                    v => !isNaN(Date.parse(this.parseDate(v))) || 'Введите корректную дату',
                    v => Date.parse(this.parseDate(v)) !== "Invalid Date" || 'Введите корректную дату',
                    v => Date.parse(this.parseDate(v)) <= new Date() || 'Введите корректную дату',
                ],
                email: [
                    v => !!v || 'Введите почту',
                    v => /.+@.+/.test(v) || 'Введите корректную почту',
                    v => !this.emailList.find(obj => obj.email === v) || 'Данный адрес уже существует'
                ],
                login: [
                    v => !!v || 'Введите логин',
                    v => v.length <= 20 || 'Логин должен состоять не более чем из 20 символов',
                    v => !this.loginList.find(obj => obj.login === v) || 'Данный логин уже существует'
                ],
                password: [
                    v => v.length >= 7 || 'Пароль должен состоять как минимум из 7 символов',
                ],

                rePassword: [
                    v => this.newUser.password === v || 'Пароли должны совпадать'
                ],

                checkbox: [
                    v => !!v
                ]
            },
            check: false,
            menu: false,
            dateFormatted: ""
        }
    },

    computed: {
        ...mapGetters(['regionList', 'loginList', 'emailList', 'msgAfterReg', 'progressReg']),
    },

    watch: {
        'newUser.birthday'() {
            this.dateFormatted = this.formatDate(this.newUser.birthday);
        }
    },

    methods: {
        ...mapActions(['showRegionList', 'showLoginList', 'showEmailList', 'createUser', 'setProgressReg']),

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
                this.setProgressReg(true);
                this.createUser(this.newUser);
            }
        }
    },
    mounted() {
        this.showRegionList();
        this.showLoginList();
        this.showEmailList();
    }
}
</script>

<style scoped>

</style>