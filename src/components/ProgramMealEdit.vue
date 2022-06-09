<template>
    <div class="program-meal-edit">
        <div class="progress-diet" v-if="progressDiet || progressDietMeal">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <template v-else>
            <title-page :name="time" class="meals"></title-page>
            <div class="meal-edit-container">
                <div class="meal-edit-content">
                    <div class="item" v-for="food in meal.foods" :key="food.id">
                        <div class="food">
                            <div class="name">
                                {{ food.name }} ({{ food.amount }} г)
                            </div>
                            <div class="settings">
                                <div class="edit" v-if="food.id_food" @click="openPopupFoodEdit(food.id_food, food.id, food.amount)">
                                    Редактировать
                                </div>
                                <div class="edit" v-else-if="food.id_dish" @click="openPopupFoodEditDish(food.id_dish, food.id, food.amount)">
                                    Редактировать
                                </div>
                                <div class="delete" @click="deleteMealFood(food.id)">Удалить</div>
                            </div>
                        </div>
                        <div class="proteins">
                            <div class="name">Б</div>
                            <div class="value">{{ food.proteinsCalc }}</div>
                        </div>
                        <div class="fats">
                            <div class="name">Ж</div>
                            <div class="value">{{ food.fatsCalc }}</div>
                        </div>
                        <div class="carbohydrates">
                            <div class="name">У</div>
                            <div class="value">{{ food.carbohydratesCalc }}</div>
                        </div>
                        <div class="calories">
                            <div class="name">Ккал</div>
                            <div class="value">{{ food.caloriesCalc }}</div>
                        </div>
                        <div class="fibers">
                            <div class="name">Клетчатка</div>
                            <div class="value">{{ food.fibersCalc }}</div>
                        </div>
                        <div class="glycemic-index">
                            <div class="name">ГИ</div>
                            <div class="value">{{ food.glycemic_index }}</div>
                        </div>
                    </div>
                    <div class="options">
                        <div class="button link" @click="openPopupFood">
                            <div class="image">
                                <img
                                    :src="require('@/assets/img/png/plus.png')"
                                >
                            </div>
                            <span>Добавить</span>
                            <!--      Поп-ап для добавления    -->
                            <popup-foods :visible="popupVisibleFood" :id-meal="idMeal"
                                         @updateVisible="onUpdateVisibleFood"
                                         @updateDiet="updateFoods"
                            />
                        </div>
                        <div v-if="userIsPro" class="add-ration" @click="popupVisibleRation = true">
                            Создать рацион
                        </div>
                        <v-dialog
                            v-model="popupVisibleRation"
                            persistent
                            width="473px"
                            dark
                        >
                            <v-card>
                                <v-btn
                                    icon
                                    dark
                                    class="close"
                                    @click="closePopupRation"
                                >
                                    <img
                                        :src="require('../assets/img/png/close.png')"
                                    />
                                </v-btn>
                                <v-card-text class="popup-create-ration" v-if="ration.page === 0">
                                    <div class="popup-title">Создание рациона</div>
                                    <v-form class="form-ration" ref="form" lazy-validation>
                                        <v-text-field
                                            label="Название рациона"
                                            v-model="ration.name"
                                            class="input growth"
                                            :rules="rules.name"
                                            dark
                                            outlined
                                            require
                                        ></v-text-field>
                                        <v-btn
                                            @click="this.addRation"
                                            :loading="ration.progress"
                                            color="primary"
                                            class="button"
                                        >Готово
                                        </v-btn>
                                    </v-form>
                                </v-card-text>
                                <v-card-text class="popup-create-ration" v-else-if="ration.page === 1">
                                    <div class="popup-title">Рацион успешно создан!</div>
                                    <p>Для просмотра и редактирования рациона перейдите в пункт меню “Рационы”.</p>
                                    <v-btn
                                        @click="this.closePopupRation"
                                        color="primary"
                                        class="button"
                                    >Понятно
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                        <!--      Поп-ап для редактирования    -->
                        <popup-foods-edit :visible="popupVisibleFoodEdit" :selected-food="selectedFood"
                                          :type="typeEdit"
                                          @updateVisible="onUpdateVisibleFoodEdit"
                                          @updateDiet="updateFoods"
                        />
                    </div>
                    <div class="back" @click="back">
                        <div class="image">
                            <img :src="require('@/assets/img/png/arrow-back--grey.png')">
                            <img class="active" :src="require('@/assets/img/png/arrow-back--white.png')">
                        </div>
                        <span>Назад к приемам пищи</span>
                    </div>
                </div>
                <div class="stat">
                    <div class="name-stat">Всего в этом приеме</div>
                    <div class="table-stat">
                        <div class="name-col">
                            <div class="name-row">Белки</div>
                            <div class="name-row">Жиры</div>
                            <div class="name-row">Углеводы</div>
                            <div class="name-row">Калории</div>
                            <div class="name-row">Клетчатка</div>
                            <div class="name-row">ГИ</div>
                        </div>
                        <div class="value-col">
                            <div class="value-row">{{ meal.proteins }}</div>
                            <div class="value-row">{{ meal.fats }}</div>
                            <div class="value-row">{{ meal.carbohydrates }}</div>
                            <div class="value-row">{{ meal.calories }}</div>
                            <div class="value-row">{{ meal.fibers }}</div>
                            <div class="value-row">0</div>
                        </div>
                    </div>
                    <div class="name-stat">Всего за этот день</div>
                    <div class="table-stat">
                        <div class="name-col">
                            <div class="name-row">Белки</div>
                            <div class="name-row">Жиры</div>
                            <div class="name-row">Углеводы</div>
                            <div class="name-row">Калории</div>
                            <div class="name-row">Клетчатка</div>
                            <div class="name-row">ГИ</div>
                        </div>
                        <div class="value-col">
                            <div class="value-row">{{ programDiet.proteins }}</div>
                            <div class="value-row">{{ programDiet.fats }}</div>
                            <div class="value-row">{{ programDiet.carbohydrates }}</div>
                            <div class="value-row">{{ programDiet.calories }}</div>
                            <div class="value-row">{{ programDiet.fibers }}</div>
                            <div class="value-row">0</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/services/url";
