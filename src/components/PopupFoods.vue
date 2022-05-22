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
                                class="input category"
                                :menu-props="{ bottom: true, offsetY: true }"
                                :append-icon="'mdi-chevron-down'"
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
                            </div>
                            <div class="glycemic-index">
                                ГИ
                            </div>
                        </div>
                        <div class="scroller">
                            <div :key="index" class="item" v-for="(food, index) in foods">
                                <div class="food" :id="`food${index}`">
                                    <div class="name"><span>{{ food['name'] }}</span></div>
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
                                        >
                                            Добавить
                                        </v-btn>
                                    </div>
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

export default {
    name: "PopupFoods",

    props: ['visible'],

    data: () => ({
        popupVisibleFood: false,
        showedFood: -1,
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
        ...mapGetters(["foods"]),

        proteins() {
            if (this.showedFood !== -1) {
                let value = this.foods[this.showedFood]["proteins"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
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
        ...mapActions(["showFoods"]),

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
        }
    },

    mounted() {
        this.showFoods();
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
                        flex: 0 0 58px;
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
        }

        .item {
            .food {
                background: #262635;

                div {
                    color: white;
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