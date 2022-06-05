<template>
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
                    <div class="name-speech" :id="`name-speech${index}`"><div>{{ food['name'] }}</div></div>
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
</template>

<script>

export default {
    name: "PopupFoodsCardPersonal",

    props: ["foods", "foodCats", 'progress'],

    data: () => ({
        showedFood: -1,
        idCategory: 0,
        grams: 100,
        foodName: "",
    }),

    watch: {
        showedFood() {
            this.grams = 100;
        },

        idCategory() {
            this.resetShowed();
        },

        foodName() {
            this.resetShowed();
        },
    },

    computed: {
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
        resetShowed() {
            this.toggleClassArrow();
            this.showedFood = -1;
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

        addFoods(id) {
            let food = {
                idFood: id,
                amount: this.grams,
                idMeal: this.idMeal
            };
            this.$emit("addFood", food);
        }
    }
}
</script>

<style lang="scss">

</style>