import Title from "@/components/Title";
import {mapActions, mapGetters} from "vuex";
import PopupFoods from "@/components/PopupFoods";
import PopupFoodsEdit from "@/components/PopupFoodsEdit";

export default {
    name: "ProgramMealEdit",

    props: ['progressMain', 'meal', 'idMeal', 'time'],

    components: {
        "title-page": Title,
        "popup-foods": PopupFoods,
        "popup-foods-edit": PopupFoodsEdit,
    },

    data: () => ({
        typeEdit: "",
        ration: {
            name: "",
            page: 0,
            progress: false,
            foods: [],
            idUser: 0,
        },
        progressDiet: true,
        progressDietMeal: true,
        popupVisibleRation: false,
        selectedFood: {
            idFood: -1,
            idMealFood: -1,
            amount: 100,
        },
        popupVisibleFood: false,
        popupVisibleFoodEdit: false,

        rules: {
            name: [
                v => !!v || "Введите название"
            ]
        }
    }),

    computed: {
        ...mapGetters(["programDiet", "userData", "userIsPro"]),
    },

    watch: {
        programDiet() {
            this.progressDiet = false;
        },

        progressMain() {
            this.progressDiet = this.progressMain;
            this.progressDietMeal = this.progressMain;
        }
    },

    methods: {
        ...mapActions(["changeBarsVisible"]),

        async addRation() {
            this.ration.progress = true;
            this.ration.foods = this.meal.foods;
            this.ration.idUser = this.userData.id;
            await axios.post(`${url}/api/programs/add-ration`, this.ration).then((res) => {
                if (res.data.name === "Success") {
                    this.ration.page++;
                }
                this.ration.progress = false;
            });
        },

        closePopupRation() {
            this.popupVisibleRation = false;
            this.ration.name = "";
            this.ration.page = 0;
            this.ration.progress = false;
            this.ration.foods = [];
        },

        async getMealFoods() {
            this.$emit("updateProgramDiet");
        },

        calcParams(ratio, grams) {
            let value = ratio * grams / 100
            return (+value.toFixed(1));
        },

        back() {
            this.changeBarsVisible(true);
            this.$emit("back");
        },

        openPopupFood() {
            this.popupVisibleFood = true;
        },

        openPopupFoodEdit(idFood, idMealFood, amount) {
            this.typeEdit = "";
            this.popupVisibleFoodEdit = true;
            this.selectedFood = {
                idFood: idFood,
                idMealFood: idMealFood,
                amount: amount
            }
        },

        openPopupFoodEditDish(idDish, idMealFood, amount) {
            this.typeEdit = "dishInnerMeal";
            this.popupVisibleFoodEdit = true;
            this.selectedFood = {
                idDish: idDish,
                idMealFood: idMealFood,
                amount: amount
            }
        },

        onUpdateVisibleFood(data) {
            this.popupVisibleFood = data;
        },

        onUpdateVisibleFoodEdit(data) {
            this.popupVisibleFoodEdit = data;
        },

        updateFoods() {
            this.progressDiet = true;
            this.progressDietMeal = true;
            this.getMealFoods();
        },

        async deleteMealFood(id) {
            let food = {
                id: id
            }
            this.progressDiet = true;
            this.progressDietMeal = true;
            await axios.post(`${url}/api/programs/delete-meal-food`, food).then((res) => {
                if (res.data.name === "Success") {
                    this.getMealFoods();
                }
            });
        }
    },

    mounted() {
        this.getMealFoods();
    }
}
</script>

