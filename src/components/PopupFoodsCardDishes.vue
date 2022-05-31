<template>
    <div class="popup-content dishes">
        <div class="header-popup">
            <v-text-field
                class="input food-name"
                v-model="dishName"
                :append-icon="'mdi-magnify'"
                placeholder="Название продукта..."
                hide-details="auto"
                dark
                outlined
                required
            ></v-text-field>
        </div>
        <div class="header-table">
            <div class="name">Название рациона</div>
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
            <div :key="index" class="item" v-for="(food, index) in dishesFiltered">
                <div class="food" @click="openParams(food.id)" :id="`food${food.id}`">
                    <div class="name"><span>{{ food['name'] }}</span></div>
                    <div class="name-speech" :id="`name-speech${index}`">
                        <div>{{ food['name'] }}</div>
                    </div>
                    <div class="proteins"><span>{{ food['proteinsCalc'] }}</span></div>
                    <div class="fats"><span>{{ food['fatsCalc'] }}</span></div>
                    <div class="carbohydrates"><span>{{ food['carbohydratesCalc'] }}</span></div>
                    <div class="calories"><span>{{ food['caloriesCalc'] }}</span></div>
                    <div class="fibers"><span>{{ food['fibersCalc'] }}</span></div>
                    <div class="glycemic-index"><span>{{ food['glycemic_indexCalc'] }}</span></div>
                    <div class="arrow">
                        <img :class="'arrow' + food.id"
                             :src="require('@/assets/img/png/arrow-right.png')">
                    </div>
                </div>
                <span class="gram" v-if="showedDish === food.id">Укажите граммовку</span>
                <div class="params" v-if="showedDish === food.id">
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
                            @click="addDishFoods(food.id)"
                        >
                            Добавить
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/services/url";

export default {
    name: "PopupFoodsCardDishes",

    props: ['dishes', 'idMeal'],

    data: () => ({
        progress: false,
        dishName: "",
        showedDish: -1,
        grams: 100,
    }),

    watch: {
        showedDish() {
            this.grams = 100;
        },

        dishName() {
            this.resetShowed();
        },
    },

    computed: {
        dishesFiltered() {
            if (!this.dishes) {
                return [];
            }
            let dishes = Array.from(this.dishes);
            if (this.dishName) {
                dishes = this.dishes.filter(obj => obj.name.toLowerCase().includes(this.dishName.toLowerCase()));
            }
            return dishes;
        },

        proteins() {
            if (this.showedDish !== -1) {
                let value = this.dishes.find((obj) => obj.id === this.showedDish)["proteinsCalc"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        fats() {
            if (this.showedDish !== -1) {
                let value = this.dishes.find((obj) => obj.id === this.showedDish)["fatsCalc"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        carbohydrates() {
            if (this.showedDish !== -1) {
                let value = this.dishes.find((obj) => obj.id === this.showedDish)["carbohydratesCalc"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        calories() {
            if (this.showedDish !== -1) {
                let value = this.dishes.find((obj) => obj.id === this.showedDish)["caloriesCalc"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },

        fibers() {
            if (this.showedDish !== -1) {
                let value = this.dishes.find((obj) => obj.id === this.showedDish)["fibersCalc"] * this.grams / 100
                return (+value.toFixed(1));
            }
            return "";
        },
    },

    methods: {
        resetShowed() {
            this.toggleClassArrow();
            this.showedDish = -1;
        },

        toggleClassArrow() {
            if (this.showedDish !== -1) {
                let arrow = document.querySelector(`.popup-content.dishes .arrow${this.showedDish}`);
                arrow.classList.toggle('active');
            }
        },

        openParams(index) {
            if (this.showedDish !== index) {
                this.toggleClassArrow();
                this.showedDish = index;
                this.toggleClassArrow();
            } else {
                this.toggleClassArrow();
                this.showedDish = -1;
            }
        },

        async addDishFoods(id) {
            this.progress = true;
            let dish = {
                idDish: id,
                amount: this.grams,
                idMeal: this.idMeal
            }
            await axios.post(`${url}/api/programs/add-meal-dish`, dish).then((res) => {
                if (res.data.name === "Success") {
                    this.$emit("addDish");
                }
                this.progress = false;
                this.grams = 100;
            })
        }
    },

    mounted() {

    }
}
</script>

<style lang="scss">
#app {
    .dishes {
        .header-popup {
            .input {
                flex: 0 0 calc(100% - 20px) !important;
                width: 100%;
            }
        }
    }
}
</style>