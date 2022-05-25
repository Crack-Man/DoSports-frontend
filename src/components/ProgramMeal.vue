<template>
    <div class="program-meal">
        <div class="progress-diet" v-if="progressDiet">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <template v-else-if="page === 1">
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
                            <div v-if="!meal.foods.length" class="empty">
                                Продукты еще не добавлены
                            </div>
                            <div v-else>
                                <template v-for="(food, index) in meal.foods">
                                    <div v-if="index < 2" :key="food.id" class="item">
                                        {{ food.name }}
                                    </div>
                                    <div class="item ellipsis" :key="food.id" v-else-if="index === 2">...</div>
                                </template>
                            </div>
                        </div>
                        <div v-if="!meal.foods.length" class="add" @click="openPopupFoods(meal.id, meal.time)">Добавить</div>
                        <div v-else class="edit" @click="openEditFrame(meal.id, meal.time)">Редактировать</div>
                    </div>
                    <div class="proteins">
                        <div class="name">Б</div>
                        <div class="value">{{ meal.proteins }}</div>
                    </div>
                    <div class="fats">
                        <div class="name">Ж</div>
                        <div class="value">{{ meal.fats }}</div>
                    </div>
                    <div class="carbohydrates">
                        <div class="name">У</div>
                        <div class="value">{{ meal.carbohydrates }}</div>
                    </div>
                    <div class="calories">
                        <div class="name">Ккал</div>
                        <div class="value">{{ meal.calories }}</div>
                    </div>
                    <div class="fibers">
                        <div class="name">Клетчатка</div>
                        <div class="value">{{ meal.fibers }}</div>
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
                <popup-foods :visible="popupVisibleFood" :idMeal="idMeal" @updateVisible="onUpdateVisibleFood" @updateDiet="openEditFrameAfterPopup(idMeal, timeMeal)"/>
            </div>
        </template>
        <program-meal-edit v-else :idMeal="idMeal" :time="timeMeal" @back="returnToProgramMeal" @updateProgramDiet="getProgramDiet"/>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Title from "@/components/Title";
import axios from "axios";
import url from "@/services/url";
import PopupFoods from "@/components/PopupFoods";
import ProgramMealEdit from "@/components/ProgramMealEdit";

export default {
    name: "ProgramMeal",

    components: {
        "title-page": Title,
        "popup-foods": PopupFoods,
        "program-meal-edit": ProgramMealEdit,
    },

    data: () => ({
        mealCount: 3,
        mealSchedule: [],
        popupVisibleFood: false,
        idMeal: 0,
        timeMeal: "",
        page: 1,
        progressDiet: true,
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
            this.progressDiet = true;
            this.getProgramDiet();
        },

        'currentDate.day'() {
            this.progressDiet = true;
            this.getProgramDiet();
        },
    },

    methods: {
        ...mapActions(["showFoods", "showProgramDiet", "changeBarsVisible"]),

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
            this.showProgramDiet(input).then(() => {
                this.progressDiet = false;
            });
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

        openPopupFoods(id, time) {
            this.popupVisibleFood = true;
            this.timeMeal = time;
            this.idMeal = id;
        },

        openEditFrame(id, time) {
            this.page = 2;
            this.idMeal = id;
            this.timeMeal = time;
            this.changeBarsVisible(false);
        },

        openEditFrameAfterPopup(id, time) {
            this.getProgramDiet();
            this.openEditFrame(id, time);
        },

        returnToProgramMeal() {
            this.page = 1;
            this.progressDiet = true;
            this.getProgramDiet();
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

        .progress-diet {
            position: relative;
            width: 100%;
            height: 310px;

            .icon {
                position: absolute;
                left: calc(50% - 50px / 2);
                bottom: calc(50% - 50px / 2);
            }
        }

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
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                width: 165px;
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

                .item:not(:first-child):not(:only-child) {
                    margin-top: 5px;
                }

                .item.ellipsis {
                    margin-top: 0 !important;
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
                flex: 0 0 35px;
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

            .edit:hover, .add:hover {
                color: #9196FF;
            }
        }

        .name {
            color: #B5B5B8;
        }
    }
}

</style>