<template>
    <v-form class="form-personal-data" ref="form" lazy-validation>
        <title-page class="personal" name="Личная информация"/>
        <v-text-field
            label="ФИО"
            class="input full-name"
            :rules="rules.fullname"
            v-model="user.fullname"
            hide-details="auto"
            dark
            outlined
            required
        ></v-text-field>
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
                    @blur="user.birthday = parseDate(dateFormatted)"
                    return-masked-value
                    v-mask="'##.##.####'"
                    v-on="on"
                    dark
                    outlined
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="user.birthday"
                no-title
                @input="menu = false"
                locale="ru-ru"
                dark
            ></v-date-picker>
        </v-menu>
        <v-text-field
            label="Почта"
            class="input"
            :rules="rules.email"
            v-model="user.email"
            hide-details="auto"
            dark
            outlined
            required
        ></v-text-field>
        <v-select
            v-model="user.id_region"
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
        <v-btn
            class="button"
            color="primary"
            :loading="progress"
            @click="changePersonalData"
        >
            Сохранить
        </v-btn>
    </v-form>
</template>

<script>
import Title from "@/components/Title";
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import url from "../services/url";

export default {
    name: "FormPersonalData",

    components: {
        "title-page": Title,
    },

    data: () => ({
        user: {
            id: 0,
            fullname: "",
            birthday: null,
            email: "",
            id_region: 1,
        },

        progress: false,

        menu: false,
        dateFormatted: "",
        placeholderInput: "ДД.ММ.ГГГГ",

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
        },
    }),

    watch: {
        'user.birthday'() {
            this.dateFormatted = this.formatDate(this.user.birthday);
        },

        emailList() {
            this.updateRules();
        }
    },

    computed: {
        ...mapGetters(['regionList', 'emailList', 'userData']),
    },

    methods: {
        ...mapActions(['showRegionList', 'showEmailList']),

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

        openPickerDate() {
            document.querySelector('.input.date input').click();
        },

        loadUserData() {
            this.user.id = this.userData.id;
            this.user.fullname = this.userData.fullname;
            this.user.birthday = this.userData.birthday;
            this.user.email = this.userData.email;
            this.user.id_region = this.userData.id_region;
        },

        updateRules() {
            this.rules.email = [
                v => !!v || 'Введите email',
                v => /.+@.+/.test(v) || 'Некорректный email',
                v => !this.emailList.find(obj => obj.email === v) || 'Данный email уже существует'
            ];
        },

        async changePersonalData() {
            if (this.$refs.form.validate()) {
                this.progress = true;
                await axios.post(`${url}/api/users/change-personal-data`, this.user).then((res) => {
                    this.progress = false;
                    if (res.data.name === "Success") {
                        this.$router.go();
                    }
                });
            }
        }
    },

    mounted() {
        let dateInput = document.querySelector(".input.date input");
        setInterval(() => {
            if (!dateInput.placeholder) dateInput.placeholder = this.placeholderInput
        }, 1);

        this.showRegionList();
        this.showEmailList();
        this.loadUserData();
        this.updateRules();
    }
}
</script>

<style lang="scss">

#app {
    .form-personal-data {
        .title-page.personal {
            margin-top: 0;

            font-family: 'Inter-SemiBold', sans-serif;
            font-size: 32px;
            line-height: 122%;
        }

        .input.full-name {
            margin-top: 50px;
        }

        .input {
            width: 540px;
        }

        .button {
            margin-top: 10px;
            width: 255px;
            height: 50px;
        }
    }
}

</style>