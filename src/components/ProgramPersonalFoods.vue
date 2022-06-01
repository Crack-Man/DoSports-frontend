<template>
    <div class="program-personal-foods">
        <div class="progress" v-if="progressPersonalFoods">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <template v-else>
            <title-page class="personal-foods" name="Свои продукты"/>
            <template v-if="!personalFoods.length">
                <div class="text">Здесь будет отображаться информация о ваших продуктах.</div>
            </template>
            <div class="list" v-else>
                <div class="item" v-for="food in personalFoods" :key="food.id">
                    <div class="food">
                        <div class="name">{{ food.name }}</div>
                        <div class="settings">
                            <div class="edit" @click="openPopupEdit(food.id)">
                                Редактировать
                            </div>
                            <div class="delete" @click="deletePersonalFood(food.id)">Удалить</div>
                        </div>
                    </div>
                    <div class="proteins">
                        <div class="name">Б</div>
                        <div class="value">{{ food.proteins }}</div>
                    </div>
                    <div class="fats">
                        <div class="name">Ж</div>
                        <div class="value">{{ food.fats }}</div>
                    </div>
                    <div class="carbohydrates">
                        <div class="name">У</div>
                        <div class="value">{{ food.carbohydrates }}</div>
                    </div>
                    <div class="calories">
                        <div class="name">Ккал</div>
                        <div class="value">{{ food.calories }}</div>
                    </div>
                    <div class="fibers">
                        <div class="name">Клетчатка</div>
                        <div class="value">{{ food.fibers }}</div>
                    </div>
                    <div class="glycemic-index">
                        <div class="name">ГИ</div>
                        <div class="value">{{ food.glycemic_index }}</div>
                    </div>
                </div>
            </div>
            <v-btn
                @click="popupVisibleAddFood = true"
                color="primary"
                class="button link create-food"
            >
                <div class="image">
                    <img
                        :src="require('@/assets/img/png/plus.png')"
                    >
                </div>
                <span>Добавить продукт</span>
            </v-btn>
            <popup-personal-foods :visible="popupVisibleAddFood" @productAdded="getFoods"
                                  @updateVisible="updateVisibleAddFood"/>

            <popup-personal-foods :visible="popupVisibleEditFood" type="edit" :selected-food="selectedFood" @productEdited="getFoods"
                                  @updateVisible="updateVisibleEditFood"/>
        </template>
    </div>
</template>

<script>
import Title from "@/components/Title";
import PopupPersonalFoods from "@/components/PopupPersonalFoods";
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import url from "@/services/url";

export default {
    name: "ProgramPersonalFoods",

    components: {
        "title-page": Title,
        "popup-personal-foods": PopupPersonalFoods,
    },

    data: () => ({
        selectedFood: {},
        progressPersonalFoods: false,
        popupVisibleAddFood: false,
        popupVisibleEditFood: false,
    }),

    computed: {
        ...mapGetters(["userData", "personalFoods"]),
    },

    watch: {
        userData() {
            if (this.userData.id) {
                this.getFoods();
            }
        }
    },

    methods: {
        ...mapActions(["showPersonalFoods"]),

        updateVisibleAddFood(value) {
            this.popupVisibleAddFood = value;
        },

        updateVisibleEditFood(value) {
            this.popupVisibleEditFood = value;
            if (!this.popupVisibleEditFood) {
                this.selectedFood = {};
            }
        },

        openPopupEdit(id) {
            this.selectedFood = this.personalFoods.find((obj) => obj.id === id);
            this.popupVisibleEditFood = true;
        },

        async getFoods() {
            this.progressPersonalFoods = true;
            await this.showPersonalFoods(this.userData.id).then(() => {
                this.progressPersonalFoods = false;
            });
        },

        async deletePersonalFood(id) {
            this.progressPersonalFoods = true;
            let food = {
                id: id,
            }
            await axios.post(`${url}/api/programs/delete-personal-food`, food).then(async (res) => {
                if (res.data.name === "Success") {
                    await this.getFoods();
                }
            });
        },
    },

    mounted() {
        if (this.userData.id) {
            this.getFoods();
        }
    }
}
</script>

<style lang="scss">

#app {
    .program-personal-foods {
        flex: 1 0 auto;
        margin-left: 30px;

        .progress {
            position: relative;
            width: 100%;
            height: 310px;

            .icon {
                position: absolute;
                left: calc(50% - 50px / 2);
                bottom: calc(50% - 50px / 2);
            }
        }

        .title-page.personal-foods {
            margin: 0;

            font-family: 'Inter-SemiBold', sans-serif;
            font-size: 32px;
            line-height: 122%;
        }

        .text {
            margin-top: 20px;
            font-family: 'Inter-Regular', sans-serif;
            font-size: 18px;
            line-height: 145%;
        }

        .list {
            margin-top: 30px;
            margin-bottom: 30px;
        }

        .item {
            padding: 0 25px;
            height: 90px;
            display: flex;
            align-items: center;

            border-radius: 4px;

            .name {
                font-family: "Inter-Regular", sans-serif;
                font-size: 13px;
                line-height: 123%;
            }

            .value {
                font-family: "Inter-Regular", sans-serif;
                font-size: 13px;
                line-height: 123%;
                margin-top: 15px;
            }

            .food {
                flex: 0 0 384px;
                width: 384px;
                padding-right: 25px;

                .name {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-family: 'Inter-Medium', sans-serif;
                    font-size: 16px;
                    line-height: 119%;
                }
            }

            .proteins, .fats, .carbohydrates {
                flex: 0 0 62px;
            }

            .proteins, .fats, .carbohydrates, .calories, .fibers, .glycemic-index {
                //margin-left: 45px;
            }

            .calories {
                flex: 0 0 77px;
            }

            .fibers {
                flex: 0 0 112px;
            }

            .glycemic-index {
                flex: 1 0 auto;
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

        .button.create-food {
            margin-top: 20px;
            width: 235px;
            height: 50px;
        }
    }
}

#app.dark {
    .program-personal-foods {
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
    }
}

</style>