<template>
    <div class="gid-slider">
        <v-container>
            <div class="item" v-for="(item, index) in items" :key="index">
                <div class="left" v-if="item.posImg === 'left'">
                    <div :class="item.classImg">
                        <img
                            :src="item.image"
                        >

                        <img
                            class="shadow"
                            :src="item.shadow"
                        >
                    </div>
                    <div :class="item.classImgMobile">
                        <img
                            :src="item.imageMobile"
                        >

                        <img
                            class="shadow"
                            :src="item.shadowMobile"
                        >
                    </div>
                    <div :class="item.classText">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <explanation :texts="item.description"/>
                    </div>
                </div>
                <div class="right" v-else-if="item.posImg === 'right'">
                    <div :class="item.classText">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <explanation :texts="item.description"/>
                    </div>
                    <div :class="item.classImg">
                        <img
                            :src="item.image"
                        >

                        <img
                            class="shadow"
                            :src="item.shadow"
                        >
                    </div>
                    <div :class="item.classImgMobile">
                        <img
                            :src="item.imageMobile"
                        >

                        <img
                            class="shadow"
                            :src="item.shadowMobile"
                        >
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import Explanation from "@/components/Explanation";

export default {
    name: "GidSlider",

    components: {
        "explanation": Explanation
    },

    data: () => ({
        items: [
            {
                image: require('@/assets/img/png/screen-start-program.png'),
                imageMobile: require('@/assets/img/png/screen-start-program-mobile.png'),
                shadow: require('@/assets/img/png/screen-start-program-shadowed.png'),
                shadowMobile: require('@/assets/img/png/screen-start-program-shadowed.png'),
                classImg: 'image start-program',
                classImgMobile: 'image start-program mobile',
                classText: 'text start-program',
                posImg: "left",
                title: "Начните свою программу",
                description: [{
                    text: "После регистрации вам будет предложено пройти небольшой тест, после которого мы сформируем минимальные требования к достижению\nоптимального веса"
                }]
            },
            {
                image: require('@/assets/img/png/screen-food.png'),
                imageMobile: require('@/assets/img/png/screen-food-mobile.png'),
                shadow: require('@/assets/img/png/screen-food-shadowed.png'),
                shadowMobile: require('@/assets/img/png/screen-food-mobile-shadowed.png'),
                classImg: 'image food',
                classImgMobile: 'image food mobile',
                classText: 'text food',
                posImg: "right",
                title: "Следуйте графику\nпитания",
                description: [{
                    text: "В базе данных представлено множество продуктов, из которых вы сможете составить собственный рацион. Во время добавления продуктов вы сможете отслеживать соотношение КБЖУ, чтобы находиться в пределах нормы"
                }]
            },
            {
                image: require('@/assets/img/png/screen-food.png'),
                imageMobile: require('@/assets/img/png/screen-food-mobile.png'),
                shadow: require('@/assets/img/png/screen-food-shadowed.png'),
                shadowMobile: require('@/assets/img/png/screen-food-mobile-shadowed.png'),
                classImg: 'image train',
                classImgMobile: 'image train mobile',
                classText: 'text train',
                posImg: "left",
                title: "Составьте план тренировок",
                description: [{
                    text: "На основе вашей весовой категории и образа\nжизни будут предложены индивидуальные\nрежимы тренировок, из которых вы сможете\nотобрать понравившиеся упражнения и добавить\nв собственный план"
                }]
            }
        ]
    })
}
</script>

