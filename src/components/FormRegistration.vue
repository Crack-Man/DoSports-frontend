<template>
    <div class="form-content">
        <v-form class="form-reg" ref="form" lazy-validation>
            <v-text-field
                label="ФИО"
                class="input"
                :rules="rules.fullname"
                v-model="newUser.fullname"
                hide-details="auto"
                dark
                outlined
                required
            ></v-text-field>
            <label class="gender">Пол</label>
            <v-radio-group
                v-model="newUser.gender"
                class="gender"
                row
            >
                <v-radio
                    label="Мужской"
                    value="m"
                    on-icon="mdi-radiobox-marked"
                    dark
                ></v-radio>
                <v-radio
                    label="Женский"
                    value="f"
                    dark
                ></v-radio>
            </v-radio-group>
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
                :append-icon="'mdi-chevron-down'"
                :items="this.regionList"
                :item-text="getRegionText"
                :item-value="'id'"
                label="Регион проживания"
                dark
                outlined
                required
            ></v-select>
            <v-text-field
                label="Почта"
                class="input"
                :rules="rules.email"
                v-model="newUser.email"
                hide-details="auto"
                dark
                outlined
                required
            ></v-text-field>
            <v-text-field
                label="Логин"
                class="input"
                :rules="rules.login"
                v-model="newUser.login"
                hide-details="auto"
                dark
                outlined
                required
            ></v-text-field>
            <v-text-field
                label="Пароль"
                class="input"
                :append-icon="showPass ? 'mdi-eye dark' : 'mdi-eye-off dark'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                :rules="rules.password"
                v-model="newUser.password"
                hide-details="auto"
                dark
                outlined
                required
            ></v-text-field>
            <v-text-field
                label="Повторите пароль"
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
        <dialog-after-reg v-bind:email='this.newUser.email'></dialog-after-reg>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import DialogAfterReg from "./DialogAfterReg";

export default {
    name: "FormRegistration",

    components: {
        "dialog-after-reg": DialogAfterReg,
    },

    data: () => ({
        newUser: {
            fullname: "",
            gender: "m",
            birthday: null,
            id_region: 1,
            email: "",
            login: "",
            password: "",
        },

        placeholderInput: "ДД.ММ.ГГГГ",

        passwordRepeat: "",

        rules: {
            fullname: [
                v => !!v || 'Введите ФИО',
                v => /^[a-zA-Zа-яА-Я ]+$/.test(v) || 'Некорректный ФИО',
                v => v.length <= 50 || 'ФИО должно состоять не более чем из 50 символов'
            ],

            birthday: [
                v => !!v || 'Введите дату рождения',
            ],

            email: [],

            login: [],

            password: [
                v => /^[^'"`]+$/.test(v) || 'Некорректный пароль',
                v => v.length >= 7 || 'Пароль должен состоять как минимум из 7 символов',
            ],

            rePassword: [],

            checkbox: [
                v => !!v
            ]
        },

        check: false,
        menu: false,
        dateFormatted: "",
        showPass: false,
        showPassRepeat: false,
    }),

    computed: {
        ...mapGetters(['regionList', 'loginList', 'emailList', 'regProgress']),
    },

    watch: {
        'newUser.birthday'() {
            this.dateFormatted = this.formatDate(this.newUser.birthday);
        }
    },

    methods: {
        ...mapActions(['showRegionList', 'showLoginList', 'showEmailList', 'createUser']),

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
            this.rules.rePassword = [
                v => this.newUser.password === v || 'Пароли должны совпадать'
            ];
        },

        openPickerDate() {
            document.querySelector('.input.date input').click();
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
                this.createUser(this.newUser);
            }
        }
    },
    mounted() {
        let dateInput = document.querySelector(".input.date input");
        setInterval(() => {
            if (!dateInput.placeholder) dateInput.placeholder = this.placeholderInput
        }, 1);


        this.showRegionList();
        this.showLoginList();
        this.showEmailList();
        this.updateRules();
    }
}
</script>

<style lang="scss">
#app {
    .form-content {
        flex: 0 0 50%;

        .form-reg {
            .input:first-child {
                margin-top: 30px;
            }

            .input {
                width: 100%;
            }
        }
    }

    .container-explanation {
        .text {
            @media (max-width: 1263px) {
                font-size: 14px !important;
            }
        }
    }
}
</style>