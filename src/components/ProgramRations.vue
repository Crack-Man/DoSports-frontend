<template>
    <div class="program-rations">
        <div class="progress-rations" v-if="progressRations">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <div v-else-if="page === 1" class="program-rations-content">
            <title-page class="rations" name="Рационы"/>
            <div v-if="!rations.length">
                <div class="text">
                    Здесь будет отображаться информация о ваших рационах.
                    Создать рацион можно при формировании приемов пищи.
                </div>
            </div>
            <div v-else>
                <div
                    class="ration-card"
                    v-for="ration in rations"
                    :key="ration.id"
                >
                    <div class="name-ration">
                        <span>{{ ration.name }}</span>
                    </div>
                    <div class="foods">
                        <div class="list">
                            <div v-if="!ration.foods.length" class="empty">
                                Продукты еще не добавлены
                            </div>
                            <div v-else>
                                <template v-for="(food, index) in ration.foods">
                                    <div v-if="index < 2" :key="food.id" class="item">
                                        {{ food.name }}
                                    </div>
                                    <div class="item ellipsis" :key="food.id" v-else-if="index === 2">...</div>
                                </template>
                            </div>
                        </div>
                        <div v-if="!ration.foods.length" class="settings">
                            <div class="add" @click="openPopupFoods(ration.id)">
                                Добавить
                            </div>
                            <div class="delete" @click="deleteRation(ration.id)">
                                Удалить
                            </div>
                        </div>
                        <div v-else class="settings">
                            <div class="edit" @click="openEditFrame(ration)">
                                Редактировать
                            </div>
                            <div class="delete" @click="deleteRation(ration.id)">
                                Удалить
                            </div>
                        </div>
                    </div>
                    <div class="proteins">
                        <div class="name">Б</div>
                        <div class="value">{{ ration.proteins }}</div>
                    </div>
                    <div class="fats">
                        <div class="name">Ж</div>
                        <div class="value">{{ ration.fats }}</div>
                    </div>
                    <div class="carbohydrates">
                        <div class="name">У</div>
                        <div class="value">{{ ration.carbohydrates }}</div>
                    </div>
                    <div class="calories">
                        <div class="name">Ккал</div>
                        <div class="value">{{ ration.calories }}</div>
                    </div>
                    <div class="fibers">
                        <div class="name">Клетчатка</div>
                        <div class="value">{{ ration.fibers }}</div>
                    </div>
                    <div class="glycemic-index">
                        <div class="name">ГИ</div>
                        <div class="value">{{ ration.glycemic_index }}</div>
                    </div>
                </div>
            </div>
            <popup-foods :visible="popupVisibleFood"
                         :id-ration="rationId"
                         type="ration"
                         @updateVisible="onUpdateVisibleFood"
                         @updateDiet="updateRations"
            />
        </div>
        <program-rations-edit v-else-if="page === 2" :progress="progressRations" :ration="selectedRation" @updateRationFoods="updateRationFoodsForEdit" @back="returnToRations"/>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Title from "@/components/Title";
import axios from "axios";
import url from "@/services/url";
import ProgramRationsEdit from "@/components/ProgramRationsEdit";
import PopupFoods from "@/components/PopupFoods";

export default {
    name: "ProgramRations",

    components: {
        "title-page": Title,
        "program-rations-edit": ProgramRationsEdit,
        "popup-foods": PopupFoods,
    },

    data: () => ({
        popupVisibleFood: false,
        progressRations: true,
        selectedRation: {},
        page: 1,
        rationId: 0,
    }),

    computed: {
        ...mapGetters(["userData", "rations"]),
    },

    methods: {
        ...mapActions(["showRations", "changeBarsVisible"]),

        onUpdateVisibleFood(data) {
            this.popupVisibleFood = data;
        },

        openPopupFoods(id) {
            this.rationId = id;
            this.popupVisibleFood = true;
        },

        updateRations() {
            this.progressRations = true;
            this.showRations(this.userData.id).then(() => {
                this.progressRations = false;
                this.openEditFrame(this.rations.find(obj => obj.id === this.rationId));
                this.rationId = 0;
            });
        },

        returnToRations() {
            this.page = 1;
            this.progressRations = true;
            this.getRationsWithDeleteEmpty();
        },

        openEditFrame(ration) {
            this.page = 2;
            this.selectedRation = ration;
            // убирает сайдбар программы
            this.changeBarsVisible(false);
        },

        updateRationFoodsForEdit(id) {
            this.progressRations = true;
            this.showRations(this.userData.id).then(() => {
                this.selectedRation = this.rations.find((obj) => obj.id === id);
                this.progressRations = false;
            });
        },

        async deleteRation(id) {
            this.progressRations = true;
            let ration = {
                id: id
            }
            await axios.post(`${url}/api/programs/delete-ration`, ration).then(() => {
                this.getRations();
            })
        },

        getRations() {
            this.showRations(this.userData.id).then(() => {
                this.progressRations = false;
            });
        },

        async getRationsWithDeleteEmpty() {
            await this.showRations(this.userData.id).then(async () => {
                let emptyRations = this.rations.filter((obj) => !obj.foods.length);
                if (emptyRations.length) {
                    for (let i = 0; i < emptyRations.length; i++) {
                        let ration = {
                            id: emptyRations[i].id,
                        }
                        await axios.post(`${url}/api/programs/delete-ration`, ration).then(async () => {
                            if (i === emptyRations.length - 1) {
                                await this.showRations(this.userData.id).then(() => {
                                    this.progressRations = false;
                                })
                            }
                        });
                    }
                } else this.progressRations = false;
            });
        }
    },

    mounted() {
        // при загрузке компонента надо не только получить все рационы, но и удалить пустые
        this.getRationsWithDeleteEmpty();
    }
}
</script>

<style lang="scss">
#app {
    .program-rations {
        flex: 1 0 auto;
        margin-left: 30px;

        .progress-rations {
            position: relative;
            width: 100%;
            height: 310px;

            .icon {
                position: absolute;
                left: calc(50% - 50px / 2);
                bottom: calc(50% - 50px / 2);
            }
        }

        .title-page.rations {
            margin: 0;

            font-family: 'Inter-SemiBold', sans-serif;
            font-size: 32px;
            line-height: 122%;
        }

        .text {
            margin-top: 20px;
            width: 527px;
            font-family: 'Inter-Regular', sans-serif;
            font-size: 18px;
            line-height: 145%;
        }

        .ration-card {
            padding: 20px;
            margin-top: 30px;
            height: 117px;
            display: flex;
            border-radius: 4px;

            @media (max-width: 1263px) {
                height: auto;
            }

            .name-ration {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                word-wrap: break-word;
                overflow: hidden;
                height: 60px;
                text-overflow: ellipsis;
                flex: 0 0 115px;
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
                    line-height: 123%;
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

        .ration-card:not(:first-child):not(:only-child) {
            margin-top: 20px;
        }
    }
}

#app.dark {
    .program-rations {
        .ration-card {
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