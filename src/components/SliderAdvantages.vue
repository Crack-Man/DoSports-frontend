<template>
    <v-container class="container-slider">
        <div class="advantages-slider">
            <h1>Наши преимущества</h1>
            <div class="advantage-list">
                <div class="item" v-for="(item, index) in items" :key="index">
                    <div class="image">
                        <img
                            :src="require('@/assets/img/png/arrow-advantage.png')"
                        >
                    </div>
                    <div class="text">
                        <div class="title">{{ item.title }}</div>
                        <div class="description">{{ item.description }}</div>
                        <div class="description split">{{ item.descriptionSplit }}</div>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "AdvantagesSlider",

    data: () => ({
        items: [
            {
                title: "Доступная цена",
                description: "Наш сервис бесплатный, а платные функции лишь дополнение, и они не мешают взаимодействию с сайтом.",
                descriptionSplit: "Наш сервис бесплатный, а платные функции лишь дополнение,\nи они не мешают взаимодействию с сайтом."
            },
            {
                title: "Удобная платформа",
                description: "Рассчитывайте калорийность приемов пищи и следите за физическими показателями прямо на сайте.",
                descriptionSplit: "Рассчитывайте калорийность приемов пищи и следите\nза физическими показателями прямо на сайте."
            },
            {
                title: "Персональный подход",
                description: "Рассчитайте индивидуальный индекс массы тела, позволяющий оценить степень соответствия массы.",
                descriptionSplit: "Рассчитайте индивидуальный индекс массы тела,\nпозволяющий оценить степень соответствия массы."
            },
        ],
    })
}
</script>

<style lang="scss">
@import "../assets/scss/fonts.css";

#app {
    .container-slider {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }

    .advantages-slider {
        padding: 165px 0;

        @media (max-width: 1185px) and (max-height: 1300px) {
            margin-top: calc((100vh - 85px - (100vh - 85px) * 0.75) * (-1) + 165px);
        }

        @media (max-width: 1185px) and (max-height: 1200px) {
            margin-top: calc((100vh - 85px - (100vh - 85px) * 0.65) * (-1) + 165px);
        }

        @media (max-width: 1185px) and (max-height: 720px) {
            margin-top: 0;
        }

        @media (max-width: 1035px) and (max-height: 1300px) {
            padding: 120px 0;
            margin-top: 0;
        }

        @media (max-width: 960px) {
            padding: 120px 0;
        }

        @media (max-width: 700px) {
            padding: 50px 0;
        }

        h1 {
            font-family: "Oswald-Medium", sans-serif;
            font-weight: 500;
            font-size: 44px;
            line-height: 148%;
            letter-spacing: 0.02em;
            text-transform: uppercase;

            @media (max-width: 1263px) {
                font-size: 38px;
            }

            @media (max-width: 945px) {
                font-size: 34px;
            }

            @media (max-width: 580px) {
                font-size: 32px;
            }
        }

        .advantage-list {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;

            @media (max-width: 960px) {
                margin-top: 35px;
            }

            @media (max-width: 810px) {
                margin-top: 20px;
            }

            @media (max-width: 750px) {
                margin-top: 25px;
                flex-direction: column;
            }

            .item {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                margin-left: 20px;

                @media (max-width: 850px) {
                    margin-left: 10px;
                }

                @media (max-width: 750px) {
                    justify-content: stretch;
                    margin-top: 25px;
                    margin-left: 0;
                }

                .image {
                    margin-right: 25px;
                    margin-top: 2px;
                    flex: 0 0 28px;

                    @media (max-width: 1263px) {
                        flex: 0 0 22px;
                        margin-right: 15px;
                    }

                    @media (max-width: 945px) {
                        flex: 0 0 20px;
                    }

                    @media (max-width: 770px) {
                        margin-right: 10px;
                        flex: 0 0 18px;
                    }

                    @media (max-width: 750px) {
                        margin-top: 4px;
                        flex: 0 0 20px;
                    }

                    img {
                        width: 100%;
                        display: block;
                    }
                }

                .text {
                    .title {
                        font-family: 'Oswald-Regular', sans-serif !important;
                        font-size: 32px !important;
                        line-height: 115% !important;

                        @media (max-width: 1263px) {
                            font-size: 26px !important;
                        }

                        @media (max-width: 945px) {
                            font-size: 22px !important;
                        }

                        @media (max-width: 770px) {
                            font-size: 20px !important;
                        }

                        @media (max-width: 750px) {
                            font-size: 24px !important;
                        }
                    }

                    .description {
                        margin-top: 20px;
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 18px;
                        line-height: 145%;
                        white-space: pre-wrap;

                        @media (max-width: 1263px) {
                            font-size: 16px;
                        }

                        @media (max-width: 945px) {
                            font-size: 14px;
                        }

                        @media (max-width: 810px) {
                            margin-top: 15px;
                            font-size: 12px;
                        }

                        @media (max-width: 750px) {
                            display: none;
                            font-size: 16px;
                            margin-top: 10px;
                        }

                        @media (max-width: 580px) {
                            display: block;
                        }
                    }

                    .description.split {
                        display: none;

                        @media (max-width: 750px) {
                            display: block;
                        }

                        @media (max-width: 580px) {
                            display: none;
                        }
                    }
                }
            }

            .item:first-child {
                margin-left: 0;

                @media (max-width: 750px) {
                    margin-top: 0;
                }
            }
        }
    }
}

</style>