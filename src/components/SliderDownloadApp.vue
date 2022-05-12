<template>
    <div class="download-slider">
        <v-container>
            <div class="text">
                Скачивайте наше мобильное приложение
                <span>
                    в
                    <span class="name">Google Play</span>
                    и
                    <span class="name">App Store</span>
                </span>
            </div>
            <div class="links">
                <router-link to="/" class="google-play">
                    <img
                        class="pc"
                        :src="require('@/assets/img/png/download-google-play.png')"
                    >
                    <div class="mobile">
                        <div class="icon">
                            <img
                                :src="require('@/assets/img/png/logo-google-play.png')"
                            >
                        </div>
                        <div class="text">Скачать в Google Play</div>
                    </div>
                </router-link>
                <router-link to="/" class="app-store">
                    <img
                        class="pc"
                        :src="require('@/assets/img/png/download-app-store.png')"
                    >
                    <div class="mobile">
                        <div class="icon">
                            <img
                                :src="require('@/assets/img/png/logo-app-store.png')"
                            >
                        </div>
                        <div class="text">Скачать в App Store</div>
                    </div>
                </router-link>
            </div>
            <img
                class="iphone"
                :src="require('@/assets/img/png/iphone.png')"
            >
        </v-container>
    </div>
</template>

<script>
export default {
    name: "SliderDownloadApp"
}
</script>

<style lang="scss">
#app {
    .download-slider {
        padding: 95px 0;
        position: relative;

        @media (max-width: 1263px) {
            padding: 65px 0;
        }

        @media (max-width: 850px) {
            padding: 35px 0;
        }

        @media (max-width: 700px) {
            margin-top: 0;
            padding: 35px 0;
        }

        @media (max-width: 600px) {
            padding: 150px 0 800px 0;
            margin-top: 0;
            bottom: 120px;
        }

        @media (max-width: 550px) {
            padding-bottom: 750px;
        }

        @media (max-width: 500px) {
            padding-bottom: 650px;
        }

        @media (max-width: 450px) {
            padding-bottom: 600px;
        }

        @media (max-width: 400px) {
            padding-bottom: 450px;
        }

        @media (max-width: 350px) {
            padding-bottom: 375px;
        }

        .container {
            position: relative;
        }

        .text {
            width: 445px;
            font-family: 'Oswald-Medium', sans-serif;
            font-size: 44px;
            line-height: 125%;

            @media (max-width: 1263px) {
                width: 365px;
                font-size: 36px;
            }

            @media (max-width: 800px) {
                width: 285px;
                font-size: 28px;
            }

            @media (max-width: 600px) {
                font-size: 44px;
                width: 440px;
            }

            @media (max-width: 470px) {
                font-size: 42px;
                width: 420px;
            }

            @media (max-width: 450px) {
                font-size: 32px;
                width: 320px;
            }

            span {
                @media (max-width: 600px) {
                    display: none;
                }
            }
        }

        .links {
            margin-top: 40px;
            display: flex;
            align-items: center;

            @media (max-width: 700px) {
                margin-top: 25px;
                align-items: flex-start;
                flex-direction: column;
            }

            a {
                display: block;
                width: 213px;

                @media (max-width: 1263px) {
                    width: 190px;
                }

                @media (max-width: 800px) {
                    width: 155px;
                }

                @media (max-width: 700px) {
                    width: 190px;
                }

                @media (max-width: 650px) {
                    width: 170px;
                }

                @media (max-width: 600px) {
                    width: auto;
                }

                .pc {
                    @media (max-width: 600px) {
                        display: none;
                    }
                }

                .mobile {
                    display: none;

                    @media (max-width: 600px) {
                        display: flex;
                        align-items: center;
                    }

                    .icon {
                        width: 22px;

                        img {
                            width: 100%;
                        }
                    }

                    .text {
                        width: auto;
                        margin-left: 20px;
                        font-family: 'Inter-Medium', sans-serif;
                        font-size: 24px;
                        line-height: 125%;
                        text-align: left;

                        @media (max-width: 450px) {
                            font-size: 16px;
                        }
                    }
                }
            }

            a.app-store {
                margin-left: 30px;

                @media (max-width: 1263px) {
                    margin-left: 20px;
                }

                @media (max-width: 700px) {
                    margin-top: 15px;
                    margin-left: 0;
                }
            }

            img {
                display: block;
                width: 100%;
            }
        }

        .iphone {
            position: absolute;
            width: 488px;
            bottom: -95px;
            right: 0;
            
            @media (max-width: 1263px) {
                width: 430px;
                bottom: -65px;
            }

            @media (max-width: 850px) {
                width: 350px;
                bottom: -35px;
            }

            @media (max-width: 700px) {
                bottom: -35px;
            }

            @media (max-width: 650px) {
                width: 300px;
                bottom: -35px;
            }

            @media (max-width: 600px) {
                width: 550px;
                left: calc(50% - 550px / 2);
                bottom: -800px;
            }

            @media (max-width: 550px) {
                width: 500px;
                left: calc(50% - 500px / 2);
                bottom: -750px;
            }

            @media (max-width: 500px) {
                width: 450px;
                left: calc(50% - 450px / 2);
                bottom: -650px;
            }

            @media (max-width: 450px) {
                width: 400px;
                left: calc(50% - 400px / 2);
                bottom: -600px;
            }

            @media (max-width: 400px) {
                width: 300px;
                left: calc(50% - 300px / 2);
                bottom: -450px;
            }

            @media (max-width: 350px) {
                width: 250px;
                left: calc(50% - 250px / 2);
                bottom: -375px;
            }

            img {
                display: block;
                width: 100%;
            }
        }
    }
}

#app.dark {
    .download-slider {
        background: #151521;

        .text {
            span.name {
                color: #9196FF;
            }
        }

        .mobile {
            .text:hover {
                color: #9196FF;
            }
        }
    }
}
</style>