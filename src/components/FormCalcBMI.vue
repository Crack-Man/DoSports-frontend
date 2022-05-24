<template>
    <div class="content-calculator-bmi">
        <explanation :texts="explanation"/>
        <v-form class="form-bmi" ref="form" lazy-validation>
            <v-text-field
                label="Рост (см)"
                v-model="bmi.height"
                class="input growth"
                type="number"
                :rules="rules.height"
                dark
                outlined
            ></v-text-field>
            <v-text-field
                label="Вес (кг)"
                class="input weight"
                v-model="bmi.weight"
                type="number"
                :rules="rules.weight"
                dark
                outlined
            >
            </v-text-field>
            <v-btn
                @click="this.calculateBMI"
                color="primary"
                class="button"
            >Рассчитать
            </v-btn>
        </v-form>
        <div v-if="bmi.value" class="results">
            <div class="index">
                <p class="text">Ваш индекс:</p>
                <p class="value">{{ bmi.value }}</p>
            </div>
            <p class="weight-category">У вас {{ weightCategory.name }}</p>
        </div>
    </div>
</template>

<script>
import Explanation from "@/components/Explanation";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "FormCalcBMI",

    components: {
        'explanation': Explanation,
    },

    data: () => ({
        bmi: {
            height: "",
            weight: "",
            value: 0
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

        explanation: [{text: "Рассчитайте ваш индивидуальный индекс массы тела, позволяющий оценить степень соответствия массы и роста и тем самым косвенно оценить, является ли масса недостаточной, нормальной или избыточной."}]
    }),

    computed: {
        ...mapGetters(["weightCategoryList"]),

        weightCategory() {
            return this.weightCategoryList.find(obj => this.bmi.value >= obj.min_bmi && this.bmi.value <= obj.max_bmi);
        }
    },

    methods: {
        ...mapActions(["showWeightCategoryList"]),

        calculateBMI() {
            if (this.$refs.form.validate()) {
                this.bmi.value = Math.round(this.bmi.weight / (this.bmi.height ** 2) * 10000 * 10) / 10
            }
        }
    },

    mounted() {
        this.showWeightCategoryList();
    }
}
</script>

<style lang="scss">
#app {
    .content-calculator-bmi {
        display: flex;
        align-items: flex-start;

        .container-explanation {
            margin-top: 5px;
            margin-left: 0;
            margin-right: 30px;

            @media (max-width: 1263px) {
                margin-right: 20px;
            }

            .text {
                width: 430px;
                letter-spacing: 0.02em;
                
                @media (max-width: 1263px) {
                    width: 330px;
                }
            }
        }


        .form-bmi {
            flex: 0 0 350px;

            @media (max-width: 1263px) {
                flex: 0 0 300px;
            }

            .input {
                width: 100%;
            }

            .button {
                margin-top: 10px;
                width: 100%;
                height: 50px;
            }
        }

        .results {
            margin-top: 15px;
            margin-left: 30px;

            @media (max-width: 1263px) {
                margin-left: 20px;
            }

            .index {
                display: flex;
                align-items: flex-end;
                margin-top: 30px;

                p {
                    margin: 0;
                }

                .text {
                    font-family: 'Inter-SemiBold', sans-serif;
                    font-size: 24px;
                    line-height: 145%;
                    letter-spacing: 0.02em;

                    @media (max-width: 1263px) {
                        font-size: 20px;
                    }
                }

                .value {
                    margin-left: 10px;
                    font-family: 'Inter-SemiBold', sans-serif;
                    font-size: 24px;
                    line-height: 145%;
                    letter-spacing: 0.02em;

                    @media (max-width: 1263px) {
                        font-size: 20px;
                    }
                }
            }

            .weight-category {
                margin-top: 10px;
                margin-bottom: 0;
                font-family: 'Inter-Regular', sans-serif;
                font-size: 18px;
                line-height: 145%;
                letter-spacing: 0.02em;

                @media (max-width: 1263px) {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>