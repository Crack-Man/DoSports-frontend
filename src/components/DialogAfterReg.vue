<template>
    <div>
        <v-dialog
            v-model="popupVisible"
            persistent
            max-width="500px"
        >
            <v-card dark>
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
                    <div class="popup-title">Проверьте почту</div>
                    <p>Чтобы завершить регистрацию, перейдите по ссылке из письма, которое мы отправили на <span class="email">{{ this.email }}</span></p>
                    <p v-show="this.nonActiveButton">Не пришло письмо? Нажмите «Отправить повторно» через 00:{{ this.time }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        class="button"
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
            this.startTimer(60);
            this.startTimer(60);
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

<style lang="scss">
@import "../assets/scss/fonts.css";
@import "../assets/scss/forms";
@import "../assets/scss/popups";

span.email {
    color: #9196FF;
}

.v-card__actions {
    padding: 0 !important;
    margin-top: 20px;

    .button {
        width: 100%;
        margin: 0 !important;
        height: 50px !important;
    }
}

</style>