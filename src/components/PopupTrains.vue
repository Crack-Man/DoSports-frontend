<template>
    <v-dialog
        v-model="popupVisibleTrains"
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
            <v-card-text class="popup-progress" v-if="progressPopupTrains">
                <v-progress-circular
                    size="50"
                    class="icon"
                    indeterminate
                    color="#004BD7"
                ></v-progress-circular>
            </v-card-text>
            <v-card-text v-else class="popup-foods">
                <div class="popup-title">Добавление программы тренировок</div>
                <div class="popup-container">
                    <div class="popup-content">
                        <div class="header-popup">
                            <v-text-field
                                class="input food-name"
                                v-model="trainName"
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
                                :items="this.trainCats"
                                :item-text="'name'"
                                :item-value="'id'"
                                dark
                                outlined
                                required
                            ></v-select>
                        </div>
                        <div class="scroller">
                            <div :key="index" class="item" v-for="(train, index) in trainsFiltered">
                                <div class="food" @click="openParams(train.id)" :id="`train${train.id}`">
                                    <div class="name"><span>{{ train['name'] }}</span></div>
                                    <div class="arrow">
                                        <img :class="'arrow' + train.id"
                                             :src="require('@/assets/img/png/arrow-right.png')">
                                    </div>
                                </div>
                                <div class="params" v-if="showedTrain === train.id">
                                    <v-btn
                                        class="button add-meal-food"
                                        color="primary"
                                        :loading="progress"
                                        @click="addTrain(train.id)"
                                    >
                                        Добавить
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
    name: "PopupTrains",

    props: ['visible', 'idProgramTrain'],

    components: {
    },

    data: () => ({
        popupVisibleTrains: false,
        progressPopupTrains: true,
        showedTrain: -1,
        trainName: "",
        progress: false,
        idCategory: 0,
    }),

    watch: {
        visible() {
            this.popupVisibleFood = this.visible;
        },

        popupVisibleTrains() {
            this.$emit('updateVisible', this.popupVisibleTrains)
        },

        trainName() {
            this.resetShowedTrain();
        },

        idCategory() {
            this.resetShowedTrain();
        },
    },

    computed: {
        ...mapGetters(["userData", "foods", "personalFoods", "foodCategories", "rations", "dishes"]),

        trainCats() {
            if (this.trainCategories) {
                let cats = Array.from(this.foodCategories);
                cats.splice(0, 0, {id: 0, name: "Все категории"});
                return cats;
            }
            return [];
        },

        trainsFiltered() {
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
    },

    methods: {
        ...mapActions([]),

        changePage(page) {
            this.page = page;
        },

        resetShowedTrain() {
            this.toggleClassArrow();
            this.showedTrain = -1;
        },

        toggleClassArrow() {
            if (this.showedTrain !== -1) {
                let arrow = document.querySelector(`.popup-foods .arrow${this.showedTrain}`);
                arrow.classList.toggle('active');
            }
        },

        openParams(index) {
            if (this.showedTrain !== index) {
                this.toggleClassArrow();
                this.showedTrain = index;
                this.toggleClassArrow();
            } else {
                this.toggleClassArrow();
                this.showedTrain = -1;
            }
        },

        closePopup() {
            this.page = 0;
            this.toggleClassArrow();
            this.popupVisibleFood = false;
            this.$emit('updateVisible', this.popupVisibleFood)
            this.showedTrain = -1;
            this.idCategory = 0;
            this.foodName = "";
        },

        addRationToMeal() {
            this.$emit("updateDiet");
            this.closePopup();
        },

        async addTrain(id) {
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

                    .food {
                        cursor: pointer;
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
                        margin-top: 10px;
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
                            width: 165px;

                            .v-slider {
                                cursor: pointer;
                                min-height: 0;
                                margin: 0;

                                .v-slider__thumb-label {
                                    display: none !important;
                                }

                                .v-slider__track-container {
                                    height: 1px;
                                }
                            }

                            .slider-input {
                                position: relative;
                                top: 1px;
                                width: 160px;
                            }

                            .input-grams.v-text-field--outlined {
                                position: relative;
                                bottom: 15px;
                                width: 33px;
                                height: 28px;
                                margin: auto;

                                .v-input__slot {
                                    padding: 0;
                                }

                                input {
                                    text-align: center;
                                    font-family: 'Inter-Regular', sans-serif;
                                    font-size: 12px;
                                    line-height: 180%;
                                }

                                fieldset {
                                    border: none;
                                }
                            }

                            .v-slider__thumb {
                                width: 5px;
                                height: 5px;
                                transform: translateY(-50%) translateX(100%) !important;
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

            .slider-container {
                border: 1px solid #B5B5B8;
                border-radius: 2px;

                .v-slider__thumb {
                    background: #9196FF !important;
                }

                .v-slider__track-background {
                    background: #B5B5B8;
                }

                .v-slider__track-fill {
                    background: #9196FF !important;;
                }
            }

            .slider-container:hover {
                border: 1px solid white;

                .v-slider__track-background {
                    background: white;
                }

                .input-grams {
                    input {
                        color: white;
                    }
                }
            }

            .input-grams {
                input {
                    color: #B5B5B8;
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