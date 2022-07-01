<template>
    <div class="progress-admin" v-if="progress">
        <v-progress-circular
            size="50"
            class="icon"
            indeterminate
            color="#004BD7"
        ></v-progress-circular>
    </div>
    <div v-else class="admin-user-list">
        <title-page name="Пользователи"/>
        <v-text-field
            class="input search-login"
            v-model="searchLogin"
            :append-icon="'mdi-magnify'"
            placeholder="Логин пользователя..."
            hide-details="auto"
            dark
            outlined
            required
        ></v-text-field>
        <div class="header-table">
            <div class="full-name">ФИО</div>
            <div class="gender">
                Пол
            </div>
            <div class="birthday">
                Дата
            </div>
            <div class="email">
                Почта
            </div>
            <div class="login">
                Логин
            </div>
            <div class="premium">
                Премиум
            </div>
        </div>
        <div class="scroller">
            <div class="item" v-for="(user, index) in userListFiltered" :key="index">
                <div class="full-name">
                    {{ user.fullname }}
                </div>
                <div class="gender">
                    {{ user.gender === 'f' ? 'женский' : 'мужской' }}
                </div>
                <div class="birthday">
                    {{ formatDate(user.birthday) }}
                </div>
                <div class="email">
                    {{ user.email }}
                </div>
                <div class="login">
                    {{ user.login }}
                </div>
                <div :class="'premium' + (user.pro_last_datetime && new Date(user.pro_last_datetime) > new Date() ? ' purple-color' : '')">
                    {{ user.pro_last_datetime ? formatDateFromISO(user.pro_last_datetime) : 'нет' }}
                </div>
                <div class="edit" @click="openPopup(user.pro_last_datetime, user.id)">
                    <img :src="require('@/assets/img/svg/icon-pencil.svg')">
                </div>
            </div>
        </div>
        <v-dialog
            v-model="visible"
            persistent
            content-class="popup--change-pro"
            width="450"
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
                <v-card-text>
                    <div class="popup-title">Изменить дату окончания подписки</div>
                    <v-form ref="form" lazy-validation>
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
                                    label="Дата окончания подписки"
                                    class="input date"
                                    :rules="rules.datetime"
                                    :append-icon="'mdi-chevron-down'"
                                    persistent-hint
                                    v-bind="attrs"
                                    placeholder="ДД.ММ.ГГГГ"
                                    @blur="proLastDate = parseDate(dateFormatted)"
                                    return-masked-value
                                    v-mask="'##.##.####'"
                                    v-on="on"
                                    dark
                                    outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="proLastDate"
                                no-title
                                @input="menu = false"
                                locale="ru-ru"
                                dark
                            ></v-date-picker>
                        </v-menu>
                        <v-btn
                            class="button update"
                            @click="updatePro"
                            :loading="progressUpdatePro"
                        >
                            Изменить
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from "axios";
import url from "../services/url";
import Title from "@/components/Title";

