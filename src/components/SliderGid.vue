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
                    <div :class="item.classText">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <explanation :text="item.description"/>
                    </div>
                </div>
                <div class="right" v-else-if="item.posImg === 'right'">
                    <div :class="item.classText">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <explanation :text="item.description"/>
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
                shadow: require('@/assets/img/png/screen-start-program-shadowed.png'),
                classImg: 'image start-program',
                classText: 'text start-program',
                posImg: "left",
                title: "Начните свою программу",
                description: "После регистрации вам будет предложено пройти небольшой тест, после которого мы сформируем минимальные требования к достижению\nоптимального веса"
            },
            {
                image: require('@/assets/img/png/screen-food.png'),
                shadow: require('@/assets/img/png/screen-food-shadowed.png'),
                classImg: 'image food',
                classText: 'text food',
                posImg: "right",
                title: "Следуйте графику\nпитания",
                description: "В базе данных представлено множество продуктов, из которых вы сможете составить собственный рацион. Во время добавления продуктов вы сможете отслеживать соотношение КБЖУ, чтобы находиться в пределах нормы"
            },
            {
                image: require('@/assets/img/png/screen-food.png'),
                shadow: require('@/assets/img/png/screen-food-shadowed.png'),
                classImg: 'image train',
                classText: 'text train',
                posImg: "left",
                title: "Составьте план тренировок",
                description: "На основе вашей весовой категории и образа\nжизни будут предложены индивидуальные\nрежимы тренировок, из которых вы сможете\nотобрать понравившиеся упражнения и добавить\nв собственный план"
            }
        ]
    })
}
</script>

<style lang="scss">
#app {
    .gid-slider {
        padding: 120px 0;

        .item {
            margin-top: 180px;

            .left, .right {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .left {
                .image {
                    margin-right: 80px;
                }
            }

            .right {
                .image {
                    margin-left: 80px;
                }
            }

            .image {
                position: relative;
                z-index: 0;

                img {
                    display: block;
                }

                img.shadow {
                    position: absolute;
                    top: -96px;
                    left: -100px;
                    z-index: -1;
                }
            }

            .image.train {
                flex: 0 0 492px; // пока не появится скрин тренировок
                width: 492px; // пока не появится скрин тренировок

                img {
                    width: 100%; // пока не появится скрин тренировок
                }

                img.shadow {
                    width: calc(150% - 67px); // пока не появится скрин тренировок
                    top: -92px; // пока не появится скрин тренировок
                    left: -90px; // пока не появится скрин тренировок
                }
            }

            .text {
                .title {
                    font-family: 'Oswald-Medium', sans-serif !important;
                    font-size: 44px !important;
                    line-height: 115% !important;
                    white-space: pre-line;
                }

                .explanation {
                    margin-top: 30px;
                    margin-left: 0;
                }
            }

            .text.food {
                margin-bottom: 150px;
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