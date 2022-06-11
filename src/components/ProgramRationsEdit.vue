<template>
    <div class="program-rations-edit">
        <div class="progress-diet" v-if="progress">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <template v-else>
            <title-page :name="ration.name" class="rations"></title-page>
            <div class="ration-edit-container">
                <div class="ration-edit-content">
                    <div class="item" v-for="food in ration.foods" :key="food.id">
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
                                <div class="delete" @click="deleteRationFood(food.id)">Удалить</div>
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
                            <popup-foods :visible="popupVisibleFood"
                                         :id-ration="ration.id"
                                         type="ration"
                                         @updateVisible="onUpdateVisibleFood"
                                         @updateDiet="updateFoods"
                            />
                        </div>
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
                        <span>Назад к рационам</span>
                    </div>
                </div>
                <div class="stat">
                    <div class="name-stat">Всего в этом рационе</div>
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
                            <div class="value-row">{{ ration.proteins }}</div>
                            <div class="value-row">{{ ration.fats }}</div>
                            <div class="value-row">{{ ration.carbohydrates }}</div>
                            <div class="value-row">{{ ration.calories }}</div>
                            <div class="value-row">{{ ration.fibers }}</div>
                            <div class="value-row">{{ ration.glycemic_index }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import url from "@/services/url";
import Title from "@/components/Title";
import PopupFoods from "@/components/PopupFoods";
import PopupFoodsEdit from "@/components/PopupFoodsEdit";

export default {
    name: "ProgramRationsEdit",

    props: ['ration', 'progress'],

    components: {
        "title-page": Title,
        "popup-foods": PopupFoods,
        "popup-foods-edit": PopupFoodsEdit,
    },

    data: () => ({
        typeEdit: "",
        selectedFood: {
            idFood: -1,
            idRationFood: -1,
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

        openPopupFoodEdit(idFood, idRationFood, amount) {
            this.typeEdit = "ration";
            this.popupVisibleFoodEdit = true;
            this.selectedFood = {
                idFood: idFood,
                idRationFood: idRationFood,
                amount: amount
            }
        },

        openPopupFoodEditDish(idDish, idRationFood, amount) {
            this.typeEdit = "dishInnerRation";
            this.popupVisibleFoodEdit = true;
            this.selectedFood = {
                idDish: idDish,
                idRationFood: idRationFood,
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

        async deleteRationFood(id) {
            let food = {
                id: id
            }
            this.progressDiet = true;
            this.progressDietMeal = true;
            await axios.post(`${url}/api/programs/delete-ration-food`, food).then((res) => {
                if (res.data.name === "Success") {
                    this.updateFoods();
                }
            });
        },

        updateFoods() {
            this.$emit("updateRationFoods", this.ration.id);
        }
    },

    mounted() {

    }
}
</script>

<style lang="scss">
#app {
    .program-rations-edit {
        .ration-edit-container {
            display: flex;
            align-items: flex-start;
            margin-top: 30px;

            .ration-edit-content {
                flex: 0 0 calc(100% - 255px);

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

                        @media (max-width: 1263px) {
                            flex: 0 0 262px;
                        }

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

                        @media (max-width: 1263px) {
                            flex: 0 0 49px;
                        }
                    }

                    .calories {
                        flex: 0 0 77px;

                        @media (max-width: 1263px) {
                            flex: 0 0 70px;
                        }
                    }

                    .fibers {
                        flex: 0 0 112px;

                        @media (max-width: 1263px) {
                            flex: 0 0 80px;
                        }
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
    .program-rations-edit {
        .ration-edit-container {
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