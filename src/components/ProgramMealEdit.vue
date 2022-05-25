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
                    <div class="item" v-for="food in foods" :key="food.id">
                        <div class="food">
                            <div class="name">
                                {{ food.name }} ({{ food.amount }}г)
                            </div>
                            <div class="settings">
                                <div class="edit" @click="openPopupFoodEdit(food.id_food, food.id, food.amount)">
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
                        <div class="add-ration">
                            Создать рацион
                        </div>
                        <!--      Поп-ап для редактирования    -->
                        <popup-foods-edit :visible="popupVisibleFoodEdit" :selected-food="selectedFood" :id-meal="idMeal"
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
                            <div class="value-row">{{ (+proteinsPerMeal.toFixed(1)) }}</div>
                            <div class="value-row">{{ (+fatsPerMeal.toFixed(1)) }}</div>
                            <div class="value-row">{{ (+carbohydratesPerMeal.toFixed(1)) }}</div>
                            <div class="value-row">{{ (+caloriesPerMeal.toFixed(1)) }}</div>
                            <div class="value-row">{{ (+fibersPerMeal.toFixed(1)) }}</div>
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

    props: ['idMeal', 'time'],

    components: {
        "title-page": Title,
        "popup-foods": PopupFoods,
        "popup-foods-edit": PopupFoodsEdit,
    },

    data: () => ({
        progressDiet: true,
        progressDietMeal: true,
        selectedFood: {
            idFood: -1,
            idMealFood: -1,
            amount: 100,
        },
        proteinsPerMeal: 0,
        fatsPerMeal: 0,
        carbohydratesPerMeal: 0,
        caloriesPerMeal: 0,
        fibersPerMeal: 0,
        popupVisibleFood: false,
        popupVisibleFoodEdit: false,
        foods: [],
    }),

    computed: {
        ...mapGetters(["programDiet"]),
    },

    watch: {
        programDiet() {
            this.progressDiet = false;
        }
    },

    methods: {
        ...mapActions(["changeBarsVisible"]),

        async getMealFoods() {
            this.$emit("updateProgramDiet")
            this.proteinsPerMeal = 0;
            this.fatsPerMeal = 0;
            this.carbohydratesPerMeal = 0;
            this.caloriesPerMeal = 0;
            this.fibersPerMeal = 0;
            await axios.get(`${url}/api/programs/get-meal-foods/${this.idMeal}`).then((res) => {
                this.foods = res.data;
                for (let i = 0; i < this.foods.length; i++) {
                    this.foods[i].proteinsCalc = this.calcParams(this.foods[i].proteins, this.foods[i].amount);
                    this.foods[i].fatsCalc = this.calcParams(this.foods[i].fats, this.foods[i].amount);
                    this.foods[i].carbohydratesCalc = this.calcParams(this.foods[i].carbohydrates, this.foods[i].amount);
                    this.foods[i].caloriesCalc = this.calcParams(this.foods[i].calories, this.foods[i].amount);
                    this.foods[i].fibersCalc = this.calcParams(this.foods[i].fibers, this.foods[i].amount);

                    this.proteinsPerMeal += this.foods[i].proteinsCalc;
                    this.fatsPerMeal += this.foods[i].fatsCalc;
                    this.carbohydratesPerMeal += this.foods[i].carbohydratesCalc;
                    this.caloriesPerMeal += this.foods[i].caloriesCalc;
                    this.fibersPerMeal += this.foods[i].fibersCalc;
                }
                this.progressDietMeal = false;
            });
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
            this.popupVisibleFoodEdit = true;
            this.selectedFood = {
                idFood: idFood,
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
                        line-height: 16px;
                    }

                    .value {
                        font-family: "Inter-Regular", sans-serif;
                        font-size: 13px;
                        line-height: 16px;
                        margin-top: 15px;
                    }


                    .food {
                        flex: 0 0 268px;

                        .name {
                            font-family: 'Inter-Medium', sans-serif;
                            font-size: 16px;
                            line-height: 119%;
                        }
                    }

                    .proteins, .fats, .carbohydrates {
                        flex: 0 0 35px;
                    }

                    .proteins, .fats, .carbohydrates, .calories, .fibers, .glycemic-index {
                        margin-left: 45px;
                    }

                    .calories {
                        flex: 0 0 50px;
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