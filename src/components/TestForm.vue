<template>
    <div>
        <error-405 v-if="!userData"></error-405>
        <v-container v-else>
            <title-page name="Добро пожаловать в Do Sports"></title-page>
            <div class="form-content-program">
                <v-form class="form-start-program" ref="form" lazy-validation>
                    <div class="input-group">
                        <v-text-field
                            label="Рост (см)"
                            v-model="program.height"
                            class="input growth"
                            type="number"
                            :rules="rules.height"
                            dark
                            outlined
                        >
                        </v-text-field>
                        <v-text-field
                            label="Вес (кг)"
                            class="input weight"
                            v-model="program.weight"
                            type="number"
                            :rules="rules.weight"
                            dark
                            outlined
                        >
                        </v-text-field>
                    </div>
                    <v-select
                        :menu-props="{ bottom: true, offsetY: true }"
                        :append-icon="'mdi-chevron-down'"
                        class="input lifestyle"
                        :items="this.lifestyleList"
                        :item-text="'name'"
                        :item-value="'id'"
                        label="Образ жизни"
                        v-model="program.lifestyle"
                        dark
                        outlined
                    ></v-select>
                    <label class="train-prepare">Уровень подготовленности к тренировкам</label>
                    <v-radio-group
                        v-model="program.trainPrepare"
                        class="train-prepare-group"
                    >
                        <v-radio
                            class="newbie"
                            value="0"
                            label="Новичок (Вы - начинающий. Вы не знаете, какое количество тренировок в неделю вам необходимо. Система посчитает это за вас)"
                            dark
                        ></v-radio>
                        <v-radio
                            class="professional"
                            value="1"
                            label="Профессионал (Вы знаете, сколько тренировок вам необходимо в неделю. Система предоставит возможность создавать любое их количество)"
                            dark
                        ></v-radio>
                    </v-radio-group>
                    <div v-if="weightCategory.name === 'нормальный вес'">
                        <label class="aim">Цель программы</label>
                        <div class="aim-group">
                            <v-radio-group
                                v-model="program.aim"
                            >
                                <v-radio
                                    class="support"
                                    value="0"
                                    label="Поддержание веса"
                                    dark
                                ></v-radio>
                                <v-radio
                                    class="down"
                                    value="1"
                                    label="Сброс веса"
                                    dark
                                ></v-radio>
                                <v-radio
                                    class="up"
                                    value="2"
                                    label="Набор веса"
                                    dark
                                ></v-radio>
                            </v-radio-group>
                        </div>
                    </div>

                    <v-btn
                        @click="this.calculateProgram"
                        color="primary"
                        class="button"
                    >Начать программу
                    </v-btn>
                </v-form>
                <explanation :texts="this.explanation"/>
            </div>
        </v-container>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Error405 from "./Error405";
import Title from "@/components/Title";
import Explanation from "@/components/Explanation";

