<template>
    <v-dialog
        v-model="popupVisibleFood"
        persistent
        content-class="popup-food-edit--content"
        width="781px"
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
            <v-card-text class="popup-foods-edit">
                <div class="popup-title">Редактирование</div>
                <div class="popup-container">
                    <div class="popup-content">
                        <div class="header-table">
                            <div class="name">Название продукта</div>
                            <div class="proteins">Б</div>
                            <div class="fats">
                                Ж
                            </div>
                            <div class="carbohydrates">
                                У
                            </div>
                            <div class="calories">
                                Ккал
                            </div>
                            <div class="fibers">
                                К
                                <img :src="require('@/assets/img/svg/ask--light-grey.svg')"/>
                                <div class="speech">Клетчатка</div>
                            </div>
                            <div class="glycemic-index">
                                ГИ
                                <img :src="require('@/assets/img/svg/ask--light-grey.svg')"/>
                                <div class="speech">Гликемический индекс</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="food">
                                <div class="name"><span>{{ food.name }}</span></div>
                                <div class="name-speech" :id="`name-speech${food.id}`">
                                    <div>{{ food.name }}</div>
                                </div>
                                <div class="proteins"><span>{{ food.proteins }}</span></div>
                                <div class="fats"><span>{{ food.fats }}</span></div>
                                <div class="carbohydrates"><span>{{ food.carbohydrates }}</span></div>
                                <div class="calories"><span>{{ food.calories }}</span></div>
                                <div class="fibers"><span>{{ food.fibers }}</span></div>
                                <div class="glycemic-index"><span>{{ food.glycemic_index }}</span></div>
                                <div class="arrow">
                                    <img :class="'arrow' + food.id + ' active'"
                                         :src="require('@/assets/img/png/arrow-right.png')">
                                </div>
                            </div>
                            <span class="gram">Укажите граммовку</span>
                            <div class="params">
                                <div class="slider">
                                    <div class="slider-container">
                                        <v-slider
                                            class="slider"
                                            dark
                                            v-model="grams"
                                            thumb-label="always"
                                            hide-details
                                            min="0"
                                            max="1000"
                                            step="5"
                                        >
                                            <template v-slot:thumb-label="{ value }">
                                                {{ value }} гр
                                            </template>
                                        </v-slider>
                                    </div>
                                </div>
                                <div class="proteins">{{ proteins }}</div>
                                <div class="fats">{{ fats }}</div>
                                <div class="carbohydrates">{{ carbohydrates }}</div>
                                <div class="calories">{{ calories }}</div>
                                <div class="fibers">{{ fibers }}</div>
                                <div class="glycemic-index">{{ food['glycemic_index'] }}</div>
                                <div class="button-save-meal-food">
                                    <v-btn
                                        class="button save-meal-food"
                                        color="primary"
                                        :loading="progress"
                                        @click="changeFood"
                                    >
                                        Сохранить
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import url from "../services/url";

