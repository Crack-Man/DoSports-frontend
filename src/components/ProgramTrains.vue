<template>
    <div class="program-trains">
        <div class="progress-trains" v-if="progressTrain">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <template v-else>
            <div class="header-program">
                <title-page class="trains" name="Тренировки"/>
                <div class="params">
                    <span>
                        {{ aim }} - {{ trainPrepare }}
                    </span>
                    <img :src="require('@/assets/img/svg/ask--white.svg')">
                    <div class="speech">
                        <div class="title-speech">
                            Доступные режимы:
                        </div>
                        <div class="mode" v-for="mod in trainMods" :key="mod.id">
                            {{ mod.name }} ({{ mod.period }})
                        </div>

                        <div class="description" v-if="programData.train_prepare === 0">
                            После прохождения каждого из режимов рекомендуем сменить уровень подготовки на профессиональный.
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!trainProgram.length">
                <div class="text">
                    Здесь будет отображаться информация о ваших тренировках. Необходимо добавить программу из
                    предложенных под вашу весовую категорию и уровень подготовки.
                </div>
                <div class="button link" @click="openPopupTrains">
                    <div class="image">
                        <img
                            :src="require('@/assets/img/png/plus.png')"
                        >
                    </div>
                    <span>Добавить программу</span>
                </div>
            </div>
            <div v-else>
                <div class="item" v-for="train in trainProgram" :key="train.id">
                    <div class="header-item">
                        <div class="name">
                            {{ train.name }}
                        </div>
                        <div class="count-examples">
                            {{ train.count_examples }} упражнений
                        </div>
                    </div>
                    <div class="description">
                        <div v-for="(item, index) in train.description" :key="index">
                            {{ item }}
                        </div>
                    </div>
                </div>
                <div class="reset-train" @click="popupVisibleReset = true">
                    <img :src="require('@/assets/img/png/text-reset-program--white.png')">
                    <img class="active" :src="require('@/assets/img/png/text-reset-program--red.png')">
                </div>
            </div>
            <popup-trains :visible="popupVisibleTrains" :date="date" :id-program-train="programData.id" @updateVisible="onUpdateVisibleTrains" @updateTrains="updateTrains"/>
        </template>
        <v-dialog
            v-model="popupVisibleReset"
            persistent
            max-width="473px"
            dark
        >
            <v-card>
                <v-btn
                    icon
                    dark
                    class="close"
                    @click="popupVisibleReset = false"
                >
                    <img
                        :src="require('../assets/img/png/close.png')"
                    />
                </v-btn>

                <v-card-text class="popup-reset">
                    <div class="popup-title">Вы точно хотите</div>
                    <div class="popup-title">сбросить тренировку?</div>
                    <v-card-actions>
                        <v-btn
                            class="button cancel"
                            @click="popupVisibleReset = false"
                        >Отменить</v-btn>
                        <v-btn
                            class="button reset"
                            :loading="progressResetTrain"
                            @click="resetTrain"
                        >Сбросить</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Title from "@/components/Title";
import {mapActions, mapGetters} from "vuex";
import PopupTrains from "@/components/PopupTrains";
import axios from "axios";
import url from "../services/url";

export default {
    name: "ProgramTrains",

    components: {
        "title-page": Title,
        "popup-trains": PopupTrains,
    },

    data: () => ({
        popupVisibleTrains: false,
        progressResetTrain: false,
        popupVisibleReset: false,
        progressTrain: false,
    }),

    watch: {

    },

    computed: {
        ...mapGetters(["currentDate", "programData", "trainMods", "schedule", "trainProgram"]),

        date() {
            return this.formatDate(this.getScheduleDay());
        },

        aim() {
            if (!this.programData) {
                return "";
            }
            if (this.programData.aim === 0) {
                return "Поддержание веса";
            }
            if (this.programData.aim === 1) {
                return "Сброс веса";
            }
            if (this.programData.aim === 2) {
                return "Набор веса";
            }
            return "";
        },

        trainPrepare() {
            if (!this.programData) {
                return "";
            }
            if (this.programData.train_prepare === 0) {
                return "Новичок";
            }
            if (this.programData.train_prepare === 1) {
                return "Профессионал";
            }
            return "";
        }
    },

    methods: {
        ...mapActions(["showTrainMods", "showTrainProgram"]),

        async resetTrain() {
            this.progressResetTrain = true;
            this.progressTrain = true;
            let program = {
                idProgram: this.programData.id,
                date: this.date
            }
            await axios.post(`${url}/api/programs/delete-train-program`, program).then((res) => {
                if (res.data.name === "Success") {
                    this.updateTrains()
                }
            })
        },

        getScheduleDay() {
            let week = this.currentDate.week;
            let day = this.currentDate.day;
            if (this.schedule[week]) {
                return this.schedule[week].days[day].date;
            }
            return "";
        },

        formatDate(date) {
            if (date) {
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
            }
            return "";
        },

        openPopupTrains() {
            this.popupVisibleTrains = true;
        },

        onUpdateVisibleTrains(value) {
            this.popupVisibleTrains = value;
        },

        async updateTrains() {
            this.progressTrain = true;
            this.progressResetTrain = true;
            let program = {
                id: this.programData.id,
                date: this.date
            }
            await this.showTrainProgram(program).then(() => {
                this.popupVisibleReset = false;
                this.progressResetTrain = false;
                this.progressTrain = false;
            })
        },

        getTrainMods() {
            let program = {
                aim: this.programData.aim,
                trainPrepare: this.programData.train_prepare
            }
            this.showTrainMods(program);
        }
    },

    mounted() {
        this.getTrainMods();
        this.updateTrains();
    }
}
</script>

