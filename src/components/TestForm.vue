<template>
    <div>
        <error-405 v-if="!userData"></error-405>
        <v-form v-else ref="form" lazy-validation>
            <span v-if="this.bmi && isFinite(this.bmi)">Ваш ИМТ - {{ this.bmi }}. У вас {{
                    this.weightCategory.name
                }}.</span>
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
            <div v-if="weightCategory.name === 'нормальный вес'">
                <p>Цель программы</p>
                <v-radio-group
                    v-model="program.aim"
                >
                    <v-radio
                        value="0"
                        label="Поддержание веса"
                    ></v-radio>
                    <v-radio
                        value="1"
                        label="Сброс веса"
                    ></v-radio>
                    <v-radio
                        value="2"
                        label="Набор веса"
                    ></v-radio>
                </v-radio-group>
            </div>
            <v-checkbox
                :rules="rules.checkbox"
                label="Я прочитал и согласен с условиями пользовательского соглашения"
            ></v-checkbox>
            <v-btn
                @click="this.calculateProgram"
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
            ],
            checkbox: [
                v => !!v || "Вы должны принять пользовательское соглашение"
            ]
        }
    }),

    computed: {
        ...mapGetters(["lifestyleList", "weightCategoryList", "userData", "createProgramStatus", "activeProgramStatus", "userIsAuthorized"]),
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
            let calc = 10 * this.program.weight + 6.25 * this.program.height - 5 * this.ageUser()
            if (this.userData.gender === "f") {
                result = calc - 161;
            } else if (this.userData.gender === "m") {
                result = calc + 5;
            }
            result *= activity;
            return result;
        },

        ageUser() {
            let today = new Date();
            let birthday = this.userData.birthday;
            let age = today.getFullYear() - new Date(birthday).getFullYear();
            let months = today.getMonth() - new Date(birthday).getMonth();
            if (months < 0 || (months === 0 && today.getDate() < birthday.getDate())) {
                age--;
            }
            return age;
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
        this.showWeightCategoryList();
        if (this.userIsAuthorized) {
            this.program.idUser = this.userData.id;
            this.checkActiveProgram(this.userData.id).then(() =>{
                if (this.activeProgramStatus) {
                    this.$router.push("/sport-program");
                }
            })
        }
    }
}
</script>

<style scoped>

</style>