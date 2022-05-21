<template>
    <div class="program-base-content">
        <div class="info-day">
            <div class="left">
                <div class="border"></div>
                <div class="name">
                    <div class="week-day">{{ weekDay }}</div>
                    <div class="date">{{ date }}</div>
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

    props: ['aim'],

    data: () => ({
        popupVisible: false
    }),

    computed: {
        ...mapGetters(["userData", "programData", "currentDate", "schedule"]),

        date() {
            return this.formatDate(this.getScheduleDay());
        },

        weekDay() {
            let weekDay = {
                1: "Понедельник",
                2: "Вторник",
                3: "Среда",
                4: "Четверг",
                5: "Пятница",
                6: "Суббота",
                0: "Воскресенье",
            }
            let scheduleDay = this.getScheduleDay();
            if (scheduleDay) return weekDay[scheduleDay.getDay()];
            return "";
        },

        table() {
            if (this.aim) {
                let aim = {
                    calories: this.aim.calories,
                    proteins: this.aim.proteins,
                    fats: this.aim.fats,
                    carbohydrates: this.aim.carbohydrates,
                    fibers: this.aim.fibers
                }
                let eaten = {
                    calories: 0,
                    proteins: 0,
                    fats: 0,
                    carbohydrates: 0,
                    fibers: 0
                }
                return [
                    { name: "Калории", aim: aim.calories, eaten: eaten.calories, amendment: aim.calories -  eaten.calories},
                    { name: "Белки", aim: aim.proteins, eaten: eaten.proteins, amendment: aim.proteins -  eaten.proteins},
                    { name: "Жиры", aim: aim.fats, eaten: eaten.fats, amendment: aim.fats -  eaten.fats},
                    { name: "Углеводы", aim: aim.carbohydrates, eaten: eaten.carbohydrates, amendment: aim.carbohydrates -  eaten.carbohydrates},
                    { name: "Клетчатка", aim: aim.fibers, eaten: eaten.fibers, amendment: aim.fibers - eaten.fibers },
                ]
            }
            return [
                { name: "Калории", aim: 0, eaten: 0, amendment: 0 },
                { name: "Белки", aim: 0, eaten: 0, amendment: 0 },
                { name: "Жиры", aim: 0, eaten: 0, amendment: 0 },
                { name: "Углеводы", aim: 0, eaten: 0, amendment: 0 },
                { name: "Клетчатка", aim: 0, eaten: 0, amendment: 0 },
            ]
        }
    },

    methods: {
        ...mapActions(["closeProgram", "showProgram"]),

        getScheduleDay() {
            let week = this.currentDate.week;
            let day = this.currentDate.day;
            if (this.schedule[week]) {
                return this.schedule[week].days[day].date;
            }
            return "";
        },

        formatDate(date) {
            if (date) {
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
            }
            return "";
        },

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
            display: flex;
            align-items: center;

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
                margin: 0 35px;
                border-radius: 4px;
            }

            .right {
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
                font-size: 14px;
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
                    font-size: 16px;
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