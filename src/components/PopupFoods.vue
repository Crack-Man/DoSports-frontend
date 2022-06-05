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
            <v-card-text class="popup-progress" v-if="progressPopupFoods || progressPopupPersonalFoods || progressPopupRations || progressPopupDishes">
                <v-progress-circular
                    size="50"
                    class="icon"
                    indeterminate
                    color="#004BD7"
                ></v-progress-circular>
            </v-card-text>
            <v-card-text v-else class="popup-foods">
                <div class="popup-title">{{ titleName }}</div>
                <div class="popup-container">
                    <div class="popup-content" v-if="page === 0">
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
                                <span>К</span>
                                <img :src="require('@/assets/img/svg/ask--light-grey.svg')"/>
                                <div class="speech">Клетчатка</div>
                            </div>
                            <div class="glycemic-index">
                                <span>ГИ</span>
                                <img :src="require('@/assets/img/svg/ask--light-grey.svg')"/>
                                <div class="speech">Гликемический индекс</div>
                            </div>
                        </div>
                        <div class="scroller">
                            <div :key="index" class="item" v-for="(food, index) in foodsFiltered">
                                <div class="food" @click="openParams(food.id)" :id="`food${food.id}`">
                                    <div class="name"><span>{{ food['name'] }}</span></div>
                                    <div class="name-speech" :id="`name-speech${index}`">
                                        <div>{{ food['name'] }}</div>
                                    </div>
                                    <div class="proteins"><span>{{ food['proteins'] }}</span></div>
                                    <div class="fats"><span>{{ food['fats'] }}</span></div>
                                    <div class="carbohydrates"><span>{{ food['carbohydrates'] }}</span></div>
                                    <div class="calories"><span>{{ food['calories'] }}</span></div>
                                    <div class="fibers"><span>{{ food['fibers'] }}</span></div>
                                    <div class="glycemic-index"><span>{{ food['glycemic_index'] }}</span></div>
                                    <div class="arrow">
                                        <img :class="'arrow' + food.id"
                                             :src="require('@/assets/img/png/arrow-right.png')">
                                    </div>
                                </div>
                                <span class="gram" v-if="showedFood === food.id">Укажите граммовку</span>
                                <div class="params" v-if="showedFood === food.id">
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
                                                    {{ value }} г
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
                    <popup-foods-card-dishes v-if="page === 1" :dishes="this.dishes" :id-meal="idMeal"
                                              @addDish="addDishToMeal"/>
                    <popup-foods-card-personal v-if="page === 2" :foods="this.personalFoods" :food-cats="foodCats"
                                               :progress="progress" @addFood="addPersonalFood"/>
                    <popup-foods-card-rations v-if="page === 3" :rations="this.rations" :id-meal="idMeal"
                                              @addRation="addRationToMeal"/>
                    <popup-foods-sidebar :page="page" :personal-foods="this.personalFoods" :rations="this.rations"
                                         :dishes="this.dishes" :type="type"
                                         @changePage="changePage"/>
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
import PopupFoodsCardPersonal from "@/components/PopupFoodsCardPersonal";
import PopupFoodsCardRations from "@/components/PopupFoodsCardRations";
import PopupFoodsCardDishes from "@/components/PopupFoodsCardDishes";

