<template>
    <div class="article-list">
        <div class="list">
            <div class="track">
                <div class="item" v-for="(article, index) in articles" :key="index">
                    <router-link class="image" :to="article.link">
                        <img
                            :src="article.image"
                        >
                    </router-link>
                    <div class="text">
                        <router-link :to="article.link">
                            <div class="title">
                                {{ article.title }}
                                <div class="image">
                                    <img :src="require('@/assets/img/svg/arrow-link-article--white.svg')">
                                    <img class="active" :src="require('@/assets/img/svg/arrow-link-article--violet.svg')">

                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ArticleList",

    data: () => ({
        articles: [
            {
                image: require('@/assets/img/png/article-sweets.png'),
                title: "Почему мне хочется сладкого?",
                link: "/articles/why-do-i-want-sweets"
            },
            {
                image: require('@/assets/img/png/article-smoke.png'),
                title: "Ухудшает ли курение память?",
                link: "/articles/does-smoking-impair-memory"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
            {
                image: require('@/assets/img/png/article-empty.png'),
                title: "Ухудшает ли курение память?",
                link: "/"
            },
        ]
    })
}
</script>

<style lang="scss">
#app {
    .article-list {


        .track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 30px;

            .item:not(:first-child):not(:only-child) {
                margin-bottom: 35px;
            }

            @media (max-width: 960px) {
                grid-template-columns: repeat(2, 1fr);
            }

            .image {
                display: block;
                width: 100%;
                height: 135px;

                @media (max-width: 1263px) {
                    //height: 160px;
                }

                @media (max-width: 960px) {
                    //height: 220px;
                }

                @media (max-width: 850px) {
                    //height: 200px;
                }

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 4px;
                }
            }

            .text {
                padding-top: 10px;
                margin-top: 15px;

                .title {
                    font-family: 'Inter-SemiBold', sans-serif !important;
                    font-size: 18px !important;
                    line-height: 120% !important;
                    position: relative;

                    @media (max-width: 1263px) {
                        //font-size: 20px !important;
                    }

                    @media (max-width: 960px) {
                        //font-size: 24px !important;
                    }

                    @media (max-width: 850px) {
                        //font-size: 20px !important;
                    }

                    .image {
                        width: 12px;
                        height: auto;

                        position: absolute;
                        right: 0;
                        bottom: 0;

                        img {
                            display: block;
                            width: 100%;
                            border-radius: 0;
                        }

                        img.active {
                            display: none;
                        }
                    }
                }
            }

            .link {
                display: block;
                margin-top: 15px;
                font-family: 'Inter-Medium', sans-serif;
                font-size: 18px;
                line-height: 145%;
                letter-spacing: 0.02em;

                @media (max-width: 1263px) {
                    font-size: 16px;
                }

                @media (max-width: 960px) {
                    font-size: 18px !important;
                }
            }
        }


    }
}

#app.dark {
    .article-list {
        .item {
            .title:hover {
                color: #9196FF;

                img {
                    display: none;
                }

                img.active {
                    display: block;
                }
            }
        }

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
</style>