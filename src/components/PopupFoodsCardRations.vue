<template>
    <div class="popup-content rations">
        <div class="header-popup">
            <v-text-field
                class="input ration-name"
                v-model="rationName"
                :append-icon="'mdi-magnify'"
                placeholder="Название рациона..."
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
            <div :key="index" class="item" v-for="(ration, index) in rationsFiltered">
                <div class="ration" @click="openParams(ration.id)" :id="`ration${ration.id}`">
                    <div class="name"><span>{{ ration['name'] }}</span></div>
                    <div class="name-speech" :id="`name-speech${index}`">
                        <div>{{ ration['name'] }}</div>
                    </div>
                    <div class="proteins"><span>{{ ration['proteins'] }}</span></div>
                    <div class="fats"><span>{{ ration['fats'] }}</span></div>
                    <div class="carbohydrates"><span>{{ ration['carbohydrates'] }}</span></div>
                    <div class="calories"><span>{{ ration['calories'] }}</span></div>
                    <div class="fibers"><span>{{ ration['fibers'] }}</span></div>
                    <div class="glycemic-index"><span>{{ ration['glycemic_index'] }}</span></div>
                    <div class="arrow">
                        <img :class="'arrow' + ration.id"
                             :src="require('@/assets/img/png/arrow-right.png')">
                    </div>
                </div>
                <div class="foods" v-if="showedRation === ration.id">
                    <div class="item-food" v-for="food in ration.foods" :key="food.id">
                        <div class="name">{{ food.name }} ({{ food.amount }}г)</div>
                        <div class="name-speech">
                            <div>{{ food.name }} ({{ food.amount }}г)</div>
                        </div>
                        <div class="proteins">{{ food.proteinsCalc }}</div>
                        <div class="fats">{{ food.fatsCalc }}</div>
                        <div class="carbohydrates">{{ food.carbohydratesCalc }}</div>
                        <div class="calories">{{ food.caloriesCalc }}</div>
                        <div class="fibers">{{ food.fibersCalc }}</div>
                        <div class="glycemic-index">{{ food['glycemic_index'] }}</div>
                    </div>
                    <v-btn
                        class="button add-ration"
                        color="primary"
                        :loading="progress"
                        @click="addRationFoods(ration.id)"
                    >
                        Добавить
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/services/url";

export default {
    name: "PopupFoodsCardRations",

    props: ['rations', 'idMeal'],

    data: () => ({
        progress: false,
        rationName: "",
        showedRation: -1,
    }),

    watch: {
        rationName() {
            this.resetShowed();
        },
    },

    computed: {
        rationsFiltered() {
            if (!this.rations) {
                return [];
            }
            let rations = Array.from(this.rations);
            if (this.rationName) {
                rations = this.rations.filter(obj => obj.name.toLowerCase().includes(this.rationName.toLowerCase()));
            }
            return rations;
        },
    },

    methods: {
        resetShowed() {
            this.toggleClassArrow();
            this.showedRation = -1;
        },

        toggleClassArrow() {
            if (this.showedRation !== -1) {
                let arrow = document.querySelector(`.popup-content.rations .arrow${this.showedRation}`);
                arrow.classList.toggle('active');
            }
        },

        openParams(index) {
            if (this.showedRation !== index) {
                this.toggleClassArrow();
                this.showedRation = index;
                this.toggleClassArrow();
            } else {
                this.toggleClassArrow();
                this.showedRation = -1;
            }
        },

        async addRationFoods(id) {
            // добавить рацион в прием пищи
            this.progress = true;
            let ration = {
                idMeal: this.idMeal,
                foods: this.rations.find(obj => obj.id === id).foods
            }
            await axios.post(`${url}/api/programs/add-ration-to-meal`, ration).then((res) => {
                if (res.data.name === "Success") {
                    this.$emit("addRation");
                }
                this.progress = false;
            })
        }
    },

    mounted() {
    }
}
</script>

<style lang="scss">
#app {
    .popup-content.rations {
        .ration-name {
            flex: 0 0 calc(100% - 20px);
        }

        .scroller {
            .item {
                .ration {
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
                        height: 50px;
                        padding: 7px 11px;
                        z-index: 1;

                        justify-content: center;
                        align-items: center;
                    }

                    .name-speech#name-speech0 {
                        top: auto;
                        bottom: -42px;
                    }

                    .name-speech:before {
                        content: '';
                        position: absolute;
                        transform: rotate(-135deg);
                        bottom: -5px;
                        left: calc(50% - 14px / 2);
                    }

                    .name-speech#name-speech0:before {
                        transform: rotate(45deg);
                        top: -5px;
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

                #ration0 {
                    margin-top: 0;
                }

                .foods {
                    margin-top: 20px;
                    margin-bottom: 20px;

                    .item-food {
                        display: flex;
                        align-items: center;
                        margin-top: 15px;
                        position: relative;

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
                            top: -55px;
                            height: 50px;
                            padding: 7px 11px;
                            z-index: 1;

                            justify-content: center;
                            align-items: center;
                        }

                        .name-speech:before {
                            content: '';
                            position: absolute;
                            transform: rotate(-135deg);
                            bottom: -5px;
                            left: calc(50% - 14px / 2);
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
                    }

                    .item-food:first-child {
                        margin-top: 0;
                    }
                }

                .button.add-ration {
                    font-size: 12px;
                    width: 525px;
                    height: 30px;
                    margin-top: 20px;
                    margin-left: 15px;
                }
            }
        }
    }
}

#app.dark {
    .popup-content.rations {
        .item {
            .ration {
                background: #262635;

                div {
                    color: white;
                }

                .name-speech {
                    color: white;
                    background-color: #262635;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                }

                .name-speech:before {
                    border: 5px solid;
                    border-color: #262635 transparent transparent #262635;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                }
            }

            .foods {
                .item-food {
                    div {
                        color: white;
                    }

                    .name-speech {
                        color: white;
                        background-color: #262635;
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                    }

                    .name-speech:before {
                        border: 5px solid;
                        border-color: #262635 transparent transparent #262635;
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                    }
                }
            }
        }
    }
}
</style>