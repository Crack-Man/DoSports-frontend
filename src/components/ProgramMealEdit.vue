<template>
    <div class="program-meal-edit">
        <div class="progress-diet" v-if="progressDiet">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <template v-else>
            <title-page :name="time" class="meals"></title-page>
            <div class="meal-edit-container">
                <div class="meal-edit-content">
                    <div class="item" v-for="food in foods" :key="food.id">
                        <div class="food">
                            <div class="name">
                                {{ food.name }} ({{ food.amount }}г)
                            </div>
                            <div class="settings">
                                <div class="edit">Редактировать</div>
                                <div class="delete">Удалить</div>
                            </div>
                        </div>
                        <div class="proteins">
                            <div class="name">Б</div>
                            <div class="value">0</div>
                        </div>
                        <div class="fats">
                            <div class="name">Ж</div>
                            <div class="value">0</div>
                        </div>
                        <div class="carbohydrates">
                            <div class="name">У</div>
                            <div class="value">0</div>
                        </div>
                        <div class="calories">
                            <div class="name">Ккал</div>
                            <div class="value">0</div>
                        </div>
                        <div class="fibers">
                            <div class="name">Клетчатка</div>
                            <div class="value">0</div>
                        </div>
                        <div class="glycemic-index">
                            <div class="name">ГИ</div>
                            <div class="value">0</div>
                        </div>
                    </div>
                    <div class="options">
                        <div class="button link">
                            <div class="image">
                                <img
                                    :src="require('@/assets/img/png/plus.png')"
                                >
                            </div>
                            <span>Добавить</span>
                        </div>
                        <div class="add-ration">
                            Создать рацион
                        </div>
                    </div>
                    <div class="back" @click="back">
                        <img :src="require('@/assets/img/png/arrow-back.png')">
                        <span>Назад к приемам пищи</span>
                    </div>
                </div>
                <div class="stat">
                    <div class="name-stat">Всего в этом приеме</div>
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
                            <div class="value-row">0</div>
                            <div class="value-row">0</div>
                            <div class="value-row">0</div>
                            <div class="value-row">0</div>
                            <div class="value-row">0</div>
                            <div class="value-row">0</div>
                        </div>
                    </div>
                    <div class="name-stat">Всего за этот день</div>
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
                            <div class="value-row">0</div>
                            <div class="value-row">0</div>
                            <div class="value-row">0</div>
                            <div class="value-row">0</div>
                            <div class="value-row">0</div>
                            <div class="value-row">0</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/services/url";
import Title from "@/components/Title";
import {mapActions} from "vuex";

export default {
    name: "ProgramMealEdit",

    props: ['idMeal', 'time'],

    components: {
        "title-page": Title,
    },

    data: () => ({
        progressDiet: true,
        foods: []
    }),

    computed: {},

    methods: {
        ...mapActions(["changeBarsVisible"]),

        async getMealFoods() {
            await axios.get(`${url}/api/programs/get-meal-foods/${this.idMeal}`).then((res) => {
                this.foods = res.data;
                this.progressDiet = false;
            });
        },

        back() {
            this.changeBarsVisible(true);
            this.$emit("back");
        }
    },

    mounted() {
        this.getMealFoods();
    }
}
</script>

<style lang="scss">
#app {
    .program-meal-edit {
        .progress-diet {
            height: 500px !important;
        }

        .title-page.meals {
            margin-top: 10px !important;
        }

        .meal-edit-container {
            display: flex;
            align-items: flex-start;
            margin-top: 30px;

            .meal-edit-content {
                flex: 0 0 825px;

                .item {
                    padding: 0 25px;
                    height: 90px;
                    border-radius: 4px;

                    display: flex;
                    align-items: center;

                    .name {
                        font-family: "Inter-Regular", sans-serif;
                        font-size: 13px;
                        line-height: 16px;
                    }

                    .value {
                        font-family: "Inter-Regular", sans-serif;
                        font-size: 13px;
                        line-height: 16px;
                        margin-top: 15px;
                    }


                    .food {
                        flex: 0 0 335px;

                        .name {
                            font-family: 'Inter-Medium', sans-serif;
                            font-size: 16px;
                            line-height: 119%;
                        }
                    }

                    .proteins, .fats, .carbohydrates {
                        flex: 0 0 20px;
                    }

                    .proteins, .fats, .carbohydrates, .calories, .fibers, .glycemic-index {
                        margin-left: 45px;
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

                .options {
                    margin-top: 30px;
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
                    display: flex;
                    align-items: center;

                    img {
                        display: block;
                        width: 30px;
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

                    .name-row:not(:first-child):not(:only-child), .value-row:not(:first-child):not(:only-child) {
                        margin-top: 15px;
                    }
                }
            }
        }
    }
}

#app.dark {
    .program-meal-edit {
        .meal-edit-container {
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

            .stat {
                .table-stat {
                    background: #1A1A27;
                }
            }
        }
    }
}
</style>