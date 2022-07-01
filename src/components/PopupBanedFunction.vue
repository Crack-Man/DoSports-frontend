<template>
    <div class="">
        <v-dialog
            v-model="visible"
            persistent
            content-class="popup--baned-function"
            width="330"
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
                    <div class="popup-title">Слишком маленький размер экрана</div>
                    <div class="popup-text">
                        Скачайте мобильное приложение или зайдите с компьютера. Пожалуйта, увеличьте размер окна или зайдите с другого устройства.
                    </div>
                    <a target="_blank" href="https://play.google.com/store/apps/details?id=com.gravermedia.DoSports" class="popup-download">
                        <div class="icon">
                            <img
                                :src="require('@/assets/img/png/logo-google-play.png')"
                            >
                        </div>
                        <div class="text">Скачать в Google Play</div>
                    </a>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "PopupBanedFunction",

    props: ['visible'],

    data: () => ({
    }),

    methods: {
        closePopup() {
            this.$emit('closePopup');
        }
    }
}
</script>

<style lang="scss">

#app.dark {
    .popup--baned-function {
        .v-card {
            padding: 30px 20px;

            .close {
                top: 12px;
                right: 12px;
            }
        }

        .popup-title {
            font-size: 24px !important;
            line-height: 121% !important;
            text-align: center;
        }

        .popup-text {
            margin-top: 15px;
            font-size: 14px;
            text-align: center;
        }

        .popup-download {
            display: flex;
            margin: 10px auto auto auto;
            justify-content: center;
            align-items: center;

            .icon {
                margin-top: 5px;
                width: 22px;

                img {
                    width: 100%;
                }
            }

            .text {
                margin-left: 20px;
                font-family: 'Inter-Medium', sans-serif;
                font-size: 16px;
                line-height: 125%;
            }
        }
    }
}

#app.dark {
    .popup--baned-function {
        div {
            color: white;
        }
    }
}
</style>