<template>
    <v-dialog
        v-model="popupVisibleTrains"
        persistent
        content-class="popup-trains--content"
        width="798px"
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
            <v-card-text v-else class="popup-trains">
                <div class="popup-title">Добавление программы тренировок</div>
                <div class="popup-container">
                    <div class="popup-content">
                        <div class="header-popup">
                            <v-text-field
                                class="input train-name"
                                v-model="trainName"
                                :append-icon="'mdi-magnify'"
                                placeholder="Название программы..."
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
                                <div class="train" @click="openParams(train.id)" :id="`train${train.id}`">
                                    <div class="name"><span>{{ train['name'] }}</span></div>
                                    <div class="arrow">
                                        <img :class="'arrow' + train.id"
                                             :src="require('@/assets/img/png/arrow-right.png')">
                                    </div>
                                </div>
                                <div class="params" v-if="showedTrain === train.id">
                                    <div class="description">
                                        <div v-for="(item, index) in train.description" :key="index">
                                            {{ item }}
                                        </div>
                                    </div>
                                    <v-btn
                                        class="button add-train"
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

    props: ['visible', 'date', 'idProgramTrain'],

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
            this.popupVisibleTrains = this.visible;
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
        ...mapGetters(["programData", "trainMods", "trains"]),

        trainCats() {
            if (this.trainMods) {
                let cats = Array.from(this.trainMods);
                cats.splice(0, 0, {id: 0, name: "Все режимы"});
                return cats;
            }
            return [];
        },

        trainsFiltered() {
            if (!this.trains) {
                return [];
            }
            let trains = Array.from(this.trains);
            if (this.idCategory && this.trainName) {
                trains = this.trains.filter(obj => obj.id_mode === this.idCategory && obj.name.toLowerCase().includes(this.trainName.toLowerCase()));
            } else if (this.idCategory) {
                trains = this.trains.filter(obj => obj.id_mode === this.idCategory);
            } else if (this.trainName) {
                trains = this.trains.filter(obj => obj.name.toLowerCase().includes(this.trainName.toLowerCase()));
            }
            return trains;
        },
    },

    methods: {
        ...mapActions(["showTrains"]),

        changePage(page) {
            this.page = page;
        },

        resetShowedTrain() {
            this.toggleClassArrow();
            this.showedTrain = -1;
        },

        toggleClassArrow() {
            if (this.showedTrain !== -1) {
                let arrow = document.querySelector(`.popup-trains .arrow${this.showedTrain}`);
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
            this.toggleClassArrow();
            this.popupVisibleTrains = false;
            this.$emit('updateVisible', this.popupVisibleTrains)
            this.showedTrain = -1;
            this.idCategory = 0;
            this.trainName = "";
        },

        async addTrain(id) {
            this.progress = true;
            let program = {
                idProgram: this.idProgramTrain,
                date: this.date,
                idTrainExample: id,
            }
            await axios.post(`${url}/api/programs/add-train-program`, program).then((res) => {
                if (res.data.name === "Success") {
                    this.progress = false;
                    this.$emit("updateTrains");
                    this.closePopup();
                }
            })
        }
    },

    mounted() {
        if (this.trainMods) {
            let program = {
                aim: this.programData.aim,
                trainPrepare: this.programData.train_prepare,
            }
            this.showTrains(program).then(() => {
                this.progressPopupTrains = false;
            })
        }
    }
}
</script>

<style lang="scss">

#app {
    .popup-trains--content {
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

    .popup-trains {
        div {
            // запрет на выделение
            // Для эксплорера
            -ms-user-select: none;

            // Для мозилы
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
            margin-top: 5px;

            .popup-content {
                margin-top: 30px;

                .header-popup {
                    display: flex;

                    .input {
                        margin-top: 0;
                    }

                    .train-name {
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

                .item {
                    margin-top: 10px;

                    .train {
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
                            flex: 0 0 300px;
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

                    .params {
                        margin-top: 20px;
                        padding-left: 15px;
                        padding-right: 15px;
                        align-items: center;
                        margin-bottom: 20px;

                        .description {
                            white-space: pre-line;
                            font-family: 'Inter-Regular', sans-serif;
                            font-size: 14px;
                            line-height: 145%;

                            div:not(:first-child):not(:only-child) {
                                margin-top: 10px;
                            }
                        }

                        .button.add-train {
                            margin-top: 20px;
                            width: 100%;
                            height: 30px;
                            border-radius: 2px;

                            font-family: 'Inter-Regular', sans-serif;
                            font-size: 12px;
                            line-height: 180%;
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
    .popup-trains {
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

        .item {
            .train {
                background: #262635;

                div {
                    color: white;
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