<template>
    <div class="program-base-content">
        <div class="info-day">
            <div class="left">
                <div class="border"></div>
                <div class="name">
                    <div class="week-day">Четверг</div>
                    <div class="date">03.02.2022</div>
                </div>
            </div>
            <div class="center">
            </div>
            <div class="right">
                Среднеуглеводный день
            </div>
        </div>
        <div class="title-table">
            Расчет БЖУ и калорий на день
        </div>
        <v-simple-table
            dark
            class="table"
        >
            <template v-slot:default>
                <thead>
                <tr>
                    <th>
                    </th>
                    <th>
                        Цель
                    </th>
                    <th>
                        Употреблено
                    </th>
                    <th>
                        Поправка
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="item in table"
                    :key="item.name"
                >
                    <td class="name">{{ item.name }}</td>
                    <td class="aim">{{ item.aim }}</td>
                    <td class="eaten">{{ item.eaten }}</td>
                    <td class="amendment">{{ item.amendment }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
        <div class="reset-program" @click="openPopup">
            <img :src="require('@/assets/img/png/text-reset-program--white.png')">
            <img class="active" :src="require('@/assets/img/png/text-reset-program--violet.png')">
        </div>
        <v-dialog
            v-model="popupVisible"
            persistent
            max-width="473px"
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

                <v-card-text class="popup-reset">
                    <div class="popup-title">Вы точно хотите</div>
                    <div class="popup-title">сбросить программу?</div>
                    <v-card-actions>
                        <v-btn
                            class="button cancel"
                            @click="closePopup"
                        >Отменить</v-btn>
                        <v-btn
                            class="button reset"
                            @click="deleteProgram"
                        >Сбросить</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ProgramBaseContent",

    data: () => ({
        table: [
            { name: "Калории", aim: 1545, eaten: 6565, amendment: 5656 },
            { name: "Белки", aim: 45, eaten: 5656, amendment: 36505 },
            { name: "Жиры", aim: 56, eaten: 566, amendment: 5656 },
            { name: "Углеводы", aim: 56, eaten: 6565, amendment: 5656 },
            { name: "Клетчатка", aim: 5665, eaten: 6565, amendment: 5656 },
        ],
        popupVisible: false
    }),

    computed: {
        ...mapGetters(["userData", "programData"]),
    },

    methods: {
        ...mapActions(["closeProgram", "showProgram"]),

        openPopup() {
            this.popupVisible = true;
        },

        closePopup() {
            this.popupVisible = false;
        },

        deleteProgram() {
            this.closeProgram(this.userData).then(() => {
                this.$router.push("/start-program");
            })
        }
    },
}
</script>

<style lang="scss">
@import "../assets/scss/popups";

#app {
    .program-base-content {
        flex: 1 0 auto;
        margin-left: 30px;

        .info-day {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
                display: flex;

                .border {
                    border-radius: 4px;
                }

                .name {
                    margin-left: 15px;

                    .week-day {
                        font-family: 'Inter-SemiBold', sans-serif;
                        font-size: 24px;
                    }

                    .date {
                        margin-top: 2px;
                        font-family: 'Inter-Medium', sans-serif;
                        font-size: 16px;
                    }
                }
            }

            .center {
                flex: 0 0 209px;
                border-radius: 4px;
            }

            .right {
                margin-right: 180px;
                font-family: 'Inter-Medium', sans-serif;
                font-size: 20px;
                line-height: 135%;
            }
        }

        .title-table {
            margin-top: 40px;

            font-family: 'Inter-Medium', sans-serif;
            font-size: 18px;
            line-height: 180%;
        }

        .table {
            margin-top: 15px;
            border-radius: 4px;
            width: 100%;
            padding: 25px;

            th {
                padding: 0 0 5px 0 !important;
                font-family: 'Inter-Regular', sans-serif;
                font-weight: normal;
                font-size: 16px;
                line-height: 200%;
            }

            td {
                padding: 0 !important;

                font-family: 'Inter-Regular', sans-serif;
                font-weight: normal;
                font-size: 16px;
                line-height: 200%;
            }

            tbody {
                td.name {
                    width: 240px;

                    font-family: 'Inter-Regular', sans-serif;
                    font-weight: normal;
                    font-size: 18px;
                    line-height: 200%;
                }

                td.aim {
                    width: 185px;
                }

                td.eaten {
                    width: 245px;
                }

                td.amendment {
                    width: auto;
                }




                tr {
                    td {
                        padding-top: 5px !important;
                    }
                }

                tr:first-child {
                    td {
                        padding-top: 10px !important;
                    }
                }
            }
        }

        .reset-program {
            width: 203px;
            cursor: pointer;
            margin-top: 30px;

            img {
                display: block;
                width: 100%;
            }

            img.active {
                display: none;
            }
        }
    }
}

#app.dark {
    .program-base-content {
        .info-day {
            .left {
                .border {
                    border-left: 2px solid #9196FF;
                }
            }

            .center {
                border-bottom: 1px solid #B5B5B8;
            }
        }

        .table {
            background: #1A1A27;

            th {
                border-bottom: 1px solid rgba(181, 181, 184, 0.5);
                color: #B5B5B8;
            }

            tr:hover {
                background: #1A1A27;
            }

            td {
                color: white;
                border: none;
            }
        }


        .reset-program:hover {
            img {
                display: none;
            }

            img.active {
                display: block;
            }
        }
    }

    .popup-reset {
        .popup-title {
            text-align: center;
        }

        .v-card__actions {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;

            .button {
                width: 179px;
            }
        }
    }
}

#app.dark {
    .popup-reset {
        .popup-title {
            color: white;
        }

        .v-card__actions {
            .cancel {
                color: #8F8F9A !important;
                background: #333341 !important;
            }

            .reset {
                background: #FF5B5B !important;
            }
        }
    }
}

</style>