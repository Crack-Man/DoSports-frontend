<template>
    <div class="">
        <title-page name="Прайс-лист"/>
        <div class="pricelist">
            <div class="item" v-for="item in pricelist" :key="item.id">
                <div class="period">
                    {{ item.name }}
                </div>
                <div class="cost">
                    {{ item.cost }} руб.
                </div>
                <div class="edit" @click="openPopup(item.id, item.cost, item.name)">
                    Редактировать
                </div>
            </div>
        </div>
        <v-dialog
            v-model="popupVisible"
            persistent
            content-class="popup--change-pro"
            width="450"
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
                <v-card-text>
                    <div class="popup-title">Изменить цену подписки на {{ selectedPro.name }}</div>
                    <v-form ref="form" lazy-validation>
                        <v-text-field
                            label="Цена (руб.)"
                            v-model="selectedPro.cost"
                            class="input growth"
                            type="number"
                            :rules="rules.cost"
                            dark
                            outlined
                        ></v-text-field>
                        <v-btn
                            class="button update"
                            @click="updatePro"
                            :loading="progressUpdatePro"
                        >
                            Изменить
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Title from "@/components/Title";
import axios from "axios";
import url from "@/services/url";

export default {
    name: "AdminPriceList",

    components: {
        "title-page": Title,
    },

    data: () => ({
        pricelist: [],
        selectedPro: {
            id: 0,
            cost: 0,
            name: "",
        },
        popupVisible: false,
        progressUpdatePro: false,

        rules: {
            cost: [
                v => v > 0 || "Введите корректное значение"
            ]
        }
    }),

    methods: {
        async getPricelist() {
            await axios.get(`${url}/api/payment/get-pricelist`).then((res) => {
                this.pricelist = Array.from(res.data);
            })
        },

        openPopup(id, cost, name) {
            this.selectedPro = {
                id: id,
                cost: cost,
                name: name
            };
            this.popupVisible = true;
        },

        closePopup() {
            this.selectedPro = {
                id: 0,
                cost: 0,
                name: ""
            };
            this.popupVisible = false;
        },

        async updatePro() {
            if (this.$refs.form.validate()) {
                this.progressUpdatePro = true;
                await axios.post(`${url}/api/payment/change-price`, this.selectedPro).then((res) => {
                    this.progressUpdatePro = false;
                    if (res.data.name === "Success") {
                        this.closePopup();
                        this.getPricelist();
                    }
                });
            }
        }
    },

    mounted() {
        this.getPricelist();
    }
}
</script>

<style lang="scss">
#app {
    .pricelist {
        .edit {
            font-family: 'Inter-Regular', sans-serif;
            font-size: 16px;
            line-height: 122%;
            text-decoration-line: underline;
            cursor: pointer;
        }
    }
}

#app.dark {
    .pricelist {
        .edit:hover {
            color: #9196FF;
        }
    }
}
</style>