<style lang="scss">
#app {
    .gid-slider {
        padding: 120px 0;
        overflow: hidden;

        @media (max-width: 700px) {
            padding: 50px 0 80px 0;
        }

        .item {
            margin-top: 180px;

            @media (max-width: 1263px) {
                margin-top: 120px;
            }

            @media (max-width: 960px) {
                margin-top: 90px;
            }

            @media (max-width: 700px) {
                margin-top: 80px;
            }

            .left, .right {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .left {
                .image {
                    margin-right: 80px;

                    @media (max-width: 1263px) {
                        margin-right: 60px;
                    }

                    @media (max-width: 880px) {
                        margin-right: 40px;
                    }

                    @media (max-width: 700px) {
                        margin-right: 0;
                    }
                }

                @media (max-width: 700px) {
                    align-items: normal;
                    flex-direction: column-reverse;
                }
            }

            .right {
                .image {
                    margin-left: 80px;

                    @media (max-width: 1263px) {
                        margin-left: 60px;
                    }

                    @media (max-width: 880px) {
                        margin-left: 40px;
                    }

                    @media (max-width: 700px) {
                        margin-left: 0;
                    }
                }

                @media (max-width: 700px) {
                    align-items: normal;
                    flex-direction: column;
                }
            }

            .image {
                position: relative;
                z-index: 0;

                @media (max-width: 700px) {
                    width: 100%;
                    flex: 0 0 auto !important;
                }

                img {
                    display: block;

                    @media (max-width: 1263px) {
                        width: 100%;
                    }

                    @media (max-width: 700px) {
                        filter: drop-shadow(0px 4px 100px rgba(0, 0, 0, 0.5));
                        border-radius: 4px;
                    }
                }

                img.shadow {
                    position: absolute;
                    top: -96px;
                    left: -100px;
                    z-index: -1;

                    @media (max-width: 700px) {
                        display: none;
                    }
                }

                @media (max-width: 700px) {
                    display: none;
                }
            }

            .image.mobile {
                display: none;

                @media (max-width: 700px) {
                    display: block;
                }
            }

            .image.start-program {
                @media (max-width: 1263px) {
                    flex: 0 0 450px;
                }

                @media (max-width: 960px) {
                    flex: 0 0 400px;
                }

                @media (max-width: 880px) {
                    flex: 0 0 350px;
                }

                img.shadow {
                    @media (max-width: 1263px) {
                        width: 140%;
                        left: -90px;
                        top: -85px;
                    }

                    @media (max-width: 960px) {
                        width: 135%;
                        left: -70px;
                        top: -70px;
                    }

                    @media (max-width: 880px) {
                        left: -65px;
                        top: -65px;
                    }
                }
            }

            .image.food {
                @media (max-width: 1263px) {
                    flex: 0 0 450px;
                }

                @media (max-width: 960px) {
                    flex: 0 0 400px;
                }

                @media (max-width: 880px) {
                    flex: 0 0 350px;
                }

                img.shadow {
                    @media (max-width: 1263px) {
                        width: 135%;
                        top: -75px;
                        left: -80px;
                    }

                    @media (max-width: 960px) {
                        top: -70px;
                        left: -70px;
                    }

                    @media (max-width: 880px) {
                        top: -60px;
                        left: -60px;
                    }
                }
            }

            .image.train {
                flex: 0 0 492px; // пока не появится скрин тренировок
                width: 492px; // пока не появится скрин тренировок

                @media (max-width: 1263px) {
                    flex: 0 0 450px;
                }

                @media (max-width: 880px) {
                    flex: 0 0 350px;
                }

                @media (max-width: 880px) {
                    width: 100%;
                }

                img {
                    width: 100%; // пока не появится скрин тренировок
                }

                img.shadow {
                    width: calc(150% - 67px); // пока не появится скрин тренировок
                    top: -92px; // пока не появится скрин тренировок
                    left: -90px; // пока не появится скрин тренировок

                    @media (max-width: 1263px) {
                        width: 135%;
                        top: -75px;
                        left: -80px;
                    }

                    @media (max-width: 880px) {
                        width: 130%;
                        top: -60px;
                        left: -60px;
                    }
                }
            }

            .text {
                .title {
                    font-family: 'Oswald-Medium', sans-serif !important;
                    font-size: 44px !important;
                    line-height: 115% !important;
                    white-space: pre-line;

                    @media (max-width: 1263px) {
                        font-size: 38px !important;
                    }

                    @media (max-width: 960px) {
                        font-size: 36px !important;
                        white-space: normal !important;
                    }

                    @media (max-width: 810px) {
                        font-size: 30px !important;
                    }

                    @media (max-width: 750px) {
                        font-size: 26px !important;
                    }

                    @media (max-width: 700px) {
                        font-size: 34px !important;
                    }

                    @media (max-width: 580px) {
                        font-size: 32px !important;
                    }

                    @media (max-width: 450px) {
                        font-size: 28px !important;
                    }
                }

                .container-explanation {
                    margin-top: 30px;
                    margin-left: 0;

                    @media (max-width: 700px) {
                        margin-top: 20px;
                        margin-bottom: 35px;
                    }

                    @media (max-width: 580px) {
                        margin-bottom: 25px;
                    }

                    .text {
                        @media (max-width: 1263px) {
                            font-size: 16px;
                            white-space: normal !important;
                        }

                        @media (max-width: 810px) {
                            font-size: 14px;
                        }

                        @media (max-width: 750px) {
                            font-size: 12px;
                        }

                        @media (max-width: 700px) {
                            font-size: 16px;
                        }
                    }
                }
            }

            .text.food {
                margin-bottom: 80px;

                @media (max-width: 700px) {
                    margin-bottom: 0;
                }
            }
        }

        .item:first-child {
            margin-top: 0;
        }
    }
}

#app.dark {
    .gid-slider {
        background: #151521;
    }
}

</style>