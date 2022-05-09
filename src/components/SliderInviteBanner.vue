<template>
    <div class="invite-slider">
        <banner :image="require('@/assets/img/png/banner-main.png')"/>
        <div class="banner-mobile">
            <v-container>
                <div class="text">
                    <h1>ВСТУПАЙ</h1>
                    <h1>В НАШ КЛУБ</h1>
                    <h1 class="name">DO SPORTS</h1>
                </div>
                <button-join></button-join>
            </v-container>
        </div>
    </div>
</template>

<script>
import Banner from "@/components/Banner";
import ButtonJoin from "@/components/ButtonJoin";

export default {
    name: "SliderInviteBanner",
    components: {
        'banner': Banner,
        'button-join': ButtonJoin
    },

    methods: {
    },

    mounted() {
    }
}
</script>

<style lang="scss">
#app {
    .invite-slider {
        padding: 160px 0 365px 0;
        position: relative;
        z-index: 1;

        @media (max-width: 960px) {
            padding-bottom: 300px;
        }

        @media (max-width: 850px) {
            padding-bottom: 250px;
        }

        @media (max-width: 700px) {
            padding-top: 0;
            padding-bottom: 80px;
        }

        @media (max-width: 600px) {
            padding-bottom: 0;
        }

        .container-banner {
            @media (max-width: 700px) {
                display: none !important;
            }
        }

        .banner {
            @media (max-width: 1263px) {
                background-repeat: no-repeat;
                background-size: auto 100% !important;
                background-position-x: 60% !important;
            }

            @media (max-width: 960px) {
                background-position-x: 40% !important;
            }

            @media (max-width: 900px) {
                background-position-x: 60% !important;
                padding: 65px 25px;
            }

            @media (max-width: 700px) {
                display: none;
            }

            .title {
                @media (max-width: 900px) {
                    font-size: 34px !important;
                }
            }
        }

        .banner-mobile {
            display: none;

            position: relative;
            width: 100%;
            background: url("../assets/img/png/banner-main-tablet.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;

            @media (max-width: 700px) {
                top: -20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                height: calc(100vw / (720 / 1349));
            }

            @media (max-width: 700px) and (max-height: 450px) {
                background: url("../assets/img/png/banner-main-mobile-album.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;

                height: calc(100vw / (1400 / 1935));
            }

            @media (max-width: 450px) {
                top: -15px;
                background: url("../assets/img/png/banner-main-mobile.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;

                height: calc(100vw / (700 / 1175));
            }

            .text {
                h1 {
                    text-align: center;
                    font-family: 'Oswald-Bold', sans-serif;
                    font-size: 100px;
                    line-height: 120%;

                    @media (max-width: 700px) {
                        font-size: 90px;
                    }

                    @media (max-width: 700px) and (max-height: 450px) {
                        font-size: 75px;
                    }

                    @media (max-width: 580px) {
                        font-size: 80px;
                    }

                    @media (max-width: 500px) {
                        font-size: 70px;
                    }

                    @media (max-width: 450px) {
                        font-size: 60px;
                    }

                    @media (max-width: 400px) {
                        font-size: 50px;
                    }

                    @media (max-width: 330px) {
                        font-size: 40px;
                    }
                }
            }

            .button.link {
                width: 100%;
                justify-content: center;
                margin-top: 50px;

                @media (max-width: 700px) and (max-height: 450px) {
                    margin-top: 30px;
                }

                @media (max-width: 500px) {
                    margin-top: 40px;
                }

                @media (max-width: 400px) {
                    margin-top: 30px;
                }

                @media (max-width: 360px) {
                    margin-top: 25px;
                }

                .image {
                    margin-right: 15px;
                }
            }
        }
    }
}

#app.dark {
    .invite-slider {
        .banner-mobile {
            .text {
                h1.name {
                    color: #9196FF;
                }
            }
        }
    }
}
</style>