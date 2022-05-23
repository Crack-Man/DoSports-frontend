<template>
    <v-dialog
        v-model="popupVisibleFood"
        persistent
        content-class="popup-food--content"
        width="1110px"
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
            <v-card-text class="popup-foods">
                <div class="popup-title">Добавление продуктов</div>
                <div class="popup-container">
                    <div class="popup-content">
                        <div class="header-popup">
                            <v-text-field
                                class="input food-name"
                                v-model="foodName"
                                :append-icon="'mdi-magnify'"
                                placeholder="Название продукта..."
                                hide-details="auto"
                                dark
                                outlined
                                required
                            ></v-text-field>
                            <v-select
                                v-model="idCategory"
                                class="input category"
                                :menu-props="{ bottom: true, offsetY: true }"
                                :append-icon="'mdi-chevron-down'"
                                :items="this.foodCats"
                                :item-text="'name'"
                                :item-value="'id'"
                                dark
                                outlined
                                required
                            ></v-select>
                        </div>
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
                        <div class="scroller">
                            <div :key="index" class="item" v-for="(food, index) in foodsFiltered">
                                <div class="food" :id="`food${index}`">
                                    <div class="name"><span>{{ food['name'] }}</span></div>
                                    <div class="name-speech" :id="`name-speech${index}`"><div>{{ food['name'] }}</div></div>
                                    <div class="proteins"><span>{{ food['proteins'] }}</span></div>
                                    <div class="fats"><span>{{ food['fats'] }}</span></div>
                                    <div class="carbohydrates"><span>{{ food['carbohydrates'] }}</span></div>
                                    <div class="calories"><span>{{ food['calories'] }}</span></div>
                                    <div class="fibers"><span>{{ food['fibers'] }}</span></div>
                                    <div class="glycemic-index"><span>{{ food['glycemic_index'] }}</span></div>
                                    <div class="arrow">
                                        <img @click="openParams(index)" :class="'arrow' + index"
                                             :src="require('@/assets/img/png/arrow-right.png')">
                                    </div>
                                </div>
                                <span class="gram" v-if="showedFood === index">Укажите граммовку</span>
                                <div class="params" v-if="showedFood === index">
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
                                    <div class="button-add-meal-food">
                                        <v-btn
                                            class="button add-meal-food"
                                            color="primary"
                                            :loading="progress"
                                            @click="addFoods(food.id)"
                                        >
                                            Добавить
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <popup-foods-sidebar/>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PopupFoodsSidebar from "@/components/PopupFoodsSidebar";
import axios from "axios";
import url from "../services/url";

export default {
    name: "PopupFoods",

    props: ['visible', 'idMeal'],

    components: {
        PopupFoodsSidebar
    },

    data: () => ({
        popupVisibleFood: false,
        showedFood: -1,
        progress: false,
        idCategory: 0,
        grams: 100,
        foodName: "",
    }),

    watch: {
        visible() {
            this.popupVisibleFood = this.visible;
        },

        popupVisibleFood() {
            this.$emit('updateVisible', this.popupVisibleFood)
        },

        showedFood() {
            this.grams = 100;
        },
    },

    computed: {
        ...mapGetters(["foods", "foodCategories"]),

        proteins() {
            if (this.showedFood !== -1) {
                let value = this.foods[this.showedFood]["proteins"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        foodCats() {
            if (this.foodCategories) {
                let cats = Array.from(this.foodCategories);
                cats.splice(0, 0, {id: 0, name: "Все категории"});
                return cats;
            }
            return [];
        },

        foodsFiltered() {
            if (!this.foods) {
                return [];
            }
            let foods = Array.from(this.foods);
            if (this.idCategory && this.foodName) {
                foods = this.foods.filter(obj => obj.id_food_category === this.idCategory && obj.name.toLowerCase().includes(this.foodName.toLowerCase()));
            }
            else if (this.idCategory) {
                foods = this.foods.filter(obj => obj.id_food_category === this.idCategory);
            } else if (this.foodName) {
                foods = this.foods.filter(obj => obj.name.toLowerCase().includes(this.foodName.toLowerCase()));
            }
            return foods;
        },

        fats() {
            if (this.showedFood !== -1) {
                let value = this.foods[this.showedFood]["fats"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        carbohydrates() {
            if (this.showedFood !== -1) {
                let value = this.foods[this.showedFood]["carbohydrates"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        calories() {
            if (this.showedFood !== -1) {
                let value = this.foods[this.showedFood]["calories"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        fibers() {
            if (this.showedFood !== -1) {
                let value = this.foods[this.showedFood]["fibers"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },
    },

    methods: {
        ...mapActions(["showFoods", "showFoodCategories"]),

        toggleClassArrow() {
            if (this.showedFood !== -1) {
                let arrow = document.querySelector(`.popup-foods .arrow${this.showedFood}`);
                arrow.classList.toggle('active');
            }
        },

        openParams(index) {
            if (this.showedFood !== index) {
                this.toggleClassArrow();
                this.showedFood = index;
                this.toggleClassArrow();
            } else {
                this.toggleClassArrow();
                this.showedFood = -1;
            }
        },

        closePopup() {
            this.toggleClassArrow();
            this.popupVisibleFood = false;
            this.showedFood = -1;
            this.idCategory = 0;
            this.foodName = "";
        },

        async addFoods(id) {
            this.progress = true;
            let food = {
                idFood: id,
                amount: this.grams,
                idMeal: this.idMeal
            };
            await axios.post(`${url}/api/programs/add-meal-food`, food).then((res) => {
                if (res.data.name === "Success") {
                    this.$emit("updateDiet");
                    this.closePopup();
                }
                this.progress = false;
            })
        }
    },

    mounted() {
        this.showFoods();
        this.showFoodCategories();
    }
}
</script>

<style lang="scss">

#app {
    .popup-food--content {
        overflow: hidden;
    }

    .popup-foods {

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

                .scroller {
                    padding-right: 15px;
                    height: 380px;
                    margin-top: 10px;
                    overflow-y: scroll;

                    @-moz-document url-prefix() {
                        //padding-right: 10px;
                        padding-right: 18px;
                    }
                }

                .scroller::-webkit-scrollbar {
                    width: 3px;
                }

                .header-table {
                    margin-top: 22px;
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
                            transform: rotate(-135deg);
                            bottom: -5px;
                            left: calc(50% - 14px / 2);
                        }

                        .name-speech#name-speech0:before {
                            transform: rotate(45deg);
                            top: -5px;
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
                                cursor: pointer;
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

                        .button-add-meal-food {
                            flex: 1 0 auto;

                            .button.add-meal-food {
                                margin-top: 0;
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
    .popup-foods {
        .scroller {
            scrollbar-color: #9196FF #262635;
            //scrollbar-width: thin;
            scrollbar-width: none;
        }

        .v-menu__content {
            background: #1A1A27;
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

        .header-table {
            div {
                color: #B5B5B8;
            }

            .speech {
                color: white;
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
                    background-color: #262635;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                }

                .name-speech:before {
                    border: 5px solid;
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