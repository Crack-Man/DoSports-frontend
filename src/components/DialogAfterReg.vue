<template>
    <div>
        <v-dialog
            v-model="popupVisible"
            persistent
            max-width="500px"
        >
            <v-card>
                <v-btn
                    icon
                    dark
                    @click="closePopup"
                >
                    <v-icon color="black">mdi-close</v-icon>
                </v-btn>

                <v-card-title>
                    <span>Восстановление пароля</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <p>{{ this.msgAfterReg }}</p>
                    <p>Не пришло письмо? Нажмите «Отправить повторно» через {{ this.time }} секунд</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="primary"
                        @click="resendCode"
                        :disabled="this.nonActiveButton"
                    >Отправить повторно</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "DialogAfterReg",

    props: ['email'],

    data: () => ({
        popupVisible: false,
    }),

    methods: {
        ...mapActions(['startTimer', 'changeButtonStatus', 'resendActivateCode']),
        resendCode() {
            this.resendActivateCode(this.email);
            this.changeButtonStatus(true);
            this.startTimer(20);
        },

        closePopup() {
            this.popupVisible = false;
        }
    },

    computed: {
        ...mapGetters(['msgAfterReg', 'statusAfterReg', 'time', 'nonActiveButton']),
    },

    watch: {
        statusAfterReg() {
            if (this.statusAfterReg === 'Success') {
                this.popupVisible = true;
            }
        }
    }
}
</script>

<style scoped>

</style>