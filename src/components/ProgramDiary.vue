<template>
    <div class="program-diary">
        <div class="progress-diary" v-if="progress">
            <v-progress-circular
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <div v-show="!progress">
            <title-page class="diary" name="Дневник"/>
            <v-form class="form-diary" ref="form" lazy-validation>
                <div class="form-group with-explanation">
                    <v-text-field
                        label="Вес (кг)"
                        class="input weight"
                        v-model="parameters.weight"
                        type="number"
                        :rules="rules.weight"
                        dark
                        outlined
                    >
                    </v-text-field>
                    <explanation :texts="explanation"/>
                </div>
                <div class="title-params">Параметры тела</div>
                <div class="form-group first">
                    <v-text-field
                        label="Обхват груди (см)"
                        class="input"
                        v-model="parameters.bust"
                        type="number"
                        :rules="rules.bust"
                        dark
                        outlined
                    >
                    </v-text-field>
                    <v-text-field
                        label="Обхват талии (см)"
                        class="input"
                        v-model="parameters.waist"
                        type="number"
                        :rules="rules.waist"
                        dark
                        outlined
                    >
                    </v-text-field>
                    <v-text-field
                        label="Обхват бедер (см)"
                        class="input"
                        v-model="parameters.hip"
                        type="number"
                        :rules="rules.hip"
                        dark
                        outlined
                    >
                    </v-text-field>
                </div>
                <div class="form-group">
                    <v-text-field
                        label="Обхват бицепса (см)"
                        class="input"
                        v-model="parameters.bicep"
                        type="number"
                        :rules="rules.bicep"
                        dark
                        outlined
                    >
                    </v-text-field>
                    <v-text-field
                        label="Обхват голени (см)"
                        class="input"
                        v-model="parameters.shin"
                        type="number"
                        :rules="rules.shin"
                        dark
                        outlined
                    >
                    </v-text-field>
                    <v-text-field
                        label="Обхват шеи (см)"
                        class="input"
                        v-model="parameters.neck"
                        type="number"
                        :rules="rules.neck"
                        dark
                        outlined
                    >
                    </v-text-field>
                </div>
                <div class="button-group">
                    <v-btn
                        class="button save-diary"
                        color="primary"
                        :loading="progressAddToDiary"
                        @click="addToDiary"
                    >
                        Сохранить
                    </v-btn>
                    <div class="text--save-changed">
                        Изменения сохранены
                    </div>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script>
import Title from "@/components/Title";
import Explanation from "@/components/Explanation";
import axios from "axios";
import url from "../services/url";
import {mapGetters} from "vuex";

