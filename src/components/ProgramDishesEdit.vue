<template>
    <div class="program-dishes-edit">
        <div class="progress-dish" v-if="progress">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <template v-else>
            <title-page :name="dish.name" class="dishes"></title-page>
            <div class="dish-edit-container">
                <div class="dish-edit-content">
                    <div class="item" v-for="food in dish.foods" :key="food.id">
                        <div class="food">
                            <div class="name">
                                {{ food.name }} ({{ food.amount }} г)
                            </div>
                            <div class="settings">
                                <div class="edit" @click="openPopupFoodEdit(food.id_food, food.id, food.amount)">
                                    Редактировать
                                </div>
                                <div class="delete" @click="deleteDishFood(food.id)">Удалить</div>
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
                            <span>Добавить продукт</span>
                            <!--      Поп-ап для добавления    -->
                            <popup-foods :visible="popupVisibleFood"
                                         :id-dish="dish.id"
                                         type="dish"
                                         @updateVisible="onUpdateVisibleFood"
                                         @updateDiet="updateFoods"
                            />
                        </div>
                        <!--      Поп-ап для редактирования    -->
                        <popup-foods-edit :visible="popupVisibleFoodEdit" :selected-food="selectedFood"
                                          type="dish"
                                          @updateVisible="onUpdateVisibleFoodEdit"
                                          @updateDiet="updateFoods"
                        />
                    </div>
                    <div class="back" @click="back">
                        <div class="image">
                            <img :src="require('@/assets/img/png/arrow-back--grey.png')">
                            <img class="active" :src="require('@/assets/img/png/arrow-back--white.png')">
                        </div>
                        <span>Назад к блюдам</span>
                    </div>
                </div>
                <div class="stat">
                    <div class="name-stat">Всего в этом блюде</div>
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
                            <div class="value-row">{{ dish.proteins }}</div>
                            <div class="value-row">{{ dish.fats }}</div>
                            <div class="value-row">{{ dish.carbohydrates }}</div>
                            <div class="value-row">{{ dish.calories }}</div>
                            <div class="value-row">{{ dish.fibers }}</div>
                            <div class="value-row">0</div>
                        </div>
                    </div>

                    <div class="name-stat">В блюде на 100 г</div>
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
                            <div class="value-row">{{ dish.proteinsCalc }}</div>
                            <div class="value-row">{{ dish.fatsCalc }}</div>
                            <div class="value-row">{{ dish.carbohydratesCalc }}</div>
                            <div class="value-row">{{ dish.caloriesCalc }}</div>
                            <div class="value-row">{{ dish.fibersCalc }}</div>
                            <div class="value-row">0</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Title from "@/components/Title";
import PopupFoods from "@/components/PopupFoods";
import PopupFoodsEdit from "@/components/PopupFoodsEdit";
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import url from "@/services/url";

export default {
    name: "ProgramDishesEdit",

    props: ['dish', 'progress'],

    components: {
        "title-page": Title,
        "popup-foods": PopupFoods,
        "popup-foods-edit": PopupFoodsEdit,
    },

    data: () => ({
        selectedFood: {
            idFood: -1,
            idDishFood: -1,
            amount: 100,
        },
        popupVisibleFood: false,
        popupVisibleFoodEdit: false,
    }),

    computed: {
        ...mapGetters(["userData"]),
    },

    methods: {
        ...mapActions(["changeBarsVisible"]),

        openPopupFoodEdit(idFood, idDishFood, amount) {
            this.popupVisibleFoodEdit = true;
            this.selectedFood = {
                idFood: idFood,
                idDishFood: idDishFood,
                amount: amount
            }
        },

        openPopupFood() {
            this.popupVisibleFood = true;
        },

        onUpdateVisibleFood(data) {
            this.popupVisibleFood = data;
        },

        onUpdateVisibleFoodEdit(data) {
            this.popupVisibleFoodEdit = data;
        },

        back() {
            this.changeBarsVisible(true);
            this.$emit("back");
        },

        async deleteDishFood(id) {
            let food = {
                id: id
            }
            await axios.post(`${url}/api/programs/delete-dish-food`, food).then((res) => {
                if (res.data.name === "Success") {
                    this.updateFoods();
                }
            });
        },

        updateFoods() {
            this.$emit("updateDishFoods", this.dish.id);
        }
    }
}
</script>

<style lang="scss">
#app {
    .program-dishes-edit {
        .dish-edit-container {
            display: flex;
            align-items: flex-start;
            margin-top: 30px;

            .dish-edit-content {
                flex: 0 0 825px;

                .item {
                    padding: 0 25px;
                    height: 90px;
                    border-radius: 4px;

                    display: flex;
                    align-items: center;

                    .name {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
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
                        position: relative;
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
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }

                    .proteins, .fats, .carbohydrates {
                        flex: 0 0 62px;
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

                .item ~ .options {
                    margin-top: 30px;
                }

                .options {
                    display: flex;
                    align-items: center;

                    .button.link {
                        margin-top: 0;
                        cursor: pointer;
                        width: 235px;
                    }

                    .add-dish {
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
    .program-dishes-edit {
        .dish-edit-container {
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
                .add-dish {
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