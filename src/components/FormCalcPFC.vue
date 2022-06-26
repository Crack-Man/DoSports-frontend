<template>
    <v-form class="form-pfc" ref="form" lazy-validation>
        <v-text-field
            label="Возраст"
            v-model="pfc.age"
            class="input growth"
            type="number"
            :rules="rules.age"
            dark
            outlined
            require
        ></v-text-field>
        <div class="input-group">
            <v-text-field
                label="Рост (см)"
                v-model="pfc.height"
                class="input growth"
                type="number"
                :rules="rules.height"
                dark
                outlined
            ></v-text-field>
            <v-text-field
                label="Вес (кг)"
                class="input weight"
                v-model="pfc.weight"
                type="number"
                :rules="rules.weight"
                dark
                outlined
            >
            </v-text-field>
        </div>
        <label class="gender">Пол</label>
        <v-radio-group
            v-model="pfc.gender"
            class="gender"
            row
        >
            <v-radio
                label="Мужской"
                value="m"
                on-icon="mdi-radiobox-marked"
                dark
            ></v-radio>
            <v-radio
                label="Женский"
                value="f"
                dark
            ></v-radio>
        </v-radio-group>
        <v-select
            :menu-props="{ bottom: true, offsetY: true }"
            :append-icon="'mdi-chevron-down'"
            class="input lifestyle"
            :items="this.lifestyleList"
            :item-text="'name'"
            :item-value="'id'"
            label="Образ жизни"
            v-model="pfc.lifestyle"
            dark
            outlined
        ></v-select>
        <div class="aim-group">
            <label class="aim">Ваша цель</label>
            <v-radio-group
                v-model="pfc.aim"
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
        <v-btn
            @click="this.calculatePFC"
            color="primary"
            class="button"
        >Рассчитать
        </v-btn>

        <div v-if="Object.keys(pfc.norm).length" class="results">
            <p class="daily-norm-calories">Суточная норма калорий: <span>{{ pfc.norm.calories }} ккал</span></p>
            <p class="recommend">Рекомендации для {{ pfc.norm.aimText }}:</p>
            <p class="norm first">суточная норма белка: {{ pfc.norm.proteins }} грамм</p>
            <p class="norm">суточная норма жиров: {{ pfc.norm.fats }} грамм</p>
            <p class="norm">суточная норма углеводов: {{ pfc.norm.carbohydrates }} грамм</p>
        </div>
    </v-form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "FormCalcPFC",

    data: () => ({
        pfc: {
            age: "",
            height: "",
            weight: "",
            gender: "m",
            lifestyle: 1,
            weightCategory: 0,
            aim: "0",
            norm: {}
        },

        rules: {
            age: [
                v => v > 0 || "Некорректный возраст",
                v => v <= 130 || "Некорректный возраст"
            ],
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
        ...mapGetters(["lifestyleList", "weightCategoryList"]),
        bmi() {
            if (this.pfc.height && this.pfc.weight) return Math.round(this.pfc.weight / (this.pfc.height ** 2) * 10000 * 10) / 10
            return 0
        },

        weightCategory() {
            return this.weightCategoryList.find(obj => this.bmi >= obj.min_bmi && this.bmi <= obj.max_bmi);
        }
    },

    methods: {
        ...mapActions(["showLifestyleList", "showWeightCategoryList"]),

        aimText() {
            let result = "";
            if (this.pfc.aim === "0") {
                result = "поддержания веса";
            } else if (this.pfc.aim === "1") {
                result = "потери веса";
            } else if (this.pfc.aim === "2") {
                result = "набора веса";
            }
            return result;
        },

        calNorm() {
            let result = 0
            let activity = this.lifestyleList.find(obj => this.pfc.lifestyle === obj.id).coef;
            let calc = 10 * this.pfc.weight + 6.25 * this.pfc.height - 5 * this.pfc.age;
            if (this.pfc.gender === "f") {
                result = calc - 161;
            } else if (this.pfc.gender === "m") {
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
                if (this.pfc.aim === "0") {
                    return 0;
                } else if (this.pfc.aim === "1") {
                    return -calories * 0.1;
                } else if (this.pfc.aim === "2") {
                    return 500;
                }
            } else if (category === 4) {
                return -calories * 0.15;
            } else if (category >= 5) {
                return -calories * 0.2;
            }
        },

        calculatePFC() {
            if (this.$refs.form.validate()) {
                let calories = this.calNorm();
                calories += this.valuePfc(calories);
                this.pfc.norm = {
                    proteins: Math.round(calories * 25 / 100 / 4),
                    fats: Math.round(calories * 38 / 100 / 9),
                    carbohydrates: Math.round(calories * 45 / 100 / 4),
                    fibers: Math.round(calories / 1000 * 14),
                    calories: Math.round(calories),
                    aimText: this.aimText()
                };
            }
        }
    },

    mounted() {
        this.showWeightCategoryList();
        this.showLifestyleList();
    }
}
</script>

<style lang="scss">
#app {
    .form-pfc {
        flex: 0 0 540px;

        @media (max-width: 960px) {
            flex: 0 0 450px;
        }

        @media (max-width: 850px) {
            flex: 0 0 400px;
        }

        @media (max-width: 820px) {
            flex: 0 0 350px;
        }

        .input {
            width: 100% !important;

            @media (max-width: 930px) {
                margin-top: 22px;
            }
        }

        .input:first-child {
             margin-top: 30px;

            @media (max-width: 760px) {
                margin-top: 60px;
            }
        }

        .input-group {
            display: flex;
            align-items: flex-start;
            margin-top: 30px;

            @media (max-width: 930px) {
                margin-top: 22px;
            }

            .input {
                margin-top: 0;
            }

            .growth {
            }

            .weight {
                margin-left: 20px;
            }
        }

        .v-radio {
            margin-bottom: 0 !important;
        }

        .aim-group {
            margin-top: -9px;

            .v-input--radio-group {
                padding-top: 0;
                margin-top: 10px;
            }

            .v-radio:not(:last-child):not(:only-child) {
                margin-bottom: 10px !important;
            }

            .v-messages {
                display: none;
            }
        }

        .aim {
            font-family: 'Inter-Regular', sans-serif;
            font-size: 14px;
            line-height: 123%;
        }

        .button {
            width: 255px;
            height: 50px;

            @media (max-width: 670px) {
                width: 100%;
            }
        }

        .results {
            p {
                margin-bottom: 0 !important;
            }

            .daily-norm-calories {
                margin-top: 40px;

                font-family: 'Inter-Medium', sans-serif;
                font-size: 24px;
                line-height: 145%;
                letter-spacing: 0.02em;

                span {
                    @media (max-width: 550px) {
                        margin-top: 5px;
                        display: block;
                    }
                }

                @media (max-width: 550px) {
                    margin-top: 30px;
                    font-size: 18px;
                }
            }

            .recommend {
                margin-top: 20px;

                font-family: 'Inter-Medium', sans-serif;
                font-size: 24px;
                line-height: 145%;
                letter-spacing: 0.02em;

                @media (max-width: 550px) {
                    font-size: 18px;
                }
            }

            .norm {
                margin-top: 5px;

                font-family: 'Inter-Regular', sans-serif;
                font-size: 18px;
                line-height: 145%;
                letter-spacing: 0.02em;

                @media (max-width: 550px) {
                    font-size: 14px;
                }
            }

            .norm.first {
                margin-top: 10px;
            }
        }
    }
}
</style>