<template>
    <div class="program-meal">
        <title-page class="meals" :name="'Приемы пищи' + (programDiet.length ? ` (${programDiet.length})` : '')"/>
        <div v-if="!programDiet.length">
            <div class="text">Здесь будет отображаться информация о приемах пищи за день. Необходимо установить их
                количество на один день.
            </div>
            <v-btn
                @click="popupVisibleCounter = true"
                color="primary"
                class="button set-meals"
            >Установить
            </v-btn>
            <v-dialog
                v-model="popupVisibleCounter"
                persistent
                width="473px"
                dark
            >
                <v-card class="dialog-set-meals">
                    <v-btn
                        icon
                        dark
                        class="close"
                        @click="popupVisibleCounter = false"
                    >
                        <img
                            :src="require('../assets/img/png/close.png')"
                        />
                    </v-btn>
                    <v-card-text>
                        <div class="popup-title">Установка приемов пищи на день</div>
                        <div class="info-day">
                            <div class="left">
                                Неделя {{ currentDate["week"] }}
                            </div>
                            <div class="center">
                            </div>
                            <div class="right">
                                День {{ currentDate["day"] }}
                            </div>
                        </div>
                        <div class="description">
                            <div>
                                Укажите, сколько приемов пищи планируете в этот день. Допустимые значения - от 3 до 5
                                приемов.
                            </div>
                            <div>
                                Изменить количество приемов можно будет только сбросив и заново установив их на текущий день.
                            </div>
                            <div>
                                Для каждого приема автоматически установится время. Его вы сможете изменить, когда захотите.
                            </div>
                        </div>

                        <div class="counter">
                            <div class="decrease" @click="decreaseMeal">
                                <img :src="require('@/assets/img/png/arrow-left.png')">
                            </div>
                            <div class="count">
                                <span>{{ mealCount }}</span>
                            </div>
                            <div class="increase" @click="increaseMeal">
                                <img :src="require('@/assets/img/png/arrow-right.png')">
                            </div>
                        </div>
                        <v-btn
                            @click="createProgramDiet"
                            color="primary"
                            :loading="this.progressSetMeals"
                            class="button add-meals"
                        >Готово
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
        <div v-else>
            <div
                class="meal-card"
                v-for="meal in programDiet"
                :key="meal.id"
            >
                <div class="time">{{ meal.time }}</div>
                <div class="foods">
                    <div class="list">
                        <div v-if="true" class="empty">
                            Продукты еще не добавлены
                        </div>
                        <div v-else class="item">
                            Каша овсяная с клубничным джемом
                        </div>
                    </div>
                    <div v-if="true" class="add" @click="popupVisibleFood = true">Добавить</div>
                    <div v-else class="edit">Редактировать</div>
                </div>
                <div class="proteins">
                    <div class="name">Б</div>
                    <div class="value">0</div>
                </div>
                <div class="fats">
                    <div class="name">Ж</div>
                    <div class="value">0</div>
                </div>
                <div class="carbohydrates">
                    <div class="name">У</div>
                    <div class="value">0</div>
                </div>
                <div class="calories">
                    <div class="name">Ккал</div>
                    <div class="value">0</div>
                </div>
                <div class="fibers">
                    <div class="name">Клетчатка</div>
                    <div class="value">0</div>
                </div>
                <div class="glycemic-index">
                    <div class="name">ГИ</div>
                    <div class="value">0</div>
                </div>
            </div>
            <div class="reset-meals" @click="popupVisibleReset = true">
                <img :src="require('@/assets/img/png/text-reset-meals--white.png')">
                <img class="active" :src="require('@/assets/img/png/text-reset-meals--violet.png')">
            </div>
            <v-dialog
                v-model="popupVisibleReset"
                persistent
                max-width="473px"
                dark
            >
                <v-card>
                    <v-btn
                        icon
                        dark
                        class="close"
                        @click="popupVisibleReset = false"
                    >
                        <img
                            :src="require('../assets/img/png/close.png')"
                        />
                    </v-btn>

                    <v-card-text class="popup-reset">
                        <div class="popup-title">Вы точно хотите</div>
                        <div class="popup-title">сбросить приемы пищи?</div>
                        <v-card-actions>
                            <v-btn
                                class="button cancel"
                                @click="popupVisibleReset = false"
                            >Отменить</v-btn>
                            <v-btn
                                class="button reset"
                                :loading="progressResetMeals"
                                @click="resetMeals"
                            >Сбросить</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <popup-foods :visible="popupVisibleFood" @updateVisible="onUpdateVisibleFood"/>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Title from "@/components/Title";
