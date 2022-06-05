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
            <div>
                <div class="text">
                    Здесь будет отображаться информация о ваших тренировках. Необходимо добавить программу из
                    предложенных под вашу весовую категорию и уровень подготовки.
                </div>
                <div class="button link">
                    <div class="image">
                        <img
                            :src="require('@/assets/img/png/plus.png')"
                        >
                    </div>
                    <span>Добавить программу</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Title from "@/components/Title";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ProgramTrains",

    components: {
        "title-page": Title,
    },

    data: () => ({
        progressTrain: false,
    }),

    watch: {

    },

    computed: {
        ...mapGetters(["programData", "trainMods"]),

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
        ...mapActions(["showTrainMods"]),

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
    }
}
</style>