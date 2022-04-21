<template>
    <div class="article-slider">
        <v-container>
            <div class="header-slider">
                <h1 class="title">ПОЛЕЗНЫЕ СТАТЬИ</h1>
                <router-link to="/" class="link">
                    <span>Смотреть все</span>
                    <div class="image">
                        <img
                            :src="require('@/assets/img/png/arrow-link-white-small.png')"
                        >
                        <img
                            class="active"
                            :src="require('@/assets/img/png/arrow-link-purple-small.png')"
                        >
                    </div>
                </router-link>
            </div>
            <div class="articles">
                <div class="item" v-for="(article, index) in articles" :key="index">
                    <div class="image">
                        <router-link to="/">
                            <img
                                :src="article.image"
                            >
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/">
                            <div class="title">{{ article.title }}</div>
                        </router-link>
                        <router-link to="/">
                            <div class="description">{{ article.description }}</div>
                        </router-link>
                    </div>
                    <router-link to="/" class="link">+ Читать подробнее</router-link>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "SliderArticles",

    data: () => ({
        articles: [
            {
                image: require('@/assets/img/png/article1.png'),
                title: "Почему бег важен в борьбе за идеальные формы?",
                description: "Рассчитайте ваш индивидуальный индекс массы тела,  позволяющий оценить степень соответствия массы и роста"
            },
            {
                image: require('@/assets/img/png/article2.png'),
                title: "Почему бег важен в борьбе за идеальные формы?",
                description: "Рассчитайте ваш индивидуальный индекс массы тела,  позволяющий оценить степень соответствия массы и роста"
            },
            {
                image: require('@/assets/img/png/article3.png'),
                title: "Почему бег важен в борьбе за идеальные формы?",
                description: "Рассчитайте ваш индивидуальный индекс массы тела,  позволяющий оценить степень соответствия массы и роста"
            },
        ]
    }),
}
</script>

<style lang="scss">
#app {
    .article-slider {
        padding-top: 155px;

        .header-slider {
            display: flex;
            justify-content: space-between;
            align-items: center;

            h1.title {
                font-family: 'Oswald-SemiBold', sans-serif !important;
                font-size: 44px !important;
                line-height: 130% !important;
                letter-spacing: 0.02em !important;
            }

            .link {
                display: flex;
                align-items: center;

                span {
                    font-family: 'Inter-Medium', sans-serif;
                    font-size: 18px;
                    line-height: 22px;

                    @media (max-width: 1263px) {
                        font-size: 16px;
                    }
                }

                .image {
                    margin-left: 10px;

                    img.active {
                        display: none;
                    }
                }
            }
        }

        .articles {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            margin-top: 60px;
            grid-column-gap: 30px;

            .image {
                width: 100%;
                height: 197px;

                @media (max-width: 1263px) {
                    height: 160px;
                }

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .text {
                padding-top: 20px;
                margin-top: 25px;

                .title {
                    font-family: 'Oswald-Regular', sans-serif !important;
                    font-size: 32px !important;
                    line-height: 110% !important;

                    @media (max-width: 1263px) {
                        font-size: 26px !important;
                    }
                }

                .description {
                    margin-top: 15px;
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 18px;
                    line-height: 145%;
                    letter-spacing: 0.02em;

                    @media (max-width: 1263px) {
                        font-size: 16px !important;
                    }
                }
            }

            .link {
                display: block;
                margin-top: 30px;
                font-family: 'Inter-Medium', sans-serif;
                font-size: 18px;
                line-height: 145%;
                letter-spacing: 0.02em;

                @media (max-width: 1263px) {
                    font-size: 16px;
                }
            }
        }
    }
}

#app.dark {
    .article-slider {
        .header-slider {
            .link:hover {
                span {
                    color: #9196FF !important;
                }

                img {
                    display: none;
                }

                img.active {
                    display: block;
                    position: relative;
                    top: 1px;
                }
            }
        }

        .articles {
            .text {
                border-top: 2px solid #B5B5B8;

                .description {
                    color: rgba(255, 255, 255, 0.85);
                }
            }

            .link:hover {
                color: #9196FF !important;
            }
        }
    }
}

</style>