import axios from "axios";
import url from "@/services/url";
import PopupFoods from "@/components/PopupFoods";

export default {
    name: "ProgramMeal",

    components: {
        "title-page": Title,
        "popup-foods": PopupFoods,
    },

    data: () => ({
        mealCount: 3,
        mealSchedule: [],
        popupVisibleFood: false,
        popupVisibleReset: false,
        popupVisibleCounter: false,
        progressSetMeals: false,
        progressResetMeals: false,
        program: {}
    }),

    computed: {
        ...mapGetters(["foods", "currentDate", "programData", "schedule", "programDiet"]),

        date() {
            return this.formatDate(this.getScheduleDay());
        },
    },

    watch: {
        programDiet() {
            this.progressSetMeals = false;
            this.popupVisibleCounter = false;
        },

        'currentDate.week'() {
            this.getProgramDiet();
        },

        'currentDate.day'() {
            this.getProgramDiet();
        },
    },

    methods: {
        ...mapActions(["showFoods", "showProgramDiet"]),

        onUpdateVisibleFood(data) {
            this.popupVisibleFood = data;
        },

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

        increaseMeal() {
            if (this.mealCount < 5) {
                this.mealCount++;
            }
        },

        decreaseMeal() {
            if (this.mealCount > 3) {
                this.mealCount--;
            }
        },

        async createProgramDiet() {
            this.progressSetMeals = true;
            this.calcMealSchedule();
            this.program = {
                idProgram: this.programData.id,
                mealsNumber: this.mealCount,
                date: this.date,
                carbohydratesDegree: 1, // 0 - низкоуглеводный, 1 - средне, 2 - высоко
                mealSchedule: this.mealSchedule
            };
            await axios.post(`${url}/api/programs/add-program-diet`, this.program).then((res) => {
                if (res.data.name === "Success") {
                    this.getProgramDiet();
                }
            });
        },

        getProgramDiet() {
            let input = {
                idProgram: this.programData.id,
                date: this.date,
            };
            this.showProgramDiet(input);
        },

        calcMealSchedule() {
            if (this.mealCount === 3) {
                this.mealSchedule = [
                    {
                        time: "07:00-09:00",
                        idOrder: 1,
                    },

                    {
                        time: "12:00-14:00",
                        idOrder: 3,
                    },

                    {
                        time: "16:00-18:00",
                        idOrder: 5,
                    }
                ]
            } else if (this.mealCount === 4) {
                this.mealSchedule = [
                    {
                        time: "07:00-09:00",
                        idOrder: 1,
                    },

                    {
                        time: "11:00-13:00",
                        idOrder: 2,
                    },

                    {
                        time: "15:00-17:00",
                        idOrder: 3,
                    },

                    {
                        time: "19:00-21:00",
                        idOrder: 5,
                    },
                ]
            } else if (this.mealCount === 5) {
                this.mealSchedule = [
                    {
                        time: "07:00-09:00",
                        idOrder: 1,
                    },

                    {
                        time: "10:00-12:00",
                        idOrder: 2,
                    },

                    {
                        time: "13:00-15:00",
                        idOrder: 3,
                    },

                    {
                        time: "16:00-18:00",
                        idOrder: 4,
                    },

                    {
                        time: "19:00-21:00",
                        idOrder: 5,
                    },
                ]
            }
        },

        async resetMeals() {
            this.progressResetMeals = true;
            if (this.programDiet.length) {
                let input = {
                    id: this.programDiet[0].id_program_diet,
                }
                await axios.post(`${url}/api/programs/delete-program-diet`, input).then((res) => {
                    if (res.data.name === "Success") {
                        this.getProgramDiet();
                        this.popupVisibleReset = false;
                    }
                    this.progressResetMeals = false;
                });
            }
        }
    },

    mounted() {
        this.getProgramDiet();
    }
}
</script>