export default {
    name: "AdminUserList",

    components: {
        "title-page": Title,
    },

    data: () => ({
        searchLogin: "",
        userList: [],
        visible: false,
        menu: false,
        dateFormatted: null,
        proLastDate: null,
        idUser: 0,
        progress: false,
        progressUpdatePro: false,

        rules: {
            datetime: [
                v => !!v || 'Введите дату',
            ],
        }
    }),

    computed: {
        userListFiltered() {
            let users = Array.from(this.userList);
            if (this.searchLogin) {
                users = users.filter(obj => obj.login.toLowerCase().includes(this.searchLogin.toLowerCase()));
            }
            return users;
        }
    },

    watch: {
        proLastDate() {
            this.dateFormatted = this.formatDate(this.proLastDate);
        }
    },

    methods: {
        openPopup(date, idUser) {
            this.visible = true;
            this.idUser = idUser;
            this.proLastDate = null;
            this.dateFormatted = null;
            if (date) {
                this.proLastDate = this.parseDate(this.formatDateFromISO(date));
            }
        },

        closePopup() {
            this.visible = false;
            this.proLastDate = null;
            this.dateFormatted = null;
        },

        parseDate(date) {
            if (!date || date.length !== 10) return null;

            const [day, month, year] = date.split('.');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },

        async updatePro() {
            if (this.$refs.form.validate()) {
                this.progressUpdatePro = true;
                let user = {
                    id: this.idUser,
                    proLastDate: this.proLastDate
                }
                await axios.post(`${url}/api/users/change-pro`, user).then((res) => {
                    this.progressUpdatePro = false;
                    if (res.data.name === "Success") {
                        this.closePopup();
                        this.getUsers();
                    }
                });
            }
        },

        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${day}.${month}.${year}`;
        },

        formatDateFromISO(date) {
            if (!date) return null;
            let UTC = new Date(date);
            let day = UTC.getDate(),
                month = UTC.getMonth() + 1,
                year = UTC.getFullYear();
            return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
        },

        async getUsers() {
            this.progress = true;
            await axios.get(`${url}/api/users/get-users`).then((res) => {
                this.userList = res.data;
                this.progress = false;
            });
        },
    },

    mounted() {
        this.getUsers();
    }
}
</script>

<style lang="scss">
#app {
    .progress-admin {
        position: relative;
        margin-left: 30px;
        height: 500px;

        .icon {
            position: absolute;
            left: calc(50% - 50px / 2);
            bottom: calc(50% - 50px / 2);
        }
    }

    .admin-user-list {
        .input.search-login {
            margin-top: 37px;
            width: 100%;
        }

        .header-table {
            display: flex;
            padding: 0 20px;

            div {
                font-family: 'Inter-Regular', sans-serif;
                font-size: 13px;
                line-height: 123%;
            }

            .full-name {
                flex: 0 0 117px;
            }

            .gender, .birthday, .email, .login, .premium {
                margin-left: 20px;
            }

            .gender {
                flex: 0 0 93px;
            }

            .birthday {
                flex: 0 0 100px;
            }

            .email, .login {
                flex: 0 0 108px;
            }

            .premium {
                flex: 0 0 100px;
            }
        }

        .scroller {
            padding-right: 15px;
            margin-top: 15px;
            overflow-y: scroll;
            height: 640px;

            @-moz-document url-prefix() {
                //padding-right: 10px;
                padding-right: 18px;
            }

            .item {
                margin-top: 10px;
                border-radius: 4px;

                display: flex;
                align-items: center;
                height: 55px;
                padding: 0 20px;

                .full-name, .gender, .birthday, .email, .login, .premium {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 12px;
                    line-height: 125%;
                }

                .full-name {
                    flex: 0 0 117px;
                }

                .gender, .birthday, .email, .login, .premium {
                    margin-left: 20px;
                }

                .gender {
                    flex: 0 0 93px;
                }

                .birthday {
                    flex: 0 0 100px;
                }

                .email, .login {
                    flex: 0 0 108px;
                }

                .premium {
                    flex: 0 0 100px;
                }

                .edit {
                    margin-left: 20px;
                    cursor: pointer;
                }
            }

            .item:first-child {
                margin-top: 0;
            }
        }

        .scroller::-webkit-scrollbar {
            width: 3px;
        }
    }

    .popup--change-pro {
        overflow-y: visible;

        .input {
            width: 100%;
        }

        .button.update {
            margin-top: 0;
            width: 100%;
            height: 50px;
        }

        .v-picker.v-card {
            padding: 0;
        }
    }
}

#app.dark {
    .admin-user-list {
        .header-table {
            div {
                color: #B5B5B8;
            }
        }

        .scroller {
            scrollbar-color: #9196FF #262635;
            scrollbar-width: none;

            .item {
                background: #1A1A27;

                .premium.purple-color {
                    color: #9196FF;
                }
            }
        }

        .scroller::-webkit-scrollbar-track {
            background: #262635;
            border-radius: 4px;
        }

        .scroller::-webkit-scrollbar-thumb {
            background-color: #9196FF;
            border-radius: 4px;
            border: 3px solid #9196FF;
        }
    }
}
</style>