<template>
    <div>
        <error-405 v-if="!userData"></error-405>
        <v-form v-else ref="form" lazy-validation>
            <span v-if="this.bmi && isFinite(this.bmi)">Ваш ИМТ - {{ this.bmi }}. У вас {{ this.weightCategory.name }}.</span>
            <v-text-field
                label="Рост (см)"
                v-model="program.height"
                type="number"
                :rules="rules.height"
            >
            </v-text-field>
            <v-text-field
                label="Вес (кг)"
                v-model="program.weight"
                type="number"
                :rules="rules.weight"
            >
            </v-text-field>
            <v-select
                :items="this.lifestyleList"
                :item-text="'name'"
                :item-value="'id'"
                label="Образ жизни"
                v-model="program.lifestyle"
            ></v-select>
            <p>Уровень подготовленности к тренировкам</p>
            <v-radio-group
                v-model="program.trainPrepare"
            >
                <v-radio
                    value="0"
                    label="Новичок (Вы - начинающий. Вы не знаете, какое количество тренировок в неделю вам необходимо. Система посчитает это за вас)"
                ></v-radio>
                <v-radio
                    value="1"
                    label="Профессионал (Вы знаете, сколько тренировок вам необходимо в неделю. Система предоставит возможность создавать любое их количество)"
                ></v-radio>
            </v-radio-group>
            <div v-if="weightCategory === 'нормальный вес'">
                <p>Цель программы</p>
                <v-radio-group
                    v-model="program.aim"
                >
                    <v-radio
                        value=0
                        label="Поддержание веса"
                    ></v-radio>
                    <v-radio
                        value=1
                        label="Сброс веса"
                    ></v-radio>
                    <v-radio
                        value=2
                        label="Набор веса"
                    ></v-radio>
                </v-radio-group>
            </div>
            <v-checkbox
                :rules="rules.checkbox"
                label="Я прочитал и согласен с условиями пользовательского соглашения"
            ></v-checkbox>
            <v-btn
                @click="this.createProgram"
                color="primary"
            >Отправить
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Error405 from "./Error405";

export default {
    name: "TestForm",

    components: {
        "error-405": Error405
    },

    data: () => ({
        program: {
            idUser: 0,
            bmi: 0,
            height: 0,
            weight: 0,
            lifestyle: 1,
            trainPrepare: "0",
            aim: "0",
        },
        rules: {
            height: [
                v => v >= 50 || "Некорректный рост",
                v => v <= 300 || "Некорректный рост",
            ],
            weight: [
                v => v > 0 || "Некорректный вес",
                v => v <= 600 || "Некорректный вес",
            ],
            checkbox: [
                v => !!v || "Вы должны принять пользовательское соглашение"
            ]
        }
    }),

    computed: {
        ...mapGetters(["lifestyleList", "weightCategoryList", "userData"]),
        bmi() {
            if (this.program.height && this.program.weight) return Math.round(this.program.weight / (this.program.height ** 2) * 10000 * 10) / 10
            return 0
        },

        weightCategory() {
            return this.weightCategoryList.find(obj => this.bmi >= obj.min_bmi && this.bmi <= obj.max_bmi);
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
        ...mapActions(["showLifestyleList", "showWeightCategoryList"]),

        createProgram() {
            if (this.$refs.form.validate()) {
                this.calculateProgram();
            }
        },

        calculateProgram() {

        }
    },

    mounted() {
        this.showWeightCategoryList();
        this.showLifestyleList();
    }
}
</script>

<style scoped>

</style>