<style lang="scss">
#app {
    .program-meal {
        flex: 1 0 auto;
        margin-left: 30px;

        .title-page.meals {
            margin: 0;

            font-family: 'Inter-SemiBold', sans-serif;
            font-size: 32px;
            line-height: 122%;
        }

        .text {
            margin-top: 20px;
            width: 620px;
            font-family: 'Inter-Regular', sans-serif;
            font-size: 18px;
            line-height: 145%;
        }

        .button.set-meals {
            margin-top: 20px;
            width: 175px;
            height: 50px;
        }

        .meal-counter {
            display: flex;
            justify-content: space-between;

            .image {
                cursor: pointer;
            }
        }

        .add-meals {
            cursor: pointer;
        }

        .meal-card {
            padding: 20px;
            margin-top: 30px;
            height: 117px;
            display: flex;
            border-radius: 4px;

            .time {
                flex: 0 0 95px;
                font-family: 'Inter-Medium', sans-serif;
                font-size: 16px;
                line-height: 19px;
            }

            .foods {
                display: flex;
                justify-content: space-between;
                flex-direction: column;

                width: 210px;
                margin-left: 45px;

                .empty {
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 13px;
                    line-height: 16px;
                }

                .item {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 13px;
                    line-height: 16px;
                }

                .edit, .add {
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 13px;
                    line-height: 16px;
                    text-decoration-line: underline;
                    cursor: pointer;
                }
            }

            .name {
                font-family: 'Inter-Regular', sans-serif;
                font-size: 13px;
                line-height: 16px;
            }

            .value {
                font-family: 'Inter-Regular', sans-serif;
                font-size: 13px;
                line-height: 16px;
                margin-top: 15px;
            }

            .proteins, .fats, .carbohydrates {
                flex: 0 0 20px;
            }

            .proteins, .fats, .carbohydrates, .calories, .fibers, .glycemic-index {
                margin-left: 45px;
            }
        }

        .meal-card:not(:first-child):not(:only-child) {
            margin-top: 20px;
        }

        .reset-meals {
            margin-top: 30px;
            width: 227px;
            cursor: pointer;

            img {
                display: block;
                width: 100%;
            }

            img.active {
                display: none;
            }
        }

        .reset-meals:hover {
            img {
                display: none;
            }

            img.active {
                display: block;
            }
        }
    }

    .dialog-set-meals {
        padding: 50px;

        .popup-title {
            font-family: 'Inter-SemiBold', sans-serif !important;
            font-size: 28px !important;
            line-height: 115% !important;
        }

        .info-day {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left, .right {
                font-family: 'Inter-Medium', sans-serif;
                font-size: 18px;
                line-height: 122%;
            }

            .center {
                flex: 1 1 auto;
                height: 1px;
                margin: 0 25px;
            }
        }

        .description {
            div {
                margin-top: 25px;
                font-family: 'Inter-Regular', sans-serif;
                font-size: 14px;
                line-height: 145%;
            }

            div:not(:first-child):not(:only-child) {
                margin-top: 10px;
            }
        }

        .counter {
            margin-top: 25px;
            position: relative;

            .decrease, .increase {
                width: 14px;
                cursor: pointer;
                position: absolute;
                bottom: calc(50% - 14px / 2);

                img {
                    display: block;
                    width: 100%;
                }
            }

            .decrease {
                left: -20px;
            }

            .increase {
                right: -20px;
            }

            .count {
                width: 100%;
                height: 55px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;

                span {
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 18px;
                    line-height: 180%;
                }
            }
        }

        .button.add-meals {
            margin-top: 20px;
            width: 100%;
            height: 50px;
        }
    }
}

#app.dark {
    .dialog-set-meals {
        .info-day {
            .left, .right {
                color: white;
            }

            .center {
                border-bottom: 1px solid #FFFFFF;
            }
        }

        .description {
            div {
                color: #D1D1D4;
            }
        }

        .count {
            border: 2px solid #B5B5B8;

            span {
                color: white;
            }
        }
    }

    .meal-card {
        background: #1A1A27;

        .foods {
            .empty {
                color: #B5B5B8;
            }
        }

        .name {
            color: #B5B5B8;
        }
    }
}

</style>