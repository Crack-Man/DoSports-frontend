<template>
    <div class="download-slider">
        <v-container>
            <div class="text">
                Скачивайте наше мобильное приложение
                в <span>Google Play</span> и <span>App Store</span>
            </div>
            <div class="links">
                <router-link to="/" class="google-play">
                    <img
                        :src="require('@/assets/img/png/download-google-play-large.png')"
                    >
                </router-link>
                <router-link to="/" class="app-store">
                    <img
                        :src="require('@/assets/img/png/download-app-store-large.png')"
                    >
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

        @media (max-width: 1263px) {
            padding: 65px 0;
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
                font-size: 36px;
                width: 360px;
            }
        }

        .links {
            margin-top: 40px;
            display: flex;
            align-items: center;

            a {
                display: block;

                @media (max-width: 1263px) {
                    width: 190px;
                }
            }

            a.app-store {
                margin-left: 30px;

                @media (max-width: 1263px) {
                    margin-left: 20px;
                }
            }

            img {
                display: block;
                max-width: 100%;
            }

            img {
            }
        }

        .iphone {
            position: absolute;
            bottom: -95px;
            right: 0;
            
            @media (max-width: 1263px) {
                width: 430px;
                bottom: -65px;
            }
        }
    }
}

#app.dark {
    .download-slider {
        background: #151521;

        .text {
            span {
                color: #9196FF;
            }
        }
    }
}
</style>