export default {
    name: "ProgramDiary",
    components: {
        "title-page": Title,
        "explanation": Explanation,
    },

    data: () => ({
        showText: 0,
        progressAddToDiary: false,
        progress: true,
        parameters: {
            weight: "",
            bust: "",
            hip: "",
            waist: "",
            bicep: "",
            shin: "",
            neck: "",
        },

        timer: null,


        explanation: [{text: "Вы можете отследить изменения своих параметров в профиле в разделе «Статистика»"}],

        rules: {
            weight: [
                v => v > 0 || "Некорректное значение",
                v => v <= 600 || "Некорректное значение",
            ],

            bust: [
                v => (!v || v >= 10 && v <= 110) || "Некорректное значение",
            ],

            hip: [
                v => (!v || v >= 80 && v <= 140) || "Некорректное значение",
            ],

            waist: [
                v => (!v || v >= 50 && v <= 100) || "Некорректное значение",
            ],

            bicep: [
                v => (!v || v >= 20 && v <= 70) || "Некорректное значение",
            ],

            shin: [
                v => (!v || v >= 15 && v <= 70) || "Некорректное значение",
            ],

            neck: [
                v => (!v || v >= 25 && v <= 50) || "Некорректное значение",
            ],
        },
    }),

    computed: {
        ...mapGetters(["currentDate", "schedule", "userData"]),

        date() {
            let date = this.getScheduleDay()
            date = date.getFullYear() + '-' +
            ('00' + (date.getMonth()+1)).slice(-2) + '-' +
            ('00' + date.getDate()).slice(-2);
            return date;
        },
    },

    watch: {
        'currentDate.week'() {
            this.getDiary();
        },

        'currentDate.day'() {
            this.getDiary();
        },

        showText() {
            if (!this.showText) {
                document.querySelector(".text--save-changed").style.opacity = "0";
                clearInterval(this.timer);
            }
        }
    },

    methods: {
        getScheduleDay() {
            let week = this.currentDate.week;
            let day = this.currentDate.day;
            if (this.schedule[week]) {
                return this.schedule[week].days[day].date;
            }
            return "";
        },

        async addToDiary() {
            if (this.$refs.form.validate()) {
                this.showText = 0;
                this.progressAddToDiary = true
                this.parameters.idUser = this.userData.id;
                this.parameters.date = this.date;
                await axios.post(`${url}/api/programs/add-diary`, this.parameters).then((res) => {
                    if (res.data.name === "Success") {
                        document.querySelector(".text--save-changed").style.opacity = "1";
                        this.showText = 2;
                        this.timer = setInterval(() => {
                            if (this.showText > 0) this.showText--;
                        }, 1000);
                    }
                    this.progressAddToDiary = false;
                });
            }
        },

        async getDiary() {
            this.progress = true;
            let parameters = {
                idUser: this.userData.id,
                date: this.date
            }
            await axios.post(`${url}/api/programs/get-diary-by-date`, parameters).then((res) => {
                if (res.data.name === "Success") {
                    let results = res.data.params;
                    if (results) {
                        this.parameters.weight = results.weight;
                        this.parameters.bust = results.bust ? results.bust : "";
                        this.parameters.hip = results.hip ? results.hip : "";
                        this.parameters.waist = results.waist ? results.waist : "";
                        this.parameters.bicep = results.bicep ? results.bicep : "";
                        this.parameters.shin = results.shin ? results.shin : "";
                        this.parameters.neck = results.neck ? results.neck : "";
                    } else {
                        this.$refs.form.reset();
                    }
                }
                this.progress = false;
            });
        }
    },

    mounted() {
        this.getDiary();
    }
}
</script>

<style lang="scss">
#app {
    .program-diary {
        flex: 1 1 auto;
        margin-left: 30px;

        .progress-diary {
            position: relative;
            width: 100%;
            height: 310px;

            .icon {
                position: absolute;
                left: calc(50% - 50px / 2);
                bottom: calc(50% - 50px / 2);
            }
        }

        .title-page.diary {
            margin: 0;

            font-family: 'Inter-SemiBold', sans-serif;
            font-size: 32px;
            line-height: 122%;
        }

        .form-diary {
            .form-group {
                margin-top: 25px;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;

                .input {
                    margin: 0;
                    flex: 0 0 255px;
                }

                .explanation {
                    margin-top: -3px;

                    .text {
                        width: 450px;
                    }
                }
            }

            .form-group.first {
                margin-top: 50px;
            }

            .form-group.with-explanation {
                margin-top: 60px;
                justify-content: flex-start;
            }

            .title-params {
                font-family: 'Inter-Regular', sans-serif;
                font-size: 18px;
                line-height: 180%;
            }

            .button-group {
                margin-top: 7px;
                display: flex;
                align-items: center;

                .button.save-diary {
                    margin-top: 0;
                    width: 255px;
                    height: 50px;
                }

                .text--save-changed {
                    opacity: 0;
                    margin-left: 30px;

                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 16px;
                    line-height: 145%;
                    transition: .25s;
                }
            }
        }
    }
}

#app.dark {
    .button-group {
        .text--save-changed {
            color: #B5B5B8;
        }
    }
}
</style>