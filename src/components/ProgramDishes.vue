<template>
    <div class="program-dishes">
        <div class="progress-dishes" v-if="progressDishes">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <template v-else-if="page === 1">
            <title-page class="dishes" name="Блюда"/>
            <div v-if="!dishes.length">
                <div class="text">
                    Здесь будет отображаться информация о ваших блюдах.
                    Составьте их из уже имеющимся продуктов или добавленных вами.
                </div>
            </div>
            <div style="margin-bottom: 30px;" v-else>
                <div
                    class="dish-card"
                    v-for="dish in dishes"
                    :key="dish.id"
                >
                    <div class="name-dish">
                        <span>{{ dish.name }}</span>
                    </div>
                    <div class="foods">
                        <div class="list">
                            <div v-if="!dish.foods.length" class="empty">
                                Продукты еще не добавлены
                            </div>
                            <div v-else>
                                <template v-for="(food, index) in dish.foods">
                                    <div v-if="index < 2" :key="food.id" class="item">
                                        {{ food.name }}
                                    </div>
                                    <div class="item ellipsis" :key="food.id" v-else-if="index === 2">...</div>
                                </template>
                            </div>
                        </div>
                        <div class="settings">
                            <div class="edit" @click="openEditFrame(dish)">
                                Редактировать
                            </div>
                            <div class="delete" @click="deleteDish(dish.id)">
                                Удалить
                            </div>
                        </div>
                    </div>
                    <div class="proteins">
                        <div class="name">Б</div>
                        <div class="value">{{ dish.proteins }}</div>
                    </div>
                    <div class="fats">
                        <div class="name">Ж</div>
                        <div class="value">{{ dish.fats }}</div>
                    </div>
                    <div class="carbohydrates">
                        <div class="name">У</div>
                        <div class="value">{{ dish.carbohydrates }}</div>
                    </div>
                    <div class="calories">
                        <div class="name">Ккал</div>
                        <div class="value">{{ dish.calories }}</div>
                    </div>
                    <div class="fibers">
                        <div class="name">Клетчатка</div>
                        <div class="value">{{ dish.fibers }}</div>
                    </div>
                    <div class="glycemic-index">
                        <div class="name">ГИ</div>
                        <div class="value">{{ dish.glycemic_index }}</div>
                    </div>
                </div>
            </div>

            <div class="button link add-dish" @click="popupVisibleDish = true">
                <div class="image">
                    <img
                        :src="require('@/assets/img/png/plus.png')"
                    >
                </div>
                <span>Добавить блюдо</span>
            </div>
            <v-dialog
                v-model="popupVisibleDish"
                persistent
                content-class="popup-dish--content"
                width="473px"
                dark
            >
                <v-card>
                    <v-btn
                        icon
                        dark
                        class="close"
                        @click="closePopupDish"
                    >
                        <img
                            :src="require('../assets/img/png/close.png')"
                        />
                    </v-btn>

                    <v-card-text class="popup-dish">
                        <div class="popup-title">Добавление блюда</div>
                        <v-form ref="form" lazy-validation>
                            <v-text-field
                                label="Название блюда"
                                class="input dish-name"
                                v-model="dishName"
                                :rules="rules.name"
                                hide-details="auto"
                                dark
                                outlined
                                required
                            ></v-text-field>
                            <v-btn
                                class="button add-dish"
                                color="primary"
                                :loading="progressAddDish"
                                @click="openPopupFoods"
                            >
                                Продолжить
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <popup-foods :visible="popupVisibleFood" @updateVisible="onUpdateVisibleFood"
                         type="createDish"
                         :dish-name="dishName"
                         @updateDiet="updateDishes"/>
        </template>
        <program-dishes-edit v-else-if="page === 2" :progress="progressDishes" :dish="selectedDish"
                             @updateDishFoods="updateDishFoodsForEdit" @back="returnToDishes"/>
    </div>
</template>

<script>
import Title from "@/components/Title";
import PopupFoods from "@/components/PopupFoods";
import axios from "axios";
import url from "@/services/url";
import {mapActions, mapGetters} from "vuex";
import ProgramDishesEdit from "@/components/ProgramDishesEdit";

