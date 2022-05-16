<template>
    <div class="program-meal">
        <div class="counter">
            <div class="">Установка приемов пищи на день</div>
            <div class="meal-counter">
                <div class="image" @click="decreaseMeal">-</div>
                <div class="count">{{ mealCount }}</div>
                <div class="image" @click="increaseMeal">+</div>
            </div>
            <div class="add-meals" @click="calcMealSchedule">Готово</div>
            <div class="meals" v-for="(item, index) in mealSchedule" :key="index">
                <div class="time">
                    {{ item.time }}
                </div>
            </div>
            <div class="food-button" @click="popupVisibleFood = true">Список продуктов</div>
            <v-dialog
                v-model="popupVisibleFood"
                persistent
                width="1110px"
                dark
            >
                <v-card>
                    <v-btn
                        icon
                        dark
                        class="close"
                        @click="popupVisibleFood = false"
                    >
                        <img
                            :src="require('../assets/img/png/close.png')"
                        />
                    </v-btn>
                    <v-card-text class="popup-reset">
                        <v-simple-table
                            dark
                        >
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>
                                        Название продукта
                                    </th>
                                    <th>
                                        Б
                                    </th>
                                    <th>
                                        Ж
                                    </th>
                                    <th>
                                        У
                                    </th>
                                    <th>
                                        Ккал
                                    </th>
                                    <th>
                                        Клетчатка
                                    </th>
                                    <th>
                                        ГИ
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <template
                                    v-for="(food, index) in foods"
                                >
                                    <tr :key="index" @click="showedFood = index">
                                        <td>{{ food['name'] }}</td>
                                        <td>{{ food['proteins'] }}</td>
                                        <td>{{ food['fats'] }}</td>
                                        <td>{{ food['carbohydrates'] }}</td>
                                        <td>{{ food['calories'] }}</td>
                                        <td>{{ food['fibers'] }}</td>
                                        <td>{{ food['glycemic_index'] }}</td>
                                    </tr>
                                    <tr :key="'calc' + index" v-if="showedFood === index">
                                        <td><v-text-field
                                            label="Граммы"
                                            class="input"
                                            v-model="grams"
                                            type="number"
                                            hide-details="auto"
                                            dark
                                            outlined
                                        >
                                        </v-text-field></td>
                                        <td>{{ proteins }}</td>
                                        <td>{{ fats }}</td>
                                        <td>{{ carbohydrates }}</td>
                                        <td>{{ calories }}</td>
                                        <td>{{ fibers }}</td>
                                        <td>{{ food['glycemic_index'] }}</td>
                                    </tr>
                                </template>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ProgramMeal",

    data: () => ({
        mealCount: 3,
        mealSchedule: [],
        popupVisibleFood: false,
        showedFood: -1,
        grams: 100,

    }),

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
        }
    },

    watch: {
        showedFood() {
            this.grams = 100;
        },
    },

    methods: {
        ...mapActions(["showFoods"]),

        increaseMeal() {
            if (this.mealCount < 5) {
                this.mealCount++;
            }
        },

        decreaseMeal() {
            if (this.mealCount > 3) {
                this.mealCount--;
            }
        },

        calcMealSchedule() {
            if (this.mealCount === 3) {
                this.mealSchedule = [
                    {
                        time: "07:00-09:00",
                    },

                    {
                        time: "12:00-14:00",
                    },

                    {
                        time: "16:00-18:00",
                    }
                ]
            } else if (this.mealCount === 4) {
                this.mealSchedule = [
                    {
                        time: "07:00-09:00",
                    },

                    {
                        time: "11:00-13:00",
                    },

                    {
                        time: "15:00-17:00",
                    },

                    {
                        time: "19:00-21:00",
                    },
                ]
            } else if (this.mealCount === 5) {
                this.mealSchedule = [
                    {
                        time: "07:00-09:00",
                    },

                    {
                        time: "10:00-12:00",
                    },

                    {
                        time: "13:00-15:00",
                    },

                    {
                        time: "16:00-18:00",
                    },

                    {
                        time: "19:00-21:00",
                    },
                ]
            }
        }
    },

    mounted() {
        this.showFoods();
    }
}
</script>

<style lang="scss">
#app {
    .program-meal {
        flex: 1 0 auto;
        margin-left: 30px;

        .meal-counter {
            display: flex;
            justify-content: space-between;

            .image {
                cursor: pointer;
            }
        }

        .add-meals {
            cursor: pointer;
        }
    }
}

</style>