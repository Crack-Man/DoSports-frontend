<template>
    <div class="admin-user-list">
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
            <div class="item" v-for="(user, index) in userList" :key="index">
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
                    {{ user.pro_last_datetime ? formatDate(user.pro_last_datetime.split('T')[0]) : 'нет' }}
                </div>
                <div class="edit">
                    <img :src="require('@/assets/img/svg/icon-pencil.svg')">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "../services/url";

export default {
    name: "AdminUserList",

    data: () => ({
        searchLogin: "",
        userList: []
    }),

    computed: {

    },

    methods: {
        async getUsers() {
            await axios.get(`${url}/api/users/get-users`).then((res) => {
                this.userList = res.data;
            });
        },

        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${day}.${month}.${year}`;
        },
    },

    mounted() {
        this.getUsers();
    }
}
</script>

<style lang="scss">
#app {
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