export default {
    name: "PopupFoodsEdit",

    props: ['visible', 'selectedFood', 'type'],

    components: {},

    data: () => ({
        popupVisibleFood: false,
        progress: false,
        grams: 100,
    }),

    watch: {
        visible() {
            this.popupVisibleFood = this.visible;
            if (this.visible) {
                if (this.type === "dishInnerMeal") {
                    this.showDishes(this.userData.id);
                } else {
                    this.showFoodById(this.selectedFood.idFood);
                }
            }
        },

        type() {
            if (this.type === "dishInnerMeal") {
                this.showDishes(this.userData.id);
            } else {
                this.showFoodById(this.selectedFood.idFood);
            }
        },

        popupVisibleFood() {
            this.$emit('updateVisible', this.popupVisibleFood)
        },

        'selectedFood.amount'() {
            this.grams = this.selectedFood.amount;
        }
    },

    computed: {
        ...mapGetters(["foodById", "dishes", "userData"]),

        food() {
            if (this.type === "dishInnerMeal" && this.dishes.length) {
                return this.dishes.find(obj => obj.id === this.selectedFood.idDish);
            }
            if (this.foodById.length) {
                return this.foodById[0];
            }
            return {
                id: 0,
                name: "",
                id_food_category: 0,
                proteins: 0,
                fats: 0,
                carbohydrates: 0,
                calories: 0,
                fibers: 0,
                glycemic_index: 0,
                author: 0
            };
        },

        proteins() {
            if (this.food.id !== 0) {
                let value = this.food["proteins"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        fats() {
            if (this.food.id !== 0) {
                let value = this.food["fats"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        carbohydrates() {
            if (this.food.id !== 0) {
                let value = this.food["carbohydrates"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        calories() {
            if (this.food.id !== 0) {
                let value = this.food["calories"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        fibers() {
            if (this.food.id !== 0) {
                let value = this.food["fibers"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },
    },

    methods: {
        ...mapActions(["showFoodById", "showDishes"]),

        closePopup() {
            this.grams = this.selectedFood.amount;
            this.popupVisibleFood = false;
            this.$emit('updateVisible', this.popupVisibleFood)
        },

        async changeFood() {
            this.progress = true;
            if (this.type === "ration") {
                //    рацион
                let food = {
                    id: this.selectedFood.idRationFood,
                    amount: this.grams,
                };
                await axios.post(`${url}/api/programs/update-amount-ration-food`, food).then((res) => {
                    if (res.data.name === "Success") {
                        this.$emit("updateDiet");
                        this.closePopup();
                    }
                    this.progress = false;
                })
            } else if (this.type === "dish") {
                // блюдо
                let food = {
                    id: this.selectedFood.idDishFood,
                    amount: this.grams,
                };
                await axios.post(`${url}/api/programs/update-amount-dish-food`, food).then((res) => {
                    if (res.data.name === "Success") {
                        this.$emit("updateDiet");
                        this.closePopup();
                    }
                    this.progress = false;
                })
            } else {
                // прием пищи
                let food = {
                    id: this.selectedFood.idMealFood,
                    amount: this.grams,
                };
                await axios.post(`${url}/api/programs/update-amount-food`, food).then((res) => {
                    if (res.data.name === "Success") {
                        this.$emit("updateDiet");
                        this.closePopup();
                    }
                    this.progress = false;
                })
            }
        }
    },

    mounted() {
    }
}
</script>

<style lang="scss">

#app {
    .popup-food-edit--content {
        overflow: hidden;

        .v-card {
            padding-bottom: 25px;
        }
    }

    .popup-foods-edit {

        .popup-title {
            font-family: 'Inter-SemiBold', sans-serif;
            font-size: 28px;
            line-height: 115%;
        }

        .popup-container {
            display: flex;
            margin-top: 5px;

            .popup-content {
                margin-top: 30px;
                flex: 0 0 698px;

                .header-popup {
                    display: flex;

                    .input {
                        margin-top: 0;
                    }

                    .food-name {
                        flex: 0 0 430px;
                    }

                    .category {
                        flex: 0 0 230px;
                        width: 230px;
                        margin-left: 20px;
                        margin-right: 18px;
                    }
                }

                .header-table {
                    margin-top: 5px;
                    display: flex;

                    div {
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 13px;
                        line-height: 16px;
                    }

                    .name {
                        margin-left: 15px;
                        flex: 0 0 200px;
                    }

                    .proteins, .fats, .carbohydrates, .fibers {
                        position: relative;
                        flex: 0 0 58px;
                    }

                    .glycemic-index {
                        position: relative;

                        .speech {
                            width: 162px;
                            padding: 8px 12px;
                            left: -55px;
                        }

                        .speech:before {
                            left: 75px;
                        }
                    }

                    img {
                        cursor: pointer;
                        position: relative;
                        top: -10px;
                        width: 8px;
                    }

                    img:hover ~ .speech {
                        display: block;
                    }

                    .speech {
                        display: none;
                        padding: 8px 21px;
                        border-radius: 2px;
                        position: absolute;
                        top: -43px;
                        left: -35px;
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 12px;
                        line-height: 145%;
                    }

                    .speech:before {
                        content: '';
                        position: absolute;
                        transform: rotate(-135deg);
                        bottom: -1px;
                        left: 46px;
                    }


                    .calories {
                        flex: 0 0 78px;
                    }

                    .glycemic-index {
                        flex: 0 0 51px;
                    }
                }

                .item {
                    .food {
                        position: relative;
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                        border-radius: 4px;
                        height: 55px;

                        .div {
                            font-family: 'Inter-Regular', sans-serif;
                            font-size: 14px;
                            line-height: 180%;
                        }

                        .name {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            margin-left: 15px;
                            flex: 0 0 170px;
                        }

                        .name:hover ~ .name-speech {
                            display: flex;
                        }

                        .name-speech {
                            display: none;
                            position: absolute;
                            top: -42px;
                            left: 15px;
                            height: 50px;
                            padding: 7px 11px;
                            z-index: 1;

                            justify-content: center;
                            align-items: center;

                            div {
                                //text-align: center;
                                //width: 120px;
                            }
                        }

                        .name-speech#name-speech0 {
                            top: auto;
                            bottom: -42px;
                        }

                        .name-speech:before {
                            content: '';
                            position: absolute;
                            transform: rotate(90deg), scale(-1, 1);
                            bottom: -8px;
                            left: 0;
                        }

                        .name-speech#name-speech0:before {
                            transform: rotate(135deg);
                            top: -7px;
                            left: -7px;
                            bottom: auto;
                        }

                        .proteins {
                            margin-left: 30px;
                        }

                        .proteins, .fats, .carbohydrates, .fibers {
                            flex: 0 0 58px;
                        }

                        .calories {
                            flex: 0 0 78px;
                        }

                        .glycemic-index {
                            flex: 0 0 51px;
                        }

                        .arrow {
                            flex: 1 0 auto;
                            margin-right: 15px;

                            img {
                                float: right;
                                display: block;
                                width: 14px;
                                transition: all 0.3s ease 0s;
                            }

                            img.active {
                                transform: rotate(90deg);
                            }
                        }
                    }

                    #food0 {
                        margin-top: 0;
                    }

                    span.gram {
                        margin-left: 15px;
                        display: block;
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 13px;
                        line-height: 180%;
                        margin-top: 15px;
                    }

                    .params {
                        display: flex;
                        align-items: center;
                        margin-bottom: 35px;

                        .proteins, .fats, .carbohydrates, .fibers {
                            flex: 0 0 58px;
                        }

                        .calories {
                            flex: 0 0 78px;
                        }

                        .glycemic-index {
                            flex: 0 0 51px;
                        }

                        .button-save-meal-food {
                            flex: 1 0 auto;

                            .button.save-meal-food {
                                float: right;
                                margin-top: 0;
                                margin-right: 15px;
                                width: 90px;
                                height: 30px;
                                border-radius: 2px;

                                font-family: 'Inter-Regular', sans-serif;
                                font-size: 12px;
                                line-height: 180%;
                            }
                        }

                        .slider {
                            flex: 0 0 215px;
                        }

                        .slider-container {
                            margin-left: 15px;
                            width: 142px;

                            .v-slider {
                                margin: 0;

                                .v-slider__thumb-label {
                                    width: 50px !important;
                                    background: none !important;
                                    transform: translateY(150%) translateY(-12px) translateX(-20%) rotate(45deg) !important;

                                    span {
                                        font-family: 'Inter-Medium', sans-serif;
                                        font-size: 12px;
                                        line-height: 125%;
                                    }
                                }
                            }

                            .v-slider__thumb {
                                border-radius: 0;
                                width: 2px;
                                height: 14px;
                                transform: translateY(-50%) translateX(200%) !important;
                            }

                            .v-slider__thumb::before {
                                display: none;
                            }

                            .v-slider__thumb::after {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
}

#app.dark {
    .popup-foods-edit {
        .v-menu__content {
            background: #1A1A27;
        }

        .header-table {
            div {
                color: #B5B5B8;
            }

            .speech {
                color: white;
                border-radius: 2px;
                background-color: #262635;
            }

            .speech:before {
                border: 5px solid;
                border-color: #262635 transparent transparent #262635;
            }
        }

        .item {
            .food {
                background: #262635;

                div {
                    color: white;
                }

                .name-speech {
                    color: white;
                    border-radius: 2px;
                    background-color: #262635;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                }

                .name-speech:before {
                    border: 7px solid;
                    border-color: #262635 transparent transparent #262635;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                }
            }

            span.gram {
                color: white;
            }

            .slider {

                .v-slider__track-background {
                    background: #B5B5B8;
                }
            }

            .params {
                div {
                    color: white;
                }
            }
        }
    }
}
</style>