<style lang="scss">
#app {
    .program-trains {
        flex: 1 0 auto;
        margin-left: 30px;

        .progress-trains {
            position: relative;
            width: 100%;
            height: 310px;

            .icon {
                position: absolute;
                left: calc(50% - 50px / 2);
                bottom: calc(50% - 50px / 2);
            }
        }

        .header-program {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title-page.trains {
                margin: 0;

                font-family: 'Inter-SemiBold', sans-serif;
                font-size: 32px;
                line-height: 122%;
            }

            .params {
                margin-top: 5px;
                position: relative;

                span {
                    cursor: pointer;
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 16px;
                    line-height: 145%;
                }

                img {
                    cursor: pointer;
                    position: relative;
                    top: -10px;
                    width: 11px;

                }

                span:hover ~ .speech, img:hover ~ .speech {
                    display: block;
                }

                .speech {
                    display: none;

                    position: absolute;
                    right: 0;

                    margin-top: 20px;
                    padding: 20px 20px 15px 20px;
                    border-radius: 4px;

                    .title-speech {
                        font-family: 'Inter-Medium', sans-serif;
                        font-size: 14px;
                        line-height: 145%;
                    }

                    .mode {
                        white-space: nowrap;
                        margin-top: 5px;
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 12px;
                        line-height: 145%;
                    }

                    .description {
                        margin-top: 20px;
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 12px;
                        line-height: 145%;
                    }
                }

                .speech:before {
                    content: '';
                    position: absolute;
                    transform: rotate(-45deg);
                    top: -10px;
                    right: -10px;
                    bottom: auto;
                }
            }
        }

        .text {
            margin-top: 20px;
            width: 620px;
            font-family: 'Inter-Regular', sans-serif;
            font-size: 18px;
            line-height: 145%;
        }

        .button.link {
            cursor: pointer;
            margin-top: 20px;
            width: 260px;
            height: 50px;
        }

        .item {
            margin-top: 25px;
            border-radius: 5px;
            padding: 20px;

            .header-item {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                padding-bottom: 15px;

                .name {
                    font-family: 'Inter-Medium', sans-serif;
                    font-size: 18px;
                    line-height: 122%;
                }

                .count-examples {
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 12px;
                    line-height: 145%;
                }
            }

            .description {
                margin-top: 25px;
                font-family: 'Inter-Regular', sans-serif;
                font-size: 14px;
                line-height: 145%;

                div:not(:first-child):not(:only-child) {
                    margin-top: 10px;
                }
            }
        }

        .reset-train {
            cursor: pointer;
            width: 207px;
            margin-top: 30px;

            img {
                width: 100%;
                display: block;
            }

            img.active {
                display: none;
            }
        }

        .reset-train:hover {
            img {
                display: none;
            }

            img.active {
                display: block;
            }
        }
    }
}

#app.dark {
    .program-trains {
        .header-program {
            .params {
                .speech {
                    background: #262635;
                }

                .speech:before {
                    border: 10px solid;
                    border-color: #262635 transparent transparent #262635;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                }
            }
        }

        .item {
            background: #1A1A27;

            .header-item {
                border-bottom: 1px solid rgba(181, 181, 184, 0.5);
            }
        }
    }
}
</style>