export default {
    name: "ProgramDishes",

    components: {
        "title-page": Title,
        "popup-foods": PopupFoods,
        "program-dishes-edit": ProgramDishesEdit
    },

    data: () => ({
        progressDishes: true,
        progressAddDish: false,
        page: 1,
        selectedDish: {},
        popupVisibleFood: false,
        popupVisibleDish: false,
        dishName: "",

        rules: {
            name: [
                v => !!v || "Введите название",
                v => v.length <= 20 || "Слишком длинное название"
            ]
        }
    }),

    computed: {
        ...mapGetters(["userData", "dishes"]),
    },

    methods: {
        ...mapActions(["showDishes", "changeBarsVisible"]),

        openPopupFoods() {
            if (this.$refs.form.validate()) {
                this.popupVisibleDish = false;
                this.popupVisibleFood = true;
            }
        },

        async deleteDish(id) {
            this.progressDishes = true;
            let dish = {
                id: id
            }
            await axios.post(`${url}/api/programs/delete-dish`, dish).then(() => {
                this.getDishes();
            })
        },

        openEditFrame(dish) {
            this.page = 2;
            this.selectedDish = dish;
            // убирает сайдбар программы
            this.changeBarsVisible(false);
        },

        getDishes() {
            this.showDishes(this.userData.id).then(() => {
                this.progressDishes = false;
            });
        },

        async getDishesWithDeleteEmpty() {
            await this.showDishes(this.userData.id).then(async () => {
                let emptyDishes = this.dishes.filter((obj) => !obj.foods.length);
                if (emptyDishes.length) {
                    for (let i = 0; i < emptyDishes.length; i++) {
                        let dish = {
                            id: emptyDishes[i].id,
                        }
                        await axios.post(`${url}/api/programs/delete-dish`, dish).then(async () => {
                            if (i === emptyDishes.length - 1) {
                                await this.showDishes(this.userData.id).then(() => {
                                    this.progressDishes = false;
                                })
                            }
                        });
                    }
                } else this.progressDishes = false;
            });
        },

        onUpdateVisibleFood(data) {
            this.popupVisibleFood = data;
        },

        updateDishes(id) {
            this.dishName = "";
            this.progressDishes = true;
            this.showDishes(this.userData.id).then(() => {
                this.progressDishes = false;
                this.openEditFrame(this.dishes.find(obj => obj.id === id));
            });
        },

        closePopupDish() {
            this.popupVisibleDish = false;
            this.dishName = "";
        },

        returnToDishes() {
            this.page = 1;
            this.progressDishes = true;
            this.getDishesWithDeleteEmpty();
        },

        async updateDishFoodsForEdit(id) {
            this.progressDishes = true;
            await this.showDishes(this.userData.id).then(() => {
                this.selectedDish = this.dishes.find((obj) => obj.id === id);
                this.progressDishes = false;
            });
        },
    },

    mounted() {
        this.getDishesWithDeleteEmpty();
    }
}
</script>

<style lang="scss">
#app {
    .program-dishes {
        flex: 1 0 auto;
        margin-left: 30px;

        .progress-dishes {
            position: relative;
            width: 100%;
            height: 310px;

            .icon {
                position: absolute;
                left: calc(50% - 50px / 2);
                bottom: calc(50% - 50px / 2);
            }
        }

        .title-page.dishes {
            margin: 0;

            font-family: 'Inter-SemiBold', sans-serif;
            font-size: 32px;
            line-height: 122%;
        }

        .text {
            margin-top: 20px;
            width: 610px;
            font-family: 'Inter-Regular', sans-serif;
            font-size: 18px;
            line-height: 145%;
        }

        .button.link.add-dish {
            margin-top: 20px;
            cursor: pointer;
            width: 220px;
        }
    }

    .dish-card {
        position: relative;
        padding: 20px;
        margin-top: 30px;
        height: 117px;
        display: flex;
        border-radius: 4px;

        @media (max-width: 1263px) {
            height: auto;
        }

        .name-dish {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 60px;
            flex: 0 0 115px;
            width: 115px;
            font-family: 'Inter-Medium', sans-serif;
            font-size: 16px;
            line-height: 119%;

            @media (max-width: 1263px) {
                flex: 0 0 100px;
            }
        }

        .foods {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            width: 203px;
            flex: 0 0 203px;
            margin-left: 25px;

            @media (max-width: 1263px) {
                flex: 0 0 100px;
            }

            .empty {
                font-family: 'Inter-Regular', sans-serif;
                font-size: 13px;
                line-height: 123%;
            }

            .item {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-family: 'Inter-Regular', sans-serif;
                font-size: 13px;
                line-height: 16px;
            }

            .item:not(:first-child):not(:only-child) {
                margin-top: 5px;
            }

            .item.ellipsis {
                margin-top: 0 !important;
            }

            .edit, .add, .delete {
                font-family: 'Inter-Regular', sans-serif;
                font-size: 13px;
                line-height: 16px;
                text-decoration-line: underline;
                cursor: pointer;
            }

            .settings {
                display: flex;

                @media (max-width: 1263px) {
                    flex-direction: column;
                }
            }

            .edit {
                @media (max-width: 1263px) {
                    margin-top: 5px;
                }
            }

            .delete {
                margin-left: 35px;

                @media (max-width: 1263px) {
                    margin-top: 5px;
                    margin-left: 0px;
                }
            }
        }

        .name {
            font-family: 'Inter-Regular', sans-serif;
            font-size: 13px;
            line-height: 16px;
        }

        .value {
            font-family: 'Inter-Regular', sans-serif;
            font-size: 13px;
            line-height: 16px;
            margin-top: 15px;
        }

        .proteins {
            margin-left: 47px;

            @media (max-width: 1263px) {
                margin-left: 25px;
            }
        }

        .proteins, .fats, .carbohydrates {
            flex: 0 0 62px;

            @media (max-width: 1263px) {
                flex: 0 0 50px;
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
                flex: 0 0 85px;
            }
        }

        .glycemic-index {
            flex: 1 0 auto;
        }
    }

    .dish-card:not(:first-child):not(:only-child) {
        margin-top: 20px;
    }

    .popup-dish {
        .input {
            margin-top: 50px;
            width: 100%;
        }

        .button.add-dish {
            margin-top: -2px;
            width: 100%;
            height: 50px;
        }
    }
}

#app.dark {
    .program-dishes {
        .dish-card {
            background: #1A1A27;

            .foods {
                .empty {
                    color: #B5B5B8;
                }

                .edit:hover, .add:hover {
                    color: #9196FF;
                }

                .delete:hover {
                    color: #FF5B5B;
                }

                .name {
                    color: #B5B5B8;
                }
            }
        }
    }
}
</style>