<style lang="scss">
@import "../assets/scss/popups.scss";

#app {
    .program-meal-edit {
        .progress-diet {
            height: 500px !important;
        }

        .title-page.meals {
            margin-top: 10px !important;
        }

        .meal-edit-container {
            display: flex;
            align-items: flex-start;
            margin-top: 30px;

            .meal-edit-content {
                flex: 0 0 825px;

                .item {
                    padding: 0 25px;
                    height: 90px;
                    border-radius: 4px;

                    display: flex;
                    align-items: center;

                    .name {
                        font-family: "Inter-Regular", sans-serif;
                        font-size: 13px;
                        line-height: 123%;
                    }

                    .value {
                        font-family: "Inter-Regular", sans-serif;
                        font-size: 13px;
                        line-height: 123%;
                        margin-top: 15px;
                    }


                    .food {
                        flex: 0 0 384px;
                        width: 384px;
                        padding-right: 25px;

                        .name {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-family: 'Inter-Medium', sans-serif;
                            font-size: 16px;
                            line-height: 119%;
                        }
                    }

                    .proteins, .fats, .carbohydrates {
                        flex: 0 0 62px;
                    }

                    .proteins, .fats, .carbohydrates, .calories, .fibers, .glycemic-index {
                        //margin-left: 45px;
                    }

                    .calories {
                        flex: 0 0 77px;
                    }

                    .fibers {
                        flex: 0 0 112px;
                    }

                    .glycemic-index {
                        flex: 1 0 auto;
                    }

                    .settings {
                        margin-top: 10px;
                        display: flex;

                        div {
                            font-family: 'Inter-Regular', sans-serif;
                            font-weight: 400;
                            font-size: 13px;
                            line-height: 123%;
                            cursor: pointer;

                            text-decoration-line: underline;
                        }

                        .delete {
                            margin-left: 35px;
                        }
                    }
                }

                .item:not(:first-child):not(:only-child) {
                    margin-top: 20px;
                }

                .options {
                    margin-top: 30px;
                    display: flex;
                    align-items: center;

                    .button.link {
                        margin-top: 0;
                        cursor: pointer;
                        width: 156px;
                    }

                    .add-ration {
                        cursor: pointer;
                        margin-left: 20px;
                        width: 220px;
                        height: 50px;

                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 4px;
                    }
                }

                .back {
                    margin-top: 20px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;

                    .image {
                        width: 30px;

                        img {
                            display: block;
                            width: 100%;
                        }

                        img.active {
                            display: none;
                        }
                    }

                    span {
                        margin-left: 10px;
                        font-family: 'Inter-Medium', sans-serif;
                        font-size: 16px;
                        line-height: 180%;
                    }
                }
            }

            .stat {
                flex: 1 0 auto;
                margin-left: 30px;

                .name-stat {
                    font-family: 'Inter-Medium', sans-serif;
                    font-size: 18px;
                    line-height: 122%;
                }

                .name-stat:not(:first-child):not(:only-child) {
                    margin-top: 30px;
                }

                .table-stat {
                    margin-top: 15px;
                    border-radius: 4px;
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;

                    div {
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 16px;
                        line-height: 119%;
                    }

                    .value-row {
                        text-align: right;
                    }

                    .name-row:not(:first-child):not(:only-child), .value-row:not(:first-child):not(:only-child) {
                        margin-top: 15px;
                    }
                }
            }
        }
    }

    .popup-create-ration {
        .popup-title {

        }

        p {
            margin-top: 25px !important;
            margin-bottom: 0 !important;
        }

        .button {
            margin-top: 20px;
            width: 100%;
            height: 50px;
        }

        .form-ration {
            .input {
                margin-top: 50px;
                width: 100%;
            }

            .button {
                margin-top: -2px;
            }
        }
    }
}

#app.dark {
    .program-meal-edit {
        .meal-edit-container {
            .item {
                background: #1A1A27;

                .name {
                    color: #B5B5B8;
                }

                .food {
                    .name {
                        color: white;
                    }
                }

                .settings {
                    .edit:hover {
                        color: #9196FF;
                    }

                    .delete:hover {
                        color: #FF5B5B;
                    }
                }
            }

            .options {
                .add-ration {
                    border: 2px solid #242CE3;
                }
            }

            .back {
                span {
                    color: #B5B5B8;
                    opacity: 0.6;
                }
            }

            .back:hover {
                span {
                    color: white;
                    opacity: 1;
                }

                img {
                    display: none;
                }

                img.active {
                    display: block;
                }
            }

            .stat {
                .table-stat {
                    background: #1A1A27;
                }
            }
        }
    }
}
</style>