export default {
    name: "TestForm",

    components: {
        "error-405": Error405,
        'title-page': Title,
        'explanation': Explanation
    },

    data: () => ({
        program: {
            idUser: 0,
            bmi: 0,
            height: "",
            weight: "",
            weightCategory: 0,
            lifestyle: 1,
            trainPrepare: "0",
            aim: "0",
            norm: {}
        },
        rules: {
            height: [
                v => v >= 50 || "Некорректный рост",
                v => v <= 300 || "Некорректный рост",
            ],
            weight: [
                v => v > 0 || "Некорректный вес",
                v => v <= 600 || "Некорректный вес",
            ]
        },
    }),

    computed: {
        ...mapGetters(["lifestyleList", "weightCategoryList", "userData", "createProgramStatus", "activeProgramStatus", "userIsAuthorized"]),
        bmi() {
            if (this.program.height && this.program.weight) return Math.round(this.program.weight / (this.program.height ** 2) * 10000 * 10) / 10
            return 0
        },

        explanation() {
            let explanation = [];
            if (this.bmi && isFinite(this.bmi) && this.weightCategory)
                explanation.push({text: `Ваш ИМТ - ${this.bmi}. У вас ${this.weightCategory.name}.`, class: "bmi"});
            explanation.push({
                text: "Прежде, чем начать будет рассчитан индекс массы тела, дневная норма потребления питательных веществ и калорий.\n\nИсходя из рекомендаций системы, вы сможете самостоятельно назначить углеводность дней, количество приемов пищи, потребляемые продукты и их количество, а также составить индивидуальный план силовых и кардиотренировок.",
                class: "prompt"
            })
            return explanation;
        },

        weightCategory() {
            if (this.weightCategoryList.length) {
                return this.weightCategoryList.find(obj => this.bmi >= obj.min_bmi && this.bmi <= obj.max_bmi);
            }
            return {name: ""};
        },

        ageUser() {
            if (this.userIsAuthorized) {
                let today = new Date();
                let birthday = new Date(this.userData.birthday);
                let age = today.getFullYear() - birthday.getFullYear();
                let months = today.getMonth() - birthday.getMonth();
                if (months < 0 || (months === 0 && today.getDate() < birthday.getDate())) {
                    age--;
                }
                return age;
            }
            return 18;
        }
    },

    watch: {
        bmi() {
            this.program.bmi = this.bmi;
        },

        userData() {
            if (this.userData) {
                this.program.idUser = this.userData.id;
            }
        },

        weightCategory() {
            this.program.weightCategory = this.weightCategory.id;
        }
    },

    methods: {
        ...mapActions(["showLifestyleList", "showWeightCategoryList", "createProgram", "checkActiveProgram"]),

        calculateProgram() {
            if (this.$refs.form.validate()) {
                this.program.norm = this.pfc();
                this.program.height = parseInt(this.program.height)
                this.program.weight = parseInt(this.program.weight)
                this.createProgram(this.program).then(() => {
                    if (this.createProgramStatus === "Success") {
                        this.$router.push("/sport-program");
                    }
                })
            }
        },

        pfc() {
            let calories = this.calNorm();
            calories += this.valuePfc(calories);
            let result = {
                proteins: Math.round(calories * 25 / 100 / 4),
                fats: Math.round(calories * 38 / 100 / 9),
                carbohydrates: Math.round(calories * 45 / 100 / 4),
                fibers: Math.round(calories / 1000 * 14),
                calories: Math.round(calories)
            };
            return result
        },

        calNorm() {
            let result = 0
            let activity = this.lifestyleList.find(obj => this.program.lifestyle === obj.id).coef;
            let calc = 10 * this.program.weight + 6.25 * this.program.height - 5 * this.ageUser
            if (this.userData.gender === "f") {
                result = calc - 161;
            } else if (this.userData.gender === "m") {
                result = calc + 5;
            }
            result *= activity;
            return result;
        },

        valuePfc(calories) {
            let category = this.weightCategory.id;
            if (category <= 2) {
                return 500;
            } else if (category === 3) {
                if (this.program.aim === "0") {
                    return 0;
                } else if (this.program.aim === "1") {
                    return -calories * 0.1;
                } else if (this.program.aim === "2") {
                    return 500;
                }
            } else if (category === 4) {
                return -calories * 0.15;
            } else if (category >= 5) {
                return -calories * 0.2;
            }
        }
    },

    mounted() {
        this.showWeightCategoryList();
        this.showLifestyleList();
        if (this.userIsAuthorized) {
            this.program.idUser = this.userData.id;
            this.checkActiveProgram(this.userData.id).then(() => {
                if (this.activeProgramStatus) {
                    this.$router.push("/sport-program");
                }
            })
        }
    }
}
</script>

<style lang="scss">
#app {
    .form-content-program {
        display: flex;
        align-items: flex-start;

        .form-start-program {
            flex: 0 0 540px;

            @media (max-width: 1263px) {
                flex: 0 0 470px;
            }

            @media (max-width: 930px) {
                flex: 0 0 400px;
                width: 400px;
            }

            .input-group {
                display: flex;
                align-items: flex-start;
                margin-top: 30px;

                .input {
                    margin-top: 0;
                }

                .growth {
                }

                .weight {
                    margin-left: 20px;
                }
            }

            .input {
                width: 100%;
            }

            .train-prepare, .aim {
                font-family: 'Inter-Regular', sans-serif;
                font-size: 14px;
                line-height: 123%;
            }

            .train-prepare {
                display: block;
                margin-top: -2px;
            }

            .train-prepare-group {
                .v-radio:not(:last-child):not(:only-child) {
                    margin-bottom: 10px;
                }
            }

            .v-input--radio-group {
                margin-top: 15px;

                .v-messages {
                    display: none;
                }
            }

            .v-radio {
                align-items: flex-start;
            }

            .v-radio.newbie {
                width: 400px;
            }

            .v-radio.professional {
                width: 430px;
            }

            .aim {
                display: block;
                margin-top: 5px;
            }

            .aim-group {
                margin-top: 15px;

                .v-input--radio-group {
                    padding-top: 0;
                    margin-top: 15px;
                }
            }

            .button {
                margin-top: 30px;
                width: 250px;
                height: 50px;
            }
        }

        .container-explanation {
            .text {
                @media (max-width: 1263px) {
                    font-size: 14px;
                }
            }
        }

        .explanation.bmi {
            min-height: 55px;

            .text {
                align-self: center;
                font-family: 'Inter-SemiBold', sans-serif;
                font-size: 18px;
                line-height: 140%;
            }
        }
    }
}
</style>