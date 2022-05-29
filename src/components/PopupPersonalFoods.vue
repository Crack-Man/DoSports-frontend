<template>
    <v-dialog
        v-model="visible"
        persistent
        content-class="popup-personal-food--content"
        width="473px"
        dark
    >
        <v-card>
            <v-btn
                icon
                dark
                class="close"
                @click="closePopupVisibleFood"
            >
                <img
                    :src="require('../assets/img/png/close.png')"
                />
            </v-btn>
            <v-card-text class="popup-personal-foods">
                <div v-if="type === 'edit'" class="popup-title">Редактирование своего продукта</div>
                <div v-else class="popup-title">Добавление своего продукта</div>
                <v-form class="form-personal-food" ref="form" lazy-validation>
                    <v-text-field
                        label="Название продукта"
                        class="input"
                        :rules="rules.name"
                        v-model="food.name"
                        hide-details="auto"
                        dark
                        outlined
                        required
                    ></v-text-field>
                    <v-select
                        v-model="food.idCategory"
                        class="input"
                        :menu-props="{ bottom: true, offsetY: true }"
                        :append-icon="'mdi-chevron-down'"
                        :items="foodCategories"
                        :item-text="'name'"
                        :item-value="'id'"
                        label="Категория"
                        dark
                        outlined
                        required
                    ></v-select>
                    <p class="text">Укажите основные параметры блюда на 100 г.</p>
                    <div class="input-group first">
                        <v-text-field
                            label="Белки"
                            class="input"
                            v-model="food.proteins"
                            type="number"
                            :rules="rules.value"
                            dark
                            outlined
                        >
                        </v-text-field>
                        <v-text-field
                            label="Жиры"
                            class="input weight"
                            v-model="food.fats"
                            type="number"
                            :rules="rules.value"
                            dark
                            outlined
                        >
                        </v-text-field>
                    </div>
                    <div class="input-group">
                        <v-text-field
                            label="Углеводы"
                            class="input"
                            v-model="food.carbohydrates"
                            type="number"
                            :rules="rules.value"
                            dark
                            outlined
                        >
                        </v-text-field>
                        <v-text-field
                            label="Клетчатка"
                            class="input weight"
                            v-model="food.fibers"
                            type="number"
                            :rules="rules.value"
                            dark
                            outlined
                        >
                        </v-text-field>
                    </div>
                    <div class="input-group">
                        <v-text-field
                            label="Калории"
                            class="input"
                            v-model="food.calories"
                            type="number"
                            :rules="rules.value"
                            dark
                            outlined
                        >
                        </v-text-field>
                        <v-text-field
                            label="Гликемический индекс"
                            class="input weight"
                            v-model="food.glycemicIndex"
                            type="number"
                            :rules="rules.value"
                            dark
                            outlined
                        >
                        </v-text-field>
                    </div>
                    <v-btn
                        v-if="type === 'edit'"
                        color="primary"
                        :loading="progress"
                        @click="updatePersonalFood"
                        class="button"
                    >
                        Сохранить
                    </v-btn>
                    <v-btn
                        v-else
                        color="primary"
                        :loading="progress"
                        @click="addPersonalFood"
                        class="button"
                    >
                        Добавить
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import url from "../services/url";

export default {
    name: "PopupPersonalFoods",

    props: ['visible', 'selectedFood', 'type'],

    data: () => ({
        food: {
            id: 0,
            name: "",
            idCategory: 1,
            proteins: "",
            fats: "",
            carbohydrates: "",
            fibers: "",
            calories: "",
            glycemicIndex: "",
            idAuthor: 0,
        },

        progress: false,

        rules: {
            name: [
                v => !!v || 'Введите название',
            ],

            value: [
                v => v !== '' || 'Введите значение',
                v => v >= 0 || 'Введите значение',
            ],
        }
    }),

    computed: {
        ...mapGetters(["foodCategories", "userData"]),
    },

    watch: {
        selectedFood() {
            if (this.selectedFood && Object.keys(this.selectedFood).length) {
                this.setForm();
            }
        }
    },

    methods: {
        ...mapActions(["showFoodCategories"]),

        closePopupVisibleFood() {
            this.food = {
                id: 0,
                name: "",
                idCategory: 1,
                proteins: "",
                fats: "",
                carbohydrates: "",
                fibers: "",
                calories: "",
                glycemicIndex: ""
            };
            this.$emit('updateVisible', false);
        },

        async addPersonalFood() {
            if (this.$refs.form.validate()) {
                this.progress = true;
                await axios.post(`${url}/api/programs/add-personal-food`, this.food).then(async (res) => {
                    if (res.data.name === "Success") {
                        this.$emit("productAdded");
                        this.closePopupVisibleFood();
                    }
                    this.progress = false;
                });
            }
        },

        async updatePersonalFood() {
            if (this.$refs.form.validate()) {
                this.progress = true;
                await axios.post(`${url}/api/programs/update-personal-food`, this.food).then(async (res) => {
                    if (res.data.name === "Success") {
                        this.$emit("productEdited");
                        this.closePopupVisibleFood();
                    }
                    this.progress = false;
                });
            }
        },

        setForm() {
            this.food = {
                id: this.selectedFood.id,
                name: this.selectedFood.name,
                idCategory: this.selectedFood.id_food_category,
                proteins: this.selectedFood.proteins,
                fats: this.selectedFood.fats,
                carbohydrates: this.selectedFood.carbohydrates,
                fibers: this.selectedFood.fibers,
                calories: this.selectedFood.calories,
                glycemicIndex: this.selectedFood.glycemic_index
            };
        }
    },

    mounted() {
        this.showFoodCategories();
        if (this.selectedFood && Object.keys(this.selectedFood).length) {
            this.setForm();
        }
        if (this.userData) {
            this.food.idAuthor = this.userData.id;
        }
    }
}
</script>

<style lang="scss">
#app {
    .popup-personal-foods {
        .popup-title {
            width: 235px;
        }

        .input {
            margin-top: 52px;
            width: 100%;
        }

        .input:not(:first-child):not(:only-child) {
            margin-top: 25px;
        }

        .text {
            margin-top: 3px !important;
            font-family: 'Inter-Regular', sans-serif !important;
            font-size: 16px !important;
            line-height: 140% !important;
        }

        .input-group {
            margin-top: 25px;
            display: flex;
            justify-content: space-between;


            .input {
                margin-top: 0 !important;
                flex: 0 0 176px;
                width: 176px;
            }
        }

        .input-group.first {
            margin-top: 45px;
        }

        .button {
            margin-top: 0;
            width: 100%;
            height: 50px;
        }
    }
}

#app.dark {
    .popup-personal-foods {
        p {
            color: white;
        }
    }
}
</style>