export default {
    name: "PopupFoods",

    props: ['visible', 'idMeal', 'idRation', 'idDish', 'type', 'dishName'],

    components: {
        PopupFoodsSidebar,
        PopupFoodsCardDishes,
        PopupFoodsCardPersonal,
        PopupFoodsCardRations,
    },

    data: () => ({
        progressPopupFoods: true,
        progressPopupPersonalFoods: true,
        progressPopupRations: true,
        progressPopupDishes: true,
        page: 0,
        popupVisibleFood: false,
        showedFood: -1,
        progress: false,
        idCategory: 0,
        grams: 100,
        foodName: "",
        titleNameList: [
            {id: 0, name: "Добавление продуктов"},
            {id: 1, name: "Добавление блюд"},
            {id: 2, name: "Добавление своих продуктов"},
            {id: 3, name: "Добавление рационов"},
        ]

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

        foodName() {
            this.resetShowedFood();
        },

        idCategory() {
            this.resetShowedFood();
        },

        page() {
            this.resetShowedFood();
        },
    },

    computed: {
        ...mapGetters(["userData", "foods", "personalFoods", "foodCategories", "rations", "dishes"]),

        titleName() {
            return this.titleNameList.find((obj) => obj.id === this.page).name;
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
            } else if (this.idCategory) {
                foods = this.foods.filter(obj => obj.id_food_category === this.idCategory);
            } else if (this.foodName) {
                foods = this.foods.filter(obj => obj.name.toLowerCase().includes(this.foodName.toLowerCase()));
            }
            return foods;
        },

        proteins() {
            if (this.showedFood !== -1) {
                let value = this.foods.find((obj) => obj.id === this.showedFood)["proteins"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        fats() {
            if (this.showedFood !== -1) {
                let value = this.foods.find((obj) => obj.id === this.showedFood)["fats"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        carbohydrates() {
            if (this.showedFood !== -1) {
                let value = this.foods.find((obj) => obj.id === this.showedFood)["carbohydrates"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        calories() {
            if (this.showedFood !== -1) {
                let value = this.foods.find((obj) => obj.id === this.showedFood)["calories"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        fibers() {
            if (this.showedFood !== -1) {
                let value = this.foods.find((obj) => obj.id === this.showedFood)["fibers"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },
    },

    methods: {
        ...mapActions(["showPersonalFoods", "showFoods", "showFoodCategories", "showRations", "showDishes"]),

        changePage(page) {
            this.page = page;
        },

        resetShowedFood() {
            this.toggleClassArrow();
            this.showedFood = -1;
        },

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
            this.page = 0;
            this.toggleClassArrow();
            this.popupVisibleFood = false;
            this.$emit('updateVisible', this.popupVisibleFood)
            this.showedFood = -1;
            this.idCategory = 0;
            this.foodName = "";
        },

        addRationToMeal() {
            this.$emit("updateDiet");
            this.closePopup();
        },

        addDishToMeal() {
            this.$emit("updateDiet");
            this.closePopup();
        },

        async addPersonalFood(data) {
            this.grams = data.amount;
            await this.addFoods(data.idFood);
        },

        async addFoods(id) {
            this.progress = true;
            if (this.type === "ration") {
                //    добавить продукт в рацион
                let food = {
                    idFood: id,
                    amount: this.grams,
                    idRation: this.idRation
                };
                await axios.post(`${url}/api/programs/add-ration-food`, food).then((res) => {
                    if (res.data.name === "Success") {
                        this.$emit("updateDiet");
                        this.closePopup();
                    }
                    this.progress = false;
                })
            } else if (this.type === "createDish") {
                // добавить продукт и создать блюдо
                let dish = {
                    name: this.dishName,
                    idUser: this.userData.id,
                }
                this.progress = true;
                await axios.post(`${url}/api/programs/add-dish`, dish).then(async (res) => {
                    if (res.data.name === "Success") {
                        let food = {
                            idFood: id,
                            amount: this.grams,
                            idDish: res.data.id,
                        }

                        await axios.post(`${url}/api/programs/add-dish-food`, food).then((res2) => {
                            if (res2.data.name === "Success") {
                                this.$emit("updateDiet", res.data.id);
                                this.closePopup();
                            }
                        })
                    }
                    this.progress = false;
                })
            } else if (this.type === "dish") {
                // добавление продукта в блюдо
                let food = {
                    idFood: id,
                    amount: this.grams,
                    idDish: this.idDish,
                }
                await axios.post(`${url}/api/programs/add-dish-food`, food).then((res) => {
                    if (res.data.name === "Success") {
                        this.$emit("updateDiet");
                        this.closePopup();
                    }
                    this.progress = false;
                })
            } else {
                // прием пищи
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
        }
    },

    mounted() {
        this.showFoods().then(() => {
            this.progressPopupFoods = false;
        });
        this.showFoodCategories();
        this.showPersonalFoods(this.userData.id).then(() => {
            this.progressPopupPersonalFoods = false;
        });
        this.showRations(this.userData.id).then(() => {
            this.progressPopupRations = false;
        })
        this.showDishes(this.userData.id).then(() => {
            this.progressPopupDishes = false;
        })
    }
}
</script>

<style lang="scss">

#app {
    .popup-food--content {
        overflow: hidden;
    }

    .popup-progress {
        height: 500px !important;

        .icon {
            position: absolute;
            left: calc(50% - 50px / 2);
            bottom: calc(50% - 50px / 2);
        }
    }

    .popup-foods {
        div {
            // запрет на выделение
            // Для эксплорера
            -ms-user-select: none;

            /**
             * Для мозилы
             */
            -moz-user-select: none;

            // Для конкверора
            -khtml-user-select: none;

            // Для Сафари и Хрома
            -webkit-user-select: none;
        }

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
                        left: 4px;
                        width: 8px;
                    }

                    .fibers span, .glycemic-index span {
                        cursor: pointer;
                    }

                    img:hover ~ .speech, .fibers span:hover ~ .speech, .glycemic-index span:hover ~ .speech {
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
                    margin-top: 10px;
                    cursor: pointer;

                    .food {
                        position: relative;
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
                            border-radius: 2px;
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

                .item:first-child {
                    margin-top: 0;
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
                    background-color: #262635;
                    border-radius: 2px;
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